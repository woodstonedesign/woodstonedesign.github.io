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


    // Reflect scrolling in navigation
    var navActive = function(section) {

        var $el = $('#navbar > ul');
        $el.find('li').removeClass('active');
        $el.each(function(){
            $(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
        });

    };

    var navigationSection = function() {

        var $section = $('section[data-section]');
        
        $section.waypoint(function(direction) {
            
            if (direction === 'down') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: '150px'
        });

        $section.waypoint(function(direction) {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
        }, {
            offset: function() { return -$(this.element).height() + 155; }
        });

    };

    navigationSection();

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


    /*Counter*/
    $.fn.countTo = function (options) {
        options = options || {};
        
        return $(this).each(function () {
            // set options for current element
            var settings = $.extend({}, $.fn.countTo.defaults, {
                from:            $(this).data('from'),
                to:              $(this).data('to'),
                speed:           $(this).data('speed'),
                refreshInterval: $(this).data('refresh-interval'),
                decimals:        $(this).data('decimals')
            }, options);
            
            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            
            // references & variables that will change with each update
            var self = this,
                $self = $(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            
            $self.data('countTo', data);
            
            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            
            // initialize the element with the starting value
            render(value);
            
            function updateTimer() {
                value += increment;
                loopCount++;
                
                render(value);
                
                if (typeof(settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                
                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    
                    if (typeof(settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }
            
            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };
    
    $.fn.countTo.defaults = {
        from: 0,               // the number the element should start at
        to: 0,                 // the number the element should end at
        speed: 1000,           // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,           // the number of decimal places to show
        formatter: formatter,  // handler for formatting the value before rendering
        onUpdate: null,        // callback method for every time the element is updated
        onComplete: null       // callback method for when the element finishes updating
    };
    
    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    }
}(jQuery));

    jQuery(function ($) {
      // custom formatting example
      $('.count-number').data('countToOptions', {
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
      });
  
      // start all the timers
      $('.timer').each(count);  
      
      function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }




});
