from django.conf.urls import patterns, include, url
from eHealth import views

urlpatterns = (
               url(r'^$', views.index, name="index"),
               url(r'^searching/', views.searching, name='search'),

               )