function initNavbar() {

    var SCROLL_SPEED = 750;
    var SCROLL_OFFSET = 50;
    var EASING = 'swing';

    var $navTop = $('#navbar-top');
    var $navExternal = $('.nav-external');

    $navTop.find('.navbar-default ul.nav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: SCROLL_SPEED,
        scrollOffset: SCROLL_OFFSET,
        scrollThreshold: 0.5,
        filter: ':not(.external)',
        easing: EASING
    });

    $navTop.find('.navbar-default').affix({
        offset: {
            top: $('#home').height()
        }
    });

    $navExternal.click(function(e) {
        e.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $($(this).attr("href")).offset().top - scrollOffset
        }, scrollSpeed, easing);
    });
}

function initPortfolio() {

    var $portfolio = $('#portfolio');
    var $items = $portfolio.find('.items');
    var $filters = $portfolio.find('.filters li a');

    $items.imagesLoaded(function() {

        $items.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows',
            transitionDuration: '0.7s'
        });
    });

    $filters.click(function() {

        var $el = $(this);

        $filters.removeClass('active');

        $el.addClass('active');

        var selector = $el.attr('data-filter');

        $items.isotope({
            filter: selector
        });

        return false;
    });

    $items.find('.item a').venobox({
        border: '0 10px',
        numeratio: true,
        infinigall: true
    });
}

function initAnimations() {
    var $animated = $('.animated');

    $animated.appear({
        force_process: true
    });

    $animated.on('appear', function() {

        var $el = $(this);

        var animation = $el.data('animation');
        var delay = $el.data('delay');

        if (delay) {

            setTimeout(function() {
                $el.addClass(animation);
                $el.addClass('showing');
                $el.removeClass('hiding');
            }, delay);
        } else {

            $el.addClass(animation);
            $el.addClass('showing');
            $el.removeClass('hiding');
        }
    });

    function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

    }

    function initBannerVideoSize(element){

    $(element).each(function(){
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
    var videoAspectRatio = $(this).data('height')/$(this).data('width');

    $(this).width(windowWidth);

    if(windowWidth < 1000){
        videoHeight = windowHeight;
        videoWidth = videoHeight / videoAspectRatio;
        $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

        $(this).width(videoWidth).height(videoHeight);
    }

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

  });

    // Service hover animation
    $('.service').hover(function() {
        $('i', this).addClass('animated tada');
    }, function() {
        $('i', this).removeClass('animated tada');
    });
}

$(document).ready(function() {

    initNavbar();
    initPortfolio();
    initAnimations();
    scaleVideoContainer();

   initBannerVideoSize('.video-container .poster img');
   initBannerVideoSize('.video-container .filter');
   initBannerVideoSize('.video-container video');

});

$(window).load(function() {

    var $loader = $('.loader');

    $loader.find('.fading-line').fadeOut();
    $loader.fadeOut("slow");

    scaleVideoContainer();
        scaleBannerVideoSize('.video-container .poster img');
        scaleBannerVideoSize('.video-container .filter');
        scaleBannerVideoSize('.video-container video');
});
