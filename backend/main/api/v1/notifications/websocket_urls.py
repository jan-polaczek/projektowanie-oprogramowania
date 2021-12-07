from django.urls import re_path

from .consumer import NotificationConsumer

urlpatterns = [
    re_path(r'ws/notification/$', NotificationConsumer.as_asgi(), name="ws_notification"),
]