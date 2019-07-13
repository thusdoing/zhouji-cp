<template>
  <div>
    <div class="longhuIntegrate">
      <Row>
        <!-- <i-col span="19"> -->
        <i-col span="24">
          <Row>
            <!-- 球玩法 -->
            <i-col span="24">
              <div class="longhuIntegrateHeader">
                <div class="dollarIcon">￥</div>
                <div style="line-height: 41px;font-weight: bold;">快捷金额设置：<Input v-integer v-model="kuaijiejine" class="kuaijie" size="small" style="width: 60px;"></Input> 元
                <span>
                <Button type="info" style="width:40px;" @click="kuaijiejine=50" size="small">50</Button>
          <Button type="primary" style="width:40px;" @click="kuaijiejine=100" size="small">100</Button>
          <Button type="success" style="width:40px;" @click="kuaijiejine=200" size="small">200</Button>
          <Button type="warning" style="width:40px;" @click="kuaijiejine=500" size="small">500</Button>
          <Button type="error" style="width:40px;" @click="kuaijiejine=1000" size="small">1000</Button></span></div>
                <Radio-group v-model="ballGameRadio" type="button" size="large" @on-change="ballGameChange">
                  <Button type="primary" @click="confirm" size="small">确定投注</Button>
                  <Radio label="一般"></Radio>
                  <Radio label="快捷"></Radio>
                  <!-- <Radio label="快选金额"></Radio> -->
                </Radio-group>
              </div>
            </i-col>
            <div class="orderBox" v-for="(item,normalI) in ballGroups" :key="normalI">
              <Row class="ballGameTitle ballGameDetail">
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">号码</i-col>
                <i-col :span="ballGameRadio=='一般' ? 6 : 12">赔率</i-col>
                <i-col v-if="ballGameRadio=='一般'">金额</i-col>
              </Row>
              <div v-for="(data,normalDataI) in item.groupSettinges" :key="'normalDataI'+normalDataI" @click="data.selected = (ballGameRadio!='快捷' ? false : !data.selected)">
                <Row :class="[('ballGameDetail ballGameDetailHover'),{'active':data.sum>0}]" @click.native="data.sum = data.sum>0 ? '' : kuaijiejine">
                  <i-col :span="ballGameRadio=='一般' ? 6 : 12">
                    <span class="ballStyle">{{data.groupName}}</span>
                  </i-col>
                  <i-col :span="ballGameRadio=='一般' ? 6 : 12" class="bonusAmt">{{data.bonusAmt}}</i-col>
                  <i-col span="12" v-if="ballGameRadio=='一般'" class="ballSelect">
                    <input class="inputNuber" @click.stop="(()=>{})" @focus="data.sum = data.sum >0 ? '' : kuaijiejine" v-integer type="text" v-model="data.sum"
                      min="0" max="999" />
                  </i-col>
                </Row>
              </div>
            </div>

            <!-- 快选金额 -->
            <Modal :transfer="false" v-model="quickModal" width="400" :mask-closable="false" class-name="notice-model">
              <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;color: #fff">
                快选金额
              </div>
              <div style="overflow:hidden;">
                <p style="margin: 10px;">注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。</p>
                <div style="text-align:center;margin:15px;" v-for="(item, index) in moneyList" :key="'monkey' + index">
                  <InputNumber :precision="0" style="width:200px;" v-model="item.value" :min="0" :max="99999999"></InputNumber>
                  <Button type="error" @click="moneyList.splice(index, 1)">删除</Button>
                </div>
                <div style="text-align:center;margin:15px;" v-show="moneyList.length<5">
                  <InputNumber :precision="0" style="width:200px;" v-model="newValue" :min="0" :max="99999999"></InputNumber>
                  <Button type="error" @click="addNewMoney">增加</Button>
                </div>
              </div>
              <div slot="footer" style="text-align:center;">
                <Button type="error" @click="setMoneyQuick(moneyList);setMoneyModel=false;">保存</Button>
              </div>
            </Modal>
            <Row class="btnBox">
              <i-col span="11" class="soonAuto" v-show="ballGameRadio=='快捷'">&nbsp;
                <!-- <input class="inputNuber" v-integer type="text" v-model="quickSum"
                  min="0" max="999" /> -->
              </i-col>
              <i-col :span="ballGameRadio=='快捷' ? 2 : 12">
                <i-button class="confirmBtn" @click="confirm" style="margin-right: 0">确定</i-button>
              </i-col>
              <i-col :span="ballGameRadio=='快捷' ? 11 : 12">
                <i-button class="cancelBtn" @click="cancel">取消</i-button>
              </i-col>
            </Row>
          </Row>
        </i-col>
        <!-- <i-col span="5"> -->
        <i-col span="0">
          <Row class="history">
            <i-col span="24" class="historyRadio">
              <RadioGroup v-model="historyRadio" type="button" :on-change="historyChange">
                <Radio label="出码排行"></Radio>
                <Radio label="遗漏排行"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="24" class="periods">
              <Row>
                <i-col span="14">
                  <p>次数</p>
                </i-col>
                <i-col span="10" class="periodsSelect">
                  <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                  </Select>
                </i-col>
              </Row>
            </i-col>
            <i-col span="24" class="periodResult">
              <i-table border :columns="topColumn" :data="topData"></i-table>
            </i-col>
          </Row>
        </i-col>
      </Row>
    </div>
    <div class="modal">
      <Modal :transfer="false" v-model="confirmModal" width="400" :mask-closable="false" class-name="notice-model">
        <div slot="header" style="text-align:center;font-size:15px;font-weight:bold;">
          确认注单
        </div>
        <div style="overflow:hidden;">
          <Row style="margin: 10px 0;">
            <i-col :span="10">
              <p style="text-align:center;font-size:13px;font-weight:bold;">内容</p>
            </i-col>
            <i-col :span="6">
              <p style="text-align:center;font-size:13px;font-weight:bold;">赔率</p>
            </i-col>
            <i-col :span="6">
              <p style="text-align:center;font-size:13px;font-weight:bold;">下注金额</p>
            </i-col>
          </Row>
          <Row style="margin: 10px 0;" class="modalContent">
            <Row v-for="(item,betI) in betArray" :key="betI" class="modalContent">
              <i-col :span="10">
                <p style="text-align:center;font-size:13px;">{{'全5中1: ' + item.groupName}}</p>
              </i-col>
              <i-col :span="6">
               <p style="text-align:center;font-size:13px;">{{item.bonusAmt}}</p>
              </i-col>
              <i-col :span="6">
                <p style="text-align:center;font-size:13px;">{{item.sum}}</p>
              </i-col>
            </Row>
          </Row>
          <Row>
            <i-col :span="24">
              <p style="text-align:center;">共
                <span class="red">{{yardNum}}</span>&nbsp;&nbsp;注，合计下注金额&nbsp;&nbsp;
                <span class="red">{{totalSum}}</span>
              </p>
            </i-col>
          </Row>
        </div>
        <div slot="footer" style="text-align:center;">
          <Button type="error" @click="confirmBet" :loading="loading">确认下注</Button>
          <Button type="default" @click="confirmModal=false;">取消</Button>
        </div>
      </Modal>
    </div>

  </div>
</template>
<style scoped lang="less">
  @import './index.less';
  
</style>
<style scoped>
.longhuIntegrateHeader .ivu-radio-group>>>.ivu-btn {
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    padding: 0;
    color: #fff;
    border-radius: 4px !important;
    width: 70px;
    border: 1px solid #19be6b;
    text-align: center;
    margin: 7px 4px;
    background: #19be6b;
  }

  .longhuIntegrateHeader .ivu-radio-group>>>.ivu-btn:hover {
    color: #fff !important;
    background: #ed3f14 !important;
    border-color: #ed3f14 !important;
    box-shadow: 0 0 0
  }
</style>

<script>
  import index from './index';
  export default {
    ...index
  }

</script>
