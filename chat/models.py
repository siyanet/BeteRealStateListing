from django.db import models
from Authentication.models import CustomUser,Agent
import uuid
# Create your models here.


class ChatRoom(models.Model):
    # uuid = models.UUIDField(primary_key=True,default=uuid.uuid4)
    agent = models.ForeignKey(Agent,related_name='agents_chats',on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser,related_name='customer_chats',on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ('customer', 'agent')  # Ensure only one room between a customer-agent pair

    def __str__(self):
        return f"chat between {self.agent} and {self.customer}"
    
    
class Message(models.Model):
    # uuid = models.UUIDField(primary_key=True,default=uuid.uuid4)
    room = models.ForeignKey(ChatRoom,related_name="messages",on_delete=models.CASCADE)
    sender = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Message from {self.sender} in {self.room}"