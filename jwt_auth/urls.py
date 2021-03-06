from django.urls import path
from .views import RegisterView, LoginView, UserListView, UserProfileView

# creating the url path for register and login of the user 
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('users', UserListView.as_view()),
    path('users/<int:pk>/edit', UserProfileView.as_view()),
    path('users/<int:pk>', UserProfileView.as_view())
] 