from rest_framework.views import APIView, Response, Http404, status
from rest_framework import generics
from djangochannelsrestframework.consumers import AsyncAPIConsumer
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.observer import observer
from django.core.paginator import Paginator, EmptyPage
from django.dispatch.dispatcher import Signal

from main.apps import MainConfig

from .push_websocket_notification import PushWebSocketNotification
from .send_mail_notification import send_mail_notification
import json

from main.models import Notification

from .serializers import (
    NotificationCreateRequestSerializer,
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
    
    def post(self, request, format=None):
        req_serializer = NotificationCreateRequestSerializer(data=request.data)

        if req_serializer.is_valid():

            new_notification = req_serializer.save()

            res_serializer = NotificationResponseSerializer(instance=new_notification)

            return Response(data=res_serializer.data, status=status.HTTP_201_CREATED)

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

class SensorNotification():

    def send_notification(self, notification, data):
        notificationToSave = Notification(sensor_data_id=data.id, type=data.type)
        notificationToSave.save()

        send_mail_notification(notification)
        PushWebSocketNotification.receive({"message": data})



from .consumer import NotificationConsumer
class TestWebsocketAPI(generics.GenericAPIView):

    def post(self, request, format=None):
        NotificationConsumer.send_message_sync({
            "type": "test",
            "test": "test"
        })

        return Response(data="OK", status=status.HTTP_200_OK)

