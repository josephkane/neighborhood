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

class HousesViewset(viewsets.ModelViewSet):
    queryset = House.objects.all()
    serializer_class = HouseSerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

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

class UsersViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # lookup_field = "username"

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class HouseRequestsViewset(viewsets.ModelViewSet):
    queryset = HouseRequest.objects.all()
    serializer_class = HouseRequestSerializer

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

# logout user
def logout_view(request):
    """
        Logout current user

        Args-http request object
    """
    logout(request)
    print('user', request.user)
    return HttpResponseRedirect('/')

@csrf_exempt
def create_new_house(request):
    """
        Creates a new house with the parameters specified by the user

        Args-http request object
    """

    # loads request body to json and decode into python-readable object
    data = json.loads(request.body.decode())

    # make vars for readability
    # agent = data["agent"]
    address = data["address"]
    bed = data["bed"]
    bath = data["bath"]
    sq_ft = data["sq_ft"]
    lot_size = data["lot_size"]
    yr_built = data["yr_built"]
    # image = data["image"]
    # neighborhood = data["neighborhood"]
    price = data["price"]
    description = data["description"]

    # create new house
    new_house = House.objects.create(
            address = address,
            # house_agent = agent,
            bed = bed,
            bath = bath,
            sq_ft = sq_ft,
            lot_size = lot_size,
            yr_built = yr_built,
            # image = image,
            # house_neighborhood = neighborhood,
            price = price,
            description = description
        )

    # save house to database
    new_house.save()

    new_house = model_to_dict(new_house)

    # house_data = HouseSerializer(new_house, context={"request": request})
    # return http response with result of login attempt as json
    print("NEW_HOUSE: ", new_house)
    print("DUMP: ", json.dumps({"img": str(new_house["image"])}))
    new_house["image"] = str(new_house["image"])
    return_house = json.dumps({"house": new_house})
    return HttpResponse(return_house, content_type='application/json')





