; (function () {

    var HomeCommon = {
        init: function () {
            var timer = null
                , num = Number((3e0 * 10000 * Math.random() + 3e0 * 10000).toFixed(0))
                , _this = this;
            _this.eventBind();
            clearInterval(timer);
            if (utils.cookie.get("LoginSessionID")) {
                _this.getUnreadMsg();
            }
            timer = setInterval(function () {
                if (utils.cookie.get("LoginSessionID")) {
                    _this.getUnreadMsg();
                }
            }, num);
        }
        , eventBind: function () {
            var _this = this;
            //彩票大厅二级菜单效果
            $('[data-item="lot_hall"]').unbind('mouseover').on('mouseover', function (e) {
                e.preventDefault();
                $('#lot_sec_menu').css('display', 'block');
            });
            $('#lot_sec_menu').unbind('mousemove').on('mousemove', function (e) {
                e.preventDefault();
                $('#lot_sec_menu').css('display', 'block');
            });
            $('#lot_hall,#lot_sec_menu').unbind('mouseleave').on('mouseleave', function (e) {
                e.preventDefault();
                $('#lot_sec_menu').css('display', 'none');
            });
            $('#msg_info,#msg_box').unbind('click').on('click', function () {
                _this.clickGetMsg();
            });
            //免费试玩按钮
            //$.post("/home/TrialUrl", function (data) {
            //    if (data != undefined && data != "") {
            //        $("#play_btn").attr("href", data);
            //    }
            //    else {
            //        $('#play_btn').unbind('click').on('click', function () {
            //            $.artDialog({
            //                title: '温馨提示',
            //                content: '免费试玩功能正在开发中，敬请期待！',
            //                okValue: '好的',
            //                ok: function () {

            //                }
            //            })
            //        });
            //    }
            //});
        }
        //消息点击之后调用的接口
        , clickGetMsg: function () {
            var $this = this;
            $.post('/UserCenter/SetMessageIsReminded', function (data) {
                var dt = (typeof data === 'string') ? eval('(' + data.replace(/\s/, '') + ')') : data;
                if (dt.status) {
                    $('#msg_info').addClass('dn');
                    window.location.href = '/UserCenter/Messge';
                }
            });
        }
        //获得未读消息接口
        , getUnreadMsg: function () {
            var _this = this
                , txt = '';
            $.get('/UserCenter/GetMessageIsRemindedCounnt', function (data) {
                var dt = (typeof data === 'string') ? eval('(' + data.replace(/\s/, '') + ')') : data;
                if (dt.status) {
                    $('#msg_info').removeClass('dn');
                    (function (browser, count) {
                        var m = 'redm';
                        if (browser.indexOf('MSIE') !== -1 && ~~browser.substr(browser.indexOf('MSIE') + 5, 3) < 9) {
                            if (count < 10) {
                                m = 'redm';
                            } else if (count > 9 && count < 100) {
                                m = 'red';
                            } else {
                                m = 'redbg';
                            };
                            $('#msg_info').css({ 'background': 'url(' + iis + '/Content/Default/home/images/usercenter/' + m + '.png) no-repeat scroll 0 0 transparent;background-size:100% 100%;' });
                        }
                    })(navigator.userAgent, dt.count);
                    //alert(dt.count);
                    if (!dt.count) {
                        $('#msg_info').addClass('dn');
                    } else if (!!dt.count && dt.count < 100) {
                        txt = dt.count;
                    } else {
                        txt = '99+';
                    }
                    $('#msg_info').text(txt);
                } else {
                    $('#msg_info').addClass('dn');
                };
            });
        }
    }
    HomeCommon.init();
})();
//数字跳表
!function () {
    var num = (Math.random() * 100000000).toFixed(0);
    var d = 2;
    var kh = $('#dig_jum_tab');
    var timer = null;
    timer = window.setInterval(function () {
        d += 5;
        if (d >= 92) {
            num = Number(num) + 1;
            d = 2;
        }
        kh.html(num + '.' + m(d));
    }, 500);
    function m(a) {
        if (a < 10) {
            return '0' + a;
        } else {
            return a;
        }
    }
}();
function windowOpen(url, name) {
    window.open(url, name, "width=1200, height=800,toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes")
}
$(function () {
    $(".service_btn").mouseover(function () {
        $(".service_btn").hide();
        $(".service_wrap").show();
    });
    $(".fix_layout").mouseleave(function () {
        $(".service_wrap").hide();
        $(".service_btn").show();
    });
    !function () {
        var t = window.st ? new Date(st.replace(/\-/g, '/')) - 0 : new Date(), ele = $('#nowTime'), format = 'hh:mm';
        if (!ele.length) return;
        if (ele.data("format")) {
            format = ele.data("format");
        }
        ele.html(new Date(t).format(format));
        setInterval(function () {
            t += 1000;
            var _d = new Date(t);
            ele.html(_d.format(format));
        }, 1000);
    }();
    $('#verifyImg').unbind('click').on("click", function () {
        $(this).attr("src", "/Home/ValidateCode?t=" + (new Date() - 1));
    });
    $("#RefreshBalance").unbind('click').on("click", function () {
        $("#RefreshBalance").text("[刷新中...]");
        var url = "/Shared/GetBalance?t=" + (new Date() - 0);
        $.get(url, null, function (data) {
            $("#Balance").text(data);
            $("#RefreshBalance").text("[刷新]");
        })
    });
    $("#login").unbind('click').on("click", function () { FastLogin(); });

    $("#username,#password,#validateCode").bind("keyup", function (e) {
        var keyCode = document.all ? window.event.keyCode : e.which;
        if (keyCode == 13) {
            FastLogin();
        }
    });
    var isFirst = true;
    $("#validateCode").bind({
        focus: function () {
            if (isFirst) {
                if ($(this).val() == '验证码') $(this).val('');
                $("#verifyImg").attr("src", "/Home/ValidateCode?t=" + (new Date() - 1))
                isFirst = false;
            }
        }
    });
    var isSubmiting = false;
    var FastLogin = function () {
        var username = $("#username");
        var password = $("#password");
        var validateCode = $("#validateCode");
        if (username.val().length === 0 || username.val() == "账号") {
            utils.tip("请输入账号", false);
            username.focus();
            return false;
        }
        if (password.val().length === 0 || password.val() == "密码") {
            utils.tip("请输入密码", false);
            password.focus();
            return false;
        }
        if (validateCode.val().length === 0 || validateCode.val() == "验证码") {
            utils.tip("请输入验证码", false);
            validateCode.focus();
            return false;
        }
        var params = { username: username.val(), password: password.val(), validateCode: validateCode.val() };
        params.password = $.md5($.md5(params.password) + params.validateCode);

        isSubmiting = true;
        $.ajax({
            url: "/Home/Login",
            type: "POST",
            data: params,
            cache: false,
            success: function (json) {
                if (typeof json === 'string') {
                    if (/^window\.location/.test(json)) return eval(json);
                    utils.tip("登录出了点问题，请重试", false, function () {
                        parent.location.reload();
                    });
                } else {
                    if (json.status == true) {
                        window.location.href = '/';
                    } else {
                        utils.tip(json.info, false);
                        $('#verifyImg').attr("src", "/Home/ValidateCode?t=" + (new Date() - 1));
                        $("#password").val('');
                        $("#validateCode").val('');
                    }
                }
            },
            error: function () {
                utils.tip("网络异常，请刷新页面", false);
            },
            complete: function () {
                isSubmiting = false;
            }
        });
        return false;
    }
});
//推送
$(function () {
    if (typeof $.hubConnection == 'function') {
        var connection = $.hubConnection();
        connection.url = SignalrSite;
        var moneyChange = connection.createHubProxy("cashREHub");
        //会员充值成功提醒
        moneyChange.on("NewUserRecharge", function (companyId, accountId, type) {
            if (Number($("#accountId").val()) == accountId) {
                $("#video").remove();
                $("body").append('<embed id="video" autoplay="false" src="@(LXYD.WebGame.Util.MiscHelpers.SystemConfig.WebSiteStatisUrl)/Content/Video/2.mp3" width="200" height="45" />');
            }
        });
        //会员取款成功提醒
        moneyChange.on("NewUserEncashment", function (companyId, accountId) {
            if (Number($("#accountId").val()) == accountId) {
                $("#video").remove();
                $("body").append('<embed id="video" autoplay="false" src="@(LXYD.WebGame.Util.MiscHelpers.SystemConfig.WebSiteStatisUrl)/Content/Video/2.mp3" width="200" height="45" />');
            }
        });
        connection.start();
    }
});
//大厅页面右侧挂件
!function () {
    //计算滚动条的宽度
    function init() {
        //changeSkin()
        eventBind();
    }
    function eventBind() {
        $('#chinese_style').on('click', chineseFun);//中国风
        $('#western_style').on('click', westernFun);//欧美风

        $('[name="pendant_two"]').unbind('mouseover').on('mouseover', function (e) {
            e.preventDefault();
            $("#skin_box").stop();
            $('#skin_box').fadeIn('slow', 'linear');
        });
        $('#skin_box').unbind('mousemove').on('mousemove', function (e) {
            e.preventDefault();
            $("#skin_box").stop();
            $('#skin_box').fadeIn('fast', 'linear');
        });
        $('[name="pendant_two"],#skin_box').unbind('mouseleave').on('mouseleave', function (e) {
            e.preventDefault();
            $("#skin_box").stop();
            $('#skin_box').fadeOut('slow', 'linear');
        });
        $('[name="code_btn"],[name="code"]').on('click', function () {
            if ($('[name="code"]').hasClass('dn')) {
                $('[name="code"]').removeClass('dn');
            } else {
                $('[name="code"]').addClass('dn');
            }
        });
    };
    //中国风
    function chineseFun() {
        utils.cookie.set('skinStyle', 'haocai-red', 365, '/');
        changeSkin('haocai-red');
        window.BGChange(utils.cookie.get('skin') || '01');
    }
    //欧美风
    function westernFun() {
        utils.cookie.set('skinStyle', 'haocai-blue', 365, '/');
        changeSkin('haocai-blue');
        window.BGChange(utils.cookie.get('skin') || '01');
    }
    //根据选择切换合适的皮肤
    var changeSkin = function (i) {
        var skine, link = '', hn = '';
        if (arguments.length <= 0 || !i) {
            skine = utils.cookie.get('skinStyle');
        } else {
            skine = i;
        };
        link = document.createElement('LINK');
        link.rel = 'stylesheet';
        //hn = location.protocol + '//' + location.hostname;
        hn = iis;
        $.each($($(document).find('head')[0]).find('link'), function (i, v) {
            if ($(v).attr('tii')) {
                $($(document).find('head')[0]).find('[tii="' + $(v).attr('tii') + '"]').remove();
                link.setAttribute('tii', $(v).attr('tii'));
                if ($(v).attr('href').indexOf('home') !== -1) {
                    link.href = hn + 'Content/mapping/' + skine + '/home/css/' + $(v).attr('tii') + '.css';
                } else if ($(v).attr('href').indexOf('officialGames') !== -1) {
                    link.href = hn + 'Content/mapping/' + skine + '/officialGames/css/' + $(v).attr('tii') + '.css';
                } else {
                    link.href = hn + 'Content/mapping/' + skine + '/css/' + $(v).attr('tii') + '.css';
                }
                $($(document).find('head')[0]).append(link);
            }
        });
    }
    //utils.changeSkin();
    $(function () {
        setTimeout(function () {
            init()
        }, 50);
    });
}();

/// 刷新余额方法
; (function () {
    var isRefreshingBalance = false;
    window.refreshBalance = function () {
        var $dom = $("#Balance");
        if ($dom.length === 0) return alert('请将余额所在的标签添加id="Balance"');
        var beforeValue = $.trim($dom.text());
        $dom.text('...');
        isRefreshingBalance = true;
        $.ajax({
            url: "/AccountInfo/GetAccount",
            cache: false,
            success: function (json) {
                if (json && json.AccountName) $dom.text(json.CreditBalance);
            },
            error: function () {
                $dom.text(beforeValue);
            },
            complete: function () {
                isRefreshingBalance = false;
            }
        });
    };
})();