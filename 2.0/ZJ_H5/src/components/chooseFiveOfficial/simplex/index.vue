<template>
<div style="height:100%;background-color:#fff;">
    <div class="play-content playBoxNum">
		<div class="playitd-wrap">
			<p v-html="config.description"></p>
			<!-- <div class="random-wrap" @click="onRandomClick">
				<img src="/static/fingerTouch@2x.png">
				<span>机选</span>
			</div> -->
		</div>

        <div class="textarea-box">
            <textarea v-model="textContent" placeholder="每一个号码之间用空格( )隔开，每一注之间用逗号(,)或分号(;)隔开。投注号码小于10时，需在号码前方加上0。"></textarea>
			<!-- <textarea v-integer v-model="textContent" placeholder="投注号码小于10时，需在号码前方加上0"></textarea> -->
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
