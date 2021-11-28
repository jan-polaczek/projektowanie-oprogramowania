from django.urls import path
from django.conf.urls import url
from .views import (
    SensorsAPIVIew,
    SensorAPIView
)

urlpatterns = [
    path("api/v1/sensors/", SensorsAPIVIew.as_view(), name="api_v1_sensors"),
    path("api/v1/sensor/<int:sensor_id>", SensorAPIView.as_view(), name="api_v1_sensor"),
]