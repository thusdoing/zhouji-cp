<template functional>
  <x-header>
    <span slot="overwrite-left" @click="data.attrs.context.$router.push('/activeInfo')">下载APP</span>
    {{data.attrs.context.$ENV.VUE_APP_NAME}}
    <span slot="right" @click="data.attrs.context.$router.push('/login')" v-if="props.show">登录
      <!-- <img src="/static/noMessage@2x.png" style="width:34px;height:34px;position: relative; top: -8px;"/> -->
    </span>
    <span slot="right" @click="data.attrs.context.$router.push('/register')" v-if="props.show">注册
      <!-- <img src="/static/noMessage@2x.png" style="width:34px;height:34px; position: relative; top: -8px;"/> -->
    </span>
  </x-header>
</template>
<style scoped>
span {
  margin: 0 3px;
  }
</style>