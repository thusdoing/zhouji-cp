<template>
  <div class="Tabs">
    <Tabs v-if="data.length>0" :animated="false">
      <TabPane v-for="(item,index) in data" :key="index" :label="item.name">
       <slot name="name-of-slot"></slot>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {}
    },
    mounted() {
      this.$nextTick(() => {
        for (let i = 0; i < this.data.length; i++) {
          document.getElementsByClassName('ivu-tabs-tab')[i].style.width = this.width+'%';
        }
      })
    },
    computed: {
      width() {
        return (1 / this.data.length * 100).toFixed(2)
      }
    },
  }
</script>

<style lang="less" scoped>
  .Tabs /deep/.nav-text.ivu-tabs-nav {
    color: #fff;
    width: 100%;
    .ivu-tabs-tab {
      background-color: #c81722;
      margin-right: 0;
      color: #fff;
      text-align: center;
      &:hover {
        background-color: #e11616;
      }
    }
    .ivu-tabs-tab.ivu-tabs-tab-active {
      background-color: #e11616;
    }
    .ivu-tabs-ink-bar {
      height: 0;
    }
  }
</style>
