from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from main.models import Sensor, SensorData
from django.utils.translation import gettext as _


class SensorModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        fields = [
            "forestry_id",
            "type",
            "name",
            "x",
            "y",
            "z"
        ]



class SensorCreateRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sensor
        fields = [
            "forestry_id",
            "type",
            "name",
            "x",
            "y",
            "z"
        ]

class SensorUpdateRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Sensor
        fields = [
            "forestry_id",
            "type",
            "name",
            "x",
            "y",
            "z"
        ]

class SensorResponseSerializer(serializers.ModelSerializer):

    forestry_id = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    def get_sensor_id(self, obj):
        return obj.id

    def get_forestry_id(self, obj):
        return obj.forestry_id.id

    def get_type(self, obj):
        return obj.type.name

    class Meta:
        model = Sensor
        fields = [
            "forestry_id",
            "type",
            "name",
            "x",
            "y",
            "z"
        ]


class SensorListRequestSerializer(serializers.Serializer):

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
                "per_page": ErrorDetail(string=_("Liczba elementów na stronę musi być z przediziału od 1 do 500"))
            })

        return data

        

class SensorDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorData
        fields = [
            "sensor_id",
            "date",
            "value"
        ]


    
class SensorDataCreateRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = SensorData
        fields = [
            "sensor_id",
            "date",
            "value"
        ]



class SensorDataResponseSerializer(serializers.ModelSerializer):

    sensor_id = serializers.SerializerMethodField()

    def get_sensor_id(self, obj):
        return obj.id

    class Meta:
        model = SensorData
        fields = [
            "sensor_id",
            "date",
            "value"
        ]



class SensorDataParamsListRequestSerializer(serializers.Serializer):

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
                "per_page": ErrorDetail(string=_("Liczba elementów na stronę musi być z przediziału od 1 do 500"))
            })

        return data


class SensorDataBodyListRequestSerializer(serializers.Serializer):

    sensor_id = serializers.IntegerField()
    date_from = serializers.DateTimeField()
    date_to = serializers.DateTimeField()

    def validate(self, data):
        data = super().validate(data)

        return data


