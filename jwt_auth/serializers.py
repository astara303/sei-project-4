#pylint: disable = no-member, arguments-differ
from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from businesses.models import Business
from .models import User
from django.core.exceptions import ValidationError
User = get_user_model()

# creating the serializer to validate users information when registering - checks if their password and password_confirmation match 
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=False)
    password_confirmation = serializers.CharField(write_only=True, required=False)

    def validate(self, data):
      # our code to check that if not creating (posting) dont require password and password conf
        if not self.context['is_create']:
          return data

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})
        
        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password_confirmation': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = '__all__' 
    
class PopulatedUserSerializer(UserSerializer):
    businesses = BusinessSerializer(many=True)
    
