from django.conf.urls import url, include
from rest_framework import routers
from neighborhood import views

router = routers.DefaultRouter()
router.register(r'houses', views.HousesViewset)
router.register(r'neighborhoods', views.NeighborhoodsViewset)
router.register(r'agents', views.AgentsViewset)
router.register(r'buyers', views.BuyersViewset)
router.register(r'users', views.UsersViewset)
router.register(r'house_request', views.HouseRequestsViewset)

urlpatterns = [
    url(r'^', include(router.urls)),
	url(r'^login/$', views.login_user, name="login_user"),
	url(r'^create_user/$', views.create_user, name="create_user")
]
