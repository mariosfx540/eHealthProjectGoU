from django.shortcuts import render
from eHealth.models import Category, Page
from eHealth.bing import run_query
from textblob import TextBlob
from textstat.textstat import textstat

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

    healthFinder_list = []

    if request.method == 'POST':
        query = request.POST['query'].strip()

        if query:
            bing_list = run_query(query)

    #results from each API is passed into blob
    #filtered and returns analytics
    for result in bing_list:
        blob = TextBlob(result['summary'])
        for text in blob.sentences:
            result['sent'] = (abs(text.sentiment.polarity*10)/2)
            result['pola'] = (abs(text.sentiment.subjectivity*10)/2)
            result['reada'] = textstat.flesch_kincaid_grade(result['summary'])


    context_dic = { 'bing_list': bing_list,
                    'med': medLine_list,
                    'health': healthFinder_list,
                    'all_results': bing_list + medLine_list + healthFinder_list
                    }

    response = render(request,'eHealth/searching.html',context_dic)

    return response

