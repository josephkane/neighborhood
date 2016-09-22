from django.conf.urls import url, include
from rest_framework import routers
from neighborhood import views

router = routers.DefaultRouter()
router.register(r'houses', views.HousesViewset)
router.register(r'neighborhoods', views.NeighborhoodsViewset)
router.register(r'agents', views.AgentsViewset)
router.register(r'buyers', views.BuyersViewset)
router.register(r'users', views.UsersViewset)
router.register(r'house_requests', views.HouseRequestsViewset)
router.register(r'house_sales', views.HouseSalesViewset)
router.register(r'conversations', views.ConversationsViewset)
router.register(r'messages', views.MessagesViewset)

urlpatterns = [
    url(r'^', include(router.urls)),
	url(r'^login/$', views.login_user, name="login_user"),
	url(r'^logout/$', views.logout_user, name="logout_user"),
	url(r'^register/$', views.register_user, name="register_user"),
	url(r'^create_new_house/$', views.create_new_house, name="create_new_house"),
	url(r'^new_house_request/$', views.new_house_request, name="new_house_request"),
	url(r'^create_new_house/$', views.create_new_house, name="create_new_house"),
	url(r'^create_new_sale/$', views.create_new_sale, name="create_new_sale"),
	url(r'^list_house/$', views.list_house, name="list_house"),
	url(r'^create_new_conversation/$', views.create_new_conversation, name="create_new_conversation"),
	url(r'^create_new_message/$', views.create_new_message, name="create_new_message"),
]
