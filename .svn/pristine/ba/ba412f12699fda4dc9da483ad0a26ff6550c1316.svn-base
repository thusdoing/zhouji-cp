/// 工具类
/// <reference path="../Common/jquery-2.2.1.min.js" />
/// <reference path="../Common/knockout-3.2.0.debug.js" />

//https://github.com/pukhalski/tap
!function (a) { var b = {}, c = {}; c.attachEvent = function (b, c, d) { return "addEventListener" in a ? b.addEventListener(c, d, !1) : void 0 }, c.fireFakeEvent = function (a, b) { return document.createEvent ? a.target.dispatchEvent(c.createEvent(b)) : void 0 }, c.createEvent = function (b) { if (document.createEvent) { var c = a.document.createEvent("HTMLEvents"); return c.initEvent(b, !0, !0), c.eventName = b, c } }, c.getRealEvent = function (a) { return a.originalEvent && a.originalEvent.touches && a.originalEvent.touches.length ? a.originalEvent.touches[0] : a.touches && a.touches.length ? a.touches[0] : a }; var d = [{ test: ("propertyIsEnumerable" in a || "hasOwnProperty" in document) && (a.propertyIsEnumerable("ontouchstart") || document.hasOwnProperty("ontouchstart") || a.hasOwnProperty("ontouchstart")), events: { start: "touchstart", move: "touchmove", end: "touchend" } }, { test: a.navigator.msPointerEnabled, events: { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" } }, { test: a.navigator.pointerEnabled, events: { start: "pointerdown", move: "pointermove", end: "pointerup" } }]; b.options = { eventName: "tap", fingerMaxOffset: 11 }; var e, f, g, h, i = {}; e = function (a) { return c.attachEvent(document.documentElement, h[a], g[a]) }, g = { start: function (a) { a = c.getRealEvent(a), i.start = [a.pageX, a.pageY], i.offset = [0, 0] }, move: function (a) { return i.start || i.move ? (a = c.getRealEvent(a), i.move = [a.pageX, a.pageY], void (i.offset = [Math.abs(i.move[0] - i.start[0]), Math.abs(i.move[1] - i.start[1])])) : !1 }, end: function (d) { if (d = c.getRealEvent(d), i.offset[0] < b.options.fingerMaxOffset && i.offset[1] < b.options.fingerMaxOffset && !c.fireFakeEvent(d, b.options.eventName)) { if (a.navigator.msPointerEnabled || a.navigator.pointerEnabled) { var e = function (a) { a.preventDefault(), d.target.removeEventListener("click", e) }; d.target.addEventListener("click", e, !1) } d.preventDefault() } i = {} }, click: function (a) { return c.fireFakeEvent(a, b.options.eventName) ? void 0 : a.preventDefault() } }, f = function () { for (var a = 0; a < d.length; a++) if (d[a].test) { h = d[a].events, e("start"), e("move"), e("end"); break } return c.attachEvent(document.documentElement, "click", g.click) }, c.attachEvent(a, "load", f), "function" == typeof define && define.amd ? define(function () { return f(), b }) : a.Tap = b }(window);

var utils = {};

utils.noop = function () { };
/// 替代PC版的dialog
function dialog(_options) {
    var defaults = {
        cancelValue: "取消",
        okValue: "确定",
        cancel: false,
        ok: function () { },
        skin: "",
        beforeclose: utils.noop
    };
    var options = $.extend(defaults, typeof _options === 'string' ? { content: _options } : _options);
    var hasJQ = window.jQuery && window.jQuery === window.$;
    var eventType = 'createTouch' in document ? "touchend" : "mousedown";//click 快速点击会被clear
    if (/^\d+$/.test(options.height)) options.height += 'px';
    if (/^\d+$/.test(options.maxheight)) options.maxheight += 'px';
    var s = options.height ? 'height:' + options.height : '';
    s += options.maxheight ? 'max-height:' + options.maxheight : '';

    var isSingle = options.cancel && options.ok; //两个按钮都存在为true
    var style = {
        hidden: 'style="visibility:hidden"',
        none: 'style="display:none"',
        single: 'style="width:100%;"',
        contentHeight: s !== '' ? 'style="overflow:auto;' + s + '"' : ''
    };
    function getStyle(bool, type) {
        return bool ? '' : style[type];
    }

    function tplEle(_content) {
        var div = document.createElement("div");
        options.id && div.setAttribute("id", 'dialog-' + options.id);
        div.innerHTML = [
            '<div class="d-mask ' + (options.skin || '') + '">'
                , '<div class="d-dialog-wrap">'
                    , '<div class="d-dialog">'
                        , '<div class="dialog-content">'
                            , '<div class="d-head"><a class="dialog-close" ' + style.hidden + '>X</a></div>'
                            , '<div class="break-wrod" d="content" ' + style.contentHeight + '></div>'
                            , '<div class="direction">'
                                , options.cancel ? '<a href="javascript:;" ' + getStyle(isSingle, 'single') + '>' + options.cancelValue + '</a>' : ""
                                , options.ok ? '<a href="javascript:;" ' + getStyle(isSingle, 'single') + '>' + options.okValue + '</a>' : ""
                            , '</div>'
                        , '</div>'
                    , '</div>'
                , '</div>'
            , '</div>'
        ].join("");

        var contentDom = div.querySelector("div[d=content]");
        if (typeof _content === "object") {
            contentDom.appendChild(_content); /// 传入的值如果为dom对象则需要appendChild不然，ko就失去了双向绑定
        } else {
            contentDom.innerHTML = _content;
        }
        return div;
    }
    if (options.id) {
        var oldDom = document.getElementById('dialog-' + options.id);
        if (oldDom) {
            oldDom.parentElement.removeChild(oldDom);
        }
    }

    var dom = tplEle(options.content), btnBar = dom.querySelector("div.direction");

    if (!dom.remove) {
        dom.remove = function () {
            document.body.removeChild(dom);
        }
    }

    if (hasJQ) {
        var domChild = dom.firstElementChild;
        $(dom).delegate('input:text,textarea,input[type=number],input:password', {
            focus: function () {
                domChild.style.position = "absolute";
            },
            blur: function () {
                domChild.style.position = "fixed";
            }
        });
    }

    document.body.appendChild(dom);

    var fn = {
        close: function (event) {
            event.preventDefault();
            options.beforeclose();
            hasJQ && $(dom).undelegate();
            fn.after(dom);
        },
        cancel: function (event) {
            event.preventDefault();
            var isClose = options.cancel && options.cancel();
            if (isClose === false) {
                utils.event.once(btnBar.firstElementChild, eventType, fn.cancel);
            }
            hasJQ && $(dom).undelegate();
            if (isClose !== false) fn.after(dom);
        },
        ok: function (event) {
            event.preventDefault();
            var isClose = options.ok && options.ok();
            if (isClose === false) {
                utils.event.once(btnBar.lastElementChild, eventType, fn.ok);
            }
            if (isClose !== false) fn.after(dom);
        },
        after: function (dom) {
            fn = {}; //防止反复点击
            setTimeout(function () { document.body.removeChild(dom) }, 200);
        }
    };

    utils.event.once(dom.getElementsByClassName("dialog-close")[0], eventType, fn.close);

    utils.event.once(btnBar.firstElementChild, eventType, fn.cancel);

    utils.event.once(btnBar.lastElementChild, eventType, fn.ok);

    return dom;
}

/// 返回变量的类型
utils.classof = function (o) {
    if (o === undefined) return 'undefined';
    if (o === null) return 'null';
    return Object.prototype.toString.call(o).slice(8, -1).toLowerCase();
}

utils.isNaN = function (value) {
    return typeof value === "number" && isNaN(value);
}


/// @max {Number}
/// @c {String} :: optional
/// return {String}
if (!String.prototype.padLeft) {
    String.prototype.padLeft = function (max, c) {
        var self = this;
        return new Array(Math.max(0, max - self.length + 1)).join(c || ' ') + self;
    };
}

/// @max {Number}
/// @c {String} :: optional
/// return {String}
Number.prototype.padLeft = function (max, c) {
    return this.toString().padLeft(max, c || '0');
};

/// dialog整合ko
/// 相对artDialog传入的参数，不能更改content属性，content由属性template和viewModel来控制
utils.dialog = function (options) {
    if (options && utils.classof(options) !== 'object') throw TypeError('传入的参数必须为对象');
    if (options && options.template && options.viewModel) {
        var div = document.createElement("div");
        div.setAttribute("id", 'DIALOG-VM');
        div.setAttribute("data-bind", 'template:__DIALOG_TPL');
        var vm = window.vms = utils.classof(options.viewModel) === 'function' ? new options.viewModel : options.viewModel;
        vm.__DIALOG_TPL = options.template;
        if (vm.onclose) {
            options.onclose = function () {
                vm.onclose();
            }
        }
        ko.applyBindings(vm, div);
    }
    var _options = ko.utils.extend({}, options);
    _options.id = _options.id || "DIALOG-VM";
    _options.skin = _options.skin || 'dialog-custom';
    _options.content = div;
    _options.onremove = function () {
        div && document.body.removeChild(div);
        options.onremove && options.onremove.call(this);
    }

    return dialog(_options);
}

utils.confirm = function (msg, okAction, cancelAction, options) {
    dialog(ko.utils.extend(options || {}, {
        content: msg,
        ok: okAction === undefined ? false : okAction,
        cancel: cancelAction === undefined ? utils.noop : cancelAction
    }));
}

/// ko扩展
if (window.ko) {
    ko.INTERVAL = {}; /// 用于存储定时器
    /// 数字KO格式验证：ko.observable("").extend({ numeric: 0 })
    /// type:保留小数点后type个 0：正整数；-0：负整数；2：最多允许2为小数的正数；-2：最多允许2位小数的负整数
    ko.extenders.numeric = function (target, type) {
        target.subscribe(function (value) {
            newValue = String(value);
            /// 如果为科学计数法格式则不处理
            if (newValue.indexOf('e+') > -1 && !utils.isNaN(value)) {
                return target(value);
            }

            type = type + '';
            var fix = Math.abs(type);
            var allowNegative = type.charAt(0) === '-'; /// 是否允许为负数
            var firstChar = newValue.charAt(0) === '-' ? '-' : ''; /// 第一个字符

            if (fix === 0) {
                var n = newValue.replace(/[^\d]/g, '');
                return target((allowNegative ? firstChar : '') + n);
            } else {
                newValue = newValue.replace(/-/g, '');
                var firstPoint = newValue.indexOf('.'); /// 第一个小数点的位置
                if (firstPoint === 0) {
                    target('');
                } else {
                    var n = newValue.replace(/[^\d]/g, '');
                    var arr = n.split('');
                    if (firstPoint > 0) {
                        arr.splice(firstPoint, 0, '.');
                        var willLen = firstPoint + 1 + fix; /// 数组最大的长度，即输入的小数的位数，通过改变数组的长度来截取小数的位数
                        if (willLen < arr.length) {
                            arr.length = willLen;
                        }
                    }
                    target((allowNegative ? firstChar : '') + arr.join(''));
                }
            }
        });
        return target;
    }

    /// 鼠标经过显示tip信息，离开消失
    /// dom上没有设置data-align则默认x轴与鼠标的x坐标一致;data-delay延迟显示时间默认0，单位ms
    /// 绑定值值接受String或Function，为Function时必须要返回一个字符串
    ko.bindingHandlers['hover'] = {
        "update": function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $dom = $(element), data = $dom.data();
            var ele = { 'tip': '' };
            var value = valueAccessor(),
                align = data.align,
                delay = data.delay || 0; /// 延迟显示时间
            $dom.off("mouseenter mouseleave").on({
                mouseenter: function (event) {
                    ko.INTERVAL.bindingHandlers_hover = setTimeout(function () {
                        var v = $.isFunction(value) ? value(bindingContext.$data) : value;
                        var classof = utils.classof(v);
                        var isString = classof === 'string';
                        var isDomObject = classof === 'object' && (v instanceof jQuery || /html/.test(classof)); // dom对象或jQuery对象
                        var isVM = classof === 'object' && v.name; /// {name:'模板名称',viewModel:{}}
                        if (isVM) {
                            var div = document.createElement("div");
                            div.setAttribute("id", 'HOVER-VM');
                            div.setAttribute("data-bind", 'template:__HOVER_TPL');
                            v.viewModel.__HOVER_TPL = v.name;
                            ko.applyBindings(v.viewModel, div);
                        }

                        ele.tip = dialog({
                            id: "HOVER-TIP",
                            skin: "hover-tips",
                            padding: 10,
                            align: align,
                            content: (function () {
                                if (isString) return '<div class="break-wrod">' + v + '</div>';  /// 返回直接是字符串
                                if (isDomObject) return v;
                                if (isVM) return div;
                            })()
                        });
                    }, delay);
                },
                mouseleave: function () {
                    clearTimeout(ko.INTERVAL.bindingHandlers_hover);
                    ele.tip && ele.tip.remove();
                }
            });
        }
    };

    /// 倒计时
    ko.bindingHandlers['countdown'] = {
        /// valueAccessor() 值为{rest:Number,callback:Function} 剩余时间rest单位为秒,rest为{String}时则直接显示字符串
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var option = valueAccessor();
            if (ko.isObservable(option)) option = option();
            var format = option.format || 'hh:MM:ss';
            clearInterval(ko.INTERVAL.bindingHandlers_countdown);
            if (typeof option.rest === 'string') {
                element.innerHTML = option.rest;
                return;
            }
            if (option.rest - 0 <= 0) {
                element.innerHTML = format.replace(/\w/g, '0');
                return;
            }
            if (!(typeof option.rest === 'number' && option.rest > 0)) return;
            function formatRest(t) {
                var h = Math.floor(t / 3600);
                var M = Math.floor(t % 3600 / 60);
                var s = t % 60;
                var hh = h.padLeft(2, '0');
                var MM = M.padLeft(2, '0');
                var ss = s.padLeft(2, '0');
                return format.replace('hh', hh).replace('MM', MM).replace('ss', ss).replace('h', h).replace('M', M).replace('s', s);
            }
            element.innerHTML = formatRest(option.rest);
            ko.INTERVAL.bindingHandlers_countdown = setInterval(function () {
                if (option.rest < 1) {
                    clearInterval(ko.INTERVAL.bindingHandlers_countdown);
                    option.callback && option.callback(viewModel);
                } else {
                    element.innerHTML = formatRest(--option.rest);
                }
            }, 1000);
        }
    }

    /// 开奖翻转效果
    ko.bindingHandlers['flip'] = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            //<span class="lottery-result-ball" data-bind="css:'ball_'+$data,flip:$data.padLeft(CONFIG.numberLen,'0')">&nbsp;</span>
            var $element = $(element);
            $element.removeClass('flip');
            element.innerHTML = '';
            ko.utils.arrayForEach(valueAccessor()(), function (item) {
                var span = document.createElement('span');
                span.className = 'lottery-result-ball ball_' + item;
                span.innerHTML = item.padLeft(CONFIG.numberLen, '0');
                element.appendChild(span);
            });
            setTimeout(function () {
                $element.addClass('flip');
            }, 100);
        }
    };

    /// tap自定义绑定事件
    ko.bindingHandlers.tap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var newValueAccessor = function () {
                return {
                    tap: valueAccessor()
                };
            };
            return ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindingsAccessor, viewModel, bindingContext);
        }
    };

    /// select 触发change事件时获取option中的text文本
    ko.bindingHandlers["selectName"] = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            function init($element) {
                var value = $element.value;
                Array.prototype.map.call($element.children, function (ele) {
                    if (ele.children.length > 0) {
                        Array.prototype.map.call(ele.children, function (_ele) {
                            if (_ele.value === value) {
                                valueAccessor()(_ele.textContent.trim());
                            }
                        });
                    } else {
                        if (ele.value === value) {
                            valueAccessor()(ele.textContent.trim());
                        }
                    }
                });
            }

            element.addEventListener('change', function (event) {
                init(event.target);
            });

            init(element);
        }
    };
}

