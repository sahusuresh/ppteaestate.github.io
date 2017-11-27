/** API Reference 
   Owl carousel -  http://www.owlcarousel.owlgraphic.com/docs/started-welcome.html
   Bootstrap - http://getbootstrap.com/javascript/
   Magnific Popup - http://dimsemenov.com/plugins/magnific-popup/documentation.html
   SmartMenus - http://www.smartmenus.org/docs/

   */
   /** --------------- DO NOT EDIT BELOW THIS LINE --------------- */

   /* deferred video/iframe/img until after the initial pageload  */
   function deferload() {
    $.each($("iframe , img , source"), function(n, i) {
        var t = $(this).data('src');
        $(this).attr("src", t);
    });
}

/* if the desktop menu is a hamburger by default  - use hamburgerdropdesktop() else hamburgerdrop() */
function hamburgerdropdesktop(elemclick, target) {
    if (elemclick.length) {
        $(elemclick).click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();

            /* toggle expanded target */
            $('.expand').map(function(index) {
                if ($(this)[0] !== $(target)[0]) {
                    $(this).toggleClass('expand').stop(true, true).animate({
                        top: "toggle",
                        opacity: "toggle"
                    }, 300);
                }
            });
            /* toggle open elemclick */
            $('.open').map(function(index) {
                if ($(this)[0] !== $(elemclick)[0]) {
                    $(this).toggleClass('open');
                }
            });

            /* toggle hamburger */
            $(this).toggleClass('open');
            $(target).toggleClass('expand').stop(true, true).animate({
                left: "toggle",
                opacity: "toggle"
            }, 300);
        });
    }
    /* not target click handle */
    // $(document).click(function(e) {
    //     if ($(target).is(":visible") && !$(target).is(e.target)) {
    //         $(elemclick).toggleClass('open');
    //         $(target).toggleClass('expand').stop(true, true).animate({
    //             top: "toggle",
    //             opacity: "toggle"
    //         }, 300);
    //     }
    // });
    /* stop propagation */
    $(target).click(function(e) {
        e.stopPropagation();
    });
}

/* activate hamburger navigation */
function hamburgerdrop(elemclick, target) {
    if (elemclick.length) {
        $(elemclick).click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            /* toggle expanded target */
            $('.expand').map(function(index) {
                if ($(this)[0] !== $(target)[0]) {
                    $(this).toggleClass('expand').stop(true, true).animate({
                        top: "toggle",
                        opacity: "toggle"
                    }, 300);
                }
            });
            /* toggle open elemclick */
            $('.open').map(function(index) {
                if ($(this)[0] !== $(elemclick)[0]) {
                    $(this).toggleClass('open');
                }
            });

            /* toggle hamburger */
            $(this).toggleClass('open');
            $(target).toggleClass('expand').stop(true, true).animate({
                top: "toggle",
                opacity: "toggle"
            }, 300);

        });
    }
}

/* owls on required devices only */
function owlsonrequireddevicesonly(elem, breakpoint, args) {
    if ($(elem)[0]) {
        var s = $(elem);
        if (window.innerWidth < breakpoint) {
            s.owlCarousel(args)
        } else s.addClass("off");
        // destroy owl carousel on resize
        $(window).resize(function(e) {
            if (window.innerWidth < breakpoint) {
                if ($(elem).hasClass("off")) {
                    s.owlCarousel(args);
                    s.removeClass("off")
                }
            } else $(elem).hasClass("off") || (s.addClass("off").trigger("destroy.owl.carousel"), s.find(".owl-stage-outer").children(":eq(0)").unwrap())
        })
    }
}

