<style scoped>
@import '../assets/header.css';
@import 'custInfos/css/updateLoginPwd.css';
.add-bank-card>>>.el-collapse-item__label{font-size: 13px; padding-left: 15px;height:15px}
.bRdYQN {
    width: 100vw;
    height: 100%;
    position: fixed;
    z-index: 0;
    padding-top: 44px;
}
.PIUkd {
    height: calc(100% - 0px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.eLquNK {
    padding: 30px 15px 0;
    box-sizing: border-box;
}
.cuMZoG {
    font-size: 12px;
    color: #5E5E5E;
}
.jenAwS {
    padding: 0;
    background: #fff;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 0 0 1px;
    border-radius: 3px;
}
.ezBpRk {
    margin: 10px 0;
    height: 40px;
}
.iwJiiu {
    width: 105px;
    padding: 0 10px;
    font-size: 13px;
    line-height: 20px;
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
}
.OdqhF {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 11px 0 12px;
    position: relative;
}
.OdqhF input {
height: 25px;
display: inline-block;
border: 0;
color: #454545;
margin: 0;
font-size: 16px;
width: 60%;
-webkit-flex: 1 0 auto;
-ms-flex: 1 0 auto;
flex: 1 0 auto;
box-sizing: border-box;
}
.cexnXy {
width: 100%;
}
.loVgt {
background-color: #9b9b9b;
font-size: 13px;
padding: 10px;
line-height: 25px;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-flex-wrap: nowrap;
-ms-flex-wrap: nowrap;
flex-wrap: nowrap;
-webkit-box-pack: start;
-webkit-justify-content: flex-start;
-ms-flex-pack: start;
justify-content: flex-start;
margin-left: 10px;
background-color: transparent;
padding: 0;
color: #0f9de3;
background-image: url("/static/3333.png");
background-repeat: no-repeat;
background-position: right 10px center;
background-size: 13px;
}
.cZUdEX {
-webkit-flex: 1 1 auto;
-ms-flex: 1 1 auto;
flex: 1 1 auto;
}
.louMsU {
display: block;
height: 100%;
width: 100%;
line-height: 40px;
text-align: center;
background: #ec2829;
color: #ffffff;
font-size: 14px;
font-weight: 400;
border-radius: 3px;
border-width: 0;
border-color: #ec2829;
padding: 0 4px;
position: relative;
}
</style>
<template>
    <div>
        <wv-header title="添加银行卡" class="header">
            <div @click="$router.go(-1)" class="btn-menu brack-icon" slot="left">
                <i class="el-icon-arrow-left" slot="icon"></i>
            </div>
            <div class="w-20" slot="right"></div>
        </wv-header>
        <div class="bRdYQN">
            <div class="PIUkd">
                <div class="eLquNK">
                    <p class="cuMZoG">仅支持用户本人的银行借记卡</p>
                    <wv-group class="add-bank-card">
                        <x-input :disabled="bankAcctNameflag" ref="custName" label-width="105px" title="开户姓名" v-model="saveBankParam.bankAcctName" placeholder="请输入开户姓名" required :max="10"/>                         
                        <wv-cell class='el-collapse-item__label' title="开户银行" is-link :value="banks.name" @click.native="banksPickerShow = true"></wv-cell> 
                        <wv-cell class='el-collapse-item__label' title="开户地区" is-link :value="address | pickerValueFilter" @click.native="addressPickerShow = true" /> 
                        <wv-input class='el-collapse-item__label' label="开户支行" placeholder="请输入开户支行" v-model="saveBankParam.bankBranch"></wv-input>
                        <wv-input class='el-collapse-item__label' label="卡号"  type="number" placeholder="请输入银行卡号码" v-model="saveBankParam.bankAcct" required></wv-input>
                        <wv-input class='el-collapse-item__label' label="确认卡号"  type="number" placeholder="请再次输入卡号" v-model="confirmAcct" required></wv-input>                                                
                        <wv-input class='el-collapse-item__label' label="支付密码" type="password" placeholder="请输入支付密码" v-model="saveBankParam.withPassword" required></wv-input>                                              
                    </wv-group>
                    <wv-picker 
                        :visible.sync="banksPickerShow"
                        :columns="banksColumns"
                        value-key="name"
                        @confirm="confirmbanks"
                    />
                    <wv-picker
                    :visible.sync="addressPickerShow"
                    v-model="address"
                    ref="addressPicker"
                    :columns="addressColumns"
                    :visible-item-count="5"
                    @change="onAddressChange"
                    @confirm="confirmAddress"
                    />
                    <div class="ezBpRk">
                        <button class="louMsU" @click="addBankCard()">保存</button>
                    </div>
                </div>
            </div>
        </div>               
    </div>
</template>
<script>
import chinaAreaData from 'china-area-data'
const provinces = Object.values(chinaAreaData[86])
// 获取某一省下的市
const getCities = (province) => {
  let provinceCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  return typeof chinaAreaData[provinceCode] === 'object' ? Object.values(chinaAreaData[provinceCode]) : []
}
// 获取某一市下的区/县
function getAreas (province, city) {
  let provinceCode, cityCode
  for (let i in chinaAreaData[86]) {
    if (province === chinaAreaData[86][i]) {
      provinceCode = i
      break
    }
  }
  for (let i in chinaAreaData[provinceCode]) {
    if (city === chinaAreaData[provinceCode][i]) {
      cityCode = i
      break
    }
  }
  if (chinaAreaData[cityCode]) {
    return typeof chinaAreaData[cityCode] === 'object' ? Object.values(chinaAreaData[cityCode]) : []
  } else {
    // 只有两级的情况
    return []
  }
}
export default {
    data () {
        return {
            banksPickerShow: false,
            addressPickerShow: false,            
            banks: [
                {
                    name: '请选择',
                    icon: ''
                }
            ], 
            address: ['请选择'],
            banksColumns:[
                {
                values: [
                    {
                        name:'工商银行',
                        icon:'icbc'
                    }
                ]
                }
            ],
            addressColumns: [
                {
                values: provinces
                },
                {
                values: getCities('北京市')
                },
                {
                values: getAreas('北京市', '市辖区')
                }
            ],            
            responsParams:{
               codeType: 'bankName',
               status: '', 
               codeKey: ''
            },
            confirmAcct: '',
            saveBankParam: {
                bankAcct:'',
                bankAcctName:'',
                bankBranch:'',
                bankIcon:'',
                bankName:'',
                bankProvCity:'',
                withPassword:''
            },
            bankAcctNameflag:false
        }
    },
    created() {
        let {bankAcctName,isme} = this.$route.params
        if(isme){
            this.saveBankParam.bankAcctName = bankAcctName
            if(bankAcctName){
                this.bankAcctNameflag = true
            }
        }else{
            this.$router.go(-1)
        }
    },
    methods: {             
        confirmbanks (picker) {
            this.banks = picker.getValues()[0]
        },
        getCodeByType(){
            this.$api.get('getCodeByType',this.responsParams).then((data) => {
                this.banksColumns[0].values.pop();
                if(data.success){
                        for(let i  in data.list){
                            let obj={};
                            obj.name=data.list[i].spvVal;
                            obj.icon=data.list[i].spvKey;
                            this.banksColumns[0].values.push(obj);
                        }
                    }else{
                        this.tipMessage = data.msg;
                        this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
                    };             
            })
        },

        onAddressChange (picker, addressValues, slotIndex) {
            if (slotIndex === 0) {
                const cities = getCities(addressValues[0])
                picker.setColumnValues(1, cities)
                picker.setColumnValues(2, getAreas(addressValues[0], cities[0]))
            } else if (slotIndex === 1) {
                picker.setColumnValues(2, getAreas(addressValues[0], addressValues[1]))
            }
        },

        confirmAddress (picker) {
            this.address = picker.getValues()
        }, 

        addBankCard(){
            let _this = this;
            if (_this.saveBankParam.bankAcct != _this.confirmAcct) {
            _this.$dialog({title: '提示信息',message:"两次输入银行卡号不一致",skin: 'ios'});
            return;
            };
            this.saveBankParam.bankName=this.banks.name;
            this.saveBankParam.bankIcon=this.banks.icon;
            this.saveBankParam.bankProvCity=this.address.join("/");            
            this.$api.post('addBankAuthWithPwd',this.saveBankParam).then((data) => {
            if(data.success){
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'}); 
                this.$router.push('/listBankCard');               
                return;
            }else{
                this.tipMessage = data.msg;
                this.$dialog({title: '提示信息',message:data.msg,skin: 'ios'});
            }
            });
        //console.log(this.ticket.toString());
        },                         
        // onChange (picker, value) {
        //     this.$nextTick(() => {
        //     console.log(picker.getValues())
        //     })
        // }
    },
    filters: {
        pickerValueFilter (val) {
        if (Array.isArray(val)) {
            return val.toString()
        } else {
            return '请选择'
        }
        }
    },    
    mounted () {
        this.getCodeByType();
        this.$nextTick(() => {
        this.$refs.addressPicker.setValues(['北京市', '市辖区', '朝阳区']); 
        });        
    }
}
</script>