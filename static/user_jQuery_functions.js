//This was pretty much taken from http://www.w3schools.com/jquery/jquery_selectors.asp


//$(document).ready(
//    function () {
//        $("#okay").click(function () {
//            //$("#okay").hide();
//            alert("Yo you ");

//        });
//    });

//
function popup() {

    $(".openNewWindow").click(function (e) {
        e.preventDefault();
        //took this online
        var url = $(this).attr('href');
        window.open(url, '_blank');

        $.ajax({
            type: "POST",
            url: "/eHealth/pageClick",
            data: "primarykey=" + this.id,
            success: function () { }
        });

    });
}

function private_public_checkbox() {

    $(".privateVpublic").click(function(){
        var primarykey = this.id.toString();
        var isPublic = 1;
        //$('#a.b.c')
        var query = '#' + primarykey + ".privateVpublic";
        
        //not checked means that the the page is in fact private
        if($(query).is(':checked')){
            //alert('it is now checked');
            isPublic = 1;
        } else {
            isPublic = 0;
        }
        
        $.ajax({
            type: "POST",
            url: "/eHealth/Privacy",
            data: {pk:primarykey, status:isPublic},
            success: function(data){
                //include below?
                //$(".privateVpublic").removeAttr('checked');
            }
        });



    });
}

function apply_checks_privacy_of_pages() {
    $.ajax({
        type: "POST",
        url: "/eHealth/gpages",
        data: {},
        success: function (message) {
            data = $.parseJSON(message);
            key = "";

            for (page = 0; page < data.meta.length; page++) {
                key = "#"+data.meta[page].pagepk.toString();
                key = key + ".privateVpublic";
                //alert(key);
                if (data.meta[page].pagestatus === "true") {
                    $(key).attr('checked', true); 
                } else {
                    $(key).attr('checked', false);
                }
           }

        }
    });
}

