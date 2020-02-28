# pylint: disable=no-member, used-before-assignment
from django.db import models
from django.contrib.auth.models import AbstractUser

# Creating django's abstract user model with our own added extra fields
class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    profile_image = models.CharField(max_length=500, null=True)
    age = models.PositiveIntegerField(null=True)
    location = models.CharField(max_length=100, blank=True)
    privacy = models.BooleanField(default=True)
    looking_for_work = models.BooleanField(default=True)
    website = models.CharField(max_length=200, blank=True)
    # profile = models.OneToOneField('Profile', related_name='user', on_delete=models.CASCADE)

    def __str__(self):
      return self.email

# class Profile(models.Model):
    # user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)
    # businesses = models.ManyToManyField('businesses.Business', related_name='profile', blank=True)
    # comments = models.ForeignKey(Comment, related_name='profile', blank=True, on_delete=models.CASCADE)

# class Comment(models.Model):
#     text = models.CharField(max_length=300)
#     profile = models.ForeignKey(Profile, related_name='comments', null=True, on_delete=models.CASCADE) # cascade here means if the film is deleted then also delete all comments attached to that film
#     owner = models.ForeignKey(User, related_name='comments', null=True, on_delete=models.CASCADE) # cascade here means if the user deletes their profile it will delete any comment linked to their profile

#     def __str__(self):
#       return f'Comment {self.id} on {self.user}'

