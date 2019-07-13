<template>
    <div>
        <headerBet></headerBet>
        <div class="wrap">
            <div class="bet-container flex">
                <div>
                    <div class="betTime-wrap">
                        <betCtTimeHead @updated="betTableListUpdated"></betCtTimeHead>
                    </div>
                    <div class="img-interval"></div>
                    <div class="bet-wrap">
                        <div class="betContent-wrap">
                            <router-view @betTableListFun="betTableListFun"
                                         @updated="betTableListUpdated"></router-view>
                        </div>
                        <div class="basket-wraps" v-if="$route.name!='credit'">
                            <div style="margin-left:1px;margin-top:1px;height:200px;">
                                <betTableList :betTableList="betTableList" @UpdateList="UpdateList"
                                              @updated="betTableListUpdated" @chaseCheck="chaseCheck"
                                               :isChaseCheck="isChaseCheck" :zuitouStu="zuitouStu"></betTableList>
                            </div>
                        </div>
                        <div class="betChaseNum">
                            <betChaseNum v-if="isChaseCheck" @zuitouwancheng="zuitouwancheng" @chaseCheck="chaseCheck" :chaseTableList="chaseTableList"
                                         @updated="betTableListUpdated"></betChaseNum>
                        </div>


                        <Spin fix class="stoppppppp" v-if="isstop">
                            <img :src="stopimg" style="height: 100%;width: 100%">
                        </Spin>
                    </div>
                </div>
                <div class="result-wrap">
                    <betRecord :Updated="Updated"></betRecord>
                </div>
            </div>
        </div>

        <footer-cop></footer-cop>
    </div>
</template>

<script>
	import headerBet from '@/views/betHeader/index.vue'
	import footerCop from '@/views/footer/index.vue'
	import betCtTimeHead from '@/views/betCtTimeHead/index.vue'
	import betRecord from '@/views/betRecord/index.vue'
	import betChaseNum from '@/views/betChaseNum/index.vue'
    import betTableList from '@/views/betTableList/index.vue'
	export default {
		data() {
			return {
				Updated: '', //通知 投注列表记录更新
				betTableList: null,
				chaseTableList: [], //拷贝一份 投注列表数据 传给追号
                isChaseCheck: false, //是否选中追号复选框,
                zuitouStu:null,
                stopimg:require('./stopsp.jpg')
			}
        },
        computed: {
            isstop:function(){
                return this.$store.state.isstop
            }
        },
		created() {
        },
        watch:{

        },
		components: {
			footerCop,
			headerBet,
			betCtTimeHead,
			betRecord,
			betChaseNum,
			betTableList
		},
		methods: {
			//通知 投注列表记录更新
			betTableListUpdated(v) {
				this.Updated = v
			},
			//号码篮子 有增加 删除 所以需要 号码篮子更新后的 数据 传给 追号 是个数组
			UpdateList(list) {
				this.chaseTableList = list;
			},
			betTableListFun(list) {
				this.betTableList = list;
			},
			chaseCheck(value) {
				this.isChaseCheck = value;
            },
            zuitouwancheng(value){
                this.zuitouStu = value
            }
		}
	}

</script>

<style lang="less" scoped>
    .wrap {
        position: relative;
        padding: 30px;
        width: 100%;
        background-color: #e6e6e6;
        background-image: url(../../../static_pc/images/bg.png);
        margin: 0;
        /deep/ .ivu-table:after,
        /deep/ .ivu-table:before {
            width: 0;
        }
        /deep/ .ivu-table-wrapper {
            border: 0;
        }
        /deep/ .ivu-table td,
        /deep/ .ivu-table th {
            border-bottom: 1px dashed #e9eaec;
        }
        /deep/ .ivu-table-cell {
            white-space: nowrap;
            text-overflow: clip;
        }
    }

    .bet-container {
        padding: 10px 0;
        width: 1100px;
        background-color: #e8e9ee;
        background-image: linear-gradient(to bottom, #f6f7fb 0%, #e4e5ea 150px, #e4e5ea 100%);
        position: relative;
        margin: 0 auto;
        border: 1px solid #e6e6e6;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        min-height: 600px;
    }

    .bet-wrap {
        width: 830px;
        padding: 10px;
        position: relative;
    }

    .betTime-wrap {
        width: 830px;
    }

    .betContent-wrap,
    .betChaseNum {
        width: 810px;
    }

    .img-interval {
        width: 830px;
        height: 27px;
        background-image: url(../../../static_pc/images/Middle_line.png);
        background-repeat: repeat-x;
        background-position: bottom left;
    }

    .result-wrap {
        width: 260px;
        background-color: #fff;
    }

    .basket-wraps {
        position: relative;
        margin-left: 32px;
        height: 200px;
        margin-top: 10px;
    }

    .basket-wraps::before {
        /* content: '号码篮';
        position: absolute;
        left: -32px;
        top: 50%;
        transform: translateY(-50%);
        writing-mode: vertical-lr;
        text-orientation: upright;
        line-height: 32px;
        white-space: nowrap;
        color: #c3c3c3;
        font-size: 0.8em;
        z-index: 9; */
        content: '号码篮';
        position: absolute;
        left: -22px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 20px;
        width: 20px;
        white-space: pre-wrap;
        color: #c3c3c3;
        font-size: 0.8em;
        z-index: 9;
    }

    .basket-wraps::after {
        content: '';
        position: absolute;
        left: -32px;
        top: 0;
        width: 32px;
        bottom: 0;
        background-color: #f7f7f7;
    }

    .high-light {
        color: #e60b0b;
    }

    div.main-btn {
        margin: 0 auto;
        width: 120px;
    }
</style>
<style>
.ivu-tooltip-inner{
    max-width: 1000px;
}
.stoppppppp .ivu-spin-main{
    width: 100%;
    height: 100%;
}
.stoppppppp {
    z-index: 99;
}
.stoppppppp.ivu-spin-show-text .ivu-spin-text{
    height: 100%;
}
</style>

