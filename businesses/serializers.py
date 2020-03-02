from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from jwt_auth.models import User
from .models import Business
# User = get_user_model()

# class UserSerializer(serializers.ModelSerializer):

#     class Meta:
#       model = User
#       fields = ('id', 'username')

class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
      model = Business
      fields = '__all__'

# class PopulatedBusinessSerializer(BusinessSerializer):
#     users = UserSerializer(many=True)