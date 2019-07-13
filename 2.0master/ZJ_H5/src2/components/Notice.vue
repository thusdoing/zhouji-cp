<style lang="less" scoped>
.notice { background: #fff; height: 100%; }
h2 { text-align: center; padding: 24px 16px 0; font-size: 18px;}
.content { text-indent: 20px; min-height: 100px; padding: 0 16px 16px;}
.date { font-size: 10px; padding: 16px; font-size: 14px;  }
</style>

<template>
  <div class="notice">
    <h2>{{notice.noticeTitle}}</h2>
    <divider class="date">发布日期：{{notice.date}}</divider>
    <p class="content">{{notice.noticeContent}}</p>
  </div>
</template>

<script>
import { Component, Vue } from 'core/decorators';

@Component
export default class Notice extends Vue {
  beforeRouteEnter (to, from, next) {
    if (Object.keys(to.params).length == 0) return next('/notices');
    next();
  }

  get notice () {
    return this.$route.params || {};
  }
}
</script>
