from django.db import models

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