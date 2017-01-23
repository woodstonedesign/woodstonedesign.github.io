$(document).ready(function() {

    //Banner Mouse Move
    // var movementStrength = 10;
    // var height = movementStrength / $(window).height();
    // var width = movementStrength / $(window).width();
    // $("#home").mousemove(function(e){
    //     var pageX = e.pageX - ($(window).width() / 2);
    //     var pageY = e.pageY - ($(window).height() / 2);
    //     var newvalueX = width * pageX;
    //     var newvalueY = height * pageY ;
    //     $('#home').css("background-position", newvalueX+"px     "+newvalueY+"px");
    // });
    
    //Slider
    $('#slider').juicyslider({
        mask: 'strip',
        autoplay: 8000,
        show: {effect: 'puff', duration: 5000},
        hide: {effect: 'puff', duration: 2000},
        width: null,
        height: null,
    });

    //fancybox
    $(function() {
        if ($(window).width() > 1000) {
            $(".fancybox").fancybox({
                maxWidth: 1000,
                fitToView: false,
                width: '100%',
                height: '100%'
            });

        } else {
            $(".fancybox").fancybox({
                fitToView: true,
                width: '100%',
                autoCenter: true
            });
        }
    });


    // Window Scroll
    var gotop = "#gotop";
    var header = $('header');
    $(gotop).click(function() {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $(gotop).fadeIn("fast");
            header.addClass('navbar-fixed-top header-animated slideInDown');
        } else {
            $(gotop).stop().fadeOut("fast");
            if (header.hasClass('navbar-fixed-top')) {
                header.addClass('navbar-fixed-top header-animated slideOutUp');
                setTimeout(function() {
                    header.removeClass('navbar-fixed-top header-animated slideInDown slideOutUp');
                }, 100);
            }
        }
    });

    $("nav a").click(function() {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    })

    
    $(".menu-toggle").on('click', function() {
        $(this).toggleClass("on");
        $('nav').toggleClass("on");
    });
    $(window).scroll(function() {
        $('nav,.menu-toggle').removeClass('on');
    });
        
   
   

    function resizeWindow() {
        var windowWidth = $(window).width();
        switch (true) {
            case (windowWidth < 750):
                /* you could specify other sizes to suit your needs*/
                $("img").each(function() {
                    if ($(this).attr("data-xs-src")) {
                        $(this).attr("src", $(this).attr("data-xs-src"))
                    }
                    else
                        $(this).attr("src", $(this).attr("data-default-src"))
                })
                break;
            default:
                $("img").each(function() {
                    if ($(this).attr("data-default-src")) {
                        $(this).attr("src", $(this).attr("data-default-src"))
                    }
                })
        }
    }
    resizeWindow();





    /* On scroll fade/bounce fffect */
    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false,
    });
    wow.init();

    if ($('.wow').hasClass('animated')) {
        $(this).removeClass('animated');
        $(this).removeAttr('style');
        new WOW().init();
    }



});
