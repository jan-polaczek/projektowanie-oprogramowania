from django.urls import path
from django.conf.urls import url
from .views import (
    TestWebsocketAPI,
    HistoricalNotificationsView, ManageHistoricalNotifications
)


urlpatterns = [
    # Debug
    path("api/v1/test-websocket/", TestWebsocketAPI.as_view(), name="api_v1_test_websocket"),

    path("api/v1/notifications/", HistoricalNotificationsView.as_view(), name="api_v1_notifications"),
    path("api/v1/notifications/<int:notification_id>", ManageHistoricalNotifications.as_view(), name="api_v1_notification"),
]