$(function() {

    var mql = window.matchMedia('all and (max-width: 768px)');

    if (mql.matches) {
        // jsDesc: i see u menu
        var seeMenu = $('.iseeu_menu');
        $('.header__search-form').clone().appendTo(seeMenu);
        $('.header__top .menu').clone().appendTo(seeMenu).removeClass('row');
        $('.header__menu .menu').clone().appendTo(seeMenu).removeClass('row');
        $('.header__mobile-separator .mobile_click').click(function () {
           // $('body').append($('<div class="veil"></div>'));
            seeMenu.toggle();
            // seeMenu.wrap('<div class="veil"></div>');
        });
        // $('.veil').click(function () {
        //     //seeMenu.toggle();
        //     // $(this).remove();
        //     console.log('veil clicked');
        // });

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
        // jsDesc: search form
        $('.header__search-button').click(function () {
            $('.header__search-form').toggle();
        });
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
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        prevArrow: $('.quarter_prev'),
        nextArrow: $('.quarter_next'),
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
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
        var toggle_filter = $('.filters__form-button');

        toggle_label.click(function(){
            var icon = $(this).find('i');
            var block = $(this).parent().siblings().find('.jq-selectbox__dropdown');
            $(this).parent().find('.jq-selectbox__dropdown').slideToggle();
            block.each(function () {
               if($(this).css('display') == 'block') {
                   $(this).slideToggle();
               }
            });
            if(icon.hasClass('fa-angle-down')) {
                icon.removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                icon.removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        });

        // jsDesc: кнопка фильтры на мобильной версии
        toggle_filter.click(function () {
            var block = $(this).next().find('.jq-selectbox__dropdown');
            $(this).next().slideToggle();

            block.each(function () {
                if($(this).css('display') == 'block') {
                    $(this).toggle();
                }
            });
            var icon = $(this).find('i');
            if(icon.hasClass('fa-angle-down')) {
                icon.removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                icon.removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            $('.filters__form-sort').toggleClass('pt-5');
        });
    }

});
