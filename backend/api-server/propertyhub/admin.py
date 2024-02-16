from django.contrib import admin
from .models import Property,Owner,Image

#Register your models here.
admin.site.register(Property)
admin.site.register(Owner)
admin.site.register(Image)