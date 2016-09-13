from rest_framework import serializers
from tracks.models import House, Neighborhood, Agent, Buyer, Owner

class NeighborhoodSerializer(serializers.HyperlinkedModelSerializer):
	model = Neighborhood
	fields = fields = ("id", "url", "name")

class HouseSerializer(serializers.HyperlinkedModelSerializer):
	model = House
	fields = ("id", "url", "address", "bed", "bath", "sq_ft", "lot_size", "yr_built", "agent", "selling", "image", "neighborhood", "last_sold")

class AgentSerializer(serializers.HyperlinkedModelSerializer):
	model = Agent
	fields = ("id", "url", "first_name", "last_name", "email", "bio", "member_since", "image")

class BuyerSerializer(serializers.HyperlinkedModelSerializer):
	model = Buyer
	fields = ("id", "url", "first_name", "last_name", "email", "agent", "budget", "image")

class OwnerSerializer(serializers.HyperlinkedModelSerializer):
	model = Owner
	fields = ("id", "url", "first_name", "last_name", "email", "house", "image")
