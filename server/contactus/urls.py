from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('create-inquiry/',views.create_inquiry),
    path('retrieve-inquiry/',views.retrieve_inquiry),
]
urlpatterns = format_suffix_patterns(urlpatterns)