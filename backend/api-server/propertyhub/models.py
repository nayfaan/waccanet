from django.db import models
from django.core.validators import MinValueValidator 



'''
物件ID (id):number
投稿日(pub_date):date
物件名(タイトル)(Property Name):string
画像(images):string
価格(price):number
住所 (address):string 
ルームタイプ(roomTypes)string
roommates
物件説明 (description)
参照元(reference)
'''

class Owner(models.Model):
    user_id = models.AutoField(primary_key=True,validators=[MinValueValidator(1)])
    user_name = models.CharField(max_length=50,null=True)
    password = models.CharField(max_length=30,null=True)
    email = models.EmailField(max_length = 254,null=True)


    def __str__(self):
        return "ID:{}-{}".format(str(self.user_id),self.user_name)

'''
物件ID (id):number
投稿日(pub_date):date
物件名(タイトル)(Property Name):string
画像(images):string
価格(price):number
住所 (address):string 
ルームタイプ(roomTypes)string
roommates
物件説明 (description)
参照元(reference)
'''
class Property(models.Model):
    id = models.AutoField(primary_key=True,validators=[MinValueValidator(1)])
    pub_date = models.DateTimeField("date published")
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    address = models.CharField(max_length=100,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    reference = models.CharField(max_length=50,default='Waccanet')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    property = models.ForeignKey(Property,  on_delete=models.CASCADE,related_name='images')
    file_name = models.CharField(max_length=50,null=True)
    image_path = models.ImageField(upload_to='properties/',null=True,blank=True)

    def __str__(self):
        return str(self.file_name)