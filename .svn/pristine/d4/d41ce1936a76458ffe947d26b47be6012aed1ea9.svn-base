<style scoped>
.captcha { position: relative; }
</style>

<template>
  <div class="captcha" @click="onRefresh" :style="style">
    <img v-show="'success' === status" :src="captchaUrl"
      @load="status = 'success'" @error="status = 'error'"/>
    <div class="captcha-loading" v-if="'loading' === status">验证码<inline-loading/></div>
    <div class="captcha-error" v-else-if="'error' === status">
      <p>点击刷新</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Component, Prop } from 'core/decorators';
import { InlineLoading } from 'vux'

@Component({
  components: {InlineLoading}
})
export default class Captcha extends Vue {

  @Prop({ type: Number, default: 100 }) width;
  @Prop({ type: Number, default: 45 }) height;

  key = Date.now();
  status = 'loading';

  get style() {
    return `height: ${this.height}px; line-height: ${this.height}px; text-align: center; width: ${this.width}px;`;
  }

  get captchaUrl() {
    return `${this.$ENV.BASE_URL}/getVerCode?w=${this.width}&h=${this.height}&t=${this.key}`;
  }

  onRefresh() {
    if ('loading' === this.status) return false;
    this.key = Date.now();
    this.status = 'loading';
  }

}
</script>

