<template>
    <div class="timer" v-html="message"></div>
</template>

<script>
    export default {
        data() {
            return {
                message: '',
                count: 0,
                timeid:"",
                text:'',
            }
        },
        props: ['type','gameData','timediff'],
        watch: {
            '$route':function(n,o){
                if(n.params.gameNo!=o.params.gameNo){
                    this.getGameOpen()
                }
            }
        },
        mounted() {
            this.time()
        },
        methods: {
            time(){
                let ct = Date.now()+this.timediff*1000
                if(ct>(this.gameData.curStopSaleDt||this.gameData.stopSaleDt)&&ct<(this.gameData.curOpenGameDt||this.gameData.openGameDt)){
                    this.$emit('modal',this.gameData.gameNumber);
                    this.text = '投注已停止'
                    this.count = Math.ceil(((this.gameData.curOpenGameDt||this.gameData.openGameDt) - ct)/1000)
                    clearTimeout(this.timeid)
                    this.run()
                }else if(ct<(this.gameData.curStopSaleDt||this.gameData.stopSaleDt)){
                    this.text = '投注截止还有'
                    this.count = Math.ceil(((this.gameData.curStopSaleDt||this.gameData.stopSaleDt) - ct)/1000)
                    clearTimeout(this.timeid)
                    this.run()
                }else{
                    this.getGameOpen()
                }
                this.$emit('end',{...this.gameData ,text:this.text});
                
            },
            run() {
                this.timerString(this.count);
                this.timeid = setInterval(()=>{
                    this.count--;
                    this.timerString(this.count);
                    if (this.count > 0) {
                    } else {
                        clearTimeout(this.timeid)
                        this.time()
                    }
                },1000)
            },
            timerString(sec) {
                var html = '';
                var day = 0
                var hour = this.toDouble(Math.floor((sec) / 3600));
                var min = this.toDouble(Math.floor((sec % 3600) / 60));
                var s = this.toDouble(Math.floor((sec % 3600) % 60));
                if (day > 0) {
                    html += '<span>' + day + '</span>天';
                }
                if (this.type == 'zn') {
                    html += '<span>' + hour + '</span>时<span>' + min + '</span>分<span>' + s + '</span>秒';
                } else {
                    html += '<span>' + hour + '</span>:<span>' + min + '</span>:<span>' + s + '</span>';
                }
                this.message = html;
            },
            toDouble(number) {
                if (number < 10) {
                    number = '0' + number;
                }
                return number;
            },
            getGameOpen(){
                let gameNo = this.$route.params.gameNo||this.gameData.gameNo
                this.$http.get('/gameOpenNo/getGameOpen?gameNo='+gameNo).then(data=>{
                    if(data.data.success){
                        this.gameData.openGameNumber = data.data.t.gameNumber
                        this.gameData.curOpenGameDt = data.data.t.openGameDt
                        this.gameData.curServerTime = data.data.t.serverTime
                        this.gameData.curStopSaleDt = data.data.t.stopSaleDt
                        this.gameData.newData = data.data.t
                        if(data.data.t.nearOpenNumber){
                            this.gameData.openNo = data.data.t.nearOpenNumber
                        }
                        this.time()
                    }
                })
            },
        },
        updated() {
            
        },
        destroyed() {
            clearTimeout(this.timeid)
        },
    }

</script>

<style scoped>
  .timer {
    display: inline;
  }

</style>
