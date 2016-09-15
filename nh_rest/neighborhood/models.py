from django.db import models
from django.contrib.auth.models import User

class Neighborhood(models.Model):
	name = models.CharField(max_length=20)

	def __str__(self):
		return "{}: {}".format(self.id, self.name)

class Agent(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	bio = models.CharField(max_length=200)
	member_since = models.DateField(auto_now_add=True)
	image = models.ImageField(upload_to="../img/agent_imgs/", default="../img/default_profile.gif")

	def __str__(self):
		return "{}: {} {}".format(self.id, self.user.first_name, self.user.last_name)

class Buyer(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	image = models.ImageField(upload_to="../img/buyer_imgs/", default="../img/default_profile.gif")

	def __str__(self):
		return "{}: {} {}".format(self.id, self.user.first_name, self.user.last_name)

class House(models.Model):
	house_agent = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="house_agent")
	house_buyer = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="house_buyer")
	address = models.CharField(max_length=200, blank=False, null=False)
	bed = models.IntegerField(blank=False, null=False)
	bath = models.DecimalField(blank=False, null=False, max_digits=2, decimal_places=1)
	sq_ft = models.IntegerField(blank=False, null=False)
	lot_size = models.IntegerField
	yr_built = models.IntegerField
	selling = models.BooleanField(blank=False, null=False)
	image = models.ImageField(upload_to="../img/house_imgs/", default="../img/default_house.jpg")
	house_neighborhood = models.ForeignKey(Neighborhood, null=True, on_delete=models.SET_NULL, related_name="house")
	last_sold = models.DateField(auto_now=False)
	price = models.IntegerField(blank=False, null=False)
	description = models.CharField(max_length=200)

	def __str__(self):
		return "{}: {}".format(self.id, self.address)

class HouseRequest(models.Model):
	request_buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name="request")
	bed = models.IntegerField(blank=False, null=False)
	bath = models.DecimalField(blank=False, null=False, max_digits=2, decimal_places=1)
	sq_ft = models.IntegerField(blank=False, null=False)
	request_neighborhood = models.ForeignKey(Neighborhood, null=True, on_delete=models.SET_NULL, related_name="request")
	budget = models.IntegerField(blank=True, null=True)