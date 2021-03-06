# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-17 21:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neighborhood', '0004_auto_20160916_1800'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agent',
            name='image',
            field=models.ImageField(default='default_profile.gif', upload_to='agent_imgs/'),
        ),
        migrations.AlterField(
            model_name='buyer',
            name='image',
            field=models.ImageField(default='default_profile.gif', upload_to='buyer_imgs/'),
        ),
        migrations.AlterField(
            model_name='house',
            name='image',
            field=models.ImageField(default='default_house.jpg', upload_to='house_imgs/'),
        ),
    ]
