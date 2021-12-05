from django.contrib import admin
from main.models import (
    Forestry,
    ForestryDistrict, 
    ForestryMap,
    ForestryResource,
    Sensor,
    SensorType,
    SensorData
)

# Register your models here.
class ForestryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "forestry_district",
        "forester",
        "area"
    )

    list_display_links = (
        "id",
        "name"
    )

    search_fields = (
        "name",
        "forestry_district"
    )

admin.site.register(Forestry, ForestryAdmin)



class ForestryDistrictAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
    )

    list_display_links = (
        "id",
        "name"
    )

    search_fields = (
        "name",
    )

admin.site.register(ForestryDistrict, ForestryDistrictAdmin)


class ForestryMapAdmin(admin.ModelAdmin):

    list_display = (
        "forestry",
        "map_geojson"
    )

    list_display_links = (
        "forestry",
    )

    search_fields = (
        "forestry",
    )

admin.site.register(ForestryMap, ForestryMapAdmin)


class ForestryResourceAdmin(admin.ModelAdmin):

    list_display = (
        "forestry",
        "name",
        "type",
        "quantity",
        "quantity_unit"
    )
    list_display_links = (
        "forestry",
        "name"
    )
    search_fields = (
        "forestry",
        "name",
        "type"
    )
admin.site.register(ForestryResource, ForestryResourceAdmin)



class SensorAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "forestry",
        "type",
        "name",
        "x", "y", "z"
    )

    list_display_links = (
        "id",
    )

    search_fields = (
        "forestry", "name"
    )
admin.site.register(Sensor, SensorAdmin)


class SensorDataAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sensor",
        "date",
        "value"
    )

    list_display_links = (
        "id",
    )

    search_fields = (
        "sensor",
    )
admin.site.register(SensorData, SensorDataAdmin)


class SensorTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "unit",
        "max_std_value",
        "min_std_value"
    )

    list_display_links = (
        "id",
        "name"
    )

    search_fields = (
        "name",
    )
admin.site.register(SensorType, SensorTypeAdmin)