/* synced owl */
function syncedowl(bigimages, thumbs, bigimagesargs, thumbsargs) {
    /* synced carousel */
    var $sync1 = $(bigimages),
    $sync2 = $(thumbs),
    flag = false,
    duration = 300;
    $sync1.owlCarousel(bigimagesargs); /* parsing args */
    $sync1.owlCarousel({
        onChanged: syncPosition
    })
    .on('changed.owl.carousel', function(e) {
        if (!flag) {
            flag = true;
            $sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
            flag = false;
        }
    });
    $sync2.owlCarousel(thumbsargs); /* parsing args */
    $sync2.owlCarousel({
        onInitialized: function() {
            $sync2.find(".owl-item").eq(0).addClass('synced');
        }
    })
    .on('click', '.owl-item', function() {
        $sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
    })
    .on('changed.owl.carousel', function(e) {
        if (!flag) {
            flag = true;
            $sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
            flag = false;
        }
    });

    /* magnific popup */
    $(bigimages).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    /* sync position */
    function syncPosition(el) {

        var current = el.page.index;
        $sync2
        .find(".owl-item").removeClass('synced').eq(current).addClass('synced');
        if ($("#sync2").data("owlCarousel") !== undefined) {
            center(current)
        }
    }
}

/* --------------- DO NOT EDIT ABOVE THIS LINE --------------- */

/* loading different resources for mobile and desktop users */

if (window.matchMedia("(min-width: 1200px)").matches) {
    /* the view port is at least 1200 pixels wide */
} else {
    /* the view port is less than 1200 pixels wide */
}

/* create your functions here */

/* ------------------------- executes when complete page is fully loaded ----------------------------- */

