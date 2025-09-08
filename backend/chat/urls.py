from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatRoomViewSet, MessageViewSet,get_or_create_chat_room

router = DefaultRouter()
router.register(r'chatrooms', ChatRoomViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('chat/get-or-create-room/', get_or_create_chat_room, name='get_or_create_chat_room'),
]