/// 弹窗提示
/// msg {String} 提示内容
/// status {Boolean} true绿色字体，false红色字体，默认false , 类型为{String}则视为颜色值处理
/// timeout {Number} 自动关闭时间，默认不关闭
/// callback {Function} 确认回调
utils.tip = function (msg, status, timeout, callback) {
    if (arguments.length === 3 && typeof timeout === 'function') {
        callback = timeout;
        timeout = 0;
    }
    clearTimeout(dialog.timeout);
    if (typeof status === "boolean") {
        status = status ? 'success' : 'error';
    }

    var d = dialog({
        id: 'DIALOG-TIP',
        title: "操作提示",
        padding: '30px',
        content: '<span class="text-' + status + '">' + msg + '</span>',
        okValue: "确定",
        ok: callback || function () { },
        beforeclose: callback || utils.noop
    });
    if (timeout) {
        dialog.timeout = setTimeout(function () {
            d.remove();
        }, timeout);
    }
    return d;
}

/// 滑动
/// xy {string} 'x'水平方向，'y'垂直方向
/// callback {Function} 移动时的回调
utils.touchmove = function (dom, xy, callback) {
    //$.fn.drag = function (xy, callback) {
    if (arguments.length === 2 && typeof xy === 'function') {
        callback = xy;
        xy = null;
    }
    var isX, isY;
    xy = xy ? xy.toString().toLowerCase() : '';
    if (xy !== 'x' && xy !== 'y') {
        isX = true;
        isY = true;
    } else {
        isX = xy === 'x';
        isY = xy === 'y';
    }

    var startX = 0, startY = 0;
    var originLeft, originTop;
    dom.addEventListener("touchstart", function (event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        originLeft = event.target.style.left.slice(0, -2) - 0;
        originTop = event.target.style.top.slice(0, -2) - 0;
    });

    dom.addEventListener("touchmove", function (event) {
        event.preventDefault(); /// 阻止某些浏览器的“滑屏前进后退”的功能
        if (callback) {
            event.dom = dom;
            event.startX = startX - originLeft;
            event.startY = startY - originTop;
            event.clientX = event.touches[0].clientX;
            event.clientY = event.touches[0].clientY;
            callback(event);
        } else {
            var newX = originLeft + event.touches[0].clientX - startX;
            var newY = originTop + event.touches[0].clientY - startY;
            if (isX) {
                switch (true) {
                    case newX < 0:
                        event.target.style.left = "0px";
                        break;
                    case document.documentElement.clientWidth < newX - dom.offsetWidth:
                        event.target.style.left = document.documentElement.clientWidth - dom.offsetWidth + 'px';
                        break;
                    default:
                        event.target.style.left = newX + 'px';
                }
            }

            if (isY) {
                switch (true) {
                    case newY < 0:
                        event.target.style.top = "0px";
                        break;
                    case document.documentElement.clientHeight < newY - dom.offsetHeight:
                        event.target.style.top = document.documentElement.clientHeight - dom.offsetHeight + 'px';
                        break;
                    default:
                        event.target.style.top = newY + 'px';
                }
            }
        }
    });
}

