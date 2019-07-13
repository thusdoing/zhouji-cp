<template>
<div>
    <div class="play-content playBoxNum">
		<div class="playitd-wrap">
			<p v-html="config.description"></p>
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
						<span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='大'}" @click="quickChoice(DataNumIndex, '大');">大</span>
						<span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='小'}" @click="quickChoice(DataNumIndex, '小');">小</span>
						<span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='单'}" @click="quickChoice(DataNumIndex, '单');">单</span>
						<span class="ball-quick" :class="{active: quickBtns[DataNumIndex]=='双'}" @click="quickChoice(DataNumIndex, '双');">双</span>
						<span class="ball-quick" @click="quickChoice(DataNumIndex, '清');">清</span>
					</div>

					<div class="ball-wrap" style="">
						<p class="ball" v-for="(item, index) in itemWarp.golbal[1]" @click="choiceNum(DataNumIndex, itemWarp.golbal[0] + index)" :key="index"
						 :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][itemWarp.golbal[0] + index]}">{{ (itemWarp.golbal[0] + index + 1)<10?('0'+ (itemWarp.golbal[0] + index + 1)):(itemWarp.golbal[0] + index + 1)}}</p>
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
<style scoped lang="less">
    @import "../gameNormal.less";
</style>