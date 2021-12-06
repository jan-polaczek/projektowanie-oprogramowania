from django.core.mail import send_mail
from main.models import Email

def send_mail_notification(notification):
    
    if notification in ['Warning', 'Critical']:
        email_list = Email.objects.all()

        html_content = '<p>Tutaj powinna byc <strong>tresc</strong> twojego maila.</p>'

        for email in email_list:
            send_mail(
                str(notification),
                html_content,
                'forestry-alert@gmail.com',
                email.mail
            )
        
