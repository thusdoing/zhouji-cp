<template>
  <div id="app">   
    <router-view/>
  </div>
</template>

<script>
!function(win) {
    var win_doc = win.document
      , win_doc_doc = win_doc.documentElement
      , psd_w = 720 / 100
      , evt_fn = "orientationchange"in win ? "orientationchange" : "resize"
      , set_size = function() {
        var page_w = win_doc_doc.clientWidth || 320;       
        page_w > 720 && (page_w = 720),
        win_doc_doc.style.fontSize = page_w / psd_w + "px";
    };
    set_size();
    win_doc.addEventListener && (win.addEventListener(evt_fn, set_size, !1),
    win_doc.addEventListener("DOMContentLoaded", set_size, !1));
}(window);
export default {
  name: 'App'
}
</script>

<style>

@import "./style.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #F0F0F0;
  overflow: hidden;
 
}
</style>
