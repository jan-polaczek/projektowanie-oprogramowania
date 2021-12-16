from django.urls import path
from django.conf.urls import url
from .views import (
    MySampleAPIView,
    ForestriesAPIVIew,
    ForestryAPIView,
    ForestryMapGeojsonAPIView,
    ForestryResourcesAPIView,
    ForestryResourceAPIView,
    ForestationsAPIView,
    ForestationAPIView
)

urlpatterns = [
    path("api/v1/forestries/", ForestriesAPIVIew.as_view(), name="api_v1_forestries"),
    path("api/v1/forestry/<int:forestry_id>", ForestryAPIView.as_view(), name="api_v1_forestry"),
    path("api/v1/forestry/<int:forestry_id>/map/geojson/", ForestryMapGeojsonAPIView.as_view(), name="api_v1_forestry_map_geojson"),
    path("api/v1/forestry/<int:forestry_id>/resources/", ForestryResourcesAPIView.as_view(), name="api_v1_forestry_resources"),
    path("api/v1/forestry/<int:forestry_id>/resource/<int:resource_id>", ForestryResourceAPIView.as_view(), name="api_v1_forestry_resource"),

    path("api/v1/forestry/<int:forestry_id>/forestations/", ForestationsAPIView.as_view(), name="api_v1_forestry_forestations"),
    path("api/v1/forestry/<int:forestry_id>/forestation/<int:action_id>", ForestationAPIView.as_view(), name="api_v1_forestry_forestation"),
]