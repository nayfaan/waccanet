# Generated by Django 4.0.6 on 2023-11-17 22:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('propertyhub', '0002_owner_rename_title_property_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
