from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet

router = DefaultRouter()
router.register('propertiesGetAll', PropertyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
