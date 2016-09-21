# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-21 18:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('neighborhood', '0010_housesale'),
    ]

    operations = [
        migrations.AlterField(
            model_name='house',
            name='lot_size',
            field=models.DecimalField(decimal_places=2, max_digits=3, null=True),
        ),
    ]