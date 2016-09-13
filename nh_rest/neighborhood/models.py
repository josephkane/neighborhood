from django.db import models
from django.contrib.auth.models import User

class Neighborhood(models.Model):
	name = models.CharField(max_length=20)

class House(models.Model):
	address = models.CharField(max_length=200, blank=False, null=False)
	bed = models.IntegerField(blank=False, null=False)
	bath = models.DecimalField(blank=False, null=False, max_digits=2, decimal_places=1)
	sq_ft = models.IntegerField(blank=False, null=False)
	lot_size = models.IntegerField
	yr_built = models.IntegerField
	agent = models.ForeignKey(Agent, null=True, on_delete=SET_NULL, related_name="agent")
	selling = models.BooleanField(blank=False, null=False)
	image = models.ImageField(upload_to="../img/house_imgs/", default="../img/default_house.jpg")
	neighborhood = models.ForeignKey(Neighborhood, on_delete=SET_NULL, related_name="neighborhood")
	last_sold = models.DateField(auto_add=False)


class Agent(User):
	bio = models.CharField(max_length=200)
	member_since = models.DateField(auto_now_add=True)
	image = models.ImageField(upload_to="../img/agent_imgs/", default="../img/default_agent.jpg")

class Buyer(User):
	agent = models.ForeignKey(Agent, null=True, on_delete=SET_NULL, related_name="agent")
	budget = models.IntegerField
	image = models.ImageField(upload_to="../img/buyer_imgs/", default="../img/default_buyer.jpg")

class Owner(User):
	house = models.ForeignKey(House, null=True, on_delete=SET_NULL, related_name="house")
	image = models.ImageField(upload_to="../img/owner_imgs/", default="../img/default_owner.jpg")
