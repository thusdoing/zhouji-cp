layui.use(['table','layer','form','layedit'], function(){
  var table = layui.table  
  ,$ = layui.$
  ,layer=layui.layer
  ,layedit = layui.layedit
  
 var tableIns = table.render({
    elem: '#test'
    ,url:apiUrl+'/userinfo/list_'
	,method:'post'
/*    ,toolbar: '#toolGroup' */
    ,title: '会员系统'
	,parseData: function(res) { //res 即为原始返回的数据
		return {
			"code": res.code, //解析接口状态
			"msg": res.msg, //解析提示文本
			"count": res.count, //解析数据长度
			"data": res.data['userInfoList0'].concat(res.data['userInfoList1']) //解析数据列表
		};
	}
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
			,{field:'uid', title:'用户id', }
			,{field:'account', title:'账号', }
      ,{field:'name', title:'会员名'}
	  ,{field:'address', title:'地址'}
      ,{field:'updatedate', title:'上次登录'}
      ,{field:'createdate', title:'注册时间'} 
	  ,{field:'signature', title:'签名'} 
	  ,{field:'phone', title:'手机'} 
	  ,{field:'birthday', title:'生日'} 
	  ,{fixed: 'right', title:'操作', toolbar: '#bar'}
    ]]
	,id:'reload'
    ,page: true
  });
  $('#serchBtn').click(function(){
	  var serch = $('#serch');
	  			console.log(serch)
	  			tableIns.reload({
	  			  where: { 	
	  				gName: serch.val()
	  			  }
	  			});
	  
  })

  $('#add').click(function(){
		sessionStorage.setItem('isUpdate','0')
		layer.open({
			type:2,
			title: '新增群',
			area: ['1000px', '450px'],
			content:layui.cache.dir + 'css/modules/layim/html/addGroup.html',
			end:function(){
				var isUpdate=sessionStorage.getItem('isUpdate')
				if(isUpdate=='1'){
					tableIns.reload({
					  where: { 	
						gName: ''
					  }
					});
				}
				
			}
		})
  	  
  })
    //监听行工具事件
  table.on('tool(test)', function(obj){
    var data = obj.data;
    //console.log(obj)
    if(obj.event === 'del'){
      layer.confirm('真的删除 '+data.gName+' 这个群吗？', function(index){
        obj.del();
		console.log(data)
		$.post(apiUrl+"groupbase/delete",{'gIds':data.gId},function(res){
			if(res.code==1){
				layer.msg("删除成功")
			}else{
				layer.msg("删除失败")
			}
		},"json")
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
		sessionStorage.setItem('editData',JSON.stringify(data))	
		sessionStorage.setItem('isUpdate','0')
		layer.open({
			type:2,
			title: '修改群',
			area: ['1000px', '450px'],
			content:layui.cache.dir + 'css/modules/layim/html/reviseGroup.html',
			end:function(){
				var isUpdate=sessionStorage.getItem('isUpdate')
				if(isUpdate=='1'){
					tableIns.reload({
					  where: { 	
						gName: ''
					  }
					});
				}
			}
		})
    }else if(obj.event === 'addMember'){
		sessionStorage.setItem('editData',JSON.stringify(data))	
		sessionStorage.setItem('isUpdate','0')
		layer.open({
			type:2,
			title: '好友管理',
			area: ['1100px', '750px'],
			content:layui.cache.dir + 'css/modules/layim/html/friendManger.html?uid='+data.uid,
			end:function(){
				var isUpdate=sessionStorage.getItem('isUpdate')
				if(isUpdate=='1'){
					tableIns.reload({
					  where: { 	
						gName: ''
					  }
					});
				}
			}
		})
		
    }
  });
  



 
  


  
  
});
