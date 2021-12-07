from .forestries.urls import urlpatterns as forestries_urls
from .sensors.urls import urlpatterns as sensors_urls
from .notifications.urls import urlpatterns as notifications_urls


urlpatterns = [
    *forestries_urls,
    *sensors_urls,
    *notifications_urls
]