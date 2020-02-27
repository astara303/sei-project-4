# pylint: disable=no-member
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model() # getting the user model 

class Business(models.Model):
  name = models.CharField(max_length=100)
  image = models.CharField(max_length=500)
  category = models.CharField(max_length=50)
  latitude = models.FloatField(null=True)
  longitude = models.FloatField(null=True)

  def __str__(self):
    return self.name