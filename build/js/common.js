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
    } // end of resize < 768
    else {
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

});
