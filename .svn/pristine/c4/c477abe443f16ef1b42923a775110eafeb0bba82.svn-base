<template>
    <div v-if="loaded === 'true'" class="clock" :callback="callback">
        <span v-if="infinite === 'true'"></span>
        <span v-else-if="runTimer === 'false'">已过期</span>
        <span v-else>{{curText}} {{hours}}:{{minutes}}:{{seconds}}</span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                curText: "投注截止还有",
                infinite: 'false',
                loaded: 'true',
                timer: 'true',
                runTimer: 'true',
                iseTime: false,
                days: '',
                hours: '',
                minutes: '',
                seconds: ''
            };
        },
        mounted() {
            const _self = this;
            if (_self.sTime > 0 && _self.eTime > 0) {
                _self.initializeClock(_self.sTime);
            } else if (_self.sTime == 0 && _self.eTime > 0) {
                _self.initializeClock(_self.eTime);
                _self.curText = '投注已停止';
            } else {
                _self.infinite = 'true';
                _self.loaded = 'true';
            }
        },
        props: {
            sTime: {
                type: Number,
                default: ''
            },
            eTime: {
                type: Number,
                default: ''
            },
            callback: {
                type: Function,
                default: ''
            }
        },
        methods: {
            initializeClock: function (n) {
                const _self = this;
                if (n < 1) return;
                _self.timer = setInterval(() => {
                    n--;
                    _self.getCountdownValues(n);
                }, 1000)
            },
            getCountdownValues: function (secondTimes) {
                const _self = this;
                const allSecondTimes = parseInt(secondTimes);
                let day = 0;
                let hour = 0;
                let min = 0;
                let second = 0;
                /* 总的秒数 */
                if (allSecondTimes > 60) {
                    day = parseInt(parseInt(parseInt(allSecondTimes / 60) / 60) / 24);
                    hour = parseInt(parseInt(allSecondTimes / 60) / 60) % 24;
                    min = parseInt(allSecondTimes / 60);
                    second = parseInt(allSecondTimes) % 60;

                    if (min > 60) {
                        min = parseInt(allSecondTimes / 60) % 60;
                        hour = parseInt(parseInt(allSecondTimes / 60) / 60);
                        if (hour > 24) {
                            hour = parseInt(parseInt(allSecondTimes / 60) / 60) % 24;
                            day = parseInt(parseInt(parseInt(allSecondTimes / 60) / 60) / 24);
                        }
                    }
                } else {
                    day = 0;
                    hour = 0;
                    min = 0;
                    second = parseInt(allSecondTimes) % 60;
                    if (allSecondTimes <= 0) {
                        clearInterval(_self.timer);
                        _self._callback();
                    }
                }
                _self.days = _self.setNumberTen(day);
                _self.hours = _self.setNumberTen(hour);
                _self.minutes = _self.setNumberTen(min);
                _self.seconds = _self.setNumberTen(second);
                //console.log(day+ '天'+ hour + '时' + min 	+ '分'+ second + '秒');
            },
            setNumberTen(n) {
                let m = n;
                if (n < 10) {
                    m = '0' + n;
                } else {
                    m = n;
                }
                return m
            },
            _callback() {
                if (this.callback && this.callback instanceof Function) {
                    this.callback(...this);
                    this.initializeClock(this.eTime);
                    this.curText = '投注已停止';
                }
            }
        },
        destroyed() {
            console.log(this.stime)
        }
    };
</script>