/// 字符串数字范围转成数组，如：'0-4'转成[0,1,2,3,4]
/// str {String}
/// return {NumberArray}
utils.numRangeToArray = function (str) {
    var numArr = str.match(/\d+/g) || [];
    if (numArr.length !== 2) {
        throw "输入的参数不正确，参数必须是两个数字有非数字分隔开，如：【1,2】【0-4】";
    }
    var min = numArr[0], max = numArr[1];
    var arr = [];
    for (var i = min; i <= max; i++) {
        arr.push(i);
    }
    return arr;
}

/// 索引转位置
/// 0=>个位，1=>十位，2=>百位，3=>千位，4=>万位
utils.indexToPos = function (index) {
    switch (index - 0) {
        case 0:
            return "个位";
        case 1:
            return "十位";
        case 2:
            return "百位";
        case 3:
            return "千位";
        case 4:
            return "万位";
        default:
            return "";
    }
}

/// 位置转索引
/// 个=>0，十=>1，百=>2，千=>3，万=>4
utils.posToIndex = function (pos) {
    pos = pos.replace(/[^万千百十个]+/g, '');
    pos = pos.replace('个', 0).replace('十', 1).replace('百', 2).replace('千', 3).replace('万', 4);
    var arr = pos.split('');
    arr.sort(function (a, b) {
        return a - b > 0 ? -1 : 1;
    });
    return arr.join('');
}

