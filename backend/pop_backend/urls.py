"""pop_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from .api_v1_urls import urlpatterns as api_v1_urls
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view_api_v1 = get_schema_view(
    openapi.Info(
        title="Forestries API v1",
        default_version="v1"
    ),
    urlconf="pop_backend.api_v1_urls",
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-docs/v1/swagger/', schema_view_api_v1.with_ui('swagger', cache_timeout=0), name='api-docs_v1_swagger'),
    path('api-docs/v1/redoc/', schema_view_api_v1.with_ui('redoc', cache_timeout=0), name='api-docs_v1_redoc'),
    *api_v1_urls,
]
