from django.urls import path
from .views import BusinessListView,BusinessDetailView

urlpatterns = [
  path('', BusinessListView.as_view()),
  path('<int:pk>/', BusinessDetailView.as_view()),

]