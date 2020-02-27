# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Business
from .serializers import BusinessSerializer

class BusinessListView(APIView):

    def get(self, _request):
      
        businesses = Business.objects.all()
        serialized_businesses = BusinessSerializer(businesses, many=True)
        return Response(serialized_businesses.data)
        