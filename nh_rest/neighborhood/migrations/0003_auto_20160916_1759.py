# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-16 17:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neighborhood', '0002_auto_20160916_1720'),
    ]

    operations = [
        migrations.AddField(
            model_name='house',
            name='lot_size',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='house',
            name='yr_built',
            field=models.IntegerField(null=True),
        ),
    ]
