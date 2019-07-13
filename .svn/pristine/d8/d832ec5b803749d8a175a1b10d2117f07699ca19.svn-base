layui.use(['table','layer','form','layedit'], function(){
  var table = layui.table  
  ,$ = layui.$
  ,layer=layui.layer
  ,layedit = layui.layedit
  
 var tableIns = table.render({
    elem: '#test'
    ,url:apiUrl+'groupbase/list'
	,method:'post'
/*    ,toolbar: '#toolGroup' */
    ,title: '群管理系统'
    ,cols: [[
      {type: 'checkbox', fixed: 'left'}
      ,{field:'gId', title:'唯一标识符',  fixed: 'left', unresize: true,sort: true,width:120}
      ,{field:'gStatus', title:'群状态',  sort: true,width:80}
      ,{field:'gName', title:'群名',width:250}
      ,{field:'gNotice', title:'群公告',width:300}
      ,{field:'maxMemberCount', title:'最大群成员数'}
			,{field:'gMemberCount', title:'当前群成员数',  sort: true}
			,{field:'chanelid', title:'所属渠道ID'}
			,{field:'chanelname', title:'所属渠道名称'}
      ,{field:'createUserUid', title:'创建人ID'}
      ,{field:'createTime', title:'创建时间',sort: true},
	  ,{fixed: 'right', title:'操作', toolbar: '#bar',width:184}
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
			title: '群成员管理',
			area: ['1100px', '750px'],
			content:layui.cache.dir + 'css/modules/layim/html/memberManager.html?gid='+data.gId,
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
  

//   , active = {
//     reload: function(){
//       var serch = $('#serch');
//       
//       //执行重载
//       table.reload('reload', {
//         page: {
//           curr: 1 //重新从第 1 页开始
//         }
//         ,where: {
//           key: {
// 			page:curr,
// 			limit:10,
//             gName: serch.val()
//           }
//         }
//       });
//     }
//   };

 
  


  
  
});
//   function reloadTable(){
// 	  tableIns.reload({
// 	    where: { 	
// 	  	gName: ''
// 	    }
// 	  });
// 	  
//   }