from rest_framework.views import APIView, Response, Http404, status

from .serializers import ForestryModelSerializer

class MySampleAPIView(APIView):

    def post(self, request, format=None):
        req_serializer = ForestryModelSerializer(data=request.data)
        
        if req_serializer.is_valid():
            print(req_serializer.validated_data)

            return Response(data={"msg": "Hello World!"}, status=status.HTTP_200_OK)

        return Response(data=req_serializer.errors, status=status.HTTP_400_BAD_REQUEST)