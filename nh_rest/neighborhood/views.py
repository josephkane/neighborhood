from django.conf import settings
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from django.core import serializers

import json
import datetime

class HousesViewset(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
            Optionally restricts the returned purchases to a given user,
            by filtering against a `username` query parameter in the URL.
        """
        queryset = House.objects.all()
        agent_id = self.request.query_params.get('agent_id', None)
        buyer_id = self.request.query_params.get('buyer_id', None)
        selling = self.request.query_params.get('selling', None)

        if agent_id is not None:
            queryset = queryset.filter(house_agent__id = agent_id)
        if buyer_id is not None:
            queryset = queryset.filter(house_buyer__id = buyer_id)
        elif selling is not None:
            queryset = queryset.filter(selling = selling)
        return queryset

class NeighborhoodsViewset(viewsets.ModelViewSet):
    queryset = Neighborhood.objects.all()
    serializer_class = NeighborhoodSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class AgentsViewset(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class BuyersViewset(viewsets.ModelViewSet):
    queryset = Buyer.objects.all()
    serializer_class = BuyerSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Buyer.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        if user_id is not None:
            queryset = queryset.filter(user__id = user_id)
        return queryset

class UsersViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class HouseRequestsViewset(viewsets.ModelViewSet):
    queryset = HouseRequest.objects.all()
    serializer_class = HouseRequestSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
            Optionally restricts the returned purchases to a given user,
            by filtering against a `username` query parameter in the URL.
        """
        queryset = HouseRequest.objects.all()
        buyer_id = self.request.query_params.get('buyer_id', None)
        if buyer_id is not None:
            queryset = queryset.filter(request_buyer__id = buyer_id)
        return queryset

class HouseSalesViewset(viewsets.ModelViewSet):
    queryset = HouseSale.objects.all()
    serializer_class = HouseSaleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class ConversationsViewset(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Conversation.objects.all()
        recipient = self.request.query_params.get('recipient', None)
        if recipient is not None:
            queryset = queryset.filter(message__recipient = recipient)
        return queryset

class MessagesViewset(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


# CREATE A USER
@csrf_exempt
def register_user(request):
    """
        Creates a new Django user object

        Args-http request object
    """

    # loads request body to json and decode into python-readable object
    data = json.loads(request.body.decode())
    print("DATA: ", data)

    username =  data["username"]
    password = data["password"]
    email = data["email"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    image = data["image"]

    # create user object
    user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

    # save user to database
    user.save()
    # check for user type, create appropriate user
    if data["user_type"] == "agent":
        create_agent(user, data["bio"], data["image"])
    elif data["user_type"] == "buyer":
        create_buyer(user, data["image"])
    else:
        return HttpResponseBadRequest

    # try to authenticate based on "data" properties
    authenticated_user = authenticate(username=username, password=password)

    # if authenticated_user returns something, login and redirect
    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
        # get additional data of logged-in user
        if data["user_type"] == "agent":
            add_info = Agent.objects.get(user=authenticated_user)
        else:
            add_info = Buyer.objects.get(user=authenticated_user)

        the_user = serializers.serialize('json', (authenticated_user, add_info))
        # return http response with result of login attempt as json
        return HttpResponse(the_user, content_type='application/json')
    # if authenticated_user returns nothing, return 404
    else:
        return Http404

def create_agent(user, bio, image):
    """
        Create new Agent and attach it to specified User

        Args-User url, agent-specific info
    """
    print("NEW AGENT")
    new_agent = Agent.objects.create(
            bio=bio,
            image=image,
            user=user
        )

    new_agent.save()

def create_buyer(user, image):
    """
        Create new Buyer and attach it to specified User

        Args-User url, buyer-specific info
    """
    print("NEW BUYER")

    new_buyer = Buyer.objects.create(
            image=image,
            user=user
        )

    new_buyer.save()


# login existing user
@csrf_exempt
def login_user(request):
    """
        Logs in user

        Args-http request object
    """

    # loads request body to json and decode into python-readable object
    data = json.loads(request.body.decode())

    # use python authenticate method to verify
    authenticated_user = authenticate(
            username=data['username'],
            password=data['password']
        )
    # if authenticate method returns something, log the user in
    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
    # if authenticate method returns nothing, return false
    else:
        success = False


    if data["user_type"] == "agent":
        add_info = Agent.objects.get(user=authenticated_user)
    else:
        add_info = Buyer.objects.get(user=authenticated_user)

    the_user = serializers.serialize('json', (authenticated_user, add_info))
    # return http response with result of login attempt as json
    return HttpResponse(the_user, content_type='application/json')

@csrf_exempt
def logout_user(request):
    """
        Logout current user

        Args-http request object
    """
    logout(request)
    print('user', request.user)
    return HttpResponse


@csrf_exempt
def new_house_request(request):
    """
        Creates a new house request

        Args-http request object
    """

    # decode request object
    data = json.loads(request.body.decode())

    # make vars for readability
    bed = data["bed"]
    bath = data["bath"]
    sq_ft = data["sq_ft"]
    budget = data["budget"]
    neighborhood = Neighborhood.objects.get(pk=data["neighborhood"]["id"])
    buyer = Buyer.objects.get(pk=data["buyer"]["pk"])

    # make new house request
    new_request = HouseRequest.objects.create(
        bed=bed,
        bath=bath,
        sq_ft=sq_ft,
        budget=budget,
        request_neighborhood=neighborhood,
        request_buyer=buyer
    )

    # save to database
    new_request.save()

    # serialize new request
    the_request = serializers.serialize("json", (new_request,))
    # return newly created house request
    return HttpResponse(the_request, content_type='application/json')

@csrf_exempt
def create_new_house(request):
    """
        Creates new house (currently only possible for agents)

        Args-http request object
    """

    # decode request object
    data = json.loads(request.body.decode())

    # make vars for readability
    address = data["address"]
    bed = data["bed"]
    bath = data["bath"]
    sq_ft = data["sq_ft"]
    lot_size = data["lot_size"]
    yr_built = data["yr_built"]
    price = data["price"]
    image = data["image"]
    description = data["description"]
    house_neighborhood = Neighborhood.objects.get(pk=data["neighborhood"]["id"])
    house_agent = Agent.objects.get(pk=data["agent"]["pk"])

    # make new house request
    new_house = House.objects.create(
        address=address,
        bed=bed,
        bath=bath,
        sq_ft=sq_ft,
        lot_size=lot_size,
        yr_built=yr_built,
        price=price,
        image=image,
        description=description,
        house_neighborhood=house_neighborhood,
        house_agent=house_agent
    )

    # save to database
    new_house.save()

    # serialize new request
    the_house = serializers.serialize("json", (new_house,))
    # return newly created house
    return HttpResponse(the_house, content_type='application/json')

@csrf_exempt
def create_new_sale(request):
    """
        Creates new house sale (currently only possible for buyers)

        Args-http request object
    """

    # decode request object
    data = json.loads(request.body.decode())

    # make vars for readability
    agent = Agent.objects.get(pk=data["house"]["house_agent"]["id"])
    buyer = Buyer.objects.get(pk=data["buyer"])
    house = House.objects.get(pk=data["house"]["id"])
    neighborhood = Neighborhood.objects.get(pk=data["house"]["house_neighborhood"]["id"])
    price = data["house"]["price"]

    # create new sale record
    new_sale = HouseSale.objects.create(
        sale_agent=agent,
        sale_buyer=buyer,
        sale_house=house,
        sale_neighborhood=neighborhood,
        price=price
    )

    # save to database
    new_sale.save()
    # print("DATE: ", datetime.date.today())

    # modify house instance
    house.house_agent = None
    house.house_buyer = buyer
    house.selling = False
    house.last_sold = datetime.date.today()

    # save modified house instance to database
    house.save()

    # serialize new sale
    the_sale = serializers.serialize("json", (new_sale,))
    # return newly created house sale
    return HttpResponse(the_sale, content_type='application/json')

@csrf_exempt
def list_house(request):
    """
        Lists a house for sale (currently only possible for buyers)

        Args-http request object
    """

    # decode request object
    data = json.loads(request.body.decode())

    # make vars for readability
    house = House.objects.get(pk=data["house"])
    agent = Agent.objects.get(pk=data["agent"])
    price = data["price"]

    # modify house instance
    house.house_agent = agent
    house.selling = True
    house.price = price

    # save modified house instance to database
    house.save()

    # serialize new listed house
    the_listing = serializers.serialize("json", (house,))
    # return newly modified/listed house
    return HttpResponse(the_listing, content_type='application/json')

@csrf_exempt
def create_new_conversation(request):
    data = json.loads(request.body.decode())

    agent = Agent.objects.get(pk=data["agent"])
    buyer = Buyer.objects.get(pk=data["buyer"])
    request = HouseRequest.objects.get(pk=data["request"])
    author = data["author"]
    recipient = data["recipient"]
    text = data["text"]

    new_convo = Conversation.objects.create(
        convo_agent=agent,
        convo_buyer=buyer,
        convo_request=request
    )

    new_convo.save()

    new_message = Message.objects.create(
        author=author,
        recipient=recipient,
        text=text,
        convo=new_convo
    )

    new_message.save()

    the_convo_and_message = serializers.serialize("json", (new_convo, new_message))
    return HttpResponse(the_convo_and_message, content_type='application/json')

@csrf_exempt
def create_new_message(request):
    data = json.loads(request.body.decode())

    author = author["author"],
    recipient = data["recipient"]
    text = data["text"]
    convo = Conversation.objects.get(pk=data["convo"])

    new_message = Message.objects.create(
        author=author,
        recipient=recipient,
        text=text,
        convo=new_convo
    )

    new_message.save()

    the_message = serializers.serialize("json", (new_message,))
    return HttpResponse(the_message, content_type='application/json')
