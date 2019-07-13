<template>
<div style="height:100%;background-color:#fff;">
    <div class="play-content playBoxNum">
		<div class="playitd-wrap">
			<p>{{config.description}}</p>
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

        <div class="textarea-box">
            <textarea v-integer v-model="textContent" placeholder="程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化."></textarea>
        </div>

        <div style="margin-top: 20px;">
			<button class="btn-error" @click="RemoveRet">删除重复号</button>
			<button class="btn-error" @click="cleartextArea">清空文本框</button>
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
