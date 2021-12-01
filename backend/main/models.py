from django.db import models
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class ForestryDistrict(models.Model):

    # forest_manager

    name = models.CharField(max_length=48)

    def __str__(self):
        return self.name



class Forestry(models.Model):

    forestry_district = models.ForeignKey(ForestryDistrict, on_delete=models.CASCADE)

    forester = models.IntegerField()
    name = models.CharField(max_length=48)
    area = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name



class SensorType(models.Model):

    name = models.CharField(max_length=48)
    unit = models.CharField(max_length=12)
    max_std_value = models.CharField(max_length=48)
    min_std_value = models.CharField(max_length=48)

    def __str__(self):
        return self.name


class Sensor(models.Model):

    forestry = models.ForeignKey(Forestry, on_delete=models.CASCADE)
    type = models.ForeignKey(SensorType, on_delete=models.CASCADE)

    name = models.CharField(max_length=48)
    x = models.CharField(max_length=24)
    y = models.CharField(max_length=24)
    z = models.CharField(max_length=24)

    def __str__(self):
        return self.name



class SensorData(models.Model):

    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)

    date = models.DateTimeField()
    value = models.CharField(max_length=48)

class Email(models.Model):

    mail = models.CharField(max_length=48)
 
class NotificationType(models.Model):

    msg = models.CharField(max_length=48)

class Notification(models.Model):

    sensor_data_id = models.ForeignKey(SensorData, on_delete=models.CASCADE)
    type = models.ForeignKey(NotificationType, on_delete=models.CASCADE)



class ForestryMap(models.Model):

    forestry = models.OneToOneField(Forestry, on_delete=models.CASCADE, primary_key=True, verbose_name=_("Forestry"), related_name="forestry_map")
    map_geojson = models.JSONField(verbose_name=_("Map_geojson"), null=False, blank=False)


class ForestryResource(models.Model):

    class ResourceType(models.IntegerChoices):
        STANDARD_RESOURCE = (1, _("Standard_resource"))
        ANIMAL = (2, _("Animal"))

    forestry = models.ForeignKey(Forestry, on_delete=models.CASCADE, verbose_name=_("Forestry"), null=False, blank=False, related_name="forestry_resources")
    type = models.SmallIntegerField(choices=ResourceType.choices, blank=False, null=False, default=ResourceType.STANDARD_RESOURCE, verbose_name=_("Resource_type"))
    name = models.CharField(max_length=128, blank=False, null=False, verbose_name=_("Resource_name"))
    quantity = models.FloatField(verbose_name=_("Resource_quantity"), blank=False, null=False)
    quantity_unit = models.CharField(max_length=32, null=True, blank=True, default=None, verbose_name=_("Resource_quantity_unit"))
