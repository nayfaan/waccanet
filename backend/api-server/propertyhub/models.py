from django.db import models
from django.core.validators import MinValueValidator 

class Owner(models.Model):
    user_id = models.AutoField(primary_key=True,validators=[MinValueValidator(1)])
    user_name = models.CharField(max_length=50,null=True)
    password = models.CharField(max_length=30,null=True)
    ownerName = models.CharField(max_length=100,null=True,blank=True)
    ownerEmail = models.EmailField(max_length = 254,null=True,blank=True)
    ownerPhoneNumber = models.CharField(max_length=20,null=True,blank=True)

    def __str__(self):
        return "ID:{}-{}".format(str(self.user_id),self.user_name)

class Property(models.Model):
    id = models.AutoField(primary_key=True,validators=[MinValueValidator(1)])
    pub_date = models.DateTimeField("date published")
    title = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    roomType = models.CharField(max_length=20,null=True,blank=True)
    latitude = models.DecimalField(max_digits=8,decimal_places=6,blank=True,null=True) 
    longitude = models.DecimalField(max_digits=9,decimal_places=6,blank=True,null=True) 
    station = models.CharField(max_length=30,null=True,blank=True)
    area = models.CharField(max_length=20,null=True,blank=True)
    wifi = models.BooleanField(default=False)
    utilities = models.BooleanField(default=False)
    furnished = models.BooleanField(default=False)
    laundry = models.BooleanField(default=False)
    gender = models.CharField(max_length=10,null=True,blank=True)
    minimumStay = models.FloatField(default=0,null=True,blank=True)
    payment = models.CharField(max_length=10,null=True,blank=True)
    roommates =  models.IntegerField(default=0,blank=True)
    takeover =  models.IntegerField(default=0,blank=True)
    onlineViewing = models.BooleanField(default=False)
    moveInDate = models.DateTimeField(null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    reference = models.CharField(max_length=50,default='Waccanet')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE,null=True,blank=True)

    def __str__(self):
        return self.title

class Image(models.Model):
    property = models.ForeignKey(Property,  on_delete=models.CASCADE,related_name='images')
    file_name = models.CharField(max_length=50,null=True)
    image_path = models.ImageField(upload_to='properties/',null=True,blank=True)

    def __str__(self):
        return str(self.file_name)