layui.define(['jquery', 'layer', 'contextMenu', 'form','layim','api','upload'], function(exports) {
	var contextMenu = layui.contextMenu;
	var $ = layui.jquery;
	var layer = layui.layer;
	var form = layui.form;
	var cachedata = layui.layim.cache();
	var api = layui.api
	var conf = {
		layim: null,
		token: null,
	};
	layim = layui.layim
	var main = {		
		config: function(options) {
			conf = $.extend(conf, options); //把layim继承出去，方便在register中使用		
			$('body').on('click', '*[socket-event]', function(e) { //自定义事件
				var othis = $(this),
					methid = othis.attr('socket-event');
				im[methid] ? im[methid].call(this, othis, e) : '';
			});
		},		
	};




	var im = {
		popMsg: function(data, msg) { //删除本地最新一条发送失败的消息
			var logid = cachedata.local.chatlog[data.to.type + data.to.id];
			logid.pop();
			var timestamp = '.timestamp' + data.mine.timestamp;
			$(timestamp).html(
				'<i class="layui-icon" style="color: #F44336;font-size: 20px;float: left;margin-top: 1px;">&#x1007;</i>' + msg
			);
		},
		contextMenu: function() { //定义右键操作
			var my_spread = $('.layim-list-friend >li');
			console.log($(".layim-list-friend >li > h5"))
			my_spread.mousedown(function(e) {
				var data = {
					contextItem: "context-friend", // 添加class
					target: function(ele) { // 
						$(".context-friend").attr("data-id", ele[0].dataset['id']).attr("data-name", ele.find("span").html()).attr("data-sign", ele.find("p").html());
						$(".context-friend").attr("data-img", ele.find("img").attr('src')).attr("data-type", 'friend');
					},
					menu: []
				};
				data.menu.push(im.menuChat());
				data.menu.push(im.menuInfo());
				data.menu.push(im.menuChatLog());
				data.menu.push(im.menuNickName());
				var currentGroupidx = $(this).find('h5').data('id'); //当前分组id

				if (my_spread.length >= 2) { //当至少有两个分组时
					var html = '<ul>';
					for (var i = 0; i < my_spread.length; i++) {
						var groupidx = my_spread.eq(i).find('h5').data('id');
						if (currentGroupidx != groupidx) {
							var groupName = my_spread.eq(i).find('h5 span').html();
							html += '<li class="ui-move-menu-item" data-id="' + groupidx + '" data-groupName="' + groupName +
								'"><a href="javascript:void(0);"><span>' + groupName + '</span></a></li>'
						};
					};
					html += '</ul>';
					data.menu.push(im.menuMove(html));
				}
				data.menu.push(im.menuRemove());
				$(".layim-list-friend >li > ul > li").contextMenu(data); //好友右键事件
			});

			$(".layim-list-friend >li > h5").mousedown(function(e) {

				var data = {
					contextItem: "context-mygroup", // 添加class
					target: function(ele) { // 当前元素
						$(".context-mygroup").attr("data-id", ele.data('id')).attr("data-name", ele.find("span").html());
					},
					menu: []
				};
				data.menu.push(im.menuAddMyGroup());
				data.menu.push(im.menuRename());
				if ($(this).parent().find('ul li').data('index') !== 0) {
					data.menu.push(im.menuDelMyGroup());
				};

				$(this).contextMenu(data); //好友分组右键事件                                  
			});

			$(".layui-layim  .layui-layim-main .layim-user-avater").mousedown(function(e) {

				var data = {
					contextItem: "context-Mine", // 添加class
					target: function(ele) { // 当前元素

						$(".context-Mine").attr("data-id", ele.data('id'))
					},
					menu: []
				};
				data.menu.push(im.menuGetMineInfo());
				data.menu.push(im.menuUploadAvater());
				data.menu.push(im.menuGetout());
				
				/* if ($(this).parent().find('ul li').data('index') !== 0) {data.menu.push(im.menuDelMyGroup()); }; */

				$(this).contextMenu(data); //好友分组右键事件                                  
			});
			$(".layim-list-group > li").mousedown(function(e) {
				var data = {
					contextItem: "context-group", // 添加class
					target: function(ele) { // 当前元素
						$(".context-group").attr("data-id", ele[0].dataset['id']).attr("data-name", ele.find("span").html())
							.attr("data-img", ele.find("img").attr('src')).attr("data-type", 'group')
					},
					menu: []
				};
				data.menu.push(im.menuChat());
				// data.menu.push(im.menuInfo());
				data.menu.push(im.menuChatLog());
				// data.menu.push(im.menuLeaveGroupBySelf());

				$(this).contextMenu(data); //面板群组右键事件                                 
			});


			$('.groupMembers > li').mousedown(function(e) { //聊天页面群组右键事件
				var data = {
					contextItem: "context-group-member", // 添加class
					isfriend: $(".context-group-member").data("isfriend"), // 添加class
					target: function(ele) { // 当前元素
						$(".context-group-member").attr("data-id", ele[0].id.replace(/[^0-9]/ig, ""));
						$(".context-group-member").attr("data-img", ele.find("img").attr('src'));
						$(".context-group-member").attr("data-name", ele.find("span").html());
						$(".context-group-member").attr("data-isfriend", ele.attr('isfriend'));
						$(".context-group-member").attr("data-manager", ele.attr('manager'));
						$(".context-group-member").attr("data-id", ele.parent().data('id'));
						$(".context-group-member").attr("data-type", 'friend');
					},
					menu: []
				};
				var _this = $(this);
				var groupInfo = conf.layim.thisChat().data;
				var _time = (new Date()).valueOf(); //当前时间
				var _gagTime = parseInt(_this.attr('gagTime')); //当前禁言时间                  
				if (cachedata.mine.id !== _this.attr('id')) {
					data.menu.push(im.menuChat());
					data.menu.push(im.menuInfo());
					if (3 == e.which && $(this).attr('isfriend') == 0) { //点击右键并且不是好友
						data.menu.push(im.menuAddFriend())
					}
				} else {
					data.menu.push(im.menuEditGroupNickName());
				}
				if (groupInfo.manager == 1 && cachedata.mine.id !== _this.attr('id')) { //是群主且操作的对象不是自己
					if (_this.attr('manager') == 2) {
						data.menu.push(im.menuRemoveAdmin());
					} else if (_this.attr('manager') == 3) {
						data.menu.push(im.menuSetAdmin());
					}
					data.menu.push(im.menuEditGroupNickName());
					data.menu.push(im.menuLeaveGroup());
					if (_gagTime < _time) {
						data.menu.push(im.menuGroupMemberGag());
					} else {
						data.menu.push(im.menuLiftGroupMemberGag());
					}
				} //群主管理

				layui.each(cachedata.group, function(index, item) {
					if (item.id == _this.parent().data('id') && item.manager == 2 && _this.attr('manager') == 3 && cachedata.mine
						.id !== _this.attr('id')) { //管理员且操作的是群员
						data.menu.push(im.menuEditGroupNickName());
						data.menu.push(im.menuLeaveGroup());
						if (_gagTime < _time) {
							data.menu.push(im.menuGroupMemberGag());
						} else {
							data.menu.push(im.menuLiftGroupMemberGag());
						}
					} //管理员管理        
				})
				$(".groupMembers > li").contextMenu(data);
			})


		},
		


		IsExist: function(avatar) { //判断头像是否存在
			var ImgObj = new Image();
			ImgObj.src = avatar;
			if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
				return true;
			} else {
				return false;
			}
		},
		audio: function(msg) { //消息提示
			conf.layim.msgbox(msg);
			var audio = document.createElement("audio");
			audio.src = layui.cache.dir + 'css/modules/layim/voice/' + cachedata.base.voice;
			audio.play(); //消息提示音              
		},
		getMyInformation: function() {
			var index = layer.open({
				type: 2,
				title: '我的资料',
				shade: false,
				maxmin: false,
				area: ['400px', '670px'],
				skin: 'layui-box layui-layer-border',
				resize: true,
				content: layui.cache.dir + 'css/modules/layim/html/myInfo.html' + '?id=' + layui.data('mine').id +
					'&type=friend'
			});
		},
		getInformation: function(id, type) {
			var index = layer.open({
				type: 2,
				title: type == 'friend' ? (cachedata.mine.id == id ? '我的资料' : '好友资料') : '群资料',
				shade: false,
				maxmin: false
					// ,closeBtn: 0
					,
				area: ['300px', '400px'],
				skin: 'layui-box layui-layer-border',
				resize: true,
				content: layui.cache.dir + 'css/modules/layim/html/myInfo.html' + '?id=' + id + '&type=' + type
			});
		},
		userStatus: function(data) {
			if (data.id) {
				$.get('online-status/' + data.id, "", function(res) {
					var data = eval('(' + res + ')');
					if (data.code == 0) {
						if (data.msg == 'online') {
							conf.layim.setChatStatus('<span style="color:#FF5722;font-size:14px"></span>');
						} else {
							conf.layim.setChatStatus('<span style="color:#444;font-size:14px">(离线)</span>');
						}
					} else {
						//没有该用户
					}
				});
			}
		},
		closeAllGroupList: function() {
			var othis = $(".groupMembers");
			othis.remove(); //关闭全部的群员列表
			$(".layui-layim-group-search").remove();
			var icon = $('.layim-tool-groupMembers').find('.layui-icon');
			$('.layim-tool-groupMembers').data('show', null);
			icon.html('&#xe602;');
		},

		addMyGroup: function() { //新增分组
			layer.prompt({
				title: '请输入新的分组名，并确认',
				formType: 0,
				value: name[0]
			}, function(nickName, index) {
				api.addGroup(nickName)
				layer.close(index)
				im.contextMenu();
				// location.reload();
			});
			// 	    $.get('class/doAction.php?action=addMyGroup', {}, function (res) {
			// 	        var data = eval('(' + res + ')');
			// 	        if (data.code == 0) {
			// 	            $('.layim-list-friend').append('<li><h5 layim-event="spread" lay-type="false" data-id="'+data.data.id+'"><i class="layui-icon">&#xe602;</i><span>'+data.data.name+'</span><em>(<cite class="layim-count"> 0</cite>)</em></h5><ul class="layui-layim-list"><span class="layim-null">该分组下暂无好友</span></ul></li>');
			// 	            im.contextMenu();
			// 	            location.reload();
			// 	        }else{
			// 	            layer.msg(data.msg);
			// 	        }
			// 	    }); 
		},
		editGroupNickName: function(othis) {
			var memberIdx = othis.data('id'),
				name = othis.data('name').split('('),
				groupIdx = othis.data('id');
			layer.prompt({
				title: '请输入群名片，并确认',
				formType: 0,
				value: name[0]
			}, function(nickName, index) {
				$.get(apiUrl+'class/doAction.php?action=editGroupNickName', {
					nickName: nickName,
					memberIdx: memberIdx,
					groupIdx: groupIdx
				}, function(res) {
					var data = eval('(' + res + ')');
					if (data.code == 0) {
						$("ul[data-id=" + groupIdx + "] #" + memberIdx).find('span').html(nickName + '(' + memberIdx + ')');
						layer.close(index);
					}
					layer.msg(data.msg);
				});
			});
		},
		menuChat: function() {
			return data = {
				text: "发送消息",
				icon: "&#xe63a;",
				callback: function(ele) {
					var othis = ele.parent(),
						type = othis.data('type'),
						name = othis.data('name'),
						avatar = othis.data('img'),
						id = othis.data('id'),
						sign=othis.data('sign');
					// id = (new RegExp(substr).test('layim')?substr.replace(/[^0-9]/ig,""):substr);
					conf.layim.chat({
						name: name,
						type: type,
						avatar: avatar,
						id: id,
						sign:sign
					});
				}
			}
		},
		menuGetMineInfo: function() {
			return data = {
				text: "查看资料",
				icon: "&#xe62a;",
				callback: function(ele) {

					var othis = ele.parent(),
						id = othis.data("id");
					im.getInformation(id, "friend");
				}
			}
		},
		menuGetout: function() {
			return data = {
				text: "退出账号",
				icon: "&#xe62a;",
				callback: function(ele) {
					for(var i in localStorage){
						 if(i.indexOf('msglastversion')>=0){
							continue;
						}
						localStorage.removeItem(i);
					};
	    	    	location.href="index.html";
				}
			}
		},
		menuUploadAvater: function() {
			return data = {
				text: "修改头像",
				icon: "&#xe62a;",
				callback: function(ele) {
					$("#imgInput").click()
					var type = 'images',
						api_ = {
							images: 'uploadImage',
							file: 'uploadFile'
						},
						upload = cachedata.base['uploadImage'] || {};
					layui.upload.render({
						url: upload.url || '',
						method: upload.type,
						elem: "#imgInput",
						accept: type,
						done: function(res) {
							if (res.code == 0) {
								/* res.data = res.data.src || {}; */
								$(".layui-circle").attr('src', res.data.src)
								api.saveMyInfo({
									"avatar": res.data.src
								})
								layui.layim.cache().mine.avatar=res.data.src
								/* sendMessage(); */
							} else {
								layer.msg(res.msg || '上传失败');
							}
							/* console.log(othis.find('input')[0]) */
						},

					});

					/* var othis = ele.parent(),id = othis.data("id");
							console.log(othis)
							im.getInformation(id,"friend"); */
				}
			}
		},
		menuInfo: function() {
			return data = {
				text: "查看资料",
				icon: "&#xe62a;",
				callback: function(ele) {
					var othis = ele.parent(),
						type = othis.data('type'),
						id = othis[0].dataset.id.replace(/^layim-friend/g, '');
					im.getInformation(id, type);
				}
			}
		},

		menuChatLog: function() {
			return data = {
				text: "聊天记录",
				icon: "&#xe60e;",
				callback: function(ele) {
					var othis = ele.parent(),
						type = othis.data('type'),
						name = othis.data('name'),
						id = othis.data('id');
					im.getChatLog({
						name: name,
						id: id,
						type: type
					});
				}
			}
		},
		getChatLog: function(data) {
			if (!cachedata.base.chatLog) {
				return layer.msg('未开启更多聊天记录');
			}
			var index = layer.open({
				type: 2,
				maxmin: true,
				title: '与 ' + data.name + ' 的聊天记录',
				area: ['450px', '600px'],
				shade: false,
				skin: 'layui-box',
				anim: 2,
				id: 'layui-layim-chatlog',
				content: layui.cache.dir + 'css/modules/layim/html/chatlog.html' + '?id=' + data.id + '&type=' + data.type
			});
		},
		menuNickName: function() {
			return data = {
				text: "修改好友备注",
				icon: "&#xe6b2;",
				callback: function(ele) {
					var othis = ele.parent(),
						friend_id = othis.data('id'),
						friend_name = othis.data('name');
					layer.prompt({
						title: '修改备注姓名',
						formType: 0,
						value: friend_name
					}, function(nickName, index) {
						res=api.maskName(friend_id,nickName)
						if(res.code==0){
							var friendName = $(".layim-friend" + friend_id);
							for (var j = 0; j < friendName.length; j++) {									
									friendName.eq(j).find('span').html(nickName);							
							}
							layer.close(index);
						}						
					});

				}
			}
		},

		menuMove: function(html) {
			return data = {
				text: "移动联系人",
				icon: "&#xe630;",
				nav: "move", //子导航的样式
				navIcon: "&#xe602;", //子导航的图标
				navBody: html, //子导航html
				callback: function(ele) {
					var friend_id = ele.parent().data('id'); //要移动的好友id
					friend_name = ele.parent().data('name');
					var avatar = ele.parent().data('img');
					var default_avatar = 'layui/images/0.jpg';
					var signature = $('.layim-list-friend').find('.layim-friend' + friend_id).find('p').html(); //获取签名
					var item = ele.find("ul li");
					item.hover(function() {
						var _this = item.index(this);
						var groupidx = item.eq(_this).data('id'); //将好友移动到分组的id
						api.moveGroup(friend_id, groupidx)
						conf.layim.removeList({ //将好友从之前分组除去
							type: 'friend',
							id: friend_id //好友ID
						});
						conf.layim.addList({ //将好友移动到新分组
							type: 'friend',
							avatar: im['IsExist'].call(this, avatar) ? avatar : default_avatar //好友头像
								,
							username: friend_name //好友昵称
								,
							groupid: groupidx //所在的分组id
								,
							id: friend_id //好友ID
								,
							sign: signature //好友签名
						});

					});
				}
			}
		},

		menuRemove: function() {
			return data = {
				text: "删除好友",
				icon: "&#xe640;",
				events: "removeFriends",
				callback: function(ele) {
					var othis = ele.parent(),
						friend_id = othis.data('id'),
						username, sign, src = othis.data('img')
					layui.each(cachedata.friend, function(index1, item1) {
						layui.each(item1.list, function(index, item) {
							if (item.id === friend_id) {
								username = item.username;
								sign = item.sign;
							}
						});
					});
					layer.confirm(
						'删除后对方将从你的好友列表消失，且以后不会再接收此人的会话消息。<div class="layui-layim-list"><li layim-event="chat" data-type="friend" data-index="0"><img src=' +
						src + ' ><span>' + username + '</span><p>' + sign + '</p></li></div>', {
							btn: ['确定', '取消'], //按钮
							title: ['删除好友', 'background:#b4bdb8'],
							shade: 0
						},
						function() {
							im.removeFriends(friend_id);
							im.contextMenu();
							// location.reload()
						},
						function() {
							var index = layer.open();
							layer.close(index);
						});
				}
			}
		},
		removeFriends: function(friend_id) {
			$.ajax({
				type: "DELETE",
				url: apiUrl + "friends/" + friend_id+"?currentsession="+localStorage.getItem("currentsession"),
				data: {},
				dataType: "json",
				beforeSend: function() {
					layer.load(0, {
						shade: 0.1
					});
				},
				success: function(res) {
					layer.closeAll('loading');
					layer.msg(res.msg)
					var index = layer.open();
					layer.close(index);
					conf.layim.removeList({
						type: 'friend' //或者group
							,
						id: friend_id //好友或者群组ID
					});
					im.removeHistory({ //从我的历史列表删除
						type: 'friend' //或者group
							,
						id: friend_id //好友或者群组ID
					});

				},
				error: function(e) {
					console.log(e)
				}
			});

		},
		removeHistory: function(data) { //删除好友或退出群后清除历史记录           
			var history = cachedata.local.history;
			delete history[data.type + data.id];
			cachedata.local.history = history;
			layui.data('layim', {
				key: cachedata.mine.id,
				value: cachedata.local
			});
			$('#layim-history' + data.id).remove();
			var hisElem = $('.layui-layim').find('.layim-list-history');
			var none = '<li class="layim-null">暂无历史会话</li>'
			if (hisElem.find('li').length === 0) {
				hisElem.html(none);
			}
		},
		menuAddMyGroup: function() {
			return data = {
				text: "添加分组",
				icon: "&#xe654;",
				callback: function(ele) {
					im.addMyGroup();
				}
			}

		},
		menuRename: function() {
			return data = {
				text: "重命名",
				icon: "&#xe642;",
				callback: function(ele) {
					var othis = ele.parent(),
						mygroupIdx = othis.data('id'),
						groupName = othis.data('name');
					layer.prompt({
						title: '请输入分组名，并确认',
						formType: 0,
						value: groupName
					}, function(mygroupName, index) {
						if (mygroupName) {
							api.reNameGroup(mygroupIdx, mygroupName, index)
							im.contextMenu();
						}

					});
				}

			}
		},
		menuDelMyGroup: function() {
			return data = {
				text: "删除该组",
				icon: "&#x1006;",
				callback: function(ele) {
					var othis = ele.parent(),
						mygroupIdx = othis.data('id'),
						name = othis.data('name')
					// console.log(othis)
					layer.confirm(
						'<div style="float: left;width: 17%;margin-top: 14px;"><i class="layui-icon" style="font-size: 48px;color:#cc4a4a">&#xe607;</i></div><div style="width: 83%;float: left;"> 选定的分组将被删除，组内联系人将会移至默认分组。</div>', {
							btn: ['确定', '取消'], //按钮
							title: ['删除分组', 'background:#b4bdb8'],
							shade: 0
						},
						function() {
							im.delMyGroup(mygroupIdx);
							$(".layim-list-friend >li > h5[data-id=" + mygroupIdx + "]").parent().remove()
							im.contextMenu();
						},
						function() {
							var index = layer.open();
							layer.close(index);
						});
				}
			}
		},
		delMyGroup: function(groupidx, name) { //删除分组
			api.delGroup(groupidx)
		},














	}

	exports('main', main);
	exports('im', im);
});