/// 数组map方法
utils.map = function (arr, mapping) {
    return Array.prototype.map ? arr.map(mapping) : ko.utils.arrayMap(arr, mapping);
}

/// 对数字数组进行排序
/// arr {Array}
/// order {Number} 1(正序) or -1(倒序)
utils.sort = function (arr, order) {
    order = order === undefined ? 1 : order - 0;
    arr.sort(function (a, b) {
        return a - b > 0 ? order : -order;
    });
    return arr;
}

/// 二维数组转成字符串
/// arr {ArrayArray}
/// sep1 {String} 里面的数组的拼接符
/// sep2 {String} 外面的数组的拼接符
utils.arr2dToString = function (arr, sep1, sep2) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        newArr.push(arr[i].join(sep1));
    }
    return newArr.join(sep2);
}

/// 过滤字符串中重复的字符
utils.stringFilterMulti = function (str) {
    var o = {};
    str = String(str);
    ko.utils.arrayForEach(str.split(''), function (item) {
        o[item] = '';
    });
    if (Object.keys) {
        return Object.keys(o).join('');
    } else {
        var s = '';
        for (var i in o) {
            s += i;
        }
        return s;
    }
}

/// arr {Array} 生成随机数的范围，默认[0,9]
/// return {Number}
utils.random = function (arr) {
    return $.isArray(arr) ? Math.floor(Math.random() * (arr[1] + 1 - arr[0]) + arr[0]) : Math.floor(Math.random() * 10);
}

