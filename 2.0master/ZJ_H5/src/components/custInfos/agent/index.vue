<template>
    <div>
        <wv-header title="代理中心" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
        </wv-header>
        <div class="contentbox">
            <div class="topSlide">
                <img src="/static/proxySlide.bffe1a7.png" alt="" width="100%">
            </div>
            <div>
                <wv-group>
                        <wv-cell title="代理说明" to="/explain" is-link></wv-cell>
                        <wv-cell title="代理报表" to="/agentReport" is-link></wv-cell>
                        <wv-cell title="下级报表" to="/subReport" is-link></wv-cell>
                        <wv-cell title="下级开户" to="/subRegister" is-link></wv-cell>
                        <wv-cell title="会员管理" to="/manage" is-link></wv-cell>
                        <wv-cell title="投注明细" to="/betDatail" is-link></wv-cell>
                        <wv-cell title="交易明细" to="/transactionDetail" is-link></wv-cell>
                </wv-group>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        mounted() {

        }
    }
</script>
<style scoped>
    @import '../../../assets/header.css';
</style>
<style>
    .contentbox {
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
</style>