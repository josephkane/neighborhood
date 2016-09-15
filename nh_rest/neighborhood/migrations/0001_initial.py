# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-15 14:58
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Agent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.CharField(max_length=200)),
                ('member_since', models.DateField(auto_now_add=True)),
                ('image', models.ImageField(default='../img/default_profile.gif', upload_to='../img/agent_imgs/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Buyer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='../img/default_profile.gif', upload_to='../img/buyer_imgs/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('bed', models.IntegerField()),
                ('bath', models.DecimalField(decimal_places=1, max_digits=2)),
                ('sq_ft', models.IntegerField()),
                ('selling', models.BooleanField()),
                ('image', models.ImageField(default='../img/default_house.jpg', upload_to='../img/house_imgs/')),
                ('last_sold', models.DateField()),
                ('price', models.IntegerField()),
                ('description', models.CharField(max_length=200)),
                ('house_agent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='house_agent', to=settings.AUTH_USER_MODEL)),
                ('house_buyer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='house_buyer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HouseRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bed', models.IntegerField()),
                ('bath', models.DecimalField(decimal_places=1, max_digits=2)),
                ('sq_ft', models.IntegerField()),
                ('budget', models.IntegerField(blank=True, null=True)),
                ('request_buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='request', to='neighborhood.Buyer')),
            ],
        ),
        migrations.CreateModel(
            name='Neighborhood',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.AddField(
            model_name='houserequest',
            name='request_neighborhood',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='request', to='neighborhood.Neighborhood'),
        ),
        migrations.AddField(
            model_name='house',
            name='house_neighborhood',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='house', to='neighborhood.Neighborhood'),
        ),
    ]