from django.urls import path
from .views import BusinessListView

urlpatterns = [
  path('', BusinessListView.as_view()),
]