import vue from 'vue';
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
                width:'25px',
                height:'25px',
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
                width:'25px',
                height:'25px',
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
  }
  return data[arg];
};
export default {
  dataFun
}
