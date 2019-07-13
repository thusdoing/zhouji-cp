<template>
    <div class="rebateDes" style="width: 100%;">
        <div id="rebateNav" class="rebateNav fix">
            <a @click="select(index)" :class="curr==index?'curr':''" play-id="SSC" id="game_0" v-for="(item, index) in game" :key="index">{{item.label}}</a>
        </div>
        <div id="rebate_game_0" class="rebateContent fix" :class="flag?'minx':''" v-if="GameGroupList.length>0">
            <ul id="rebateTitle" class="rebateTitle">
                <li>
                    <i>玩法</i>
                    <span></span>
                    <em>返点</em>
                </li>
                <li v-for="(item, index) in GameGroupList" :key="index">{{item.groupClassName}}</li>
            </ul>
            <div class="rebateTableCon">
                <i></i>
                <em></em>
                <div class="rebateTable fix">
                    <ul @click="detaliRebate(rebate)" data-id="9.0" game-type="0" name="game_0_9.0" class="mixLine isClass" v-for="(rebate, index) in userRebateList"
                        :key="index">
                        <li>{{rebate}}</li>
                        <li v-for="(item, index) in GameGroupList" :key="'w'+index">赔率{{Number(asmd.mul(asmd.numDiv(item.bonusAmt,0.9),asmd.numDiv(rebate+90,100))).toFixed(3) }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import asmd from '@/assets/js/asmd.js'
    export default {
        data() {
            return {
                flag: false,
                asmd: asmd,
                curr: 0,
                game: [],
                GameGroupList: [],
                userRebate: 0,
                userRebateList: [],
                GameRebateBonusGroupInfoData: [],
                userRebateobj: {}
            }
        },
        created() {
            this.getGameRebateBonusGroupInfo()
        },
        methods: {
            select(index) {
                this.GameGroupList = this.GameRebateBonusGroupInfoData[index].bonusList
                this.userRebate =this.userRebateobj[this.GameRebateBonusGroupInfoData[index].gameType] 
                this.handleRebate()
                this.curr = index
            },
            handleRebate() {
                this.userRebateList = []
                for (let i = this.userRebate; i >= 0; i--) {
                    if (this.userRebateList.length !== 0) {
                        this.userRebateList.push(Math.floor(i))
                    } else {
                        this.userRebateList.push(parseFloat(i))
                    }
                }
            },
            detaliRebate(rebate) {
                if (rebate == 0) return
                if (this.flag == true) {
                    this.flag = false
                    this.handleRebate();
                    return
                }
                this.flag = true
                this.userRebateList = []
                for (let i = rebate * 10; i > Math.floor(rebate - 0.01) * 10; i--) {
                    this.userRebateList.push(i / 10)
                }

            },
            getGameRebateBonusGroupInfo() {
                this.$http.get('/getGameRebateBonusGroupInfo', null, 1).then(res => {
                    if (res.data.success) {
                        this.GameRebateBonusGroupInfoData = res.data.list
                        this.GameGroupList = res.data.list[0].bonusList
                        this.userRebate = res.data.map[res.data.list[0].gameType]
                        this.handleRebate()
                        this.game = res.data.list.map((el, index) => {
                            let obj = {}
                            obj.label = el.gameTypeName
                            obj.value = index
                            return obj
                        })
                        this.userRebateobj = res.data.map
                    } else {
                        this.$Modal.success({ title: '提示信息', content: res.data.msg });
                    }
                })
            },
        }
    }
</script>
<style>
    .rebateDes {
        width: 1200px;
        min-width: 1200px;
        min-height: calc(100vh - 20px);
        background: #fff;
        margin: 10px auto
    }

    .rebateDes .notContent {
        padding: 35vh 0!important;
        font-size: 16px
    }

    .rebateNav {
        background: linear-gradient(90deg, #56585f, #68686e 50%, #4b4e56);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#56585f", endColorstr="#4b4e56", GradientType=0);
        height: 65px;
        padding: 0 20px;
        position: relative
    }

    .rebateNav a {
        width: 143px;
        height: 44px;
        display: block;
        position: absolute;
        text-align: center;
        background: url(/static_pc/images/rebateBtn.png) no-repeat;
        top: 21px;
        line-height: 50px;
        font-size: 16px;
        color: #333;
        text-shadow: 1px 1px 0 #c3c3c3
    }

    .rebateNav a:first-child {
        left: 20;
        z-index: 9
    }

    .rebateNav a:nth-child(2) {
        left: 135px;
        z-index: 8
    }

    .rebateNav a:nth-child(3) {
        left: 250px;
        z-index: 7
    }

    .rebateNav a:nth-child(4) {
        left: 365px;
        z-index: 6
    }

    .rebateNav a:nth-child(5) {
        left: 480px;
        z-index: 5
    }

    .rebateNav a:nth-child(6) {
        left: 595px;
        z-index: 4
    }

    .rebateNav a:nth-child(7) {
        left: 710px;
        z-index: 3
    }

    .rebateNav a:nth-child(8) {
        left: 825px;
        z-index: 2
    }

    .rebateNav a:nth-child(9) {
        left: 940px;
        z-index: 1
    }

    .rebateNav a:nth-child(10) {
        left: 1055px;
        z-index: 0
    }

    .rebateNav a:nth-child(11) {
        left: 1170px;
        z-index: -2
    }

    .rebateNav a:nth-child(12) {
        left: 1285px;
        z-index: -3
    }

    .rebateNav a:nth-child(13) {
        left: 1400px;
        z-index: -4
    }

    .rebateNav .curr {
        background: url(/static_pc/images/rebateBtnChecked.png) no-repeat;
        z-index: 99!important
    }

    .rebateContent {
        padding: 20px;
        position: relative;
        padding-bottom: 50px;
        overflow: hidden;
    }

    .rebateContent .isClass {
        position: relative
    }

    .rebateContent .isClass li:first-child {
        cursor: pointer;
        font-weight: 700
    }

    .rebateContent .mixLine li:first-child:before {
        content: "\5C55\5F00";
        position: absolute;
        right: 0;
        top: -10px;
        color: #aaa;
        font-size: 12px;
        font-weight: 400
    }

    .rebateContent .isClass:hover {
        background: #fcfcfc
    }

    .rebateContent .isClass:last-child:before {
        display: none!important
    }

    .rebateContent ul {
        width: 160px;
        float: left
    }

    .rebateContent ul:last-child li:first-child {
        cursor: auto
    }

    .rebateContent ul:last-child li:first-child:before {
        display: none
    }

    .rebateContent ul li {
        height: 40px;
        width: 100%;
        line-height: 40px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
        border-top: 1px solid #ddd
    }

    .rebateContent ul li:last-child {
        border-bottom: 1px solid #ddd
    }

    .rebateTitle {
        border-left: 1px solid #ddd;
        font-weight: 700
    }

    .rebateTitle li {
        width: 100%!important;
        border-right: 1px solid #ddd
    }

    .rebateTitle li:first-child {
        position: relative
    }

    .rebateTitle li:first-child i {
        position: absolute;
        left: 15px;
        bottom: -6px;
        z-index: 2
    }

    .rebateTitle li:first-child em {
        position: absolute;
        right: 15px;
        top: -6px;
        z-index: 2
    }

    .rebateTitle li:first-child:before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        border-bottom: 40px solid #ddd;
        border-right: 144px solid transparent;
        content: "";
        z-index: 1
    }

    .rebateTitle li:first-child:after {
        position: absolute;
        left: 0;
        right: 1px;
        top: 1px;
        bottom: 0;
        border-bottom: 39px solid #fff;
        border-right: 140px solid transparent;
        content: "";
        z-index: 1
    }

    .rebateTableCon {
        position: relative;
        /* float: left; */
        overflow: hidden
    }

    .rebateTableCon li:first-child {
        background: #f8f8f8;
        text-align: center;
        font-size: 16px
    }

    .rebateTableCon em,
    .rebateTableCon i {
        position: absolute;
        width: 21px;
        height: 40px;
        top: 21px;
        cursor: pointer;
        background: #f8f8f8;
        z-index: 2;
        display: none
    }

    .rebateTableCon em:before,
    .rebateTableCon i:before {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        left: 6px;
        top: 14px
    }

    .rebateTableCon em {
        left: 148px
    }

    .rebateTableCon i {
        right: 21px
    }

    .rebateTable ul {
        width: 102px
    }

    .rebateTable ul li {
        border-right: 1px solid #ddd
    }

    .testShow {
        margin: 16px auto -10px 20px;
        font-size: 12px;
    }

    .noneed {
        display: none
    }

    .minx .mixLine li:first-child:before {
        content: "\6536\56DE";
        position: absolute;
        right: 0;
        top: -10px;
        color: #aaa;
        font-size: 12px;
        font-weight: 400
    }
</style>