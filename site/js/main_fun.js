var isBreakPoint = function (bp) {
    var bps = [600, 992],
        w = $(window).width(),
        min, max
    for (var i = 0, l = bps.length; i < l; i++) {
        if (bps[i] === bp) {
            min = bps[i - 1] || 0
            max = bps[i]
            break
        }
    }
    return w > min && w <= max
}
$(function () {
    var vhFix = new VHChromeFix([{
        selector: '.scrollContainer',
        vh: 100
    }]);
    var content = $('.scrollContent'),
        header = $('header');
    content.clone().prependTo(header).addClass('blurred');
    var blur = 'blur(7.8px)';
    $('.blurred').css({
        '-webkit-filter': blur,
        '-moz-filter': blur,
        '-mz-filter': blur,
        '-o-filter': blur,
        'filter': blur
    });
    $('.scrollContainer').scroll(function () {
        var scrollHeight = $('.scrollContent').height();
        var scrollPosition = $(this).height() + $(this).scrollTop();
        if ($(this).scrollTop() <= 90) {
            $("header").css('opacity', $(this).scrollTop() / 90);
        } else {
            $("header").css('opacity', 1);
        }
        $(this).scrollLeft(0);
        var scroll = $(this).scrollTop();
        $('.blurred').css({
            '-webkit-transform': 'translateY(-' + scroll + 'px)',
            '-moz-transform': 'translateY(-' + scroll + 'px)',
            '-mz-transform': 'translateY(-' + scroll + 'px)',
            '-0-transform': 'translateY(-' + scroll + 'px)',
            'transform': 'translateY(-' + scroll + 'px)'
        });
    });
    var menu_opened = false;
    var sub_menu_parent;
    var myScroll = new IScroll('#scroller', {
        mouseWheel: true,
        preventDefault: false,
        resize: true,
        resizeScrollbars: true
    });
    var myScroll2 = new IScroll('#scroller2', {
        mouseWheel: true,
        preventDefault: false,
        resize: true,
        resizeScrollbars: true
    });
    document.addEventListener('touchmove', function (e) {
        if (menu_opened) e.preventDefault();
    }, false);
    $('.nav-hamburger').on('click', function () {
        menu_opened = !menu_opened;
        $(this).toggleClass('hamburger-open');
        if (menu_opened) {
            $('nav').removeClass('close');
            $('nav').addClass('open');
            $('.nav-bg').removeClass('close');
            $('.nav-bg').addClass('open');
        } else {
            $('nav').removeClass('open');
            $('nav').addClass('close');
            $('.nav-bg').removeClass('open');
            $('.nav-bg').addClass('close');
        }
    });
    $('.w3-dropdown-hover').on('click', function () {
        if ($('nav').hasClass('open')) {
            var sub_menu = $(this).children('.sub-menu');
            sub_menu_parent = $(this);
            $('#scroller').addClass('pointer-events');
            $('.nav_menu_container').addClass('close');
            sub_menu.appendTo('.nav_submenu_container');
            sub_menu.addClass('open');
            $('.nav_submenu_container').addClass('open');
            myScroll2.refresh();
        }
    });
    $('.sub-back').on('click', function () {
        var sub_menu = $('.nav_submenu_container .sub-menu');
        $('#scroller').removeClass('pointer-events');
        $('.nav_submenu_container').removeClass('open');
        sub_menu.removeClass('open');
        sub_menu.appendTo(sub_menu_parent);
        $('.nav_menu_container').removeClass('close');
    });
    $(window).resize(function () {
        if (isBreakPoint(600) || isBreakPoint(992)) {} else {
            menu_opened = false;
            $('#scroller').removeClass('pointer-events');
            $('.nav-hamburger').removeClass('hamburger-open');
            $('nav').removeClass('open');
            $('nav').removeClass('close');
            $('.nav-bg').removeClass('open');
            $('.nav-bg').removeClass('close');
            var sub_menu = $('.nav_submenu_container .sub-menu');
            if (sub_menu) {
                $('.nav_submenu_container').removeClass('open');
                sub_menu.removeClass('open');
                sub_menu.appendTo(sub_menu_parent);
                $('.nav_menu_container').removeClass('close');
            }
        }
    });
    $('form.w3-container').submit(function (e) {
        e.preventDefault();
        var $form = $(this),
            data = objectifyForm($form.serializeArray());
        $.ajaxSetup({
            headers: {
                'Content-Type': 'application/json'
            }
        });
        $.post('/sendMail', JSON.stringify(data), function (data) {
            alert('发送成功');
            $form.trigger('reset');
        }).fail(function (resp) {
            alert('发送失败，请联系客服人员！');
        });
    });

    function objectifyForm(formArray) {
        var returnObj = {};
        for (var i = 0; i < formArray.length; i++) {
            returnObj[formArray[i].name] = formArray[i].name === 'cantact_acctount' ? +formArray[i].value : formArray[i].value;
        }
        return returnObj;
    }
});