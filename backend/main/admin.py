from django.contrib import admin
from main.models import Forestry, ForestryDistrict, ForestryMap

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