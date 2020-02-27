from django.db import models
from django.contrib.auth.models import AbstractUser

# Creating django's abstract user model with our own added extra fields
class User(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=40, unique=True)
    profile_image = models.CharField(max_length=500, null=True)
    age = models.PositiveIntegerField(null=True)
    location = models.CharField(max_length=100, blank=True)
    privacy = models.BooleanField(default=True)
    # experience = need to add a list model field here
    website = models.CharField(max_length=200, blank=True)
    # businesses = models.ManyToManyField('businesses.Business', related_name='users', blank=True)

    def __str__(self):
      return f'{self.name}'