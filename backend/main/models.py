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

    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name="sensor_measurements")

    date = models.DateTimeField()
    value = models.CharField(max_length=48)

class Email(models.Model):

    mail = models.EmailField(max_length=256)
 

class Notification(models.Model):

    class NotificationType(models.IntegerChoices):
        DEV = (0, _("Dev"))
        INFO = (1, _("Information"))
        WARNING = (2, _("Warning"))
        CRITICAL = (3, _("Critical"))

    type = models.SmallIntegerField(choices=NotificationType.choices, blank=False, null=False, default=NotificationType.INFO, verbose_name=_("Notification_type"))
    for_sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, verbose_name=_("For_sensor"), related_name="sensor_notifications")
    message = models.CharField(max_length=1024, null=True, blank=True, default=None, verbose_name=_("Message"))

    # Put measurements data here, so that we store actual value measured that
    # caused the notification, not the value that might have changed later
    #
    # Otherwise this is gonna be a total mess
    #
    # Also leaving this as JSON field, so that it's not dependent on 1
    # specific sensor type
    additional_data = models.JSONField(verbose_name=_("Additional_data"), null=True, blank=True, default=None)

    created_at = models.DateTimeField(auto_now_add=True)

class NotificationData(models.Model):
    sensor_data_id = models.ForeignKey(SensorData, on_delete=models.CASCADE)
    notification_id = models.ForeignKey(Notification, on_delete=models.CASCADE)

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



class PlantType(models.Model):
    name = models.CharField(max_length=48, null=False, blank=False, unique=True, verbose_name=_("Plant_type"))

class ActionType(models.Model):
    name = models.CharField(max_length=48, null=False, blank=False, unique=True, verbose_name=_("Action_type"))

class ForestryAction(models.Model):
    plant_type = models.ForeignKey(PlantType, on_delete=models.RESTRICT, null=True, blank=True, default=None, verbose_name=_("Plant_type"), related_name="forestry_actions")
    action_type = models.ForeignKey(ActionType, on_delete=models.RESTRICT, null=False, blank=False, verbose_name=_("Action_type"), related_name="forestry_actions")

    start_date = models.DateTimeField(null=True, blank=True, default=None, verbose_name=_("Start_date"))
    end_date = models.DateTimeField(null=True, blank=True, default=None, verbose_name=_("End_date"))

    region = models.JSONField(null=True, blank=True, default=None, verbose_name=_("Region"))
    number_of_trees = models.IntegerField(null=True, blank=True, default=None, verbose_name=_("Number_of_trees"))