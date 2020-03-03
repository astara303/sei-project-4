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
from jwt_auth.authentication import JWTAuthentication

from .serializers import UserSerializer
# , PopulatedUserSerializer
User = get_user_model()

# Creating the register function - checks if the request data sent from user is all valid and saves if so
class RegisterView(APIView):
    
    def post(self, request):

      serialized_user = UserSerializer(data=request.data, context={'is_create': True })

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
            # serialized_user = PopulatedUserSerializer(user)
            serialized_user = UserSerializer(user)
            return Response(serialized_user.data)
        except User.DoesNotExist:
            return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

    def patch(self, request, pk):

        try:
            
            userAuth = JWTAuthentication.authenticate(self, request)
            # print(userAuth)
            # user = User.objects.get(pk=userAuth[user])
            user = request.user
            print(user.email)
            # print(request.user.username)
            print(request.data)
            # user1 = UserSerializer(user)
            # print(UserSerializer(user).data)
            # print(UserSerializer(user).data.username)
            # print(user)
            # print(request.data)
            # print(user)
            # print((request.user.email == user.email) and (request.user.username == user.username))

            updated_user = UserSerializer(user, data=request.data, context={'is_create': False }, partial=True)
            # print(updated_user)
            if updated_user.is_valid():
  
              updated_user.save()
              # print(updated_user)
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