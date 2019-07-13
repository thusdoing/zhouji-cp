 
layui.use(['table','layer','form','layedit'], function(){
  var table = layui.table  
  ,$ = layui.$
  ,layer=layui.layer
  ,layedit = layui.layedit
var tableIns = table.render({
    elem: '#listTable'
    ,url:apiUrl+'/usermessage/list'
	,method:'post'
    ,title: '消息系统'
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field:'id', title:'唯一标识符',  fixed: 'left', unresize: true,sort: true,width:120}
      ,{field:'senduser', title:'发送人'}
      ,{field:'receiveuser', title:'接收人'}
      ,{field:'groupid', title:'群ID'}
      ,{field:'isread', title:'是否已读 0 未读  1 已读',templet: function(d){
        return d.isread==0?'未读':'已读'
      },sort: true}
      ,{field:'type', title:'类型 0 单聊消息  1 群消息', sort: true,templet: function(d){
        return d.type==0?'单聊消息':'群消息'
      }}
      ,{field:'content', title:'消息内容',templet: function(d){
        return JSON.parse(d.content).content
      }}
      ,{field:'createuser', title:'创建人',sort: true}
	  ,{field:'createdate', title:'创建时间',sort: true}
	  ,{field:'updatedate', title:'更新日期',sort: true}
	  ,{fixed: 'right', title:'操作', toolbar: '#bar'}
    ]]
	,id:'reload'
    ,page: true
  });






















})
  

 






