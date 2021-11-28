from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from main.api.v1.notifications.views import PushWebSocketNotification

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('notifications', PushWebSocketNotification.as_asgi()),
    ]),
    # http handled by Django as usual
})