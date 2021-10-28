from rest_framework import serializers
from main.models import Forestry

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