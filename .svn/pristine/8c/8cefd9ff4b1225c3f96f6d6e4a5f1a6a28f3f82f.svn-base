<template>
<div>
    <div class="play-content playBoxNum">
		<div class="playitd-wrap">
			<p>{{config.description}}</p>
			<div class="random-wrap" @click="onRandomClick">
				<img src="/static/fingerTouch@2x.png">
				<span>机选</span>
			</div>
		</div>

		<div v-for="(itemWarp, DataNumIndex) in (this.config.sub || [])" :key="DataNumIndex">
			<div class="boxshow-wrap">
				<p class="pos-show" v-if="itemWarp.unit">{{itemWarp.unit}}</p>
				<div class="box-and-quick">
					<div class="quick-wrap">
						<span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='全'}" @click="quickChoice(DataNumIndex, '全');">全</span>
						<span class="ball-quick" @click="quickChoice(DataNumIndex, '清');">清</span>
					</div>

					<div class="ball-wrap" style="">
						<p class="ball" v-for="(item, index) in itemWarp.golbal" @click="choiceNum(DataNumIndex, index)" :key="index"
						 :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][index]}">{{ item.title }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
    
	<div class="okbet-wraps">
		<i class="iconfont icon-lajixiang"></i>
		<label>已选</label>
		<label style="color:yellow;">{{betCount}}</label>
		<label>注,</label>
		<label>共</label>
		<label style="color:yellow;">{{betAmt}}</label>
		<label>元</label>
		<Button class="btn-error" @click="btnConfirmChoiceFun">投注</Button>
	</div>
</div>
</template>

<script>
  import index from './index';
  export default {
    ...index
  }
</script>

<style lang='less' scoped>
    @import "../gameNormal.less";
</style>

