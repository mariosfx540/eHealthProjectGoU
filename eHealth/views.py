from django.shortcuts import render
from eHealth.models import Category, Page



def index(request):

    context_dict={}

    context_dict['pages'] = ["www.mimis.com", "www.poyias.com"]

    response = render(request, 'eHealth/index.html', context_dict)

    return response




def category(request, slug_name):
    context_dict = {}


    try:
        category = Category.obects.get(slug = slug_name)
        context_dict['category_name'] = category.name

        context_dict['category'] = category

        context_dict['slug'] = slug_name

    except Category.DoesNotExists:
        pass

    return render(request, 'eHealth/category.html', context_dict)


def searching(request):

    context_dict = {}

    return render(request, 'eHealth/searching.html', context_dict)