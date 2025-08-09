from rest_framework import serializers
from .models import ChatRoom, Message
from Authentication.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()
    sender_detail = UserSerializer(read_only = True,source = 'sender')


    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'sender_detail', 'content', 'timestamp']
        
    def get_sender(self, obj):
        return str(obj.sender.uuid)     
    
class ChatRoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)


    class Meta:
        model = ChatRoom
        fields = ['id', 'agent', 'customer', 'created_at', 'messages']