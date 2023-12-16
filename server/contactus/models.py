from unittest.util import _MAX_LENGTH
from django.db import models
from django.core.validators import MinValueValidator 

'''
問い合わせID (id)
投稿日(pub_date)
名前(first_name)
苗字(last_name)
メールアドレス(email_address)
問い合わせタイプ(contact_type)
問い合わせ内容 (detail)
'''
class ContactMessage(models.Model):
    id = models.AutoField(primary_key=True,validators=[MinValueValidator(1)])
    pub_date = models.DateTimeField("date published")
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    email_address = models.EmailField(max_length = 254)
    contact_type =  models.CharField(max_length=50)
    detail = models.TextField(null=True,blank=True)
    

    def __str__(self):
        return f'No.{self.id}_{self.first_name}_{self.last_name}'