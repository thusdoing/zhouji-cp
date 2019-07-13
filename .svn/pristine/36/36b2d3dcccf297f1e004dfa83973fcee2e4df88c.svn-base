<template>
    <div>
        <article class="container"><div class="_1ib5c center" style="width: 825px;height: 450px"><h1 class="_3PN1B" style="padding-top: 30px; padding-bottom: 30px;"><span v-if='!$store.state.map.hasQuestion'>设置密保问题</span><span v-else>重置密保</span></h1>
            <Form :label-width="120" :model='formData' :rules="ruleValidate" ref="formValidate">
                <FormItem prop="questionOneId" label="问题一 : ">
                    <Select v-if='UserQuestion.length == 0' style='width: 280px' v-model="formData.questionOneId">
                        <Option v-for="(item,index) in QuestionLst" :key='index' :value="item.questionId">{{item.questionContent}}</Option>
                    </Select>
                    <div v-else>{{UserQuestion[0].questionContent}}</div>
                </FormItem>
                <FormItem prop="answerOne" label="答案 : ">
                    <Input type="text" v-model="formData.answerOne" placeholder="请输入答案" style='width: 280px'>
                    </Input>
                </FormItem>
                <FormItem prop="questionTwoId" label="问题二 : ">
                    <Select v-if='UserQuestion.length == 0' style='width: 280px' v-model="formData.questionTwoId">
                        <Option v-for="(item,index) in QuestionLst" :key='index' :value="item.questionId">{{item.questionContent}}</Option>
                    </Select>
                    <div v-else>{{UserQuestion[1].questionContent}}</div>
                </FormItem>
                <FormItem prop="answerTwo" label="答案 : ">
                    <Input type="text" v-model="formData.answerTwo" placeholder="请输入答案" style='width: 280px'>
                    </Input>
                </FormItem>
                <div class="_16t4o" style="margin-top:0"><button type="button" class="_1sc4M vF3Ii" @click="saveUserQuestionAnswer">
                        确定
                    </button></div>
            </Form> 
        </div></article>


    </div>
</template>

<script>

import footerCop from '@/views/footer/index.vue'
import headerCop from '@/views/header/index.vue'


import axios from 'axios'
export default {
    data() {
        const eq = (rule, value, callback)=>{
            if(value.length==0){
                return callback(new Error("请填写内容"));
            }else{
                callback();
            }
        };
        return {
            formData:{
                answerOne:'',
                answerTwo:'',
                questionOneId:'',
                questionTwoId:''
            },
            QuestionLst:[],
            arr:null,
            flag : true,
            codepath:null,
            ruleValidate: {
                answerOne: [
                    { validator: eq, trigger: 'blur' }
                ],
                answerTwo: [
                    { validator: eq, trigger: 'blur' }
                ],
                questionOneId:[
                    { validator: eq, trigger: 'blur' }
                ],
                questionTwoId: [
                    { validator: eq, trigger: 'blur' }
                ]
            },
            UserQuestion:[]
        }
    },
    components: { footerCop,headerCop

    },
    created(){
        this.getQuestionLst();
        if(this.$store.state.map.hasQuestion){
            this.getUserQuestion()
       }
    },
    watch:{
    },
    methods:{
        getQuestionLst(){
            axios({
                method: 'get',
                url: '/getQuestionLst'
            }).then((data)=>{
                if(data.data.success){
                    if(data.data.list != null && data.data.list != undefined){
                        this.QuestionLst = data.data.list
                    }
                }
            })
        },
        saveUserQuestionAnswer(){
            if(this.$store.state.map.hasQuestion){
                axios.post('/regUserQuestion',this.formData).then((data)=>{
                    if(data.data.success){
                        this.$Modal.success({
                            title:'系统提示',
                            content:data.data.msg
                        })
                        this.formData.answerOne="";
                        this.formData.answerTwo="";
                        let olddata = this.$store.state.map;
                        olddata.hasQuestion = false
                        this.$store.commit('setmap', olddata);
                        this.UserQuestion=[]
                    }else{
                        this.$Modal.error({
                            title:'系统提示',
                            content:data.data.msg
                        })
                    }
                })
            }else{
                this.$refs.formValidate.validate((valid)=>{
                    if(valid){
                        axios({
                            method: 'post',
                            url: '/saveUserQuestionAnswer',
                            data:this.formData
                        }).then((data)=>{
                            if(data.data.success){
                                this.$Modal.success({
                                    title:'系统提示',
                                    content:data.data.msg
                                });
                                this.$router.push('/security')
                            }else{
                                this.$Modal.error({
                                    title:'系统提示',
                                    content:data.data.msg
                                })
                            }
                        })
                    }else{
                        this.$Modal.error({
                            title:'系统提示',
                            content:'信息填写不正确'
                        })
                    }
                }) 
            }
        },
        getUserQuestion(){
            axios({
                method: 'post',
                url: '/getUserQuestion',
                data:{custName:this.$store.state.userInfo.custName}
            }).then((data)=>{
                if(data.data.success){
                    if(data.data.list != null && data.data.list != undefined){
                        this.UserQuestion = data.data.list
                    }
                }
            })
        },
        getVerCode(){
            let _this = this;
            axios({
                method: 'get',
                url: '/getVerCode',
                params:{w:90,h:33},
                responseType: 'blob' ,
                 headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }).then(function(data){
                _this.codepath = window.URL.createObjectURL(data.data)
            });
        },
    }
        

}

</script>
