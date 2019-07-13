const addBookmark = function(url, title){
if (!url) {url = window.location}
    if (!title) {title = document.title}
    var browser=navigator.userAgent.toLowerCase();
    if (window.sidebar) { // Mozilla, Firefox, Netscape
        window.sidebar.addPanel(title, url,"");
    } else if( window.external) { // IE or chrome
        if (browser.indexOf('chrome')==-1){ // ie
            window.external.AddFavorite( url, title);
        } else { // chrome
            alert('您的浏览器不支援自动加入我的收藏！请手动或按Ctrl+D加入');
        }
    }
    else if(window.opera && window.print) { // Opera - automatically adds to sidebar if rel=sidebar in the tag
        return true;
    }
    else if (browser.indexOf('konqueror')!=-1) { // Konqueror
        alert('您的浏览器不支援自动加入我的收藏！请手动或按Ctrl+B加入');
    }
    else if (browser.indexOf('webkit')!=-1){ // safari
        alert('您的浏览器不支援自动加入我的收藏！请手动或按Ctrl+B(或者Command+D)加入');
    } else {
        alert('浏览器无法使用此链接添加书签。请手动添加此链接。')
    }
}
export default addBookmark