from django.db import models
from django.contrib.auth.models import User

class House(models.Model):
	address = models.CharField(max_length=200, blank=False, null=False)
	bed = models.IntegerField(blank=False, null=False)
	bath = models.DecimalField(blank=False, null=False, max_digits=2, decimal_places=1)
	sq_ft = models.IntegerField(blank=False, null=False)
	lot_size = models.IntegerField
	yr_built = models.IntegerField
	agent = models.ForeignKey(Agent, on_delete=SET_NULL, related_name="agent")
	selling = models.BooleanField(blank=False, null=False)
	image = models.ImageField(upload_to="../img/house_img/", default="../img/default_house.jpg")
	neighborhood = models.ForeignKey(Neighborhood, on_delete=SET_NULL, related_name="neighborhood")
	last_sold = models.DateTimeField(auto_add=False)

class Neighborhood(models.Model):
	name = models.CharField(max_length=20)

class Agent(User):

class Buyer(User):

class Owner(User):
