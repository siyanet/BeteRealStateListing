# chat/consumers.py

import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
from channels.db import database_sync_to_async
from django.core.exceptions import ObjectDoesNotExist

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f"chat_{self.room_id}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # Accept the WebSocket connection
        await self.accept()
        print(f"websocket connectd: {self.channel_name}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        print("message received")
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']

            # Fetch the chat room asynchronously
            room = await self.get_chat_room(self.room_id)
            if not room:
                print("Chat room not found")
                await self.close()
                return

            # Get the sender from scope
            user = self.scope.get("user", None)
            if not user or not user.is_authenticated:
                print("User is not authenticated or missing in scope")
                await self.close()
                return

            sender_id = user.uuid
            print(f"Authenticated sender: {sender_id}")

            # Save the message to the database
            await self.save_message(room, user, message)

            # Send the message to the group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'content': message,
                    'sender': str(sender_id),
                    'timestamp': timezone.now().strftime('%Y-%m-%d %H:%M:%S')
                }
            )

        except json.JSONDecodeError:
            print("Invalid JSON received")
        except Exception as e:
            print(f"Error receive: {str(e)}")

       
       
       
       
       
    # Wrap these database functions to avoid blocking
    @database_sync_to_async
    def get_chat_room(self, room_id):
        from chat.models import ChatRoom  # Import inside the function to avoid potential circular imports
        try:
            return ChatRoom.objects.get(id=room_id)
        except ObjectDoesNotExist:
            return None
    @database_sync_to_async
    def save_message(self, room, sender, message):
        from chat.models import Message  # Import inside the function
        from Authentication.models import CustomUser
        
        sender = CustomUser.objects.get(uuid = sender.uuid)
        Message.objects.create(
            room=room,
            sender=sender,
            content=message,
            timestamp=timezone.now()
        )
    # Receive message from room group
    async def chat_message(self, event):
        sender_str = str(event['sender']) if isinstance(event['sender'], uuid.UUID) else event['sender']
    
        print("Sending message to client:", event)
        await self.send(text_data=json.dumps({
            'content': event['content'],
            'sender': sender_str,
            'timestamp': event['timestamp']
        }))
