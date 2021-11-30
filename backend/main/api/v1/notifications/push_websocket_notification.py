
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

class PushWebSocketNotification(WebsocketConsumer):

    GLOBAL_WEBSOCKET = None
    
    def connect(self):
        print('ACCEPT')
        async_to_sync(self.channel_layer.group_add)("notify", self.channel_name)
        self.accept()

    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        print(self)
        async_to_sync(self.channel_layer.group_send)(
            "notify",
            {
                "type": "send_notification_message",
                "message": message,
            },
        )

    def send_notification_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps({
            'message': message
        }))

    def disconnect(self, event):
        async_to_sync(self.channel_layer.group_discard)("notify", self.channel_name)
