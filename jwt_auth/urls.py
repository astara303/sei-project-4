from django.urls import path
from .views import RegisterView, LoginView, UserListView, UserProfileView, CommentListView, CommentDetailView

# creating the url path for register and login of the user 
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('', UserListView.as_view()),
    path('profile/<int:pk>/', UserProfileView.as_view()),
    path('<int:pk>/comments/', CommentListView.as_view()),
    path('<int:pk>/comments/<int:comment_pk>/', CommentDetailView.as_view())
] 