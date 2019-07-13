<template>
    <div>
        <div class="fl mb12 _2WJqO" style="width: 840px;">
            <p>我的推广
            </p>
        </div>
        <div class="_3wioq fl" style="width: 840px;min-height:454px;">
            <h1 v-if="showText.length>0" style="text-align: center;line-height: 100px;font-size: 22px;font-weight: normal;">{{showText}}</h1>
            <Form v-else :label-width="150" style="padding-top: 50px">
                <FormItem label="推广码：">
                    {{tuiguangObj.reCode}}
                </FormItem>
                <FormItem label="推广链接：">
                    {{tuiguangObj.reUrl}}
                </FormItem>
                <FormItem label="推广二维码：">
                    <vueQR :text="tuiguangObj.reUrl" :margin="0" style="height: 120px; width: 120px;"></vueQR>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import vueQR from 'vue-qr';

    import axios from 'axios'
    export default {
        components: { vueQR },
        data() {
            return {
                showText: " ",
                tuiguangObj: {}
            }
        },
        created() {
            this.myReInfo();
        },
        watch: {

        },
        methods: {

            myReInfo() {
                this.$http.get('/myReInfo').then(
                    res => {
                        if (res.data.success) {
                            this.showText = ""
                            this.tuiguangObj = res.data.t
                        } else {
                            this.showText = res.data.msg
                        }
                    }
                )
            }

        },
        mounted() {

        }

    }
</script>