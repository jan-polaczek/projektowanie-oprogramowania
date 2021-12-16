from django.db.models.query_utils import Q
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView, Response, Http404, status
from rest_framework import generics
from django.core.paginator import Paginator, EmptyPage
from drf_yasg import openapi
from main.models import ForestryAction

from main.models import Forestry, ForestryMap, ForestryResource

from .serializers import (
    ForestryModelSerializer,
    MySerializer,
    ForestryCreateRequestSerializer,
    ForestryUpdateRequestSerializer,
    ForestryResponseSerializer,
    ForestryListRequestSerializer,
    ForestryMapGeojsonResponseSerializer,
    ForestryMapGeojsonPutRequestSerializer,
    ForestryResourcesGetRequestSerializer,
    ForestryResourcesPostRequestSerializer,
    ForestryResourcePatchRequestSerializer,
    ForestryResourceResponseSerializer,

    ForestationResponseSerializer,
    ForestationsAPIPostResponseSerializer,
    ForestationAPIPatchRequestSerializer
)

from drf_yasg.utils import swagger_auto_schema

class MySampleAPIView(APIView):

    def post(self, request, format=None):
        req_serializer = MySerializer(data=request.data)
        
        if req_serializer.is_valid():
            print(req_serializer.validated_data)

            return Response(data={"msg": "Hello World!"}, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class ForestryAPIView(APIView):

    @swagger_auto_schema(
        operation_summary="Retrieves single record data",
        operation_description="Retrieves details of single forestry record based on the id given in the URL",
        responses={
            status.HTTP_200_OK: ForestryResponseSerializer
        }
    )
    def get(self, request, forestry_id:int, format=None):

        try:
            obj = Forestry.objects.select_related("forestry_district").get(id=forestry_id)
        except Forestry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ForestryResponseSerializer(instance=obj)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Forestry partial update",
        operation_description="Allows for partial update of a single forestry. Updates forestry based on id given in the URL",
        request_body=ForestryUpdateRequestSerializer,
        responses={
            status.HTTP_200_OK: ForestryResponseSerializer
        }
    )
    def patch(self, request, forestry_id:int, format=None):

        req_serializer = ForestryUpdateRequestSerializer(data=request.data, partial=True)

        try:
            obj = Forestry.objects.get(id=forestry_id)
        except Forestry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if req_serializer.is_valid():
            obj = req_serializer.update(instance=obj, validated_data=req_serializer.validated_data)

            resp_serializer = ForestryResponseSerializer(instance=obj)

            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Deletes a forestry",
        operation_description="Deletes a single forestry permanently. Forestry is deleted based on id given in the URL"
    )
    def delete(self, request, forestry_id:int, format=None):
        try:
            obj = Forestry.objects.get(id=forestry_id)
        except Forestry.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)



