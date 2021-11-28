from rest_framework.views import APIView, Response, Http404, status
from rest_framework import generics
from djangochannelsrestframework.consumers import AsyncAPIConsumer
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.observer import observer
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.core.paginator import Paginator, EmptyPage
from django.dispatch.dispatcher import Signal
import json

from main.models import Notification

from .serializers import (
    NotificationListRequestSerializer,
    NotificationResponseSerializer
)

class HistoricalNotificationsView(APIView):
    
    def get(self, request, format=None):
        req_serializer = NotificationListRequestSerializer(data=request.query_params)

        if req_serializer.is_valid():
            paginator = Paginator(
                Notification.objects.all().order_by('id'), 
                req_serializer.validated_data["per_page"]
            )
            try:
                page = paginator.page(req_serializer.validated_data["page"])
            except EmptyPage:
                page = []
            resp_serializer = NotificationResponseSerializer(page, many=True)

            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ManageHistoricalNotifications(APIView):

    def get(self, request, notification_id:int, format=None):
        try:
            obj = Notification.objects.get(id=notification_id)
        except Notification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = NotificationResponseSerializer(instance=obj)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def delete(self, request, notification_id:int, format=None):
        try:
            obj = Notification.objects.get(id=notification_id)
        except Notification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        obj.delete()

        return Response(status=status.HTTP_200_OK)

class PushWebSocketNotification(WebsocketConsumer):
    
    def connect(self):
        print('ACCEPT')
        async_to_sync(self.channel_layer.group_add)("notify", self.channel_name)
        self.accept()

    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        async_to_sync(self.channel_layer.group_send)(
            "notify",
            {
                "type": "send_notification_message",
                "message": message,
            },
        )

    def send_notification_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

    def disconnect(self, event):
        async_to_sync(self.channel_layer.group_discard)("notify", self.channel_name)