layui.define(['jquery', 'layer', 'contextMenu', 'layim'], function(exports) {
	var layer = layui.layer
		//var ApiUrl="http://45.126.180.121:8100/zhoujiim"	
		,
		layim = layui.layim,
		laytpl = layui.laytpl,
		$ = layui.jquery,
		laypage = layui.laypage
	var api = {
		//登录
		ajaxJson: function(type, url, data, callFun,isReturn) {
			var result, _type = type || "GET",
				_data = data || {}
				_isReturn=isReturn || false;
			$.ajax({
				type: _type,
				url: url,
				contentType: "application/json;charset=utf-8",
				data: _data,
				dataType: "json",
				async: false, //同步
				beforeSend: function() {
					layer.load(0, {
						shade: 0.1
					});
				},
				success: function(res) {
					layer.closeAll('loading');
					
						if (res.code == "0") {
							callFun(res)
							console.log(_isReturn,url)
							result=res
						} else {
							layer.msg(res.msg)
						}
					
					
				},
				error: function(e) {
					console.log(e)
				}
			})
			if(_isReturn){
				return result
			}
			/* return result */
		},
		login: function(name, pwd) {
			$.ajax({
				type: "GET",
				url: "login",
				data: {
					account: name,
					password: pwd
				},
				async: false, //同步
				dataType: "json",
				beforeSend: function() {
					layer.load(0, {
						shade: 0.1
					});
				},
				success: function(res) {
					layer.closeAll('loading');
					window.username = name;
					window.userpwd = pwd;
					setTimeout(window.location.href = 'main.html', 3000);
				},
				error: function(e) {
					/* if(e.responseText.indexOf("您")){
						layer.closeAll('loading');
						setTimeout(window.location.href = 'main.html', 3000);
					} */
					setTimeout(window.location.href = 'main.html', 3000);
					console.log(e)
				}
			});
		},
		findFriend: function(input, addType) {
			this.ajaxJson("GET", apiUrl + "friends?account=" + input, {}, function(res) {
				var html = laytpl(LAY_tpl.value).render({
					data: res.data,
					legend: '<a class="back"><i class="layui-icon">&#xe65c;</>返回</a> 查找结果',
					type: addType
				});
				$('#LAY_view').html(html);
			})
		},
		addFriend: function(uid, remark, group) {
			this.ajaxJson("POST", apiUrl + "friend-applications?currentsession="+localStorage.getItem("currentsession"), JSON.stringify({
				"friendId": uid,
				"message": remark,
				"friendGroupId": Number(group)
			}), function(res) {
				layer.msg(res.msg)
			})
		},
		getTuiJian: function() {
			this.ajaxJson("GET", apiUrl + "recommended-friends", {}, function(res) {
				var html = laytpl(LAY_tpl.value).render({
					data: res.data,
					legend: '推荐好友',
					type: 'friend'
				});
				$('#LAY_view').html(html);
			})
		},
		addGroup: function(groupName) {
			this.ajaxJson("POST", apiUrl + "friend-groups?currentsession="+localStorage.getItem("currentsession"), JSON.stringify({
				"groupName": groupName
			}), function(res) {
				$('.layim-list-friend').append('<li><h5 layim-event="spread" lay-type="false" data-id="' + res.data.id +
					'"><i class="layui-icon">&#xe602;</i><span>' + groupName +
					'</span><em>(<cite class="layim-count"> 0</cite>)</em></h5><ul class="layui-layim-list"><span class="layim-null">该分组下暂无好友</span></ul></li>'
				);
				layer.msg(res.msg)
			})

		},
		delGroup: function(id) {
			this.ajaxJson("DELETE", apiUrl + "friend-groups/" + id, {}, function(res) {
				layer.msg(res.msg)
			})
		},
		reNameGroup: function(id, groupName, index) {
			this.ajaxJson("PUT", apiUrl + "friend-groups", JSON.stringify({
				"id": id,
				"groupName": groupName
			}), function(res) {
				var friend_group = $(".layim-list-friend li");
				for (var j = 0; j < friend_group.length; j++) {
					var groupidx = friend_group.eq(j).find('h5').data('id');
					if (groupidx == id) { //当前选择的分组
						friend_group.eq(j).find('h5').find('span').html(groupName);
					}
				}
				layui.im.contextMenu();
				layui.layer.close(index);
				layer.msg(res.msg)
			})

		},
		moveGroup: function(friendId, friendGroupId) {
			var data=JSON.stringify({
					"friendId": friendId,
					"friendGroupId": friendGroupId
				})
			this.ajaxJson("PUT", apiUrl + "friends?currentsession="+localStorage.getItem("currentsession"), data, function(res) {
					layer.msg(res.msg)
				})
			
						
		},
		getapplications: function() {
			var result;
			this.ajaxJson("GET", apiUrl + "friend-applications?currentsession="+localStorage.getItem("currentsession"), {}, function(res) {					
					result= res
				})
							return result
		},
		dealFriend: function(friendId, status, friendGroupId) {
			var result;
			var data=JSON.stringify({
					"id": friendId,
					"status": status,
					"friendGroupId": friendGroupId
				})
			this.ajaxJson("PUT", apiUrl + "friend-applications?currentsession="+localStorage.getItem("currentsession"), data, function(res) {	
				    layer.msg(res.msg)
					result= res
				})
				console.log(result)
			return result			
		},

		saveMyInfo: function(option) {
			var data=JSON.stringify(option);
			this.ajaxJson("PUT", apiUrl + "user-infos?currentsession="+localStorage.getItem("currentsession"), data, function(res) {	
				    var index = parent.layer.getFrameIndex(window.name);				    
				    layer.msg(res.msg, {
				    	icon: 1,
				    	time: 1000
				    })
				})			
		},
		getMsgCount:function(){
			
		  return this.ajaxJson("GET", apiUrl + "unread-application-count?currentsession="+localStorage.getItem("currentsession"), {}, function(res) {	
				var num = res.data				
				if(num>0){					
					localStorage.setItem('msgNum',num)	
				}else{
					localStorage.setItem('msgNum',0)	
				}},true).data
		},
		putMsgNum:function(){
			
			this.ajaxJson("put", apiUrl + "unread-application-count?currentsession="+localStorage.getItem("currentsession"), {}, function(res) {		   				    
				    
				})
		},
		maskName:function(id,name){
			var data=JSON.stringify({
					"friendId": id,
					 "friendNote": name
				})
			return this.ajaxJson("put", apiUrl + "friends?currentsession="+localStorage.getItem("currentsession"), data, function(res) {		   				    
				    
				},true)
		},



	}


	exports('api', api);
})
