import vue from 'vue';
import {ball} from './ball.js'
const dataFun = function (arg) {
  const data = {
    11: {
      tpl:()=>vue.component('awardRes',{
        render: function(h){
          let flag = true;
          if(this.index > 4){
            flag = false;
          }
          return h('div',{  
            class:{
              'rectangleDiv':!flag,'eOdgUV':flag
            },
            domProps: {
              innerHTML: this.dataParams
            }, 
          });
        },
        props:{
          dataParams:'',
          index:Number
        }
      }),
    },
    33: {
      tpl:()=>vue.component('awardRes',{
        render: function(h){
          if(this.index < 3){
            return h('img',{
              attrs: {
                src:'/static/saizi/s'+this.dataParams+'.png'
              },   
              style:{
                width:'20px',
                height:'20px',
                margin:'0 3px',
              }       
            });
          }else{
            return h('div',{  
              class:{
                'rectangleDiv':true
              },
              domProps: {
                innerHTML: this.dataParams
              }, 
            });
          }
        },
        props:{
          dataParams:'',
          index:Number
        }
      }),
    },
    22: {
      tpl:()=>vue.component('awardRes',{
        render: function(h){
          if(this.index < 3){
            return h('img',{
              attrs: {
                src:'/static/saizi/s'+this.dataParams+'.png'
              },   
              style:{
                width:'20px',
                height:'20px',
                margin:'0 3px',
              }       
            });
          }else{
            return h('div',{  
              class:{
                'rectangleDiv':true
              },
              domProps: {
                innerHTML: this.dataParams
              }, 
            });
          }
        },
        props:{
          dataParams:'',
          index:Number
        }
      }),
    },
    44: {
      tpl:()=>vue.component('awardRes',{
        render: function(h){
          let flag = true;
          if(this.index > 4){
            flag = false;
          }
          return h('div',{  
            class:{
              'rectangleDiv':!flag,'eOdgUV':flag
            },
            domProps: {
              innerHTML: this.dataParams
            }, 
          });
        },
        props:{
          dataParams:'',
          index:Number
        }
      }),
    },
    55: {
      tpl:()=>vue.component('awardRes',{
        render: function(h){
          let flag = true;
          if(this.zt=='zt'){
            flag = false;
          }
          return h('div',{  
            class:{
              'rectangleDiv':!flag,'eOdgUV':flag
            },
            domProps: {
              innerHTML: this.dataParams
            }
          });
        },
        props:{
          dataParams:'',
          index:Number,
          zt:""
        }
      }),
    },
    66: {
      tpl:()=>vue.component('awardRes',{
        render: function(h){
          let flag = true;
          return h('div',[
            h('div',{  
              class:{
                'rectangleDiv':!flag,
                'eOdgUV':flag,
              },
              style:{
                backgroundColor:ball[this.dataParams-1].color,
                marginLeft:this.index==6?'10px':'0',
                width:'22px',
                height:'22px'
              },
              domProps: {
                innerHTML: this.dataParams
              }
            }),
            h('div',{
            class:{
              'rectangleDiv':true
            },
            style:{
              marginLeft:this.index==6?'10px':'0'
            },
            domProps: {
              innerHTML: ball[this.dataParams-1].zoo
            }
          })
        
        ]);
        },
        props:{
          dataParams:'',
          index:Number,
        },
        data(){
          return{
            ball:ball
          }
        }
      }),
    },
    
  }
  return data[arg];
};
export default {
  dataFun
}
