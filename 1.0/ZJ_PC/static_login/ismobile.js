//平台、设备和操作系统 ，返回ture或false,true表示是移动端，false表示不是移动端
function ismobile() {
    var mobileArry = ["iPhone", "iPad", "Android", "Windows Phone", "BB10; Touch", "BB10; Touch", "PlayBook", "Nokia"];
    var ua = navigator.userAgent;
    var res=mobileArry.filter(function(arr) {
        return ua.indexOf(arr) > 0;
    });
    return res.length > 0;
}