utils.cookie = {
    get: function (name) {
        var name = name.replace('.', '\\.')
        var reg = new RegExp(" " + name + "=[\\S^;]*", "g");
        var arr = (" " + document.cookie + ";").match(reg);
        if (arr === null) return null;
        return decodeURIComponent(arr[0].replace(/^.*=/, '').slice(0, -1));
    },
    /// name:Cookie名称,  value:Cookie值,  expires:过期时间（天）
    set: function (name, value, expires, path, domain, secure) {
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = name + "=" + escape(value) + ((expires) ? ";expires=" +
            expires_date.toGMTString() : "") + ((path) ? ";path=" +
            path : "") + ((domain) ? ";domain=" + domain : "") +
            ((secure) ? ";secure" : "");
    },
    remove: function (name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" + ((path) ? ";path=" + path : "") +
                ((domain) ? ";domain=" + domain : "") +
                ";expires=Thu,01-Jan-1970 00:00:01 GMT";
        }
    }
};

/// 本地存储
/// @key {String} 存储名称
/// @value {String} 存储的值
/// @path {String} cookie存储的路径（不支持localStorage时用到，默认根路径）
utils.localStore = function (key, value, path) {
    if (value) {
        if (window.localStorage) {
            localStorage.setItem(key, value);
        } else {
            utils.cookie.set(key, vlaue, 365, path || '/');
        }
    } else {
        return window.localStorage ? localStorage.getItem(key) : utils.cookie.get(key);
    }
}

