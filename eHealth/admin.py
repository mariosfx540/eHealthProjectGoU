from django.contrib import admin
from eHealth.models import Category, Page, Saved_Page

# Register your models here.
admin.site.register(Category)
admin.site.register(Page)
admin.site.register(Saved_Page)