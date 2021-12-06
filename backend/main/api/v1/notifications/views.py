from rest_framework.views import APIView, Response, Http404, status
from rest_framework import generics
from djangochannelsrestframework.consumers import AsyncAPIConsumer
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.observer import observer


from .push_websocket_notification import PushWebSocketNotification
from .send_mail_notification import send_mail_notification
import json

from main.models import Notification

from .serializers import (
    NotificationResponseSerializer
)

from drf_yasg.utils import swagger_auto_schema


class HistoricalNotifications(APIView):

    @swagger_auto_schema(
    operation_summary="Retrieves one page of data",
    operation_description="Use this endpoint to retrieve one list of historical notifications",
    responses={
        status.HTTP_200_OK: NotificationResponseSerializer
    })
    def get(self, request, notification_id:int, format=None):
        try:
            obj = Notification.objects.get(id=notification_id)
        except Notification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = NotificationResponseSerializer(instance=obj)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class ManageHistoricalNotifications():

    def saveNotification(data):
        notificationToSave = Notification(type=data.type, for_sensor=data.for_sensor, message=data.message,
        additional_data=data.additional_data, created_at=data.created_at)
        notificationToSave.save()

class SensorNotification():

    def send_notification(self, notification, data):
        ManageHistoricalNotifications.saveNotification(data)
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

