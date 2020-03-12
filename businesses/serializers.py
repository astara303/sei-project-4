from rest_framework import serializers
from .models import Business

# uses the business model and populates it with each business field of the model 
class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
      model = Business
      fields = '__all__'

