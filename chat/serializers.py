from rest_framework import serializers
from .models import ChatRoom, Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()


    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'content', 'timestamp']
        
    def get_sender(self, obj):
        return str(obj.sender.uuid)     
    
class ChatRoomSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = ['id', 'agent', 'customer', 'created_at', 'messages']