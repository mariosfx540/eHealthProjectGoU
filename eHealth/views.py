from django.shortcuts import render
from eHealth.models import Category, Page
from eHealth.bing import run_query
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

    result_list = []

    if request.method == 'POST':
        query = request.POST['query'].strip()

        if query:
            result_list = run_query(query)

    paginator = Paginator(result_list, 10)


    page = request.GET.get('page')
    print page
    try:
        result_list = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        result_list = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        result_list = paginator.page(paginator.num_pages)

    return render(request, 'eHealth/searching.html', {'result_list': result_list})
