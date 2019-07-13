<style scoped>
.notices { font-size: 14px; line-height: 25px;}
h1 { font-size: 20px; font-weight: 700; padding: 10px 0 20px;}
.notice { background-color: #fff; margin-bottom: 10px; padding: 12px;}
.content { word-break: break-all; word-wrap:break-word; }
.date { text-align: right; margin-top: 20px; }
</style>

<template>
  <div class="notices">
    <div class="notice" v-for="d of notices" :key="d.id">
      <h1>{{d.noticeTitle}}</h1>
      <div class="content">&#12288;&#12288;{{d.noticeContent}}</div>
      <div class="date">{{$tools.dateFormat(d.insertDate)}}</div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, namespace } from 'core/decorators';
import { Panel } from 'vux';

const NNotice = namespace('Notice');

@Component({
  components: { Panel }
})
export default class Notices extends Vue {
  @NNotice.Getter('getNotice') notices;
  created () {
    this.$app.setLayout('系统公告', false, false);
    this.$apis.Notice.getNotice();
  }
}
</script>
