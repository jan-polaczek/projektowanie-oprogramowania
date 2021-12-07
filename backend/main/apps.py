from django.apps import AppConfig
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .api.v1.notifications.push_websocket_notification import PushWebSocketNotification

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    def ready(self):
        PushWebSocketNotification.GLOBAL_WEBSOCKET = PushWebSocketNotification()
        # should be
        # PushWebSocketNotification.GLOBAL_WEBSOCKET = PushWebSocketNotification(WebsocketConsumer)
