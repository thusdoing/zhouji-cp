/// <reference path="../_reference.js" />
(function ($) {
    $(function () {

        var errorInfo = $("#hdErrorInfo").val();
        if (errorInfo != '') {
            alert(errorInfo);
        }

        $("#verifycode").bind({
            focus: function () {
                if ($(this).val() == '验证码') $(this).val('');
                // $("#codeImg").attr("src", "/Home/ValidateCode?t=" + (new Date() - 1))
            },
            blur: function () {
                if ($.trim($(this).val()).length === 0) {
                    $(this).val('验证码');
                }
            }
        });
		
        $("#codeImg").bind("click", function () {
            $("#codeImg").attr("src", "/getVerCode?w=100&h=40&date=" + (new Date() - 1));
        });
		$("#codeImg").click();
		
        $("#getautoaccount").bind("click", function () {
            $.get("/Home/GetAutoAccount?t=" + (new Date() - 1), function (data) {
                $("#account").val(data);
            });
        });
        // $("#account").blur(function () {
        //     var name = $(this).val();
        //     if (name != '') {
        //         $.getJSON("/Home/CheckMemberName", { username: name }, function (json) {
        //             if (json.status == true) {
        //                 alert("该账号已被注册,请更换账号");
        //                 $("#account").val('').focus();
        //             }
        //         });
        //     }
        // });
        $("#wnskaihu").bind("click", function () {
            $.dialog({
                id: "_" + (new Date() - 1),
                title: '开户协议',
                width: 610,
                padding: 8,
                fixed: true,
                lock: 1,
                initialize: function () {
                    $("#wnskaihuDialog").show();
                    this.content($("#wnskaihuDialog").prop("outerHTML"));
                }
            });
        });
        $("#register").bind("click", function () {
            var hash = $("#hash");
            var account = $("#account");
            var password = $("#loginPass");
            var repassword = $("#reLoginPass");
            var qq = $("#qq");
            var realname = $("#realname");
            var email = $("#email");
            var mobile = $("#mobile");
            var withdrawalpwd = '';
            var agentNo = $('#agentNo')
            var invitationCode = $('#invitationCode')
            $("#withdrawalpwd").find("select").each(function () {
                withdrawalpwd += $(this).val();
            });
            var verifycode = $("#verifycode");
            var ckagree = $("#ckagree");
            if ($.trim(account.val()) == '') {
                alert("请输入登录账号");
                account.focus();
                return false;
            }
            if ($.trim(password.val()) == '') {
                alert("请输入登录密码");
                password.focus();
                return false;
            }
            if ($.trim(repassword.val()) == '') {
                alert("请输入确认登录密码");
                repassword.focus();
                return false;
            }
            // if ($.trim(qq.val()) == '') {
               // alert("请输入QQ号码");
               // qq.focus();
               // return false;
            // }
            //if ($.trim(realname.val()) == '') {
            //    alert("请输入真实姓名");
            //    realname.focus();
            //    return false;
            //}
            //if ($.trim(email.val()) == '') {
            //    alert("请输入邮箱地址");
            //    email.focus();
            //    return false;
            //}
            if ($.trim(mobile.val()) == '') {
               alert("请输入手机号");
               mobile.focus();
               return false;
            }
            //if ($.trim(withdrawalpwd) == '') {
            //    alert("请输入取款密码");
            //    return false;
            //}
            //if (!/\d{4}/.test(withdrawalpwd)) {
            //    alert("取款密码只能是4位数字");
            //    return false;
            //}
            if ($.trim(verifycode.val()) == '') {
                alert("请输入验证码");
                verifycode.focus();
                return false;
            }
            if ($("#ckagree").is(":checked") == false) {
                alert("请勾选同意条款");
                return false;
            }
            if (!/^.{4,12}$/.test(account.val()) || !/([0-9]|[a-z])/.test(account.val())) {
                alert("登录账号必须为4-12为数字或字母");
                account.focus();
                return false;
            }
            if (!/^.{4,13}$/.test(password.val()) || !/([0-9]|[a-z])/i.test(password.val())) {
                alert("登录密码必须为4-12为数字或字母");
                password.focus();
                return false;
            }
            if (password.val() != repassword.val()) {
                alert("登录密码和确认登录密码不匹配");
                repassword.focus();
                return false;
            }
            // if (!/^\d{5,13}$/.test(qq.val())) {
                // alert("QQ号码为5-13位数字");
                // qq.focus();
                // return false;
            // }
            //var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            //if (!emailReg.test(email.val())) {
            //    alert("请输入正确的邮箱地址");
            //    email.focus();
            //    return false;
            //}
            var mobileReg = /^1\d{10}$/;
            if (!mobileReg.test(mobile.val())) {
               alert("请输入正确的手机号码");
               mobile.focus();
               return false;
            }
            var params = {
                hash: hash.val(),
                custName: account.val(),
                signPasswd: password.val(),
                agpassword: repassword.val(),
                userQq: qq.val(),
                userPhone: mobile.val(),
                email: email.val(),
                invitationCode: invitationCode.val(),
                withdrawalpwd: withdrawalpwd,
                code: verifycode.val()
            };
            if (confirm("是否要写入？")) {
                $.post('/register', params, function (json) {
                    if (json.success) {
                        $("#regform").hide();
                        $("#successInfo").show();
                        setTimeout(function () { window.location.href = '/'; }, 1000);
                    } else {
                        alert(json.msg);
                    }
                },'json');
            }
        });
    });
})(jQuery);