from django.db import models
from django.core.validators import MinValueValidator 


class Owner(models.Model):
    name = models.CharField(max_length=50)

'''
物件ID (id)
投稿日(pub_date)
物件名(タイトル)(Property Name)
画像(images)
価格(price)
住所 (address)できたら
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
    reference = models.CharField(max_length=50,default='JPCanada')
    # owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Image(models.Model):
    property = models.ForeignKey(Property,  on_delete=models.CASCADE,related_name='images')
    image = models.ImageField(upload_to='properties/',null=True,blank=True)
    # def __str__(self):
    #     return self.image