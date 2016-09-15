from rest_framework import serializers
from django.contrib.auth.models import User
from neighborhood.models import House, Neighborhood, Agent, Buyer, HouseRequest

class NeighborhoodSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Neighborhood
		fields = ("id", "url", "name", "house", "request")

class HouseSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = House
		fields = ("id", "url", "address", "bed", "bath", "sq_ft", "lot_size", "yr_built", "house_agent", "house_buyer", "selling", "image", "house_neighborhood", "last_sold")

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ("id", "url", "username", "password", "first_name", "last_name", "email")

class AgentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Agent
		fields = ("id", "url", "user", "bio", "member_since", "image")

class BuyerSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Buyer
		fields = ("id", "url", "user", "image")

class HouseRequestSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = HouseRequest
		fields = ("id", "url", "request_buyer", "bed", "bath", "sq_ft", "request_neighborhood", "budget")