import Vue from 'vue';
Vue.directive('integer', {
    bind: function (el) {
        el.onkeydown = function (event) {
            var k = event.keyCode;   //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
            if ((k <= 40 && k >= 37) || (k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k == 8)) {
                return true;
            } else {
                return false;
            }
        }
        el.handler = function () {
            var formatVal = /^\+?[1-9][0-9]*$/;
            var val = el.value;
            if (!formatVal.test(val)) {
                el.value = val.replace(/[^0-9]/g, '');
            }
        }
        el.addEventListener('input', el.handler)
        el.onkeyup = function (event) {
            el.value = el.value.replace(/[\u4e00-\u9fa5]/g, '');
        }
    },
    unbind: function (el) {
        el.removeEventListener('input', el.handler)
    }
})
Vue.directive('enterNumber', {
    bind: function (el) {
        el.handler = function () {
            var formatVal = /^\+?[1-9][0-9]*$/;
            var val = el.value;
            if (!formatVal.test(val)) {
                el.value = val.replace(/[^0-9]/g, '');
            }
        }
        el.addEventListener('input', el.handler)
    },
    unbind: function (el) {
        el.removeEventListener('input', el.handler)
    }

});
Vue.directive('inp', {
    bind: function (el) {
        el.onkeydown = function (event) {
            var k = event.keyCode;   //48-57是大键盘的数字键，96-105是小键盘的数字键，8是退格符←
            if ((k <= 40 && k >= 37) || (k <= 57 && k >= 48) || (k <= 105 && k >= 96) || (k == 8) || (k == 188) || (k == 32)) {
                return true;
            } else {
                return false;
            }
        }
        el.onkeyup = function (event) {
            el.value = el.value.replace(/[\u4e00-\u9fa5]/g, '');
        }
    }
})
// <p v-dateFormat="{a:'yyyy-MM-dd hh:mm:ss',b:12132431213}"></p>  //调用实例
Vue.directive('dateFormat', function (el, binding) {
    let fmt = binding.value.a;
    let date = new Date(binding.value.b);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    el.innerText = fmt;
})