class ForestriesAPIVIew(APIView):

    @swagger_auto_schema(
        operation_summary="Returns one page of forestries",
        operation_description="You can use this endpoint to iterate over forestries",
        query_serializer=ForestryListRequestSerializer,
        responses={
            status.HTTP_200_OK: ForestryResponseSerializer
        }
    )
    def get(self, request, format=None):
        req_serializer = ForestryListRequestSerializer(data=request.query_params)

        if req_serializer.is_valid():
            paginator = Paginator(
                Forestry.objects.all().order_by('id'), 
                req_serializer.validated_data["per_page"]
            )
            try:
                page = paginator.page(req_serializer.validated_data["page"])
            except EmptyPage:
                page = []
            resp_serializer = ForestryResponseSerializer(page, many=True)

            return Response(data=resp_serializer.data, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(
        operation_summary="Adds new forestry",
        operation_description="Use this endpoint to create new forestries",
        request_body=ForestryCreateRequestSerializer,
        responses={
            status.HTTP_201_CREATED: ForestryResponseSerializer
        }
    )
    def post(self, request, format=None):
        req_serializer = ForestryCreateRequestSerializer(data=request.data)

        if req_serializer.is_valid():

            new_forestry = req_serializer.save()

            res_serializer = ForestryResponseSerializer(instance=new_forestry)

            return Response(data=res_serializer.data, status=status.HTTP_201_CREATED)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForestryMapGeojsonAPIView(generics.GenericAPIView):

    @swagger_auto_schema(
        operation_summary="Retrieves forestry map in geojson format",
        operation_description="The returned format is entirely unverified in terms of geojson format (at least for now, since it requires external software)",
        responses={
            status.HTTP_200_OK: ForestryMapGeojsonResponseSerializer
        }
    )
    def get(self, request, forestry_id:int, format=None):
        
        obj = None
        try:
            obj = ForestryMap.objects.get(forestry_id=forestry_id)
        except ForestryMap.DoesNotExist:
            raise Http404()

        response = ForestryMapGeojsonResponseSerializer(instance=obj)
        return Response(data=response.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Assigns/Updates geojson data of forestry",
        operation_description="If chosen forestry already has a geojson data assigned, the API will replace it with incoming data. If no geojson data is assigned, API will assign it.",
        request_body=ForestryMapGeojsonPutRequestSerializer,
        responses={
            status.HTTP_200_OK: ForestryMapGeojsonResponseSerializer
        }
    )
    def put(self, request, forestry_id:int, format=None):
        forestry = None
        try:
            forestry = Forestry.objects.select_related("forestry_map").get(id=forestry_id)
        except Forestry.DoesNotExist:
            raise Http404()

        if not hasattr(forestry, "forestry_map"):
            obj = ForestryMap(forestry=forestry)
        else:
            obj = forestry.forestry_map

        serializer = ForestryMapGeojsonPutRequestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            obj.map_geojson = data["map_geojson"]

            try:
                obj.save()
            except Exception as e:
                return Response(data={
                    "details": "An unknown server error has occured"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            response = ForestryMapGeojsonResponseSerializer(instance=obj)
            return Response(data=response.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Clears geojson data from forestry if such data exists",
        operation_description="If geojson data is found on the requested object, it is cleared. Otherwise nothing is done and status 204 is returned"
    )
    def delete(self, request, forestry_id:int, format=None):
        forestry = None
        try:
            forestry = Forestry.objects.select_related("forestry_map").get(id=forestry_id)
        except Forestry.DoesNotExist:
            raise Http404()

        if not hasattr(forestry, "forestry_map"):
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            obj = forestry.forestry_map

        try:
            obj.delete()
        except Exception as e:
            return Response(data={
                "details": "An unrecognized server error has occured"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_204_NO_CONTENT)



class ForestryResourcesAPIView(generics.GenericAPIView):

    @swagger_auto_schema(
        operation_summary="Lists resources assigned to forestry",
        operation_description="You can filter types of resources in the request, as well as specify a search_text to filter objects by name",
        query_serializer=ForestryResourcesGetRequestSerializer,
        responses={
            status.HTTP_200_OK: ForestryResponseSerializer(many=True)
        }
    )
    def get(self, request, forestry_id:int, format=None):
        obj = None
        try:
            obj = Forestry.objects.get(id=forestry_id)
        except Forestry.DoesNotExist:
            raise Http404()

        serializer = ForestryResourcesGetRequestSerializer(data=request.query_params)
        if serializer.is_valid():
            data = serializer.validated_data
            filter_q = []
            if data["type_filter"] is not None:
                filter_q.append(Q(
                    type__in=data["type_filter"]
                ))
            if data["search_text"] is not None:
                filter_q.append(Q(
                    name__icontains=data["search_text"]
                ))

            qs = ForestryResource.objects.filter(
                *filter_q,
                forestry=obj
            )

            response = ForestryResourceResponseSerializer(instance=qs, many=True)
            return Response(data=response.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    @swagger_auto_schema(
        operation_summary="Creates new instance of a resource assigned to a forestry",
        request_body=ForestryResourcesPostRequestSerializer,
        responses={
            status.HTTP_201_CREATED: ForestryResourceResponseSerializer
        }
    )
    def post(self, request, forestry_id:int, format=None):
        obj = None
        try:
            obj = Forestry.objects.get(id=forestry_id)
        except Forestry.DoesNotExist:
            raise Http404()

        serializer = ForestryResourcesPostRequestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            instance = ForestryResource(
                forestry=obj,
                **data
            )

            try:
                instance.save()
            except Exception as e:
                return Response(data={
                    "details": "An unknown internal server error has occured"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            response = ForestryResourceResponseSerializer(instance=instance)
            return Response(data=response.data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForestryResourceAPIView(generics.GenericAPIView):

    @swagger_auto_schema(
        operation_summary="Retrieve single resource",
        operation_description="Retrieves a single resource data if it exists and is assigned to requested forestry",
        responses={
            status.HTTP_200_OK: ForestryResourceResponseSerializer
        }
    )
    def get(self, request, forestry_id:int, resource_id:int, format=None):
        obj = None
        try:
            obj = ForestryResource.objects.get(
                forestry_id=forestry_id,
                id=resource_id
            )
        except ForestryResource.DoesNotExist:
            raise Http404()

        response = ForestryResourceResponseSerializer(instance=obj)
        return Response(data=response.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="Updates a single resource",
        operation_description="Updates a resource, if requested resource exists and is assigned to requested forestry",
        request_body=ForestryResourcePatchRequestSerializer,
        responses={
            status.HTTP_200_OK: ForestryResourceResponseSerializer
        }
    )
    def patch(self, request, forestry_id:int, resource_id:int, format=None):
        obj = None
        try:
            obj = ForestryResource.objects.get(
                forestry_id=forestry_id,
                id=resource_id
            )
        except ForestryResource.DoesNotExist:
            raise Http404()

        serializer = ForestryResourcePatchRequestSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            data = serializer.validated_data

            for (key, value) in data.items():
                setattr(obj, key, value)

            try:
                obj.save()
            except Exception as e:
                return Response(data={
                    "details": "An unknown internal server error has occured"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            response = ForestryResourceResponseSerializer(instance=obj)
            return Response(data=response.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_summary="Removes a resource",
        operation_description="Removes a single resource if it exists and is assigned to the requested frorestry"
    )
    def delete(self, request, forestry_id:int, resource_id:int, format=None):
        obj = None
        try:
            obj = ForestryResource.objects.get(
                forestry_id=forestry_id,
                id=resource_id
            )
        except ForestryResource.DoesNotExist:
            raise Http404()

        try:
            obj.delete()
        except Exception as e:
            return Response(data={
                "details": "An unknown internal server error has occured"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_204_NO_CONTENT)



class ForestationsAPIView(generics.GenericAPIView):
    

    def get(self, request, forestry_id:int, format=None):
        try:
            forestry = Forestry.objects.get(id=forestry_id)
        except Forestry.DoesNotExist:
            raise Http404()

        forestations = ForestryAction.objects.filter(forestry=forestry, action_type_id=1).order_by("id")

        response = ForestationResponseSerializer(instance=forestations, many=True)

        return Response(data=response.data, status=status.HTTP_200_OK)

    def post(self, request, forestry_id:int, format=None):
        try:
            forestry = Forestry.objects.get(id=forestry_id)
        except Forestry.DoesNotExist:
            raise Http404()

        serializer = ForestationsAPIPostResponseSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data
            obj = ForestryAction(
                forestry_id=forestry_id,
                action_type_id=1,
                **data
            )
            obj.save()
            response = ForestationResponseSerializer(instance=obj)
            return Response(data=response.data, status = status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForestationAPIView(generics.GenericAPIView):

    def get(self, request, forestry_id:int, action_id:int, format=None):
        try:
            obj = ForestryAction.objects.get(
                forestry_id=forestry_id,
                id=action_id,
                action_type_id=1
            )
        except ForestryAction.DoesNotExist:
            raise Http404()

        response = ForestationResponseSerializer(instance=obj)
        return Response(data=response.data, status= status.HTTP_200_OK)

    def patch(self, request, forestry_id:int, action_id:int, format=None):
        try:
            obj = ForestryAction.objects.get(
                forestry_id=forestry_id,
                id=action_id,
                action_type_id=1
            )
        except ForestryAction.DoesNotExist:
            raise Http404()

        serializer = ForestationAPIPatchRequestSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            for key, value in data.items():
                setattr(obj, key, value)

            obj.save()

            response = ForestationResponseSerializer(instance=obj)
            return Response(data=response.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, forestry_id:int, action_id:int, format=None):
        try:
            obj = ForestryAction.objects.get(
                forestry_id=forestry_id,
                id=action_id,
                action_type_id=1
            )
        except ForestryAction.DoesNotExist:
            raise Http404()

        obj.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)