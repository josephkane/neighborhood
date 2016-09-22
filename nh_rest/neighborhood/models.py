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
	image = models.CharField(max_length=500)
	user_type = models.CharField(max_length=5, default="agent")

	def __str__(self):
		return "{}: {} {}".format(self.id, self.user.first_name, self.user.last_name)

class Buyer(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	image = models.CharField(max_length=500)
	user_type = models.CharField(max_length=5, default="buyer")

	def __str__(self):
		return "{}: {} {}".format(self.id, self.user.first_name, self.user.last_name)

class House(models.Model):
	house_agent = models.ForeignKey(Agent, null=True, on_delete=models.CASCADE, related_name="house_agent")
	house_buyer = models.ForeignKey(Buyer, null=True, on_delete=models.CASCADE, related_name="house_buyer")
	address = models.CharField(max_length=200, blank=False, null=False)
	bed = models.IntegerField(blank=False, null=False)
	bath = models.DecimalField(blank=False, null=False, max_digits=2, decimal_places=1)
	sq_ft = models.IntegerField(blank=False, null=False)
	lot_size = models.DecimalField(null=True, max_digits=3, decimal_places=2)
	yr_built = models.IntegerField(null=True)
	selling = models.BooleanField(blank=False, null=False, default=True)
	image = models.CharField(max_length=1000)
	house_neighborhood = models.ForeignKey(Neighborhood, null=True, on_delete=models.SET_NULL, related_name="house")
	last_sold = models.DateField(auto_now=False, null=True)
	price = models.IntegerField(blank=False, null=False)
	description = models.CharField(max_length=200)

	def __str__(self):
		return "{}".format(self.address)

class HouseRequest(models.Model):
	request_buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name="request")
	bed = models.IntegerField(blank=False, null=False)
	bath = models.DecimalField(blank=False, null=False, max_digits=2, decimal_places=1)
	sq_ft = models.IntegerField(blank=False, null=False)
	request_neighborhood = models.ForeignKey(Neighborhood, null=True, on_delete=models.SET_NULL, related_name="request")
	budget = models.IntegerField(blank=True, null=True)

class HouseSale(models.Model):
	sale_agent = models.ForeignKey(Agent, null=True, on_delete=models.SET_NULL, related_name="home_sale")
	sale_buyer = models.ForeignKey(Buyer, null=True, on_delete=models.SET_NULL, related_name="home_sale")
	sale_house = models.ForeignKey(House, on_delete=models.CASCADE, related_name="home_sale")
	price = models.IntegerField(null=False)
	date = models.DateField(auto_now_add=True)
	sale_neighborhood = models.ForeignKey(Neighborhood, null=True, on_delete=models.SET_NULL, related_name="home_sale")

	def __str__(self):
		return "{}: {}".format(self.sale_house.address, self.price)

class Conversation(models.Model):
	convo_agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name="convo")
	convo_buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE, related_name="convo")
	convo_request = models.ForeignKey(HouseRequest, on_delete=models.CASCADE, related_name="convo")

class Message(models.Model):
	text = models.CharField(max_length=200)
	created = models.DateTimeField(auto_now_add=True)
	author = models.CharField(max_length=200)
	recipient = models.CharField(max_length=200)
	convo = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="message")



