from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings # for the secret key
import jwt
User = get_user_model()

# creating the authenticate function to check if user has a valid token / if user exists and therefore has permissions
class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):

        header = request.headers.get('Authorization')

        if not header: # checking if there is no header 
            return None

        if header.startswith('Basic'): # checking if header starts with 'Basic'
            return None
            
        if not header.startswith('Bearer'): # check if header doesn't start with 'Bearer'
            raise PermissionDenied({'message': 'Invalid authorization header'})
        
        token = header.replace('Bearer ', '') # removing the start of the users token and storing it in a token variable to easily use 
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied({'message': 'Invalid Token'})
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'User not found'})
        
        return (user, token)