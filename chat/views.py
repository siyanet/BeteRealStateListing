
from rest_framework import viewsets, permissions
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, MessageSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from Authentication.models import Agent, CustomUser;

User = get_user_model()

class ChatRoomViewSet(viewsets.ModelViewSet):
    """Handles creating and retrieving chat rooms."""
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        agent = self.request.user
        customer_id = self.request.data.get('customer')
        customer = User.objects.get(id=customer_id)
        serializer.save(agent=agent, customer=customer)

class MessageViewSet(viewsets.ModelViewSet):
    """Handles creating and retrieving messages."""
    queryset = Message.objects.all().order_by('-timestamp')
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        room_id = self.request.query_params.get("room_id")
        if room_id:
            return Message.objects.filter(room__id=room_id).order_by("timestamp")
        return Message.objects.none()  # prevent sending all messages

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_or_create_chat_room(request):
    customer = request.user
    agent_id = request.data.get("agent_id")
    
    if not agent_id:
        return Response({"error": "agent_id is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        agent = Agent.objects.get(id = agent_id)
    except Agent.DoesNotExist:
        return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # if not customer.groups.filter(name="Customer").exists():
    #     return Response({"error": "You are not authorized as a customer."}, status=status.HTTP_403_FORBIDDEN)

    
    room, created = ChatRoom.objects.get_or_create(customer=customer, agent=agent)
    
    return Response({"room_id": room.id}, status=status.HTTP_200_OK)