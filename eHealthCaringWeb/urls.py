from django.conf.urls import patterns, include, url
from django.contrib import admin
from registration.backends.simple.views import RegistrationView


urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    url(r'^eHealth/', include('eHealth.urls')),

)
