<style lang="less" scoped>

</style>

<template>
  <div class="discovery">我的发现</div>
</template>

<script>
import { Component, Vue } from 'core/decorators';

@Component
export default class Discovery extends Vue {
  created () {
    this.$app.setLayout('发现中心', true, this);
  }
}
</script>
