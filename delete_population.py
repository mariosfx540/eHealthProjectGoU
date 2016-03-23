import os
import email
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eHealthCaringWeb.settings')

import django
django.setup()

from eHealth.models import * #Searcher, User, Page

class RandomError(Exception):
    pass


def populate():
    Searcher.objects.all().delete()
  #  Saved_Page.objects.all().delete()
    Page.objects.all().delete()
    Category.objects.all().delete()


    #Below is to see if the User models are populated. 
    bla1=False
    bla2=False
    bla3=False

    for oj in User.objects.all():
        if(oj.username=="blabla1"):
            bla1=True
        if(oj.username=="blabla2"):
            bla2=True
        if(oj.username=="blabla3"):
            bla3=True
        print oj.username 
    
    if (bla1==True):
        User.objects.get_by_natural_key("Jill").delete()
    if (bla2==True):
        User.objects.get_by_natural_key("Bob").delete()
    if (bla3==True):
        User.objects.get_by_natural_key("Jen").delete()
    



    #add a page to a category

    ## Print out what we have added to the user.
    #for c in Category.objects.all():
    #    for p in Page.objects.filter(category=c):
    #        print "- {0} - {1}".format(str(c), str(p))
 
def add_Searcher(uname, pword, em, nam, sname, ag, gen, userentity):
    p = Searcher.objects.get_or_create(username=uname, password=pword,age=ag, searcher=userentity)[0]
    p.email=em
    p.name=nam
    p.surname=sname
    p.age=ag
    p.gender=gen
    p.save()
    return p

def add_Category(searcher, is_pub, nam):
    p = Category.objects.get_or_create(user=searcher, name=nam)[0]
    p.is_public=is_pub
    p.save()
    return p

def add_Page(titl, cat, vis, link, summ, flesch, polarity, subjectivity):
    p = Page.objects.get_or_create(category=cat,linkURL=link, title=titl, flesch_score=flesch, polarity_score=polarity, subjectivity_score=subjectivity  )[0]
    p.category=cat
    p.visits=vis
    p.summary=summ
    p.flesch_score=flesch
    p.subjectivity_score=subjectivity
    p.polarity_score=polarity
    p.save()
    return p

#def add_Saved_Page(linker, is_pub, searcher):
#    p = Saved_Page.objects.get_or_create(link=linker, user=searcher)[0]
#    p.is_public=is_pub
#    p.save()
#    return p



# Start execution here!
if __name__ == '__main__':
    print "Starting eHealth DELETION script..."
    populate()