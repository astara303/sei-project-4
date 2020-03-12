from django.urls import path
from .views import BusinessListView, BusinessDetailView

urlpatterns = [
  path('businesses', BusinessListView.as_view()),
  path('businesses/<int:pk>', BusinessDetailView.as_view())
]