function loadgmap( mapdata,locDiv){
    var locations = mapdata;

    var map = new google.maps.Map(document.getElementById(locDiv), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        disableDefaultUI: false,
        styles : [{"featureType":"all","elementType":"all","stylers":[{"hue":"#00ffbc"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-70}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
    });
    var infowindow  = new google.maps.InfoWindow();
    var bounds      = new google.maps.LatLngBounds();
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon: locations[i][4],
            animation: google.maps.Animation.DROP,
            map: map
        });

        bounds.extend(marker.position);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));

        map.fitBounds(bounds);

        var listener = google.maps.event.addListener(map, "idle", function() { 
            if (map.getZoom() > 16) map.setZoom(16); 
            google.maps.event.removeListener(listener); 
        });

    }
    google.maps.event.addDomListener(window, "resize", function () {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    google.maps.event.addListener(map, 'click', function(event){
      this.setOptions({scrollwheel:true});
    });
}

// Scroll to element using loc url ID =
function select_location_drop( locSrc ){
    var curUrl  =   locSrc;

    if( curUrl.indexOf("=") != false ){
        var getLastID   = curUrl.split("=");
        var idss = $("#"+getLastID[1]);
        // scroll to form
        setTimeout(function(){ 
            $('html, body').animate({ scrollTop: $(idss).offset().top }, 'slow');
            return false;
        }, 300);
    }

};


$(window).load(function(e) {
    /* datepicker */
    if ($('.response-field-datepicker input').length) {
        $('.response-field-datepicker input').datepicker();
    }

    /* smart menu */
    if ($('#main-menu').length) {
        $("#main-menu").smartmenus({
            subIndicators: true,
            subIndicatorsText: '',
        }).bind("click.smapi", function(e, t) {
            var n = $(this).data("smartmenus");
            if (n.isCollapsible()) {
                var i = $(t);
                o = i.dataSM("sub");
                if (o && !o.is(":visible")) return n.itemActivate(i, !0), !1
            }
    });
    }
    /* hamburger menu toggle */
    if ($('.menu-toggle').length) {
        $('.menu-toggle').click(function() {
            $(this).toggleClass('open');
        });
    }

    /* create var */
    var html = "";
    var video = "";
    var vids = [];
    var player = [];
    var description = "";
    var toptext = "";
    var maintext = "";
    var bottomtext = "";
    var target = "";
    var text_pos = "";
    var link_start  =   "";
    var link_end    =   "";
    /* ---------- array check & create html slides - responsive ---------- */
    if (typeof imageArray != 'undefined') {
        for (var i = 1; i < imageArray.length; i++) {
            /* check for the video url and include it in the slider */
            if (imageArray[i]['videourl'] != '') {
                video = '<video data-id="' + i + '" id="videoid_' + i + '" class="video-js" controls crossorigin>' +
                '<source src="' + imageArray[i]['videourl'] + '" type="' + imageArray[i]['videotype'] + '">' +
                '</video>';

                /*collect video id's in to an array */
                vids[i] = "videoid_" + i;

            }


        // Dear Backend developers
        // description can have mid, left, center and right classes so they will place accordingly
        /* check for the link  */
        if (imageArray[i]['toptext'] != '') {
            toptext = '<span class="toptext">' + imageArray[i]['toptext'] + '</span>';
        }


        if (imageArray[i]['maintext'] != '') {
            maintext = '<span class="maintext">' + imageArray[i]['maintext'] + '</span>';
        }

        if (imageArray[i]['bottomtext'] != '') {
            bottomtext = '<span class="bottomtext clearfix">' + imageArray[i]['bottomtext'] + '</span>';
        }

        /* check for the title & description */
        if (imageArray[i]['toptext'] != '') {
            description = '<div class="description ' + target + '">' + toptext + maintext + bottomtext + '</div>';
        }

        html += '<div class="item">' + video +
        '<picture>' +
        '<source media="(max-width: 768px)" srcset="' + imageArray[i]['mobileimgurl'] + '">' +
        '<img class="img-responsive" src="' + imageArray[i]['desktopimgurl'] + '" alt="' + imageArray[i]['alt'] + '" title="' + imageArray[i]['title'] + '">' +
        '</picture>' + description +
        '</div>';

        /* unset var */
        video = '';
        description = '';
        toptext = '';
        maintext = "";
        bottomtext = "";
        target = '';
        text_pos        = '';
        link_start      = '';
        link_end        = '';
    }
}

/* ---------- array check & create html slides for fullscreen ---------- */
if (typeof imageArrayfullscreen != 'undefined') {
    for (var i = 1; i < imageArrayfullscreen.length; i++) {
        /* check for the video url and include it in the slider */
        if ( imageArrayfullscreen[i]['imagelinks'] != '') {
            link_start =   '<a href="'+imageArrayfullscreen[i]['imagelinks']+'" target="'+ imageArrayfullscreen[i]['target'] +'">'
            link_end   =    '</a>';
        }

        if (imageArrayfullscreen[i]['videourl'] != '') {
            video = '<video data-id="' + i + '" id="videoid_' + i + '" class="video-js" controls crossorigin>' +
            '<source src="' + imageArrayfullscreen[i]['videourl'] + '" type="' + imageArrayfullscreen[i]['videotype'] + '">' +
            '</video>';

            /*collect video id's in to an array */
            vids[i] = "videoid_" + i;
        }

        /* check for the link  */
        if (imageArrayfullscreen[i]['toptext'] != '') {
            toptext = '<span class="main-text">' + imageArrayfullscreen[i]['toptext'] + '</span>';
        }

        if (imageArrayfullscreen[i]['text_pos'] != '') {
            text_pos = imageArrayfullscreen[i]['text_pos'];
        }

        if (imageArrayfullscreen[i]['maintext'] != '') {
            maintext = '<span class="main-text">' + imageArrayfullscreen[i]['maintext'] + '</span>';
        }

        if (imageArrayfullscreen[i]['bottomtext'] != '') {
            bottomtext = '<span class="bottom-text">' + imageArrayfullscreen[i]['bottomtext'] + '</span>';
        }

        /* check for the title & description */
        description = '<div class="description '+ text_pos +'">' + toptext + maintext + bottomtext + '</div>';


        html += link_start+'<div class="item" style="background-image: url(' + imageArrayfullscreen[i]['desktopimgurl'] + ')">' + video +
        '<img class="img-responsive" src="' + imageArrayfullscreen[i]['mobileimgurl'] + '" alt="' + imageArrayfullscreen[i]['alt'] + '" title="' + imageArrayfullscreen[i]['title'] + '">' + description +
        '</div>'+link_end;

        /* unset var */
        video = '';
        description = '';
        toptext = '';
        maintext = "";
        bottomtext = "";
        target = '';
        text_pos        = '';
        link_start      = '';
        link_end        = '';
    }
}
/* carousel args */

args = {
    items: 1,
    autoplay: !0,
    loop: !0,
    dots: !1,
    animateOut: "fadeOut",
    onChanged: function(event) {
        /* init videojs */
        if (vids.length) {
            $.each(vids, function(key, value) {
                if (value) {
                    player[key] = videojs(value);
                }

            });
        }

        /* loading different resources for mobile and desktop users */
        if (window.matchMedia("(max-width: 992px)").matches) {
            /* stop all playing videos*/
            $("video").each(function() {
                $(this).get(0).pause();
            });
            /* trigger autoplay */
            $(event.target).trigger('play.owl.autoplay');

        } else {

            var Obj = $(event.target).find(".owl-item").eq(event.item.index).has('video');
            /*check for the video*/
            if (Obj.length) {
                /*stop owl if video */
                $(event.target).trigger('stop.owl.autoplay');

                /* stop all playing videos*/
                $("video").each(function() {
                    $(this).get(0).pause();
                });

                /*play video*/
                var objectid = Obj.find('video').data('id');
                player[objectid].play().on('ended', function() {
                    /* trigger autoplay */
                    $(event.target).trigger('play.owl.autoplay');
                });
            } else {
                /* trigger autoplay */
                $(event.target).trigger('play.owl.autoplay');
            }
            Obj = '';
        }
    }
}
/* init slider */
if ($('#eme-slider').length) {
    $('#eme-slider').append(html).owlCarousel(args);
}
/* defer loading */
deferload();
leftnavoffset();

});

/* ------------------- executes when the html document is loaded and the dom is ready ---------------- */

$(document).ready(function(e) {

    // redirect news post type page to news html page
    var newsUrl =   'http://'+window.location.hostname+'/news';
    var siteUrl = window.location.href;
    if ( window.location.href== newsUrl ) {
        window.location.href = newsUrl+".html";
    }
    // redirect CSR post type page to news html page
    var newsUrl =   'http://'+window.location.hostname+'/csr';
    var siteUrl = window.location.href;
    if ( window.location.href== newsUrl ) {
        window.location.href = newsUrl+".html";
    }

    /* main navigation */
    hamburgerdropdesktop('.mainmenutoggle', '.main-menu-container');
    /* left navigation */
    hamburgerdrop('.activate-leftnav', '.list-group');
    /* owls on required devices only */
    /*(landscape phones, less than 768px)*/
    var breakpoint = 1200;
    e = {
        loop: !1,
        margin: 1,
        responsive: {
            0: {
                dots: !1,
                items: 1
            },
            768: {
                dots: !1,
                items: 3
            },
            992: {
                dots: !1,
                items: 4
            },
            1200: {
                dots: !1,
                items: 6
            }
        }
    }
        /** @param
        0 - elem id / elem class
        1 - breakpoint where you want carousel
        2 - carousel args
        */
        owlsonrequireddevicesonly("#valley", breakpoint, e);

        /* if synced carousel available only */
        b = {
            items: 1,
            dots: !1
        }
        t = {
            items: 5,
            margin: 1,
            responsive: {
                0: {
                    dots: !0
                },
            // breakpoint from 1200 up
            1200: {
                dots: !1
            }
        }
    }

    /** @param
        0 - elem id / elem class - big images
        1 - elem id / elem class - thumb images
        2 - big images carousel args
        3 - thumbs carousel args
        */
        syncedowl("#big-images", "#thumbs", b, t);
    });

$(function() {

    args = {
        items: 1,
        autoplay: !0,
        dots: !1,
        nav: 0,
        navText: ["<span>prev</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-left'></use></svg>", "<span>next</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-right'></use></svg>"],
        animateOut: "fadeOut",
        responsive: {
            0: {
                dots: !1,
                items: 1
            },
            768: {
                dots: !1,
                items: 2
            },
            992: {
                dots: !1,
                items: 2
            }
        }
    }
    $('#teas-carousel').owlCarousel(args)
});

$(function() {

    args = {
        items: 1,
        autoplay: !0,
        loop: !0,
        dots: !1,
        margin: 1,
        nav: !0,
        navText: ["<span>prev</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-left'></use></svg>", "<span>next</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-right'></use></svg>"],
        animateOut: "fadeOut",
        responsive: {
            0: {
                dots: !1,
                items: 1
            },
            768: {
                dots: !1,
                items: 3
            },
            992: {
                dots: !1,
                items: 4
            },
            1200: {
                dots: !1,
                items: 5
            }
        }
    }
    $('.award-n-certification-carousel').owlCarousel(args)
});

$(function() {

  $('#my-carousel').on('initialized.owl.carousel', function() {
    $('.navigator').eq(0).addClass('active');
});
  
  $('#my-carousel').owlCarousel({
    loop : true,
    autoplay : false,
    autoplayTimeout : 3000,
    margin: 15,
    nav : true,
    navText: ["<span>prev</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-left'></use></svg>", "<span>next</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-right'></use></svg>"],
    singleItem: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

  $('#my-carousel').on('changed.owl.carousel', function(ev) {
    var item_index = ev.page.index;
    $('.navigator').removeClass('active').eq(item_index).addClass('active');
});

  $('.navigator').on('click', function() {
    var item_no = $(this).data('item'); 
    $('#my-carousel').trigger('to.owl.carousel', item_no, 1000);
});
});

// awards page carousels
$(function () {
    var breakpoint = 1200;
    e = {
        loop: !1,
        margin: 1,
        responsive: {
            0: {
                dots: !1,
                items: 1
            },
            768: {
                dots: !1,
                items: 2
            },
            992: {
                dots: !1,
                items: 2
            },
            1200: {
                dots: !1,
                items: 3
            }
        }
    }
        /** @param
        0 - elem id / elem class
        1 - breakpoint where you want carousel
        2 - carousel args
        */
        owlsonrequireddevicesonly(".awards-page-carousels", breakpoint, e);
    });

// listing page carousels
$(function () {
    var breakpoint = 1200;
    e = {
        loop: !1,
        margin: 1,
        responsive: {
            0: {
                dots: !1,
                items: 1
            },
            768: {
                dots: !1,
                margin: 25,
                items: 2
            },
            992: {
                dots: !1,
                margin: 25,
                items: 3
            },
            1200: {
                dots: !1,
                items: 3
            }
        }
    }
        /** @param
        0 - elem id / elem class
        1 - breakpoint where you want carousel
        2 - carousel args
        */
        owlsonrequireddevicesonly(".listing-page-carousels", breakpoint, e);
    });
/* ------------------------- executes when page scroll ----------------------------- */
$(window).scroll(function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = $('#eme-slider').height() - 90;             
    // set to whatever you want it to be

    if(y_scroll_pos > scroll_pos_test) {
       $('.header-top-contents').addClass('scrolled-menu');
   }
   else
   {
    $('.header-top-contents').removeClass('scrolled-menu');
}
});
$(function() {
    $('.load-more').on('click', function() {
        $('.hide-mobile').show();
        $(this).hide();
    });
});

// valley page video carousel

$(function() {
    $('.v-carousel').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        video:true,
        lazyLoad:true,
        nav : true,
        navText: ["<span>prev</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-left'></use></svg>", "<span>next</span><svg class='' width='65' height='12' aria-hidden='true'><use xmlns:xlink='http://www.w3.org/1999/xlink' xlink:href='#arrow-right'></use></svg>"]
    });

    $('.v-carousel').on('changed.owl.carousel', function(ev) {
        var item_index = ev.page.index;
        $('.navigator').removeClass('active').eq(item_index).addClass('active');
    });

    $('.navigator').on('click', function() {
        var item_no = $(this).data('item'); 
        $('.v-carousel').trigger('to.owl.carousel', item_no, 1000);
    });
});

function leftnavoffset() {
    if ($('.activate-leftnav').length) {
        var windowWidth = $(window).width();
        if(windowWidth > 768){
            var last_bread = $('.activate-leftnav').offset().left;
            var first_bread = $('.breadcrumb').offset().left;

            var my_left = (last_bread - first_bread)+5;
            $('#left-navbar').css('left', my_left);
        }
    }
}

// run on resized
$(window).resize(function() {
    leftnavoffset();
});

$(function () {
    $('.circle-text').on('click', function() {
        var hg = $('#eme-slider-wrap-full-screen').height();
        $("html, body").animate({ scrollTop: hg }, 700);
    });
});