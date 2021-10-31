from django.urls import path
from django.conf.urls import url
from .views import (
    MySampleAPIView,
    ForestriesAPIVIew,
    ForestryAPIView
)

urlpatterns = [
    path("api/v1/forestries/", ForestriesAPIVIew.as_view(), name="api_v1_forestries"),
    path("api/v1/forestry/<int:forestry_id>", ForestryAPIView.as_view(), name="api_v1_forestry"),
]