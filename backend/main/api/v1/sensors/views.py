from rest_framework.views import APIView, Response, Http404, status
from rest_framework import generics
from django.core.paginator import Paginator, EmptyPage

from main.models import Sensor

from .serializers import (
    SensorModelSerializer,
    SensorCreateRequestSerializer,
    SensorUpdateRequestSerializer,
    SensorResponseSerializer,
    SensorListRequestSerializer
)


class SensorAPIView(APIView):

    def get(self, request, sensor_id:int, format=None):

        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = SensorResponseSerializer(instance=obj)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def patch(self, request, sensor_id:int, format=None):

        req_serializer = SensorUpdateRequestSerializer(data=request.data, partial=True)

        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if req_serializer.is_valid():
            obj = req_serializer.update(instance=obj, validated_data=req_serializer.validated_data)

            resp_serializer = SensorResponseSerializer(instance=obj)

            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request, sensor_id:int, format=None):
        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        obj.delete()

        return Response(status=status.HTTP_200_OK)



class SensorsAPIVIew(APIView):

    def get(self, request, format=None):
        req_serializer = SensorListRequestSerializer(data=request.query_params)

        if req_serializer.is_valid():
            paginator = Paginator(
                Sensor.objects.all().order_by('id'), 
                req_serializer.validated_data["per_page"]
            )
            try:
                page = paginator.page(req_serializer.validated_data["page"])
            except EmptyPage:
                page = []
            resp_serializer = SensorResponseSerializer(page, many=True)

            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def post(self, request, format=None):
        req_serializer = SensorCreateRequestSerializer(data=request.data)

        if req_serializer.is_valid():

            new_forestry = req_serializer.save()

            res_serializer = SensorResponseSerializer(instance=new_forestry)

            return Response(data=res_serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)