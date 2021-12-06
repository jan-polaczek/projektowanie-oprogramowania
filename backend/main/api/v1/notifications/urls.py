from django.urls import path
from django.conf.urls import url
from .views import (
    TestWebsocketAPI, HistoricalNotifications
)


urlpatterns = [
    # Debug
    path("api/v1/test-websocket/", TestWebsocketAPI.as_view(), name="api_v1_test_websocket"),
    path("api/v1/notifications/", HistoricalNotifications.as_view(), name="api_v1_notification"),
]