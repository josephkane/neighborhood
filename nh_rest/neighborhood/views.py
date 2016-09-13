from rest_framework import viewsets
from neighborhood.models import House, Neighborhood, Agent, Buyer, Owner
from neighborhood.serializers import HouseSerializer, NeighborhoodSerializer, AgentSerializer, BuyerSerializer, OwnerSerializer

class HousesViewset(viewsets.ModelViewSet):
	queryset = House.objects.all()
	serializer_class = HouseSerializer

class NeighborhoodsViewset(viewsets.ModelViewSet):
	queryset = Neighborhood.objects.all()
	serializer_class = NeighborhoodSerializer

class AgentsViewset(viewsets.ModelViewSet):
	queryset = Agent.objects.all()
	serializer_class = AgentSerializer

class BuyersViewset(viewsets.ModelViewSet):
	queryset = Buyer.objects.all()
	serializer_class = BuyerSerializer

class OwnersViewset(viewsets.ModelViewSet):
	queryset = Owner.objects.all()
	serializer_class = OwnerSerializer