/**
 * 控制流/同步
 * @param {Array} arr
 * @param {Function} callback1 传递两个参数 (item,next)，执行完一项则需执行next()才能执行下一项
 * @param {Function} callback2 出错或执行完时回调,参数为null则为成功
 * @returns {*}
 */
utils.async = function (arr, callback1, callback2) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return callback2(new Error('第一个参数必须为数组'));
    }
    if (arr.length === 0)
        return callback2(null);
    (function walk(i) {
        if (i >= arr.length) {
            return callback2(null);
        }
        callback1(arr[i], function () {
            walk(++i);
        });
    })(0);
    return function () {
        arr.length = 0;
    }
}

/// 日期格式化
Date.prototype.format = function (str) {
    str = str || 'yyyy/MM/dd hh:mm:ss';
    var y = this.getFullYear();
    var M = this.getMonth() + 1;
    var d = this.getDate();
    var h = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();
    function f(x) {
        return x < 10 ? '0' + x : x;
    }
    return str.replace(/y+/, y).replace(/M{2,}/, f(M)).replace(/d{2,}/, f(d))
        .replace('M', M).replace('d', d)
        .replace(/h{2,}/, f(h)).replace(/m{2,}/, f(m)).replace(/s{2,}/, f(s))
        .replace('h', h).replace('m', m).replace('s', s);
}

/// 将数组/对象转成ko.observable
/// source {Object/Array}
utils.toObservable = function (source) {
    if (!window.ko) return source;
    var classof = utils.classof(source);

    function _obj(o) {
        for (var i in o) {
            o[i] = ko.observable(o[i]);
        }
        return o;
    }
    function _arr(_o) {
        var o = _o();
        for (var i = 0; i < o.length; i++) {
            var _classof = utils.classof(o[i]);
            if (_classof === 'array') {
                o[i] = ko.observableArray(o[i]);
                _arr(o[i]());
            } else if (_classof === 'object') {
                _obj(o[i]);
            } else {
                o[i] = ko.observable(o[i]);
            }
        }
    }

    if (classof === 'object') {
        _obj(source);
    } else if (classof === 'array') {
        source = ko.observableArray(source);
        _arr(source);
    }
    return source;
}

/// 修正精度问题
/// val {Number}
/// len {Number} 默认：9
utils.toFixed = function (val, len) {
    len = len === undefined ? 9 : len;
    return (val - 0).toFixed(len) - 0;
}

!String.prototype.repeat && (String.prototype.repeat = function (times) {
    var s = '';
    for (var i = 0; i < times; i++) {
        s += this;
    }
    return s;
});

/// 加减乘除的处理
; (function () {
    function calc(y, method) {
        var x = this, s;
        y = y - 0;
        var xLen = ((x + '').match(/\.(\d+)/) || [0, ''])[1].length;
        var yLen = ((y + '').match(/\.(\d+)/) || [0, ''])[1].length;
        var max = Math.max(xLen, yLen);
        var diff = Math.abs(xLen - yLen);

        if (xLen > yLen) {
            x = (x + '').replace('.', '') - 0;
            y = (y + '').replace('.', '') + '0'.repeat(diff) - 0;
        } else if (xLen < yLen) {
            x = (x + '').replace('.', '') + '0'.repeat(diff) - 0;
            y = (y + '').replace('.', '') - 0;
        } else {
            x = (x + '').replace('.', '') - 0;
            y = (y + '').replace('.', '') - 0;
        }

        switch (method) {
            case 'plus':
                s = x + y + '';
                break;
            case 'sub':
                s = x - y + '';
                break;
            case 'pow':
                s = (x * y) + '';
                max *= 2;
                break;
            case 'div':
                if (y === 0) throw '除数不能为0';
                s = (x / y) + '';
                max *= 2;
                break;
        }
        if (s.length <= max) {
            return '0.' + '0'.repeat(max - s.length) + s - 0;
        } else {
            var reg = new RegExp('(\\d+)(\\d{' + max + '})') || [];
            return s.match(reg).slice(1).join('.') - 0;
            //return (s.substr(0, s.length - max) + '.' + s.substr(-max)) - 0;
        }
    }

    /// 加
    !Number.prototype.plus && (Number.prototype.plus = function (y) {
        return calc.call(this, y, 'plus');
    });

    /// 减
    !Number.prototype.sub && (Number.prototype.sub = function (y) {
        return calc.call(this, y, 'sub');
    });

    /// 乘
    !Number.prototype.pow && (Number.prototype.pow = function (y) {
        return calc.call(this, y, 'pow');
    });

    /// 除
    !Number.prototype.div && (Number.prototype.div = function (y) {
        return calc.call(this, y, 'div');
    });
})();



