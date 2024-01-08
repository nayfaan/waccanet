from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet,OwnerList,index

router = DefaultRouter()
router.register('apis', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dataImage/',index),
    path('ownerList/',OwnerList.as_view())
]