$(document).ready(function(){
    //set up
    $(function () {
       // $(".category_deletions").attr("auto-complete", "off");
       // $(".page_deletions").attr("auto-complete", "off");
        $(".category_deletions").removeAttr('checked');
        $(".page_deletions").removeAttr('checked');
        $("#profile_form").hide();
        popup();
        apply_checks_privacy_of_pages();
        private_public_checkbox();
        $(".privateVpublic").removeAttr('checked');
    });//
    
    //on form submissions for the User Profile
    $(function () {
        $('#button_submit_user_info').click(function () {
            // validateForm();
            var info = ""; 
            var random = "";
            random = $('#ageinp').val().toString();
            info = info.concat(random);
            info = info.concat(",");

            random = $('#firstnameinp').val().toString();
            info = info.concat(random);
            info = info.concat(",");

            random = $('#lastnameinp').val();
            info = info.concat(random);
            info = info.concat(",");

            random = $('#usernameinp').val();
            info = info.concat(random);
            info = info.concat(",");

            random = $('#emailinp').val()
            info = info.concat(random);
            info = info.concat(",");

            random = $('#genderinp').val();
            info = info.concat(random);
            
            //alert(info);
            $.ajax({
                type: "POST",
                url: "/eHealth/changeUserInfo",
                data: "information="+info,
                success: function () {
                    //$('#ageinp').val(data.meta[0].ageinp);
                    //$('#firstnameinp').val(data.meta[0].firstnameinp);
                    //$('#lastnameinp').val(data.meta[0].lastnameinp);
                    //$('#usernameinp').val(data.meta[0].usernameinp);
                    //$('#emailinp').val(data.meta[0].emailinp);
                    //$('#genderinp').val(data.meta[0].genderinp);

                    
                    //$('#userINFO').hide();
                   
                    //$('#name_li').text('Name: ' + data.meta[0].firstnameinp + ' ' + data.meta[0].lastnameinp);
                    //$('#username_li').text('Username: ' + data.meta[0].usernameinp);
                    //$('#age_li').text('Age: ' + data.meta[0].ageinp);
                    //$('#email_li').text('Email: ' + data.meta[0].emailinp);
                    //$('#gender_li').text('Gender: ' + data.meta[0].genderinp);
                    $('#profile_form').toggle();
                    location.reload()
                    //try{

                    //} catch (error) {

                    //}
                }
            });

        });
    });

    //for form visibility
    $(function () {
        $('#button_toggle').click(function () {
            var random = "";
            if($('#profile_form').is(':visible')){
                $('#profile_form').toggle();
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/eHealth/getUserInfo",
                    data: "random="+random,
                    success: function (message) {
                        data = $.parseJSON(message);
                        
                        $('#ageinp').val(data.meta[0].ageinp);
                        $('#firstnameinp').val(data.meta[0].firstnameinp);
                        $('#lastnameinp').val(data.meta[0].lastnameinp);
                        $('#usernameinp').val(data.meta[0].usernameinp);
                        $('#emailinp').val(data.meta[0].emailinp);
                        $('#genderinp').val(data.meta[0].genderinp);
                        $('#profile_form').toggle();
                    }//end of success
                });
             }//end of else
        });
    });
    
    //for deleting pages
    $(function () {
        $('#delete_pages_button').click(function () {
            var information = "";
            var categoryInfo = "";
            var counter = 0;
            var category_slug = "";
            $('.page_deletions').each(function () {
                categoryInfo=document.getElementById(this.id).value;
              
                if (document.getElementById(this.id).checked) {
                    
                    information = information.concat(this.id.toString()).concat(",");
                    //disable visibility 
                }
            });
            category_slug = categoryInfo;
            information = information.substring(0, information.length - 1);
            categoryInfo = categoryInfo.concat(",").concat(information);
         //  alert(categoryInfo);

            $.ajax({
                type: "POST",
                url: "/eHealth/deletePage",
                data: "information=" + categoryInfo,
                success: function (message) {
                    $("#pages_on_the_fly").empty();
                    //add in new html code with the JSON Object 
                    data = $.parseJSON(message);

                    var link_a1 = "<li><input type=\"checkbox\" class=\"page_deletions\" id=\"";//+{{savedPage.pk}}+
                    var link_a2 = "\" name=\"delete\" value=\"".concat(category_slug);//+{{category_slug}}+
                    link_a2 = link_a2.concat("\"/>");
                    var jaw = ' <a class="openNewWindow" id="';                   //
                    var jaw2 = "\" href=\""                                        //


                    var link_a = link_a2.concat(jaw);                                //
                    // link_a = "<li><a href=\"";
                    var link_b = "\">";
                    var link_c = "</a>";//
                    var stringer = "";
                    var privacyAdder = "</li>";
                   // $("#saved_pages_list").append("<ul id=\"pages_on_the_fly\"></ul>");
                    for (page = 0; page < data.meta.length; page++) {
                        stringer = link_a;
                        link_a = link_a + data.meta[page].pagepk.toString();           //
                        link_a = link_a + jaw2;                                         //
                        link_a = link_a1.concat(data.meta[page].pagepk.toString()).concat(link_a);
                        // alert(link_a);


                        //alert("status of page"+data.meta[page].pagestatus.toString());
                        if (data.meta[page].pagestatus.toString() === "true") {
                            privacyAdder = " <input type=\"checkbox\" id=\"" + data.meta[page].pagepk.toString() + "\" class=\"privateVpublic\" name=\"private_v_public\" value=\"public\" checked /> " + privacyAdder;
                        } else {
                            privacyAdder = " <input type=\"checkbox\" id=\"" + data.meta[page].pagepk.toString() + "\" class=\"privateVpublic\" name=\"private_v_public\" value=\"public\" /> " + privacyAdder;
                        }
                        link_c = link_c + privacyAdder;


                        $("#pages_on_the_fly").append(link_a.concat(data.meta[page].linkurl).concat(link_b).concat(data.meta[page].name).concat(link_c));
                        link_c = "</a>";
                        privacyAdder = "</li>";
                        link_a = stringer;
                        //console.log(data.meta[page].name);
                        //console.log(data.meta[page].linkurl);
                        //console.log(link_a.concat(data.meta[page].linkurl).concat(link_b).concat(data.meta[page].name).concat(link_c));
                    }
                    popup();
                    private_public_checkbox();
                    console.log("We are here again!");
                    // alert(category_slug)
                }
            });

            



        });

    });
    
    //for deleting categories
    $(function () {
        $("#delete_categories_button").click(function () {
            //  e.preventDefault();
            var categories_for_deletion = "";
            //below taken from StackOverflow user113716
            $('.category_deletions').each(function () {
                if (document.getElementById(this.id).checked) {
                    categories_for_deletion= categories_for_deletion.concat(this.id.toString()).concat(",");
                    //disable visibility 
                }
            });
            categories_for_deletion = categories_for_deletion.substring(0, categories_for_deletion.length - 1);
            // alert(categories_for_deletion);
            //copied from jQuery.com
            $.ajax({
                type: "POST",
                url: "/eHealth/deleteCategory",
                data: "cats_for_deletion=" + categories_for_deletion,
                success: function (data) {
                    //the new list of categories for population
                    message = $.parseJSON(data);
                   
                   //// $("#list_of_categories").empty();
                   // //delete the list of pages, and basically user should click on it again
                   // //$("#div_containing_list_of_categories").empty();
                   // //alert(data);
                   // var insertion = "";
                   // var pk = "";
                   // var name = "";
                   // var slug = "";
                   // $("#div_containing_list_of_categories").append("<ul id=\"list_of_categories\"></ul>");
                   //// alert(message.meta.length);
                   // for (cate = 0; cate < message.meta.length; cate++) {
                   //     //add the html back again
                   //     pk = message.meta[cate].categpk.toString();
                   //     name = message.meta[cate].categname;
                   //     slug = message.meta[cate].categslug;
                   //     insertion.concat("<li><input type=\"checkbox\" class=\"category_deletions\" id=\"");
                   //     insertion.concat(pk);
                   //     insertion.concat("\" name=\"delete\" value=\"");
                   //     insertion.concat(pk);
                   //     insertion.concat("\"/> <a class=\"category_link\" id=\"");
                   //     insertion.concat(slug);
                   //     insertion.concat("\" href=\"#\">");
                   //     insertion.concat(name);
                   //     insertion.concat("</a></li>");
                        
                   //    // insertion = "";
                   // }
                   // $("#list_of_categories").append(insertion);
                    location.reload();
                    //$('.category_deletions').each(function () {
                    //    if (document.getElementById(this.id).checked) {
                    //        //categories_for_deletion = categories_for_deletion.concat(this.id.toString()).concat(";");
                    //        this.hide()
                    //        //disable visibility 
                    //    }
                    //});

                    
                }
            });

        });

    });
         
    //for Adding Categories
    $(function () {
        $('#add_category_button').click(function () {
            jPrompt('Type In The Category Name:', '...', 'Prompt Dialog', function (r) {
                //validateCategory(R);
                console.log(r);
                if (r) {
                    $.ajax({
                        type: "POST",
                        url: "/eHealth/addCategory",
                        data: "categoryName=" + r,
                        success: function (message) {
                            //data = $.parseJSON(message);
                            if (message === r) {
                                jAlert('The category was added!', 'Confirmation');
                            }
                            location.reload();
                        }
                    });
                }
            });
        });
    });
    
    //for Adding Pages
    $(function () {
        var url = "";
        var title = "";
        var catry = "";
        var category_slug = "";
        //var visits = "";
        //is_public = "";
        //var flesch_score ="";
        //var polarity_score ="";
        //var subjectivity_score ="";

        $("#add_page_button").click(function () {
            jPrompt('Enter URL', 'Value goes here!', 'Adding a Page', function (r) {
                if (r) {
                    url = r;
                    jPrompt('Enter Title', 'Value goes here!', 'Adding a Page', function (r) {
                        if (r) {
                            title = r;
                            jPrompt('Enter Category Name. If exact name does not exist, new category added!', 'Value goes here!', 'Adding a Page', function (r) {
                                if (r) {
                                    catry = r.toString();
                                    alert(catry)
                                    $.ajax({
                                        type: "POST",
                                        url: "/eHealth/Page",
                                        data: { link: url, titl: title, categor: catry },
                                        success: function (message) {
                                            $("#pages_on_the_fly").empty();
                                            data = $.parseJSON(message);
                                            category_slug = data.meta[0].category_slug
                                           
                                            //repopulate list
                                            var link_a1 = "<li><input type=\"checkbox\" class=\"page_deletions\" id=\"";//+{{savedPage.pk}}+
                                            var link_a2 = "\" name=\"delete\" value=\"".concat(category_slug);//+{{category_slug}}+
                                            link_a2 = link_a2.concat("\"/>");
                                            var jaw = ' <a class="openNewWindow" id="';                   //
                                            var jaw2 = "\" href=\""                                        //


                                            var link_a = link_a2.concat(jaw);
                                            // link_a = "<li><a href=\"";
                                            var link_b = "\">";
                                            var link_c = "</a>";//
                                            var stringer = "";
                                            var privacyAdder = "</li>";
                                            // $("#saved_pages_list").append("<ul id=\"pages_on_the_fly\"></ul>");
                                            for (page = 0; page < data.meta.length; page++) {
                                                stringer = link_a;
                                                link_a = link_a + data.meta[page].pagepk.toString();           //
                                                link_a = link_a + jaw2;                                         //
                                                link_a = link_a1.concat(data.meta[page].pagepk.toString()).concat(link_a);
                                                // alert(link_a);

                                                //alert("status of page"+data.meta[page].pagestatus.toString());
                                                if (data.meta[page].pagestatus.toString() === "true") {
                                                    privacyAdder = " <input type=\"checkbox\" id=\"" + data.meta[page].pagepk.toString() + "\" class=\"privateVpublic\" name=\"private_v_public\" value=\"public\" checked /> " + privacyAdder;
                                                } else {
                                                    privacyAdder = " <input type=\"checkbox\" id=\"" + data.meta[page].pagepk.toString() + "\" class=\"privateVpublic\" name=\"private_v_public\" value=\"public\" /> " + privacyAdder;
                                                }
                                                link_c = link_c + privacyAdder;


                                                $("#pages_on_the_fly").append(link_a.concat(data.meta[page].linkurl).concat(link_b).concat(data.meta[page].name).concat(link_c));
                                                link_c = "</a>";
                                                privacyAdder = "</li>";
                                                link_a = stringer;
                                                //console.log(data.meta[page].name);
                                                //console.log(data.meta[page].linkurl);
                                                //console.log(link_a.concat(data.meta[page].linkurl).concat(link_b).concat(data.meta[page].name).concat(link_c));
                                            }
                                            popup();
                                            private_public_checkbox();
                                            if (data.meta[0].created === "true") {
                                                var a=data.meta[0].categorypk;//pk
                                                var b=category_slug;//slug
                                                var c=data.meta[0].categoryname;//name
                                                var htML='<li><input type="checkbox" class="category_deletions" id="'+a+'" name="delete" value="'+a+'"/> <a class="category_link" id="'+b+'" href="#">'+c+'</a></li>';

                                                $("#list_of_categories").append(htML);
                                            }

                                        }//,
                                      //  dataType: JSON
                                    });


                                }
                            });
                        }
                    });
                }
            });
        });
    });
    
    //for showing saved pages for a category
    $(function () {
        $(".category_link").click(function () {
            //$("#okay").hide();
            //alert(this.id);
            var category_slug = this.id;
            //console.log("We are here!");

            //alert('okay');
            //window.location.href = "http://127.0.0.1:8000/eHealth/category/";

            //$.get('/eHealth/user/category', { categoryslug: category_slug }, function (data) {
            //    alert(data);
            //});

            $.ajax({
                type: "POST",
                url: "/eHealth/category",
                //below was from Stack Overflow 
                // "category_slug=" + category_slug,
                data: "category_slug=" + category_slug,
                //csrfmiddlewaretoken: getCookie('csrftoken'),
                //dataType:"json",
                success: function (message) {
                    $("#pages_on_the_fly").empty();
                    //add in new html code with the JSON Object 
                    data = $.parseJSON(message);
                    //alert(data.meta[0].name)



                    var link_a1 = "<li><input type=\"checkbox\" class=\"page_deletions\" id=\"";//+{{savedPage.pk}}+
                    var link_a2="\" name=\"delete\" value=\"".concat(category_slug);//+{{category_slug}}+
                    link_a2 = link_a2.concat("\"/>");

                    var jaw = ' <a class="openNewWindow" id="';                   //
                    var jaw2 = "\" href=\""                                        //


                    var link_a = link_a2.concat(jaw);
                     // link_a = "<li><a href=\"";
                    var link_b = "\">";
                    var link_c = "</a>";//
                    var stringer = "";
                    var privacyAdder = "</li>";//
                   // $("#saved_pages_list").append("<ul id=\"pages_on_the_fly\"></ul>");
                    for (page = 0; page < data.meta.length; page++) {
                        stringer = link_a;
                        link_a = link_a + data.meta[page].pagepk.toString();           //
                        link_a = link_a + jaw2;                                         //
                        link_a= link_a1.concat(data.meta[page].pagepk.toString()).concat(link_a);
                        // alert(link_a);

                        //alert("status of page"+data.meta[page].pagestatus.toString());
                        if (data.meta[page].pagestatus.toString() === "true") {
                            privacyAdder = " <input type=\"checkbox\" id=\"" + data.meta[page].pagepk.toString() + "\" class=\"privateVpublic\" name=\"private_v_public\" value=\"public\" checked /> " + privacyAdder;
                        } else {
                            privacyAdder = " <input type=\"checkbox\" id=\"" + data.meta[page].pagepk.toString() + "\" class=\"privateVpublic\" name=\"private_v_public\" value=\"public\" /> " + privacyAdder;
                        }
                        link_c = link_c + privacyAdder;



                        $("#pages_on_the_fly").append(link_a.concat(data.meta[page].linkurl).concat(link_b).concat(data.meta[page].name).concat(link_c));
                        link_c = "</a>";
                        privacyAdder = "</li>";
                        link_a = stringer;


                        //console.log(data.meta[page].name);
                        //console.log(data.meta[page].linkurl);
                        //console.log(link_a.concat(data.meta[page].linkurl).concat(link_b).concat(data.meta[page].name).concat(link_c));
                    }
                    popup();
                    private_public_checkbox();
                    console.log("We are here again!");
                   // alert(category_slug)
                },
                error: function (xhr, errmsg, err) {

                    console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                }

            });

        });
    });


});

function doAlert(message) {
    alert(message);
}


////NOT OUR CODE THIS WAS ON THE DJANGO WEBSITE
////the below function was taken from another place
//    function getCookie(name) {
//        var cookieValue = null;
//        if (document.cookie && document.cookie != '') {
//            var cookies = document.cookie.split(';');
//            for (var i = 0; i < cookies.length; i++) {
//                var cookie = jQuery.trim(cookies[i]);
//                // Does this cookie string begin with the name we want?
//                if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                    break;
//                }
//            }
//        }
//        return cookieValue;
//    }


$(function () {


    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});