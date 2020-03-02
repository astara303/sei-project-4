# pylint: disable=no-member, used-before-assignment
from django.db import models
from django.contrib.auth.models import AbstractUser

# Creating django's abstract user model with our own added extra fields
class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    profile_image = models.CharField(max_length=500, null= True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    privacy = models.BooleanField(default=True)
    looking_for_work = models.BooleanField(default=True)
    website = models.CharField(max_length=200, null=True, blank=True)
    businesses = models.ManyToManyField('businesses.Business', related_name='user', blank=True)

    def __str__(self):
      return self.email
