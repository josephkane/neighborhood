from rest_framework import serializers
from neighborhood.models import House, Neighborhood, Agent, Buyer, Owner

class NeighborhoodSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Neighborhood
		fields = ("id", "url", "name")

class HouseSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = House
		fields = ("id", "url", "address", "bed", "bath", "sq_ft", "lot_size", "yr_built", "house_agent", "selling", "image", "house_neighborhood", "last_sold")

class AgentSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Agent
		fields = ("id", "url", "username", "password", "first_name", "last_name", "email", "bio", "member_since", "image")

class BuyerSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Buyer
		fields = ("id", "url", "username", "password", "first_name", "last_name", "email", "buyer_agent", "budget", "image")

class OwnerSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Owner
		fields = ("id", "url", "username", "password", "first_name", "last_name", "email", "owner_house", "image")
