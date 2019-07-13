<template>
    <div>
        <template v-if="this.$route.params.gameMode=='official'">
            <div class="gameGroup">
                <template v-if="$route.params.gameType=='22'">
                    <div :class="{active:group.groupNo==item.groupNo}" v-for="(item, index) in gameGroup" :key="index" @click="selectedGroup(item)">{{item.groupName}}</div>
                </template>
                <template v-else>
                    <div :class="{active:bigGroup.groupClassNo==item.groupClassNo}" v-for="(item, index) in gameGroup" :key="index" @click="selectedBigGroup(item)">{{item.groupClassName}}</div>
                </template>
                <ButtonGroup v-if="$route.params.gameType!=66" vertical  class="cochange">
                    <Button type="error">官</Button>
                    <Button @click="switchMode(1)">信</Button>
                </ButtonGroup>
            </div>
            <ul v-if="$route.params.gameType!='22'" class="betFilterAnd">
                <li v-for="item in bigGroup.groupClassCones">
                    <span>{{item.groupClassConName}}</span>
                    <div>
                        <a v-for="sub in item.groupSettinges" @click="selectedGroup(sub)" :class="{active:group.groupNo==sub.groupNo}">{{sub.groupName}}</a>
                    </div>
                </li>
            </ul>
        </template>
        <template v-else>
            <div class="gameGroup">
                <div :class="{active:bigGroup.groupClassNo==item.groupClassNo}" v-for="(item, index) in gameGroup" :key="index" @click="selectedBigGroup(item)">{{item.groupClassName}}</div>
                
                <ButtonGroup v-if="$route.params.gameType!=66" vertical class="cochange">
                    <Button @click="switchMode(0)">官</Button>
                    <Button type="error">信</Button>
                </ButtonGroup>
            </div>
            <ul v-if="$route.params.gameType=='66'" class="betFilterAnd">
                    <li v-for="item in bigGroup.groupClassCones">
                        <span>{{item.groupClassConName}}</span>
                        <div>
                            <a v-for="sub in item.groupSettinges" @click="selectedGroup(sub)" :class="{active:group.groupNo==sub.groupNo}">{{sub.groupName}}</a>
                        </div>
                    </li>
                </ul>
        </template>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                gameGroup: [
                    { groupClassCones: [{ groupSettinges: [{}] }] }
                ],
                type1: '',
                type2: ''
            }
        },
        computed: {
            group: function () {
                return this.$store.state.selectedGroup
            },
            bigGroup: function () {
                return this.$store.state.selectedBigGroup
            }
        },
        created() {
            this.getGameGroupByGameWithGroup()
            this.getType()
        },
        watch: {
            '$route': function () {
                this.getGameGroupByGameWithGroup()
                this.getType()
            },
        },
        methods: {
            async getGameGroupByGameWithGroup() {
                
                this.$store.commit('setselectedGroup', { groupNo:'', bonusAmt:'' })
                this.$store.commit('setselectedBigGroup', { groupClassCones: [{ groupSettinges: [{}] }] })
                let type = this.$route.params.gameMode
                let obj = { gameNo: this.$route.params.gameNo, groupType: type == 'official' ? '0' : '1' }
                let res = await this.$store.cache.dispatch('getGameGroupByGameWithGroup', obj, { timeout: 6000000 })
                if(res.length==0){
                    if(type="official"){
                        return this.switchMode(1)
                    }else{
                        return this.switchMode(0)
                    }
                }
                if (this.$route.params.gameType == 22 && type=='official') {
                    let arr = []
                    res.map(el => {
                        el.groupClassCones.map(s => {
                            s.groupSettinges.map(j => {
                                arr.push(j)
                            })
                        });
                    })
                    this.gameGroup = arr
                    this.selectedGroup(arr[0])
                } else {
                    this.gameGroup = res
                    this.selectedBigGroup(res[0])
                    this.selectedGroup(res[0].groupClassCones[0].groupSettinges[0])
                }
                
            },
            selectedGroup(item) {
                this.$store.commit('setselectedGroup', item)
            },
            selectedBigGroup(item) {
                this.$store.commit('setselectedBigGroup', item)
                this.selectedGroup(item.groupClassCones[0].groupSettinges[0])
            },
            getType() {
                this.type1 = this.$route.params.gameMode == 'official' ? 'error' : ''
                this.type2 = this.$route.params.gameMode == 'credit' ? 'error' : ''
            },
            switchMode(data) {
                let gameNo = this.$route.params.gameNo
                let gameType = this.$route.params.gameType
                if(data==1) return this.$router.replace(`/bet/${gameType}/${gameNo}/credit`)
                return this.$router.replace(`/bet/${gameType}/${gameNo}/official`)
            }
        },
    }

</script>
<style lang="less">
    .gameGroup {
        padding: 13px 15px;
        border-bottom: 1px solid #ddd;
        background: #F0F4F5;
        line-height: 24px;
        font-size: 14px;
        position: relative;
    }

    .gameGroup div {
        display: inline-block;
        padding: 0 5px;
        margin-right: 10px;
        border-radius: 5px;
        cursor: pointer;
        color: #555;
    }

    .cochange{
        position: absolute;right: -15px;top: 0px;z-index: 20;
        button{
            padding:3px 5px;
        }
    }
    .gameGroup div.active {
        background: #EB2B2A;
        color: #fff;
    }

    .betFilterAnd {
        padding: 10px 15px;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        line-height: 2.2;
        li {
            margin: 4px 0;
            span {
                display: inline-block;
                font-weight: 700;
                color: #555;
                width: 80px;
                position: relative;
                margin-left: 22px;
            }
            span::after {
                background: #fff;
                border: 1px solid #e7e7e8;
                border-radius: 50%;
                content: "";
                display: block;
                height: 11px;
                left: -21px;
                position: absolute;
                top: 7px;
                width: 11px;
            }
            span::before {
                content: "";
                display: block;
                width: 1px;
                height: 54px;
                background: #e7e7e8;
                position: absolute;
                top: -14px;
                left: -16px;
            }
            div {
                display: inline-block;
                a {
                    color: #555;
                    margin-right: 15px;
                    padding: 4px 6px;
                    border-radius: 3px;
                    display: inline;
                }
                a.active {
                    background: #EB2B2A;
                    color: #fff;
                }
            }
        }

    }
</style>