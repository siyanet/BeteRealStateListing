from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    # Ensure the room_id is captured correctly in the URL pattern
    re_path(r'ws/chat/(?P<room_id>\d+)/$', consumers.ChatConsumer.as_asgi()),
]