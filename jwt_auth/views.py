# pylint: disable=no-member
from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_202_ACCEPTED
from django.contrib.auth import get_user_model
# from .models import Profile
from django.conf import settings
import jwt 

from .serializers import UserSerializer, PopulatedUserSerializer
User = get_user_model()

# Creating the register function - checks if the request data sent from user is all valid and saves if so
class RegisterView(APIView):
    
    def post(self, request):

      serialized_user = UserSerializer(data=request.data)

      if serialized_user.is_valid():
        serialized_user.save()
        return Response({'message': 'Registration Successful'})

      return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

# creating the login function - checks if the request data from email and password matches the stored data from database using their token
class LoginView(APIView):
  
    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)

            if not user.check_password(password):
                raise PermissionDenied({'message': 'Invalid Credentails'})

            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

            return Response({'token': token, 'message': f'Welcome back {user.username, user.id}'})

        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentails'})

class UserListView(APIView):

    def get(self, _request):
      
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data)

class UserProfileView(APIView):

    def get(self, _request, pk):

        try:
            user = User.objects.get(pk=pk)
            serialized_user = PopulatedUserSerializer(user)
            return Response(serialized_user.data)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def put(self, request, pk):

        try:
            user = User.objects.get(pk=pk)
            updated_user = UserSerializer(user, data=request.data)
            if updated_user.is_valid():
              updated_user.save()
              return Response(updated_user.data, status=HTTP_202_ACCEPTED)
            return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def delete(self, _request, pk):

        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)