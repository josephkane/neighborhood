from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate
from django.http import HttpResponse, HttpResponseRedirect, Http404, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *

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

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class HouseRequestsViewset(viewsets.ModelViewSet):
    queryset = HouseRequest.objects.all()
    serializer_class = HouseRequestSerializer

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# CREATE A USER
@csrf_exempt
def create_user(request):
    """
        Creates a new Django user object

        Args-http request object
    """

    # loads request body to json and decode into python-readable object
    data = json.loads(request.body.decode())
    print("REGISTER DATA: ", data)

    username =  data["username"]
    password = data["password"]
    email = data["email"]
    first_name = data["first_name"]
    last_name = data["last_name"]

    # create user object
    user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

    # save user to database
    user.save()
    print("USER: ", user)
    # check for user type, create appropriate user
    if data["user_type"] == "agent":
        create_agent(user, data["agent_info"])
    elif data["user_type"] == "buyer":
        create_buyer(user)
    else:
        return HttpResponseBadRequest

    # try to authenticate based on "data" properties
    authenticated_user = authenticate(username=username, password=password)

    # if authenticated_user returns something, login and redirect
    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
        auth_data = json.dumps({"success":success})
        # return http response with result of login attempt as json
        return HttpResponse(auth_data, content_type='application/json')
    # if authenticated_user returns nothing, return 404
    else:
        return Http404

def create_agent(user, agent_info):
    """
        Create new Agent and attach it to specified User

        Args-User url, agent-specific info
    """
    print("NEW AGENT")
    new_agent = Agent.objects.create(
            bio=agent_info["bio"],
            image=agent_info["image"],
            user=user
        )

    new_agent.save()

def create_buyer(user):
    """
        Create new Buyer and attach it to specified User

        Args-User url, buyer-specific info
    """
    print("NEW BUYER")

    new_buyer = Buyer.objects.create(
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

    username = data['username']
    password = data['password']

    # use python authenticate method to verify
    authenticated_user = authenticate(
            username=username,
            password=password
        )
    # if authenticate method returns something, log the user in
    success = True
    if authenticated_user is not None:
        login(request=request, user=authenticated_user)
    # if authenticate method returns nothing, return false
    else:
        success = False

    auth_data = json.dumps({"success":success})
    # return http response with result of login attempt as json
    return HttpResponse(auth_data, content_type='application/json')

# logout user
def logout_view(request):
    """
        Logout current user

        Args-http request object
    """
    logout(request)
    print('user', request.user)
    return HttpResponseRedirect('/')
