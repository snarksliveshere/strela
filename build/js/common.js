// captcha
// var onloadCallback = function() {
//     mysitekey = '6Leq4jcUAAAAAK9o3wR7h_lpIMQvOQ2Kr2Ldr-00';
//
//     if($('#callback_g').length ){
//         grecaptcha.render('callback_g', {
//             'sitekey' : mysitekey
//         });
//     }
// }

$(function() {

    function changeIcon(icon) {
        if(icon.hasClass('fa-angle-down')) {
            icon.removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            icon.removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    }



    var mql = window.matchMedia('all and (max-width: 767px)');

    if (mql.matches) {
        // jsDesc: i see u menu
        var seeMenu = $('.iseeu_menu');
        $('.header__search-form').clone().appendTo(seeMenu);
        $('.header__top .menu').clone().appendTo(seeMenu).removeClass('row');
        $('.header__menu .menu').clone().appendTo(seeMenu).removeClass('row');
        $('.header__mobile-separator .mobile_click').click(function () {
           $('body').prepend($('<div class="veil"></div>'));
            seeMenu.toggle();
        });
        $('body').on('click','.veil',function () {
               seeMenu.toggle();
               $(this).remove();
        });
        if($('.icon-menu').length) {
            $('.icon-menu').click(function () {
                $(this).next().slideToggle();
                var icon = $(this).find('i');
                changeIcon(icon);
            });
        }

        // jsDesc: кнопка фильтры на мобильной версии
        var toggle_filter = $('.filters__form-button');
        toggle_filter.click(function () {
            var block = $(this).next().find('.jq-selectbox__dropdown');
            $(this).next().slideToggle();

            block.each(function () {
                if($(this).css('display') == 'block') {
                    $(this).toggle();
                }
            });
            var icon = $(this).find('i');
            changeIcon(icon);
            $('.filters__form-sort').toggleClass('pt-5');
        });

        // jsDesc: переносим корзину
        $('.header__basket-wrap').prependTo($('.header__mobile-separator'));
    } // end of resize < 768
    else {
        // jsDesc: main menu animation
        $('.main_menu .dropmenu').hover(
            function () {
                if($(this).parent().hasClass('submenu')) {
                    $(this).find('a').eq(0).addClass('pale_bg');
                }
                $(this).find('ul:first').fadeIn();
            },
            function () {
                if($(this).parent().hasClass('submenu')) {
                    $(this).find('a').eq(0).removeClass('pale_bg');
                }
                $(this).find('ul:first').delay(200).stop().fadeOut();
            }
        );
        // jsDesc: search form
        $('.header__search-button').click(function () {
            $('.header__search-form').toggle();
        });
        // jsDesc: icon menu для разрежений более 768
        if($('.icon-menu').length) {
            var iconMenu = $('.icon-menu');
            iconMenu.find('i').removeClass('fa-angle-down').addClass('fa-angle-right');
            iconMenu.click(function () {
                if($(this).hasClass('imclicked')) {
                    $(this).next().hide();
                    $(this).removeClass('imclicked');
                } else {
                    $(this).next().show();
                    $(this).addClass('imclicked');
                }
            });
        }
    } // end of Resize > 768

    // jsDesc: slick set
    $('.aside_slider').slick({
        dots: true,
        autoplay: true,
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
                    slidesToShow: 2,
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
    $('.quarter_slider').slick({
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        prevArrow: $('.quarter_prev'),
        nextArrow: $('.quarter_next'),
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
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
    $('.quarter_slider-works').slick({
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        prevArrow: $('.quarter_prev-works'),
        nextArrow: $('.quarter_next-works'),
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
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

    $('.good_slider-main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.good_slider-nav'
    });
    $('.good_slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.good_slider-main',
        dots: false,
        arrows: false,
        focusOnSelect: true
    });

    // jsDesc: fancybox
    $(".fancybox").fancybox({
       buttons: ['close']
    });

    $('[data-event]').on('click',function() {
        if ($(this).data('event') == 'fancy') {
            $.fancybox.open({
                src  : '#'+$(this).data('name'),
            });
        }
    });

    // jsDesc: tabs good
    $('.good_tabs .tabset li').click(function() {
        var ind = $(this).index();
        $(this).addClass('active gradient').siblings().removeClass('active gradient');
        $('.good_tabs .tab').eq(ind).addClass('active').siblings().removeClass('active');
    });

    // jsDesc: - & + buttons in good
    $('.minus').click(function () {
        var $input = $(this).next();
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
    });
    $('.plus').click(function () {
        var $input = $(this).prev();
        $input.val(parseInt($input.val()) + 1);
        $input.change();
    });

    //form styling
    $('.filters__form select').styler({
        selectSmartPositioning:false
    });
    if($('.filters__form').length){
        var toggle_label = $('.filters__form-select-label');
        toggle_label.click(function(){
            var icon = $(this).find('i');
            var block = $(this).parent().siblings().find('.jq-selectbox__dropdown');
            $(this).parent().find('.jq-selectbox__dropdown').slideToggle();
            block.each(function () {
               if($(this).css('display') == 'block') {
                   $(this).slideToggle();
               }
            });
            changeIcon(icon);
        });
    }

    // stuff
    $('.return_false').click(function () {
       return false;
    });

    // jsDesc: basket
    $('body').on('click','.shopping',function(){
        $(this).next().toggle();
    });
});
