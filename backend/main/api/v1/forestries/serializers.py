from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail
from main.models import Forestry, ForestryDistrict, ForestryMap, ForestryResource, ForestryAction
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

        
class ForestryMapGeojsonResponseSerializer(serializers.ModelSerializer):
    forestry_id = serializers.SerializerMethodField()
    def get_forestry_id(self, obj):
        return obj.forestry_id

    class Meta:
        model = ForestryMap
        fields = (
            "forestry_id",
            "map_geojson"
        )
        extra_kwargs = {
            "map_geojson": {
                "label":"Map geojson",
                "help_text":"Geojson data stored in the DB. NOTICE: The format might be invalid, make sure your code handles this case"
            }
        }


class ForestryMapGeojsonPutRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForestryMap
        fields = (
            "map_geojson",
        )
        extra_kwargs = {
            "map_geojson": {
                "label":"Map geojson",
                "help_text":"Geojson data assigned to forestry. NOTICE: API does not validate the geojson format!"
            }
        }


class ForestryResourcesGetRequestSerializer(serializers.Serializer):

    type_filter = serializers.CharField(max_length=128, label="Allows to filter resource types", help_text="Put the resource types you want divided by a comma (','). You can either put numerical values (1, 2) or text equivalents (STANDARD_RESOURCE, ANIMAL)", allow_null=True, required=False, default=None)

    search_text = serializers.CharField(max_length=256, label="Filters resources by name", help_text="Performs case-insensitive search by resources names. Omitted if null", allow_null=True, required=False, default=None)

    def validate(self, data):
        data = super().validate(data)

        type_filter = data["type_filter"]
        tmp_arr = []
        if type_filter == "" or type_filter is None:
            tmp_arr = None
        else:
            types_arr = type_filter.split(',')
            for item in types_arr:
                if item.isdigit():
                    tmp_arr.append(int(item))

                else:
                    if item == "STANDARD_RESOURCE":
                        tmp_arr.append(ForestryResource.ResourceType.STANDARD_RESOURCE)
                    elif item == "ANIMAL":
                        tmp_arr.append(ForestryResource.ResourceType.ANIMAL)
                    else:
                        raise serializers.ValidationError({
                            "type_filter": ErrorDetail(
                                "Unknown resource type: " + item,
                                code="unknown_resource"
                            )
                        })
            types_arr = tmp_arr

        data["type_filter"] = tmp_arr

        return data

class ForestryResourceResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForestryResource
        fields = (
            "id",
            "type",
            "name",
            "quantity",
            "quantity_unit"
        )


class ForestryResourcesPostRequestSerializer(serializers.ModelSerializer):

    def run_validation(self, data):
        if data["type"] == "STANDARD_RESOURCE":
            data["type"] = ForestryResource.ResourceType.STANDARD_RESOURCE
        elif data["type"] == "ANIMAL":
            data["type"] = ForestryResource.ResourceType.ANIMAL

        data = super().run_validation(data)

        return data

    class Meta:
        model = ForestryResource
        fields = (
            "type",
            "name",
            "quantity",
            "quantity_unit"
        )

class ForestryResourcePatchRequestSerializer(serializers.ModelSerializer):

    def run_validation(self, data):
        if data["type"] == "STANDARD_RESOURCE":
            data["type"] = ForestryResource.ResourceType.STANDARD_RESOURCE
        elif data["type"] == "ANIMAL":
            data["type"] = ForestryResource.ResourceType.ANIMAL

        data = super().run_validation(data)

        return data

    class Meta:
        model = ForestryResource
        fields = (
            "type",
            "name",
            "quantity",
            "quantity_unit"
        )



class ForestationResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForestryAction
        fields = (
            "plant_type",
            "start_date",
            "end_date",
            "region",
            "number_of_trees"
        )

class ForestationsAPIPostResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForestryAction
        fields = (
            "plant_type",
            "start_date",
            "end_date",
            "region",
            "number_of_trees"
        )


class ForestationAPIPatchRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForestryAction
        fields = (
            "plant_type",
            "start_date",
            "end_date",
            "region",
            "number_of_trees"
        )
