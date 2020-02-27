from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Question(models.Model):
    question = models.CharField(max_length=500)
    correct_answer = models.CharField(max_length=200)
    incorrect_answers = ArrayField(models.CharField(max_length=50, blank=True), size=3)

    def __str__(self):
      return f'{self.question}'


