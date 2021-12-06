from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from main.models import NotificationData
from main.models import Forestry, ForestryDistrict, Notification
from django.utils.translation import gettext as _


class NotificationModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = [
            "type",
            "for_sensor",
            "message",
            "additional_data",
            "created_at"
        ]

class NotificationDataModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationData
        fields = [
            "sensor_data_id",
            "notification_id"
        ]

class NotificationCreateRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = [
            "sensor_data_id",
            "type"
        ]

class NotificationResponseSerializer(serializers.ModelSerializer):

    sensor_data_id = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    def get_sensor_id(self, obj):
        return obj.id

    def get_type(self, obj):
        return obj.type.msg

    class Meta:
        model = Notification
        fields = [
            "sensor_data_id",
            "type"
        ]   


class NotificationListRequestSerializer(serializers.ModelSerializer): 
    page = serializers.IntegerField(required=False, default=1)
    per_page = serializers.IntegerField(required=False, default=100)

    def validate(self, data):
        data = super().validate(data)

        if data["page"] < 1:
            raise serializers.ValidationError({
                "page": ErrorDetail(string=_("Strona nie może być mniejsza niż 1"), code="invalid_page")
            })

        if data["per_page"] < 1 or data["per_page"] > 500:
            raise serializers.ValidationError({
                "per_page": ErrorDetail(string=_("Liczba elementów na stronę musi być z przedziału od 1 do 500"))
            })

        return data