/// 检查数值是否在数组范围区间内
/// @num {Number}
/// @arr {Array}
/// return Boolean
utils.numInArrRange = function (num, arr) {
    return num >= arr[0] && num <= arr[1];
}

utils.dom = {
    isReady: false,
    queue: [],
    ready: function (callback) { /// 类似jQuery的ready
        if (this.isReady) return callback();

        this.queue.push(callback);
        if (this.queue.length === 1) {
            var that = this;
            var completed = function () {
                that.isReady = true;
                document.removeEventListener("DOMContentLoaded", completed);
                window.removeEventListener("load", completed);
                that.queue.map(function (item) {
                    item();
                });
                that.queue.length = 0;
            }
            document.addEventListener("DOMContentLoaded", completed);
            window.addEventListener("load", completed);
        }
    }
};

utils.event = {};

/// 绑定一次事件
/// @elements DOM对象或DOM对象数组
utils.event.once = function (elements, eventName, fn, useCapture) {
    if (!/(html)|(node)/.test(utils.classof(elements))) return;

    var nodeList = "[object NodeList]" === elements.toString() ? elements : [elements];
    var func = function (event) {
        event.preventDefault();
        /// 当elements为dom集合时 会将集合中所有dom的事件移除
        Array.prototype.map.call(nodeList, function (element) {
            element.removeEventListener(eventName, func);
        });
        fn(event);
    };

    Array.prototype.map.call(nodeList, function (element) {
        element.addEventListener(eventName, func, useCapture);
    });
}

/// 触发事件（只支持原生事件）
utils.event.trigger = function (el, navtiveEventName) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(navtiveEventName, true, false);
    el.dispatchEvent(event);
}

/// 根据dom和tagName查找父级（含自己）
utils.parent = function (dom, tagName) {
    var i = 0, ele = dom, equal = false, tagName = tagName.toUpperCase();
    if (tagName === 'BODY') return document.body;
    while (i === 0) {
        if (ele.tagName === 'BODY') i++;
        if (ele.tagName !== tagName) {
            ele = ele.parentElement;
        } else {
            equal = true;
            i++;
        }
    }
    return ele;
}

/// 往上冒泡 找 元素的tagName为tagName的元素
utils.equalTagName = function (dom, tagName) {
    var i = 0, ele = dom, equal = false, tagName = tagName.toUpperCase();
    if (tagName === 'BODY') return true;
    while (i === 0) {
        if (ele.tagName === 'BODY') i++;
        if (ele.tagName !== tagName) {
            ele = ele.parentElement;
        } else {
            equal = true;
            i++;
        }
    }
    return equal;
}

utils.ajax = function (options) {
    if (utils.classof(options) !== 'object') throw "传入的参数必须为对象";

    if (utils.classof(options.success) !== 'function') options.success = utils.noop;
    if (utils.classof(options.error) !== 'function') options.error = utils.noop;
    if (utils.classof(options.complete) !== 'function') options.complete = utils.noop;

    var request = new XMLHttpRequest(), type = (options.type || 'get').toUpperCase();
    request.open(type, options.url, true);

    if (type === 'POST') {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }

    request.onload = function () {
        options.complete();
        if (request.status >= 200 && request.status < 400) {
            // Success!
            //var resp = request.responseText;
            options.success(request.responseText);
        } else {
            // We reached our target server, but it returned an error
            options.error(request.status);
        }
    };

    request.onerror = options.error || utils.noop;

    var sendData = '';
    if (utils.classof(options.data) === 'object') {
        var arr = [];
        for (var i in options.data) {
            arr.push(i + '=' + options.data[i]);
        }
        sendData = arr.join('&')
    } else {
        sendData = options.data === undefined ? '' : options.data.toString();
    }

    request.send(sendData);
}

/**
*客服 url : 窗口地址
*/
utils.hotLine = function (url) {
    //没有客服地址时
    if (!url) {
        dialog({ content: "功能维护中", ok: function () { } });
        return false;
    }
    var div = document.createElement("div"), liveID = "live" + new Date().getTime();
    var liveHTML = [
            '<div class="page">',
                '<header>',
                    '<div class="head_main">',
                        '<span class="">在线客服</span>',
                    '</div>',
                    '<div class="fl"><a href="javascript:;" onclick="utils.hotLine.back(\'' + liveID + '\')" class="retum-btn"><i class="iconfont icon-angleleft"></i>关闭</a></div>',
                '</header>',
                '<div class="live_iframe-box">',
                    '<iframe class="live_iframe" src="' + url + '"></iframe>',
                '</div>',
            '</div>'
    ].join("");
    div.id = liveID;
    div.className = "d-mask live_d-mask";
    div.innerHTML = liveHTML;
    document.body.appendChild(div);
}
utils.hotLine.back = function (id) {
    dialog({
        content: "是否退出当前聊天？", ok: function () {
            var liveBox = document.getElementById(id);
            document.body.removeChild(liveBox);
        }, cancel: function () { }
    });
}

