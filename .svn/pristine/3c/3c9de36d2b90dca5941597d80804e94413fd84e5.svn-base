<template>
    <div>
        <wv-header title="代理说明" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
        </wv-header>
        <div class="contentbox">
            <div class="topSlide">
                <img src="/static/agentIntro.jpg" alt="" width="100%">
            </div>
            <div style="background: #fff;padding: 16px 8px;">
                <p>当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，即可以自己投注，也可以发展下级玩家，赚取返点佣金。</p>

                <div style="color:#dc3b40;line-height: 2;vertical-align: middle">
                    <wv-icon type="warn" style="float: left;margin-top: 2px;"></wv-icon>如何赚取返点？
                </div>
                <div class="dailiexplain">
                    <p>可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</p>
                    <p>点击下级开户，可查看自身返点，也可为下级设置返点。</p>
                </div>

                <div style="color:#dc3b40;line-height: 2;vertical-align: middle">
                    <wv-icon type="warn" style="float: left;margin-top: 2px;"></wv-icon>如何为下级开户？
                </div>
                <div class="dailiexplain">
                    <p>点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；</p>
                    <p>如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；</p>
                </div>

                <div style="color:#dc3b40;line-height: 2;vertical-align: middle">
                    <wv-icon type="warn" style="float: left;margin-top: 2px;"></wv-icon>温馨提示：
                </div>
                <div class="dailiexplain">
                    <p>返点不同赔率也不同，点击返点赔率表，可查看返点赔率；</p>
                    <p>返点越低，赔率就越低，建议为下级设置的返点不要过低；</p>
                    <p>可在代理报表、投注明细、交易明细查看代理的发展情况；</p>
                    <p>建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。</p>
                </div>


            </div>
        </div>

    </div>
</template>
<script>
    export default {
        components: {
        },
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

    .dailiexplain {
        font-size: 15px;
    }

    .dailiexplain p {
        padding-left: 30px;
        position: relative;
    }

    .dailiexplain p::before {
        content: "";
        position: absolute;
        width: .3em;
        height: .3em;
        background: #b9bcc2;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 0 0 1px #b9bcc2;
        left: .3em;
        top: .6em;
        z-index: 1;
    }

    .dailiexplain p::after {
        content: "";
        position: absolute;
        height: 86%;
        height: calc(100% - 1em);
        border-left: 1px dotted #b9bcc2;
        left: .54em;
        top: 1.4em;
    }

    .dailiexplain p:last-child::after {
        content: none
    }
</style>