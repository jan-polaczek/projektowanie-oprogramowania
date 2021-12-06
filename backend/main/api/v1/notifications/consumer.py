import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.group_name = 'notification'

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_message(self, obj:dict):
        await self.send(obj)

    async def notification(self, event):
        await self.send(
            text_data=json.dumps(event)
        )

    @staticmethod
    def send_message_sync(obj:dict):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'notification',
            {
                "type": "notification",
                "data": obj
            }
        )