/**
*APP 下载窗口
*/
utils.appdown = function (url) {
    //没有客服地址时
    if (!url) {
        dialog({ content: "功能维护中", ok: function () { } });
        return false;
    }
    var div = document.createElement("div"), liveID = "live" + new Date().getTime();
    var liveHTML = [
            '<div class="page">',
                '<header>',
                    '<div class="head_main">',
                        '<span class="">APP下载</span>',
                    '</div>',
                    '<div class="fl"><a href="javascript:;" onclick="utils.appdown.back(\'' + liveID + '\')" class="retum-btn"><i class="iconfont icon-angleleft"></i>关闭</a></div>',
                '</header>',
                '<div class="live_iframe-box">',
                    '<iframe class="live_iframe" src="' + url + '"></iframe>',
                '</div>',
            '</div>'
    ].join("");
    div.id = liveID;
    div.className = "d-mask live_d-mask";
    div.innerHTML = liveHTML;
    document.body.appendChild(div);
}
utils.appdown.back = function (id) {
    dialog({
        content: "是否退出APP下载？", ok: function () {
            var liveBox = document.getElementById(id);
            document.body.removeChild(liveBox);
        }, cancel: function () { }
    });
}

/**
*充值支付窗口
*/
utils.recharge = function (url) {
    //没有客服地址时
    if (!url) {
        dialog({ content: "功能维护中", ok: function () { } });
        return false;
    }
    var div = document.createElement("div"), liveID = "live" + new Date().getTime();
    var liveHTML = [
            '<div class="page">',
                '<header>',
                    '<div class="head_main">',
                        '<span class="">充值窗口</span>',
                    '</div>',
                    '<div class="fl"><a href="javascript:;" onclick="utils.recharge.back(\'' + liveID + '\')" class="retum-btn"><i class="iconfont icon-angleleft"></i>关闭</a></div>',
                '</header>',
                '<div class="live_iframe-box">',
                    '<iframe class="live_iframe" src="' + url + '"></iframe>',
                '</div>',
            '</div>'
    ].join("");
    div.id = liveID;
    div.className = "d-mask live_d-mask";
    div.innerHTML = liveHTML;
    document.body.appendChild(div);
}

/**
*真人 URL : 窗口地址
*/
utils.lg = function (url) {
    //没有客服地址时
    if (!url) {
        dialog({ content: "功能维护中", ok: function () { } });
        return false;
    }
    var div = document.createElement("div"), liveID = "live" + new Date().getTime();
    var liveHTML = [
            '<div class="page">',
                '<header>',
                    '<div class="head_main">',
                        '<span class="">真人视讯</span>',
                    '</div>',
                    '<div class="fl"><a href="javascript:;" onclick="utils.lg.back(\'' + liveID + '\')" class="retum-btn"><i class="iconfont icon-angleleft"></i>关闭</a></div>',
                '</header>',
                '<div class="live_iframe-box">',
                    '<iframe class="live_iframe" src="' + url + '"></iframe>',
                '</div>',
            '</div>'
    ].join("");
    div.id = liveID;
    div.className = "d-mask live_d-mask";
    div.innerHTML = liveHTML;
    document.body.appendChild(div);
}

utils.hotLine.back = function (id) {
    dialog({
        content: "是否退出当前聊天？", ok: function () {
            var liveBox = document.getElementById(id);
            document.body.removeChild(liveBox);
        }, cancel: function () { }
    });
}

utils.recharge.back = function (id) {
    dialog({
        content: "是否退出充值界面？", ok: function () {
            var liveBox = document.getElementById(id);
            document.body.removeChild(liveBox);
        }, cancel: function () { }
    });
}

utils.lg.back = function (id) {
    dialog({
        content: "是否退出真人界面？", ok: function () {
            var liveBox = document.getElementById(id);
            document.body.removeChild(liveBox);
        }, cancel: function () { }
    });
}


///替换历史记录中的当前记录==jicemoon-20160928
utils.locationReplace = function (url) {
    if (history.replaceState) {
        history.replaceState(null, document.title, url);
        history.go(0);
    } else {
        location.replace(url);
    }
}
