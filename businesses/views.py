# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND
from .models import Business
from .serializers import BusinessSerializer

# this is our view for displaying all of our businesses
class BusinessListView(APIView):

    def get(self, _request):
      
        businesses = Business.objects.all()
        serialized_businesses = BusinessSerializer(businesses, many=True)
        return Response(serialized_businesses.data)

# this is our view for displaying one business - we have worked this into the code to allow ourselves to build on the business side of the project later
class BusinessDetailView(APIView):

    def get(self, _request, pk):

      try:
          business = Business.objects.get(pk=pk)
          serialized_business = BusinessSerializer(business)
          return Response(serialized_business.data)
      except Business.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)
    