# pylint: disable=no-member
from django.db import models

# here we are creating our business model with relevant fields - we have added longitude and latitude for potentially using mapbox functionality
class Business(models.Model):
  name = models.CharField(max_length=100)
  image = models.CharField(max_length=500)
  category = models.CharField(max_length=50)
  latitude = models.FloatField(null=True)
  longitude = models.FloatField(null=True)

  def __str__(self):
    return self.name