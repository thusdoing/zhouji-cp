var pomelo = window.pomelo;
var username;
var users;
var rid='agarxhqb98rpajloaxn';
var base = 1000;
var increase = 25;
var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
var LOGIN_ERROR = "There is no server to log in, please wait.";
var LENGTH_ERROR = "Name/Channel is too long or too short. 20 character max.";
var NAME_ERROR = "Bad character in Name/Channel. Can only have letters, numbers, Chinese characters, and '_'";
var DUPLICATE_ERROR = "Please change your name to login.";

util = {
	urlRE: /https?:\/\/([-\w\.]+)+(:\d+)?(\/([^\s]*(\?\S+)?)?)?/g,
	//  html sanitizer
	toStaticHTML: function(inputHtml) {
		inputHtml = inputHtml.toString();
		return inputHtml.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	//pads n with zeros on the left,
	//digits is minimum length of output
	//zeroPad(3, 5); returns "005"
	//zeroPad(2, 500); returns "500"
	zeroPad: function(digits, n) {
		n = n.toString();
		while(n.length < digits)
		n = '0' + n;
		return n;
	},
	//it is almost 8 o'clock PM here
	//timeString(new Date); returns "19:49"
	timeString: function(date) {
		var minutes = date.getMinutes().toString();
		var hours = date.getHours().toString();
		return this.zeroPad(2, hours) + ":" + this.zeroPad(2, minutes);
	},

	//does the argument only contain whitespace?
	isBlank: function(text) {
		var blank = /^\s*$/;
		return(text.match(blank) !== null);
	}
};
// 分配可连接服务器
function queryEntry(uid, callback) {
	var route = 'gate.gateHandler.queryEntry';
	pomelo.init({
		host: '66.232.4.213',
		port: 3014,
		log: true
	}, function() {
		pomelo.request(route, {
			uid: uid
		}, function(data) {
			//断开后重连
			pomelo.disconnect();
			if(data.code === 500) {
				console.log(LOGIN_ERROR);
				return;
			}
			callback(data.host, data.port);
		});
	});
};
function initUserList(data){
	console.log("当前在线人数:"+data.users.length);
};
/**
 * 客户端心跳发送
 */
/**
 * setInterval(() => {
	var hearttimestamp=localStorage.getItem("hearttimestamp");
	if(hearttimestamp && ((new Date()).getTime()-hearttimestamp)>50000){
		var target ="*"; //  表示所有人
		pomelo.request("chat.chatHandler.send", {
			rid: rid,
			content: "1",
			from: username,
			target: target
		}, function(data) {
			console.log(1);
		});
	}
}, 3000);
 * @param {*} jsondata 
 * @param {*} targets 
 * @param {*} callback 
 */
function sendMessage(jsondata,targets,callback){
	var route = "chat.chatHandler.send";
	//var target ="*"; //  表示所有人
	var target=JSON.parse(targets).join(",");
	//if(e.keyCode != 13 /* Return */ ) return;
	var msg = JSON.stringify(jsondata);
	console.log(msg);
	if(!util.isBlank(msg)) {
		pomelo.request(route, {
			rid: rid,
			content: msg,
			from: username,
			target: target
		}, function(data) {
			callback(data);
		});
	}
}
function telnetIM(){
	username = localStorage.getItem("currentsession");
	if(localStorage.getItem("api_info")){
		rid =JSON.parse(localStorage.getItem("api_info")).chanel_code;
	}
	if(username.length > 20 || username.length == 0 || rid.length > 20 || rid.length == 0) {
		alert(LENGTH_ERROR);
		return false;
	}
	if(!reg.test(username) || !reg.test(rid)) {
		alert(NAME_ERROR);
		return false;
	}
	
	queryEntry(username, function(host, port) {
		pomelo.init({
			host: host,
			port: port,
			log: true
		}, function() {
			localStorage.removeItem("relogin");
			//连接服务
			var route = "connector.entryHandler.enter";
			pomelo.request(route, {
				username: username,
				rid: rid
			}, function(data) {
				if(data.error) {
					localStorage.setItem("relogin",true);
					  return;
				}
				initUserList(data);
			});
		});
	});
}
$(document).ready(function() {


	telnetIM();




	//端口连接
	pomelo.on('disconnect', function(reason) {
		
	});



});