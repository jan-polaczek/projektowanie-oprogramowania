from django.urls import path
from django.conf.urls import url
from .views import (
    SensorsAPIView,
    SensorAPIView,
    SensorReportsAPIView
)

urlpatterns = [
    path("api/v1/sensors/", SensorsAPIView.as_view(), name="api_v1_sensors"),
    path("api/v1/sensor/<int:sensor_id>", SensorAPIView.as_view(), name="api_v1_sensor"),
    path("api/v1/sensor/<int:sensor_id>/data/", SensorReportsAPIView.as_view(), name="api_v1_sensor_data"),
]