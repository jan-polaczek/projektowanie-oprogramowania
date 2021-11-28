from .forestries.urls import urlpatterns as forestries_urls
from .sensors.urls import urlpatterns as sensors_urls


urlpatterns = [
    *forestries_urls,
    *sensors_urls
]