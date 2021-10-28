from django.urls import path
from .views import MySampleAPIView

urlpatterns = [
    path("api/v1/hello-world123/", MySampleAPIView.as_view(), name="hello_world")
]