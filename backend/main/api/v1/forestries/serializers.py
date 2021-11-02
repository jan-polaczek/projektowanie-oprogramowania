from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from main.models import Forestry, ForestryDistrict
from django.utils.translation import gettext as _

class MySerializer(serializers.Serializer):
    liczba1 = serializers.IntegerField(required=False, default=10)
    liczba2 = serializers.IntegerField()
    liczba3 = serializers.IntegerField()



class ForestryModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Forestry
        fields = [
            "forestry_district",
            "forester",
            "name",
            "area"
        ]



class ForestryCreateRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Forestry
        fields = [
            "forestry_district",
            "forester",
            "name",
            "area"
        ]

class ForestryUpdateRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Forestry
        fields = [
            "forestry_district",
            "forester",
            "name",
            "area"
        ]

class ForestryResponseSerializer(serializers.ModelSerializer):


    forestry_id = serializers.SerializerMethodField()
    forestry_district_name = serializers.SerializerMethodField()

    def get_forestry_id(self, obj):
        return obj.id

    def get_forestry_district_name(self, obj):
        return obj.forestry_district.name

    class Meta:
        model = Forestry
        fields = [
            "forestry_id",
            "forestry_district_id",
            "forestry_district_name",
            "forester",
            "name",
            "area"
        ]


class ForestryListRequestSerializer(serializers.Serializer):

    page = serializers.IntegerField(required=False, default=1, 
        label="Page number", 
        help_text="Page number to return"
    )
    per_page = serializers.IntegerField(required=False, default=100,
        label="Items per page",
        help_text="Defines how many items per page should be returned (must be between 1 and 500)"
    )

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

        