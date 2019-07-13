<style scoped>
@import '../assets/header.css';
@import 'custInfos/css/updateLoginPwd.css';
.cMkcsp {
-webkit-flex: 1;
-ms-flex: 1;
flex: 1;
background-color: #ffffff;
position: absolute;
top: 44px;
left: 0;
right: 0;
}
.hVedSw {
padding: 7px 8px;
background: #e6e6e6;
position: relative;
display: -webkit-flex;
display: flex;
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
}
.hVedSw input {
padding: 6px 10px;
text-align: center;
font-size: 14px;
border: 0;
box-sizing: border-box;
-webkit-flex: 1 1 100%;
-ms-flex: 1 1 100%;
flex: 1 1 100%;
border-radius: 5px;
background: #fff;
-webkit-transition: all .5s ease-in-out;
transition: all .5s ease-in-out;
}
.hVedSw.focusSearch input {
text-align: left;
-webkit-flex: 8 1 90%;
-ms-flex: 8 1 90%;
flex: 8 1 90%;
padding: 6px 10px 6px 30px;
}
.cQudZf {
color: #0076ff;
font-size: 16px;
-webkit-transition: all .5s ease-in-out;
transition: all .5s ease-in-out;
-webkit-flex: 0 0 0;
-ms-flex: 0 0 0;
flex: 0 0 0;
overflow: hidden;
white-space: nowrap;
}
.cQudZf.show {
margin-left: 10px;
-webkit-flex: 1 1 34px;
-ms-flex: 1 1 34px;
flex: 1 1 34px;
}
.hVedSw span {
position: absolute;
white-space: nowrap;
left: 50%;
top: 12px;
font-size: 14px;
color: #9b9b9b;
padding-left: 22px;
-webkit-transition: all .5s ease-in-out;
transition: all .5s ease-in-out;
-webkit-transform: translateX(-50%);
-ms-transform: translateX(-50%);
transform: translateX(-50%);
pointer-events: none;
background: url(/static/searchGlyph@2x.png) no-repeat left center/15px auto;
}
.hVedSw.focusSearch span {
left: 20px;
-webkit-transform: translateX(0);
-ms-transform: translateX(0);
transform: translateX(0);
}
.gxYKxK {
background-color: #ffffff;
overflow-y: auto;
height: calc(100vh - 89px);
}
.cEbljA {
padding: 10px 20px 10px 10px;
border-bottom: 1px solid #e6e6e6;
}
</style>
<template>
    <div>
        <wv-header title="选择" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="sc-cgzHhG cMkcsp">
            <div class="hVedSw" :class="isFocusSearch">
                <input type="text" value="" id="searchInput" @click="hunt()">
                <a class="sc-blIhvV cQudZf" :class="isShow" @click="cancel()">取消</a>
                <span>搜寻</span>
            </div>
            <div class="sc-bYTsla gxYKxK">
                <div class="sc-gFXMyG cEbljA" v-for="item in bankTable">{{item}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            bankTable:[1,1],//列表
            isFocusSearch:'',
            isShow:'',
        }
    },
    methods: {
        hunt(){
            this.isFocusSearch = 'focusSearch';
            this.isShow = 'show';
        },
        cancel(){
            this.isFocusSearch = '';
            this.isShow = '';
        }
    },
    mounted () {
    }
}
</script>