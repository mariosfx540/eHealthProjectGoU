from django.shortcuts import render
from eHealth.models import Category, Page
from eHealth.bing import run_query
from django.views.decorators.csrf import csrf_exempt
from eHealth.medLine import med_query
from eHealth.myfunctions import text_analysis



@csrf_exempt
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

    all_results = []

    bing_list = []

    medLine_list = []

    healthFinder_list = []

    if request.method == 'POST':
        query = request.POST['query'].strip()

        if query:
            bing_list = run_query(query)
            medLine_list = med_query(query)



    bing_list = text_analysis(bing_list)
    medLine_list = text_analysis(medLine_list)
    #implement HealthFinder when ready!

    context_dic = { 'bing_list': bing_list,
                    'med': medLine_list,
                    'health': healthFinder_list,
                    'all_results': bing_list + medLine_list + healthFinder_list
                    }

    response = render(request,'eHealth/searching.html',context_dic)

    for result in context_dic['med']:
        print result

    return response




def about(request):

    return render(request, 'eHealth/about.html')
