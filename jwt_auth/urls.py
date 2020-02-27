from django.urls import path
from .views import RegisterView, LoginView

# creating the url path for register and login of the user 
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view())
] 