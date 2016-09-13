from django.conf.urls import url, include
from rest_framework import routers
from neighborhood import views

router = routers.DefaultRouter()
router.register(r'houses', views.HousesViewset)
router.register(r'neighborhoods', views.NeighborhoodsViewset)
router.register(r'agents', views.AgentsViewset)
router.register(r'buyers', views.BuyersViewset)
router.register(r'owners', views.OwnersViewset)

urlpatterns = [
    url(r'^', include(router.urls)),
]
