$(function () {
    $("a[href='index.html']").addClass('active');
    var controller = new ScrollMagic.Controller({
        container: "#content-wrapper"
    });
    $('#content-wrapper').on('scroll', function () {
        controller.update();
    });
    var sections = ['#slide1', '#slide2', '#slide3', '#slide4', '#slide5'];
    var scenes = [];
    var bgScenes = [];
    var phoneTween = new TimelineMax().add(TweenMax.from(".phone-bg", .3, {
        opacity: 0
    })).add(TweenMax.from(".phone-ap-logo", .3, {
        opacity: 0
    })).add([TweenMax.to(".phone-ap-logo", .3, {
        top: '7%',
        delay: -.3
    }), TweenMax.from(".phone-ap-lottery", .3, {
        opacity: 0,
        delay: -.1
    }), TweenMax.from("#slide1 .bg1", .5, {
        opacity: 0,
        top: '20%',
        delay: -0.6
    }), TweenMax.from("#slide1 .bg2", .5, {
        opacity: 0,
        top: '30%',
        delay: -0.5
    }), TweenMax.from("#slide1 .bg3", .5, {
        opacity: 0,
        top: '40%',
        delay: -0.4
    }), TweenMax.from("#slide1 .shadow", .5, {
        opacity: 0,
        top: '50%',
        delay: -0.2
    })]).add([TweenMax.to("#slide1 .bg1", .5, {
        top: '-20%'
    }), TweenMax.to("#slide1 .bg2", .5, {
        top: '-30%'
    }), TweenMax.to("#slide1 .bg3", .5, {
        top: '-40%'
    })]);
    var txt1 = new TimelineMax({
        delay: .5,
        paused: true
    }).add(TweenMax.from("#slide1 .txt", .5, {
        opacity: 0,
        top: 50
    }));
    var slide1Scene = new ScrollMagic.Scene({
        triggerElement: '#slide1 .w3-center',
        duration: $('#slide1 .w3-center').innerHeight()
    }).setTween(phoneTween).on("enter", function (event) {
        txt1.play();
    }).addTo(controller);
    scenes.push(slide1Scene);
    var dotTween = new TimelineMax().add([TweenMax.from("#slide2 .bg2", .5, {
        opacity: 0,
        top: 50
    }), TweenMax.from("#slide2 .w3-row", .5, {
        opacity: 0,
        top: 50,
        delay: 0.2
    }), TweenMax.from("#slide2 .bg1", .5, {
        opacity: 0,
        top: 50,
        delay: 0.4
    })]).add([TweenMax.to("#slide2 .bg1", .5, {
        top: '-=30%'
    }), TweenMax.to("#slide2 .bg2", .5, {
        top: '-=10%'
    })]);
    var txt2 = new TimelineMax({
        paused: true
    }).add([TweenMax.from("#slide2 .txt", .5, {
        opacity: 0,
        top: 50
    }), ]);
    var slide2Scene = new ScrollMagic.Scene({
        triggerElement: '#slide2 .w3-center',
        duration: $('#slide2 .w3-center').innerHeight()
    }).setTween(dotTween).on("enter", function (event) {
        txt2.play();
    }).addTo(controller);
    scenes.push(slide2Scene);
    var mapObj = {
        curImg: 0
    };
    var $slides = $(".slide");
    var slideTime = 0.4;
    var currIndex = 0;
    $(".slide:gt(0)").css({
        opacity: 0
    });
    var mapTween = new TimelineMax().add(TweenMax.from("#slide3 .bg1", .5, {
        opacity: 0
    })).add([TweenMax.to("#slide3 .bg1", .5, {
        top: '-=20%'
    }), TweenMax.to(mapObj, 30, {
        curImg: 6,
        roundProps: "curImg",
        immediateRender: true,
        ease: Linear.easeNone,
        onUpdate: function () {
            if (mapObj.curImg == currIndex) return;
            TweenLite.to($slides, slideTime, {
                opacity: 0
            });
            TweenLite.to($slides.eq(mapObj.curImg), slideTime, {
                opacity: 1
            });
            currIndex = mapObj.curImg;
        }
    })]);
    var txt3 = new TimelineMax({
        paused: true
    }).add([TweenMax.from("#slide3 .txt", .5, {
        opacity: 0,
        top: 50
    })]);
    var slide3Scene = new ScrollMagic.Scene({
        triggerElement: '#slide3',
        duration: $('#slide3').innerHeight()
    }).setTween(mapTween).on("enter", function (event) {
        txt3.play();
    }).addTo(controller);
    scenes.push(slide3Scene);
    var txt4 = new TimelineMax({
        paused: true
    }).add([TweenMax.from("#slide4 .txt", .5, {
        opacity: 0,
        top: 50
    }), TweenMax.from("#slide4 .bcg", .5, {
        opacity: 0,
        delay: 0.4
    }), TweenMax.from("#slide4 .w3-row-padding", .5, {
        opacity: 0,
        top: 50,
        delay: 0.8
    })]);
    var slide4Scene = new ScrollMagic.Scene({
        triggerElement: '#slide4 .w3-center',
        duration: $('#slide4 .w3-center').innerHeight()
    }).on("enter", function (event) {
        txt4.play();
    }).addTo(controller);
    scenes.push(slide4Scene);
    var obj = {
        curImg: 0
    };
    var currball = 0;
    $(".goldenball:gt(0)").hide();
    var ballTween = new TimelineMax().add([TweenMax.from("#slide5 .bg1", .5, {
        opacity: 0,
        top: '100%'
    }), TweenMax.from("#slide5 .bg2", .5, {
        opacity: 0,
        top: '100%'
    }), TweenMax.from("#slide5 .bg3", .5, {
        opacity: 0,
        top: '100%'
    }), TweenMax.to(obj, 0.5, {
        curImg: 38,
        roundProps: "curImg",
        immediateRender: true,
        ease: Linear.easeNone,
        onUpdate: function () {
            if (obj.curImg == currball) return;
            $(".goldenball").hide();
            $(".goldenball").eq(obj.curImg).show();
            currball = obj.curImg;
        }
    })]).add([TweenMax.to("#slide5 .bg1", .5, {
        top: '-=40%'
    }), TweenMax.to("#slide5 .bg2", .5, {
        top: '-=20%'
    })]);
    var txt5 = new TimelineMax({
        paused: true
    }).add([TweenMax.from("#slide5 .txt", .5, {
        opacity: 0,
        top: 50
    })]);
    var slide5Scene = new ScrollMagic.Scene({
        triggerElement: '#slide5 .w3-center',
        duration: $('#slide5').innerHeight()
    }).setTween(ballTween).on("enter", function (event) {
        txt5.play();
    }).addTo(controller);
    scenes.push(slide5Scene);
    sections.forEach(function (slide, index) {
        if (index == 4) return;
        var shiftTop = '+=20%';
        if (index == 3) shiftTop = '45%';
        var tl = new TimelineMax().add([TweenMax.to(slide + " .bcg1", .5, {
            top: shiftTop
        }), TweenMax.to(slide + " .bcg2", .5, {
            top: shiftTop
        })]);
        var scene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: $(slide).innerHeight()
        }).setTween(tl).addTo(controller);
        bgScenes.push(scene);
    });
    $(window).resize(function () {
        scenes.forEach(function (scene, index) {
            var duration = $(sections[index]).find('.w3-center').innerHeight();
            scene.duration(duration);
            scene.refresh();
        });
        bgScenes.forEach(function (scene, index) {
            var duration = $(sections[index]).innerHeight();
            scene.duration(duration);
            scene.refresh();
        });
        if (isBreakPoint(600)) {
            $("#carousel2").addClass('owl-carousel owl-theme').owlCarousel({
                items: 2,
                slideBy: 'page',
                loop: true
            });
        } else {
            $("#carousel2").removeClass('owl-carousel owl-theme').trigger('destroy.owl.carousel');
        }
    }).resize();
    $("#carousel1").owlCarousel({
        items: 1,
        loop: true
    });
    var vid = document.getElementById("mainVideo");
    $('#playVideo').on('click', function () {
        var video = $('<video />', {
            id: 'mainVideo',
            height: '100%',
            src: 'movie/mov_ap.mp4',
            type: 'video/mp4',
            controls: true,
            playsinline: true,
            autoplay: true
        });
        video[0].load();
        $.fancybox.open({
            src: video,
            type: 'inline',
            opts: {
                arrows: false,
                infobar: false,
                buttons: ['close'],
                smallBtn: false,
                idleTime: false
            }
        });
    });
});