<style scoped>
.img-grid-item{margin: 6px 8px;padding-top: 8px; }
.img-grid-item>>>.el-card__body{text-align: right;padding: 10px;font-size: 10px;color: #c9c9c9;align-items: center;}
.el-card__body img{width: 100%;height: 106px;}
.img-grid-title{text-align: right;width: 100%;display: flex;}
.img-grid-title div{flex: 1 1 50%;}
.img-grid-title div:first-child{text-align: left;color: #2c3e50;}
.red{color: #ec2829}
</style>

<template>
    <el-row class="img-grid-item">
        <el-col  :span="24">
            <div  @click="to_page(path)" >
                <el-card shadow="never">
                    <div>
                        <img :src="$imgPath(imgUrl)"/>
                    </div>
                    <div class="img-grid-title">
                        <div>{{title}}<span v-if="flag" class="red">（已结束）</span></div>
                        <div>点击查看
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    props : {
        imgUrl : String,
        title  : String,
        flag : Boolean,
        path : String
    },
    methods : {
        to_page (path) {

        }
    }
}
</script>

