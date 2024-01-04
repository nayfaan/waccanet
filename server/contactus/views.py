from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializers import ContactMessageSerializer
from rest_framework_api_key.permissions import HasAPIKey
from rest_framework import status
from  .models import ContactMessage
from django.conf import settings


def send_mail2administrator(full_name,email_address,contact_type,detail):
    """題名"""
    subject = f'{full_name}から 問い合わせタイプ{contact_type}があります。'

    """本文"""
    "送信元："
    message = f"メール：{email_address} から {contact_type} \n詳細\n{detail}"
    """送信元メールアドレス"""
    from_email = ""
    """宛先メールアドレス"""
    recipient_list = [
        settings.SUPERUSER_EMAIL
    ]

    send_mail(subject, message, from_email, recipient_list)
    return Response('successfully send mail to administrator',status=status.HTTP_201_CREATED)

def send_mail2inquirer(full_name,email_address,contact_type,detail):
    """題名"""
    subject = f'shareCanadaHome'

    """本文"""
    "送信元："
    message = f"内容の確認後にメールにて返信いたしますので、しばらくお待ちください。\n"
    """送信元メールアドレス"""
    from_email = ""
    """宛先メールアドレス"""
    recipient_list = [
        email_address
    ]

    send_mail(subject, message, from_email, recipient_list)
    return Response('successfully send mail to inquirer',status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([HasAPIKey])
def create_inquiry(request):

    contact_message_data = request.data  # プロパティのデータ
    full_name = contact_message_data['first_name'] + ' ' + contact_message_data['last_name']
    email_address = contact_message_data['email_address']
    contact_type = contact_message_data['contact_type']
    detail = contact_message_data['detail']
    send_mail2administrator(full_name,email_address,contact_type,detail)
    send_mail2inquirer(full_name,email_address,contact_type,detail)

    # プロパティデータをシリアライザーで検証・保存
    contact_message_serializer = ContactMessageSerializer(data=contact_message_data)
    if contact_message_serializer.is_valid():
        contact_message_serializer.save()
        return Response('Contact Massage created successfully.',status=status.HTTP_201_CREATED)
    else:
        return Response(contact_message_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([HasAPIKey])
def retrieve_inquiry(request):

    contacts = ContactMessage.objects.all()
    serializer = ContactMessageSerializer(contacts, many=True)
    return Response(serializer.data)
