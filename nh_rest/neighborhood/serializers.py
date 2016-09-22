from rest_framework import serializers
from django.contrib.auth.models import User
from neighborhood.models import *

class NeighborhoodSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Neighborhood
        fields = ("id", "url", "name", "house", "request")

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("id", "url", "username", "password", "first_name", "last_name", "email")

class AgentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Agent
        fields = ("id", "url", "user", "bio", "member_since", "image", "user_type")

class BuyerSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Buyer
        fields = ("id", "url", "user", "image", "user_type")

class HouseSerializer(serializers.HyperlinkedModelSerializer):
    house_agent = AgentSerializer()
    house_buyer = BuyerSerializer()
    house_neighborhood = NeighborhoodSerializer()

    class Meta:
        model = House
        fields = ("id", "url", "address", "bed", "bath", "sq_ft", "lot_size", "yr_built", "house_agent", "house_buyer", "selling", "image", "house_neighborhood", "last_sold", "price", "description")

class HouseRequestSerializer(serializers.HyperlinkedModelSerializer):
    request_buyer = BuyerSerializer()
    request_neighborhood = NeighborhoodSerializer()

    class Meta:
        model = HouseRequest
        fields = ("id", "url", "request_buyer", "bed", "bath", "sq_ft", "request_neighborhood", "budget")

class HouseSaleSerializer(serializers.HyperlinkedModelSerializer):
    sale_agent = AgentSerializer()
    sale_buyer = BuyerSerializer()
    sale_house = HouseSerializer()
    sale_neighborhood = NeighborhoodSerializer()

    class Meta:
       model = HouseSale
       fields = ("id", "url", "sale_agent", "sale_buyer", "sale_house", "price", "date", "sale_neighborhood")

class ConversationSerializer(serializers.HyperlinkedModelSerializer):
    convo_agent = AgentSerializer()
    convo_buyer = BuyerSerializer()
    convo_request = HouseRequestSerializer()

    class Meta:
        model = Conversation
        fields = ("id", "url", "convo_agent", "convo_buyer", "convo_request", "message")

class MessageSerializer(serializers.HyperlinkedModelSerializer):
    convo = ConversationSerializer()

    class Meta:
        model = Message
        fields = ("id", "url", "convo", "text", "created", "author", "recipient")
