from django.shortcuts import render
from eHealth.models import Category, Page
from eHealth.bing import run_query
from eHealth.medLine import med_query
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


def index(request):

    context_dict={}

    context_dict['pages'] = ["www.mimis.com", "www.poyias.com"]

    response = render(request, 'eHealth/index.html', context_dict)

    return response




def category(request, slug_name):
    context_dict = {}


    try:
        category = Category.objects.get(slug = slug_name)


        context_dict['category_name'] = category.name

        context_dict['category'] = category

        context_dict['slug'] = slug_name

    except Category.DoesNotExists:
        pass

    return render(request, 'eHealth/category.html', context_dict)


def searching(request):
    bing_list = []

    medLine_list = []


    if request.method == 'POST':
        query = request.POST['query'].strip()

        if query:
            bing_list = run_query(query)


    healthFinder_list = []


    context_dic = { 'bing_list': bing_list,
                    'med': medLine_list,
                    'health': healthFinder_list,
                    'all_results': bing_list + medLine_list + healthFinder_list
                    }

    response = render(request,'eHealth/searching.html',context_dic)

    return response

