from django.core.mail import send_mail
from main.models import Email

def send_mail_notification(notification):
    
    if notification in ['WARNING', 'ERROR']:
        email_list = Email.objects.all()

        html_content = '<p>Tutaj powinna byc <strong>tresc</strong> twojego maila.</p>'

        for email in email_list:
            send_mail(
                'Warning',
                html_content,
                'forestry-alert@gmail.com',
                email.mail
            )
        
