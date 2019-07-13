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

		<div class="local-wrap" v-if="config && config.rx">
			<div class="position-area">
				<label>选择位置: </label>
        
				<checker v-model="social" type="checkbox" :max="5" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
					<checker-item value="万">万</checker-item>
					<checker-item value="千">千</checker-item>
					<checker-item value="百">百</checker-item>
					<checker-item value="十">十</checker-item>
					<checker-item value="个">个</checker-item>
				</checker>
			</div>
            
			<div class="notice-area">
				<label>(温馨提示: 你选择了 {{ selLen }} 个位置，系统会自动根据位置组合成 {{ schemeCount }} 个方案)</label>
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

					<div class="ball-wrap">
						<p class="ball" v-for="(item, index) in itemWarp.golbal[1]" @click="choiceNum(DataNumIndex, itemWarp.golbal[0] + index)" :key="index+'a'"
						 :class="{active: codeNumYardArr.length && codeNumYardArr[DataNumIndex][itemWarp.golbal[0] + index]}">{{ itemWarp.golbal[0] + index }}</p>
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

