from django.db.models.fields import DateTimeField
from rest_framework.views import APIView, Response, Http404, status
from rest_framework import generics
from django.core.paginator import Paginator, EmptyPage
import json
from datetime import datetime
from main.api.v1.notifications.views import SensorNotification

from main.models import Sensor, SensorData

from .serializers import (
    SensorModelSerializer,
    SensorCreateRequestSerializer,
    SensorUpdateRequestSerializer,
    SensorResponseSerializer,
    SensorListRequestSerializer,
    SensorDataCreateRequestSerializer,
    SensorDataResponseSerializer,
    SensorDataParamsListRequestSerializer,
)

from drf_yasg.utils import swagger_auto_schema

class SensorAPIView(APIView):

    @swagger_auto_schema(
        operation_summary="Retrieves single record data",
        operation_description="Retrieves details of single sensor record based on the id given in the URL",
        responses={
            status.HTTP_200_OK: SensorResponseSerializer
        }
    )
    def get(self, request, sensor_id:int, format=None):

        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            raise Http404()

        serializer = SensorResponseSerializer(instance=obj)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Sensor partial update",
        operation_description="Allows for partial update of a single sensor. Updates sensor based on id given in the URL",
        request_body=SensorUpdateRequestSerializer,
        responses={
            status.HTTP_200_OK: SensorResponseSerializer
        }
    )
    def patch(self, request, sensor_id:int, format=None):

        req_serializer = SensorUpdateRequestSerializer(data=request.data, partial=True)

        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            raise Http404()

        if req_serializer.is_valid():
            obj = req_serializer.update(instance=obj, validated_data=req_serializer.validated_data)

            resp_serializer = SensorResponseSerializer(instance=obj)

            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Deletes a sensor",
        operation_description="Deletes a single sensor permanently. Sensor is deleted based on id given in the URL"
    )
    def delete(self, request, sensor_id:int, format=None):
        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            raise Http404()

        obj.delete()

        return Response(status=status.HTTP_200_OK)


class SensorsAPIView(APIView):

    @swagger_auto_schema(
        operation_summary="Returns one page of sensors",
        operation_description="You can use this endpoint to iterate over sensors",
        query_serializer=SensorListRequestSerializer,
        responses={
            status.HTTP_200_OK: SensorResponseSerializer
        }
    )
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

    @swagger_auto_schema(
        operation_summary="Adds new sensor",
        operation_description="Use this endpoint to create new sensor",
        request_body=SensorCreateRequestSerializer,
        responses={
            status.HTTP_201_CREATED: SensorResponseSerializer
        }
    )
    def post(self, request, format=None):
        req_serializer = SensorCreateRequestSerializer(data=request.data)

        if req_serializer.is_valid():

            new_forestry = req_serializer.save()

            res_serializer = SensorResponseSerializer(instance=new_forestry)

            return Response(data=res_serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SensorReportsAPIView(APIView):

    # def post(self, request, format=None):
    #     req_serializer = SensorDataParamsListRequestSerializer(data=request.query_params)
    #     try:
    #         res_json = json.loads(request.body.decode('utf-8'))
    #         res_json["date_from"] = datetime.strptime(res_json["date_from"], '%Y-%m-%dT%H:%M:%S.%f%z')
    #         res_json["date_to"] = datetime.strptime(res_json["date_to"], '%Y-%m-%dT%H:%M:%S.%f%z')
    #     except (KeyError, ValueError):
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     req_serializer_body = SensorDataBodyListRequestSerializer(data=res_json)

    #     if req_serializer.is_valid() and req_serializer_body.is_valid():
    #         sensor_id = res_json["sensor_id"]
    #         from_datetime = res_json["date_from"]
    #         to_datetime = res_json["date_to"]
    #         paginator = Paginator(
    #             SensorData.objects.filter(
    #                 date__date__range=(from_datetime, to_datetime))
    #                 .filter(sensor_id=sensor_id), 
    #             req_serializer.validated_data["per_page"]
    #         )
    #         try:
    #             page = paginator.page(req_serializer.validated_data["page"])
    #         except EmptyPage:
    #             page = []
    #         resp_serializer = SensorDataResponseSerializer(page, many=True)

    #         return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

    #     return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    @swagger_auto_schema(
        operation_summary="Retrieves sensor measurements",
        operation_description="Use this endpoint to retrieve sensor measurements between supplited datetimes",
        responses={
            status.HTTP_200_OK: SensorDataResponseSerializer
        },
        query_serializer=SensorDataParamsListRequestSerializer
    )
    def get(self, request, sensor_id:int, format=None):
        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            raise Http404()

        req_serializer = SensorDataParamsListRequestSerializer(data=request.query_params)
        if req_serializer.is_valid():
            data = req_serializer.validated_data
            paginator = Paginator(
                obj.sensor_measurements.order_by("id"),
                data["per_page"]
            )

            try:
                page = paginator.page(data["page"])
            except EmptyPage:
                page = []
            resp_serializer = SensorDataResponseSerializer(page, many=True)
            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)


        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Adds new sensor measurement",
        operation_description="Use this endpoint to create new sensor measurement",
        request_body=SensorDataCreateRequestSerializer,
        responses={
            status.HTTP_201_CREATED: SensorDataResponseSerializer
        }
    )
    def post(self, request, sensor_id:int, format=None):
        try:
            obj = Sensor.objects.get(id=sensor_id)
        except Sensor.DoesNotExist:
            raise Http404()

        req_serializer = SensorDataCreateRequestSerializer(data=request.data)
    
        if req_serializer.is_valid():
            new_sensor_data = SensorData(
                sensor_id=sensor_id,
                **req_serializer.validated_data
            )
            new_sensor_data.save()
            
            if (int(new_sensor_data.value) > 50):
                SensorNotification().send_notification({
                    "type": 3,
                    "sensor_id": sensor_id, 
                    "message": "FIRE ALERT NEAR SENSOR NO " + str(sensor_id)
                })

            res_serializer = SensorDataResponseSerializer(instance=new_sensor_data)
    
            return Response(data=res_serializer.data, status=status.HTTP_201_CREATED)
    
        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)