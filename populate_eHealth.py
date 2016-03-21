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
    #Saved_Page.objects.all().delete()
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
        User.objects.get_by_natural_key("blabla1").delete()
    if (bla2==True):#
        User.objects.get_by_natural_key("blabla2").delete()
    if (bla3==True):
        User.objects.get_by_natural_key("blabla3").delete()
    

    User.objects._create_user(username="blabla1",email="loremipsum1@gmail.com", password="password1", is_staff=True, is_superuser=True)
    User.objects._create_user(username="blabla2",email="loremipsum2@gmail.com", password="password2", is_staff=True, is_superuser=True)
    User.objects._create_user(username="blabla3",email="loremipsum3@gmail.com", password="password3", is_staff=True, is_superuser=True)
    
    print "The following are the usernames... blabla1, blabla2, blabla3"

    
    u1=  User.objects.get_by_natural_key("blabla1")
    u2=  User.objects.get_by_natural_key("blabla2")
    u3=  User.objects.get_by_natural_key("blabla3")
   
    searcher1= add_Searcher(uname="blabla11", pword="password11", em="loremipsum11@gmail.com", nam="u1", sname="lastname1", ag=10, gen='Male', userentity=u1)
    searcher2= add_Searcher(uname="blabla22", pword="password22", em="loremipsu22@gmail.com", nam="u2", sname="lastname2", ag=20, gen='Female', userentity=u2)
    searcher3= add_Searcher(uname="blabla33", pword="password33", em="loremipsum33@gmail.com", nam="u3", sname="lastname3", ag=30, gen='Male', userentity=u3)
    
    #searcher1= add_Searcher(uname="blabla11",  em="loremipsum11@gmail.com", sname="lastname1", ag=10, gen='Male', userentity=u1)
    #searcher2= add_Searcher(uname="blabla22", em="loremipsu22@gmail.com",  sname="lastname2", ag=20, gen='Female', userentity=u2)
    #searcher3= add_Searcher(uname="blabla33", em="loremipsum33@gmail.com",  sname="lastname3", ag=30, gen='Male', userentity=u3)
    


    c1= add_Category(searcher=searcher1, is_pub = True, nam="Category1")
    c2= add_Category(searcher=searcher1, is_pub=True,nam="Category2")
    c3= add_Category(searcher=searcher1, is_pub=True,nam="Category3")
    c4= add_Category(searcher=searcher1, is_pub=True, nam="Category4")
    c5= add_Category(searcher=searcher2, is_pub = True, nam="Category5")
    c6= add_Category(searcher=searcher2, is_pub=True, nam="Category6")
    c7= add_Category(searcher=searcher2, is_pub=True, nam="Category7")
    c8= add_Category(searcher=searcher2, is_pub=True, nam="Category8")
    c9= add_Category(searcher=searcher3, is_pub = True, nam="Category9")
    c10= add_Category(searcher=searcher3, is_pub=True,nam="Category10")
    c11= add_Category(searcher=searcher3, is_pub=True,nam="Category11")
    c12= add_Category(searcher=searcher3, is_pub=True,nam="Category12")

    list=[]
    q=object

    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c1, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c2, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c3, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c4, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c5, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c6, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c7, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c8, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c9, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c10, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c11, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)
    for i in range(10):
        q=add_Page(titl="Page" + str(i), cat=c12, vis=i, link="http://www.google.com", summ="search engine", flesch=5, polarity=6, subjectivity=7)
        list.append(q)   

   
    #counter=1
    #for j in list:
    #    if(counter%3==0):
    #         add_Saved_Page(linker=j, is_pub=False, searcher=searcher3)
    #    if(counter%3==1):
    #         add_Saved_Page(linker=j, is_pub=False, searcher=searcher1)
    #    if(counter%3==2):
    #        add_Saved_Page(linker=j, is_pub=False, searcher=searcher2)
        


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

def add_Category(searcher, is_pub, nam ): # might not need user
    p = Category.objects.get_or_create(user=searcher, name=nam)[0]
    p.is_public=is_pub
   # p.user=userd
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
    print "Starting eHealth population script..."
    populate()