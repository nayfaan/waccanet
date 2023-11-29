from email.headerregistry import Address
# from turtle import title
from unittest import mock
from django.db import models
from numpy import imag


class Owner(models.Model):
    name = models.CharField(max_length=50)


# 　記事の投稿時間
# 　物件タイトル(NNで実装しよう)
# 　価格
# 　最寄駅
# 　エリア
# 　部屋のタイプ：apartment, condo, etc, 
# 　テイクオーバー有無
# 　家具付き、Wi-Fi、喫煙可否、女性のみ、男性のみ、ペット可否、駐車場の有無、契約期間、
class Property(models.Model):
    pub_date = models.DateTimeField("date published",null=True)
    name = models.CharField(max_length=50)
    # imag = 
    price = models.IntegerField(default=0)
    address = models.CharField(max_length=100,null=True)
    # type
    # area
    # 施設・設備 (Facilities)
    # station = models.CharField(max_length=10)
    # owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

