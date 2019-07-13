<template>
<div>
<div class="fl mb12 _2WJqO" style="width: 840px;">
    <p>银行卡管理
    </p>
</div>
        <div v-if='!add' class="_3wioq fl" style="width: 840px;">
                <div><div style="padding: 24px;"><div class="row" style="margin-left: -9px; margin-right: -9px;">

                <div v-for='(item,index) in myBankList' :key="index+'a'" class="w-third col"><div class="_19Gmj center relative overflow-hidden"><div class="_2yjLc"><img height="30" class="fl mt3" :src="'/static_pc/bank/'+item.bankIcon+'.png'"><p class="fr">
                尾号：{{item.bankAcct}}
            </p></div><div class="OX8Sv" style="background-image: url('/static_pc/images/bankbg.png');">
            储蓄卡
        </div><div class="_3rO8T">
        <!-- <span v-if="item.bankStatus=='2'">已锁定</span> -->
        <!-- <span class="pointer ml10" @click='endit'>修改</span> -->
        <span class="pointer" @click='delbank(index)'>删除</span>
            </div><div class="_1fC4Q"><span>绑卡日期：<span v-dateFormat="{a:'yyyy-MM-dd',b:item.insertDate}"></span></span><span class="fr tr">{{item.bankAcctName}}</span></div></div></div>

            <div v-if="myBankList.length<5" class="w-third col mb15"><div class="center" style="display: table;"><div class="_2F4wK" @click='add=true'>立即添加银行卡</div></div></div></div><div class="Vxtwm _2Uhwl"><img class="mr6 v-sub" width="14" src="/static_pc/images/wr.svg">温馨提醒: 一共可以绑定 5 张银行卡。
           <!--  为了您的资金安全，成功提现的银行卡会自动锁定，无法删除和修改。 -->
        </div></div></div>
            </div>



        <div v-else class="_3wioq fl" style="width: 840px;">
                <div><div class="pt30"><span>
                <form class="iQeaU">
                    <Form ref="bankForm" :label-width="170" :model="formData" :rules="ruleValidate">
                        <FormItem label="开户银行："  >
                            <Select clearable v-model="formData.bankName" style="width:150px">
                                <Option v-for="item in bankNameList" :value="item.spvVal" :key="item.spvVal">{{ item.spvVal }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="开户省市：" >
                            <Cascader :data="cityList" v-model="bankProvCity"></Cascader>
                        </FormItem>
                        <FormItem label="开户支行：">
                            <Input placeholder="请输入开户支行" v-model="formData.bankBranch"></Input>
                        </FormItem>
                        <FormItem label="开户人姓名：" prop="bankAcctName">
                            <Input placeholder="请输入开户人姓名" :disabled="bankAcctNameFlag" v-model="formData.bankAcctName"></Input>
                        </FormItem>
                        <FormItem label="银行卡号：" prop='bankAcct'>
                            <Input placeholder="请输入银行卡号" v-model="formData.bankAcct"></Input>
                        </FormItem>
                        <FormItem label="确认卡号：" prop='bankAcct2'>
                            <Input placeholder="请重新输入卡号" v-model="formData.bankAcct2"></Input>
                        </FormItem>
                        <FormItem label="支付密码：" prop='withPassword'>
                            <Input placeholder="请输入支付密码" type="password" v-model="formData.withPassword"></Input><div @click='tip' class="_3c4zd">忘记支付密码？</div>
                        </FormItem>
                    </Form>
                    <div class="_2WZSm"><button @click='saveBank' class="_1sc4M undefined mr20" type="button">
                        确定
                    </button></div>

                </form></span></div></div>
            </div>
            <Modal v-model="setbankM" width="180" :closable="false" class-name="vertical-center-modal" :mask-closable="false" >
                
                <h1 style="text-align: center;padding: 20px 0 10px">你还没有设置支付密码</h1>
                <div slot="footer">
                    <Button @click="setbankM=false" style="float:left">不想去</Button>
                    <Button type="success" @click="$router.push('/editSecurePass')">去设置</Button>
                </div>
            </Modal>
</div>
</template>
<script>
function citySelect(selected,list,num){
    for(let i in list){
        if(list[i].value == selected[num]){
            if(num<=(selected.length-2)){
                return list[i].label +'/'+ citySelect(selected,list[i].children,num+1)
            }else{
                return list[i].label
            }
        }
    }
}
    import {cityList} from '@/assets/bankJson.js'
    import axios from 'axios'
    export default {
        data() {
            const bankAcct = (rule, value, callback) => {
                if (value == '') {
                  callback(new Error('请输入银行卡号'));
                } else if (!/^[0-9]*$/.test(value)) {
                  callback(new Error('格式不正确'));
                }  else if (!this.checkbank(value)) {
                  callback(new Error('卡号不正确，请仔细核对'));
                } else {
                  callback();
                }
            };
            const bankAcct2 = (rule, value, callback) => {
                if (value != this.formData.bankAcct) {
                  callback(new Error('两次卡号输入不一致'));
                } else {
                  callback();
                }
            };
            const bankAcctName = (rule, value, callback) => {
                if (value == '') {
                  callback(new Error('请输入账户名'));
                }else if(!/^[\u4E00-\u9FA5]{2,6}$/.test(value)){
                    callback(new Error('格式不正确'));
                }else {
	                callback();
                }
            };
	        const withPassword = (rule, value, callback) => {
		        if (value == '') {
			        callback(new Error('请输入支付密码'));
		        }else if(value.length<6){
			        callback(new Error('请输入最少6位密码'));
		        }else {
			        callback();
		        }
	        };
            return {
                formData:{
                    bankAcctName:'',
                    bankAcct:'',
                    bankAcct2:'',
                    bankProvCity:'',
                    bankName:'',
	                bankIcon:'',
                    withPassword:'',
                    bankStatus:2
                },
                ruleValidate: {
                    bankAcctName:[
                        {validator: bankAcctName,trigger: 'change'},
                        {validator: bankAcctName,trigger: 'blur'},
                    ],
                    bankAcct:[
                        {min: 12,message: '请输入最少12位'},
                        {max: 19,message: '请输入最多19位'},
                        {validator:bankAcct,trigger: 'change'},
                        {validator:bankAcct,trigger: 'blur'},
                    ],
                    bankAcct2: [
                        {validator: bankAcct2,trigger: 'change'},
                        {validator: bankAcct2,trigger: 'blur'}
                    ],
	                withPassword:[
	                	{validator: withPassword,trigger: 'change'},
		                {validator: withPassword,trigger: 'blur'}
                    ]
                },
                getData:[],
                add:false,
                cityList:[],
                bankProvCity:[],
                bankNameList:[],
                myBankList:[],
                setbankM:false,
                bankAcctNameFlag:false
            }
        },
        components: { 

        },
        created(){
            this.cityList = cityList;
            this.getCodeByType();
            this.getBank();
            if(sessionStorage.getItem('hasWithPwd')=="false"){
                this.setbankM = true
            }
        },
        watch:{
        },
        methods:{
            tip(){
                this.$router.push('/security')
            },
            getBank(){
                let _this = this;

                axios({
                        method: 'get',
                        url: '/getBank',
                    }).then(function(data){
                        if(data.data.success){
                            if(data.data.list.length>0){
                                _this.myBankList = data.data.list
                                _this.formData.bankAcctName = data.data.list[data.data.list.length-1].bankAcctName
                                _this.bankAcctNameFlag = true
                            }
                        }
                });
            },
            getCodeByType(){
                let _this = this;

                axios({
                        method: 'get',
                        url: '/getCodeByType',
                        params:{codeType:"bankName"},
                    }).then(function(data){
                        if(data.data.success){
                            if(data.data.list){
                                _this.bankNameList = data.data.list
                            }
                        }
                });
            },
            saveBank(){
            	for(let i in this.bankNameList){
            		if(this.bankNameList[i].spvVal==this.formData.bankName){
			            this.formData.bankIcon = this.bankNameList[i].spvKey;
			            break;
                    }
                }
                let _this = this;
                let text = citySelect(_this.bankProvCity,_this.cityList,0);
                _this.formData.bankProvCity=text;
                this.$refs.bankForm.validate((valid)=>{
                    if(valid){
                        axios({
                        method: 'post',
                        url: '/addBankAuthWithPwd',
                        data:this.formData,
                        }).then(function(data){
                            if(data.data.success){
                                _this.$Modal.success({
                                    title:'系统提示',
                                    content:'保存成功'
                                })
                                _this.add = false;
                                _this.formData = {}
                                _this.getBank();
                            }else{
                                _this.$Modal.error({
                                    title:'系统提示',
                                    content:data.data.msg
                                })
                            }
                        });
                    }else{
                        _this.$Modal.error({
                            title:'系统提示',
                            content:'银行信息输入有误,请重新输入'
                        })
                    }   
                })
                    
                    
            },
            delbank(index){
                let _this = this;
                axios({
                        method: 'post',
                        url: '/saveBank',
                        data:_this.$transformRequest({tableKey:_this.myBankList[index].tableKey,bankStatus:'0'}),
                    }).then(function(data){
                        if(data.data.success){
                            _this.$Modal.success({
                                title:'系统提示',
                                content:'删除成功'
                            })
                            _this.getBank();
                        }else{
                            _this.$Modal.error({
                                title:'系统提示',
                                content:data.data.msg
                            })
                        }
                });
            },
            checkbank(bankno){
                var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
            
                var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
                var newArr=new Array();
                for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
                    newArr.push(first15Num.substr(i,1));
                }
                var arrJiShu=new Array();  //奇数位*2的积 <9
                var arrJiShu2=new Array(); //奇数位*2的积 >9
                
                var arrOuShu=new Array();  //偶数位数组
                for(var j=0;j<newArr.length;j++){
                    if((j+1)%2==1){//奇数位
                        if(parseInt(newArr[j])*2<9)
                        arrJiShu.push(parseInt(newArr[j])*2);
                        else
                        arrJiShu2.push(parseInt(newArr[j])*2);
                    }
                    else //偶数位
                    arrOuShu.push(newArr[j]);
                }
                
                var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
                var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
                for(var h=0;h<arrJiShu2.length;h++){
                    jishu_child1.push(parseInt(arrJiShu2[h])%10);
                    jishu_child2.push(parseInt(arrJiShu2[h])/10);
                }       
                
                var sumJiShu=0; //奇数位*2 < 9 的数组之和
                var sumOuShu=0; //偶数位数组之和
                var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
                var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
                var sumTotal=0;
                for(var m=0;m<arrJiShu.length;m++){
                    sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
                }
                
                for(var n=0;n<arrOuShu.length;n++){
                    sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
                }
                
                for(var p=0;p<jishu_child1.length;p++){
                    sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
                    sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
                }     
                //计算总和
                sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
                
                //计算Luhm值
                var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;       
                var luhm= 10-k;		 
                if(lastNum==luhm){
                    //$("#banknoInfo").html("Luhm验证通过");
                    return true;
                }
                else{
                    //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
                    return false;
                }       
            }

        },
        mounted(){
            
        }    

    }
</script>