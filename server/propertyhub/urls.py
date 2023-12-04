from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet,OwnerList

router = DefaultRouter()
router.register('propertiesInfo', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ownerList/',OwnerList.as_view())
]