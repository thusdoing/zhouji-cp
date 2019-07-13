 
layui.use('table', function(){
  var table = layui.table;
  //监听表格复选框选择
  table.on('checkbox(list)', function(obj){
    console.log(obj)
  });
  //监听工具条
  table.on('tool(list)', function(obj){
    var data = obj.data;
    if(obj.event === 'show'){
    	layer.alert('查看行：<br>'+ JSON.stringify(data))
    } else if(obj.event === 'del'){
      layer.confirm('真的删除行么', function(index){
        obj.del();
        layer.close(index);
      });
    } else if(obj.event === 'edit'){
      layer.alert('编辑行：<br>'+ JSON.stringify(data))
    } 
  });
  
  var $ = layui.$, active = {
    getCheckData: function(){ //获取选中数据
      var checkStatus = table.checkStatus('listTable')
      ,data = checkStatus.data;
	   if(data.length<1){
	    	 layer.alert('请选择数据')
	   }else{
		   var ids ="";
		   for(var i=0;i<data.length;i++){
			   ids+="ids="+data[i].user_record_id+"&";
		   } 
		   layer.alert('选中ID：<br>'+ids) 
	   } 
    } 
  };
  
  $('.listTable .layui-btn').on('click', function(){
    var type = $(this).data('type');
    active[type] ? active[type].call(this) : '';
  });
});
 




$(function () {
    $("#jqGrid").jqGrid({
        url: '../groupmembers/list',
        datatype: "json",
        colModel: [			
			{ label: 'userRecordId', name: 'userRecordId', index: 'user_record_id', width: 50, key: true },
			{ label: '用户的UID号作该用户的登陆名，全服务器唯一。备注：使用时假设从400000开始自增？留一些保留号吧。', name: 'userUid', index: 'user_uid', width: 80 }, 			
			{ label: '', name: 'gId', index: 'g_id', width: 80 }, 			
			{ label: '加入本群的时间。', name: 'joinTime', index: 'join_time', width: 80 }, 			
			{ label: '本人被谁邀请进群的（非邀请的情况，本字段则可为空）。', name: 'beInviteUserId', index: 'be_invite_user_id', width: 80 }, 			
			{ label: '* 创建群时，创建者自动成为群主，本时间就是创建群的时间； * 进行群转让人，本字段填的就是最近一次被转让时的时间。', name: 'beOwnerTime', index: 'be_owner_time', width: 80 }, 			
			{ label: '', name: 'nicknameIngroup', index: 'nickname_ingroup', width: 80 }, 			
			{ label: '是否禁言', name: 'status', index: 'status', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		groupMembers: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.groupMembers = {};
		},
		update: function (event) {
			var userRecordId = getSelectedRow();
			if(userRecordId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(userRecordId)
		},
		saveOrUpdate: function (event) {
			var url = vm.groupMembers.userRecordId == null ? "../groupmembers/save" : "../groupmembers/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.groupMembers),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var userRecordIds = getSelectedRows();
			if(userRecordIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../groupmembers/delete",
				    data: JSON.stringify(userRecordIds),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(userRecordId){
			$.get("../groupmembers/info/"+userRecordId, function(r){
                vm.groupMembers = r.groupMembers;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});