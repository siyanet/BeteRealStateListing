import jwt
from django.conf import settings
from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from urllib.parse import parse_qs

class JWTAuthMiddleware:
    """
    Middleware to extract the JWT token from the URL query parameters and authenticate the user.
    """
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # Extract token from query parameters
        query_string = scope.get("query_string", b"").decode()
        query_params = parse_qs(query_string)
        token = query_params.get("token", [None])[0]
        
        if token:
            # If the token exists, decode it and authenticate the user
            user = await self.authenticate(token)
            if user:
                # Set user in the scope if authentication is successful
                scope['user'] = user
            else:
                # If authentication fails, set the user as AnonymousUser
                scope['user'] = AnonymousUser()
        else:
            # If no token is provided, set the user as AnonymousUser
            scope['user'] = AnonymousUser()

        # Pass control to the next layer of middleware or consumer
        return await self.inner(scope, receive, send)

    @database_sync_to_async
    def authenticate(self, token):
        """
        Authenticate the user by decoding the JWT token and fetching the user from the database.
        """
        try:
            # Decode the JWT token and extract the user ID
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = payload.get('user_id')

            if user_id:
                # Return the user object if found
                from Authentication.models import CustomUser
                try:
                    return CustomUser.objects.get(uuid=user_id)
                except CustomUser.DoesNotExist:
                    return None
            return None
        except jwt.ExpiredSignatureError:
            print("Token has expired.")
            return None
        except jwt.InvalidTokenError:
            print("Invalid token.")
            return None

# Now integrate this middleware into the Django Channels setup.
