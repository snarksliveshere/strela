$(function() {

    var mql = window.matchMedia('all and (max-width: 768px)');

    if (mql.matches) {
        // $('#header-navigation .sub-arrow').click(function () {
        //     $(this).next('ul').slideToggle();
        // });
        // // tabs
        // var price_tab = $('.info .tab');
        // var lng_price = price_tab.length;
        // for (var i = 0; i < lng_price; i++) {
        //     $('.tabset li').eq(i).after($('.info .tab').eq(i));
        // }
        // $('.info .tabset li').click(function () {
        //     if ($(this).hasClass('active')) {
        //         $(this).removeClass('active').next($('.info div.tab')).removeClass('active');
        //     } else {
        //         $('.info .tabset li, .info .tab').removeClass('active');
        //         $(this).addClass('active').next($('.info div.tab')).addClass('active')
        //     }
        // });

        // jsDesc: i see u menu
        var seeMenu = $('.iseeu_menu');
        $('.header__top .menu').clone().appendTo(seeMenu).removeClass('row');
        $('.header__menu .menu').clone().appendTo(seeMenu).removeClass('row');
        $('.header__mobile-separator').click(function () {
           seeMenu.toggle();
        });
        // seeMenu.bind('click',function(){
        //     $(this).find('.menu').slideToggle();
        //     $(this).find('ul').not('.menu').slideUp();
        // });
        // $('.iseeu_menu .js_sub_toggle').click(function(e){
        //     $(this).toggleClass('menu_handler');
        //     $(this).parent().next('ul').slideToggle();
        //     e.stopPropagation();
        // });
        // end of i see u menu
    } // end of resize < 768
    else {
        // jsDesc: main menu animation
        $('.main_menu .dropmenu').hover(
            function () {
                $(this).find('ul:first').delay(200).stop().fadeIn();
            },
            function () {
                $(this).find('ul:first').delay(200).stop().fadeOut();
            }
        );



        // if (items_view_static > headWidth) {
        //     offItems.addClass('mod_head');
        //     mainTopMenu.addClass('hide');
        // }
        // else {
        //     offItems.removeClass('mod_head');
        //     mainTopMenu.removeClass('hide');
        // }
        //
        // $(window).scroll(function () {
        //     var items_view = $(this).scrollTop();
        //     if (items_view > headWidth) {
        //         offItems.addClass('mod_head');
        //         mainTopMenu.addClass('hide');
        //     }
        //     else {
        //         offItems.removeClass('mod_head');
        //         mainTopMenu.removeClass('hide');
        //     }
        // });
        // // tabs
        // $('.info .tabset li').click(function () {
        //     var ind = $(this).index();
        //     $(this).addClass('active').siblings().removeClass('active');
        //     $('.tab').eq(ind).addClass('active').siblings().removeClass('active');
        // });


    } // end of Resize > 768

    // jsDesc: slick set
    $('.aside_slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 99999,
                settings: "unslick"
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });

    $(".fancybox").fancybox({
       buttons: ['close']
    });

    // jsDesc: search form
    $('.header__search-button').click(function () {
        $('.header__search-form').toggle();
    });


});
