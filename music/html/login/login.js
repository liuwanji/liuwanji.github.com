/*注册申请版本*/
var version = 1;
$(function() {
	button_addlister();
	refresh();
});

function loginUp() {
	var tel = $('#tel').val();
	var pw = $('#password').val();
	if(tel == '' || pw == ''){
		alert("请输入完整的账号或密码！");
//	}else if(tel.length !== 11 ){
//		alert("请输入正确的手机号!");
	}else{
		var url = "http://106.15.53.15:8090/account/login?" + 'from=1&time=' + (new Date()).getTime() + '&acc=' + tel + '&pw=' + pw + '&sign=*';
		console.log(url);
		ajax_public(url, function(msg) {
				console.log(msg);
				if(window.localStorage.loginStauts)
						window.localStorage.loginAcc = tel;
				if(msg.status == 0){
					window.sessionStorage.name = msg.data.username;
					window.sessionStorage.token = msg.data.token;
					window.sessionStorage.uid = msg.data.uid;
					window.sessionStorage.head = msg.data.head;
					window.sessionStorage.type = msg.data.identity;
					window.location.href = "../../html/index/index.html";
				}else{
					alert(msg.msg);
				}
		});
	}

}

function button_addlister() {
	/*手机号输入的监听事件*/
//	$("#tel").on("input",function(){
//		if($(this).val().length != 11){
//			$("#iphoneTishi").show();
//		}else{
//			$("#iphoneTishi").hide();
//		}
//	});
	/*自动登录的点击事件*/
	$('.zddl').on("click", function() {
		if($("#selected").css("display")=='none') {
			$("#selected").show();
			window.localStorage.loginStauts = 1;
		} else {
			$("#selected").hide();
			window.localStorage.loginStauts = 0;
		}
	});
	/*注册新用户和其中返回登录的点击事件*/
	$("#zcxyh").on("click",function(){
//		$("#denglu").animate({opacity:"0"},200,function(){
//			$("#denglu").hide();
//			$("#zhuce").show();
//			$("#zhuce").animate({opacity:"1"},200);
//		});
		$("#register").show();
		$("#registerShadow").animate({opacity:'0.3'},400);
		$("#registerMain").animate({top:'25%',opacity:'1'},400);
	});
	$("#close_register").on("click",function(){
		$("#registerShadow").animate({opacity:'0'},400);
		$("#registerMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#register").hide();
		});
	});
	$("#fhdl").on("click",function(){
		$("#zhuce").animate({opacity:"0"},200,function(){
			$("#zhuce").hide();
			$("#denglu").show();
			$("#denglu").animate({opacity:"1"},200);
		});
	});
	/*忘记密码和其中返回登录的点击事件*/
	$("#wjmm").on("click",function(){
		$("#denglu").animate({opacity:"0"},200,function(){
			$("#denglu").hide();
			$("#zhmm").show();
			$("#zhmm").animate({opacity:"1"},200);
		});
	});
	$("#fhdl1").on("click",function(){
		$("#zhmm").animate({opacity:"0"},200,function(){
			$("#zhmm").hide();
			$("#denglu").show();
			$("#denglu").animate({opacity:"1"},200);
		});
	});
	/*提示信息的关闭点击事件*/
	$("#close_tishi,#tishiOk").on("click",function(){
		$("#tishiShadow").animate({opacity:'0'},400);
		$("#tishiMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#tishi").hide();
		});
	});
	/*回车键的监听事件*/
	$('body').bind('keyup', function(event) {
        if (event.keyCode == "13") {
            //回车执行查询
            loginUp();
        }
    });
	/*验证码发送按钮的点击事件*/
	$("#_code").on("click", function() {
		var _tel = $("#acc_user").val();
		if(_tel == "") {
			alert("请先输入手机号!");
			return false;
		} else if(_tel.length != 11) {
			alert("请输入正确的手机号。");
			return false;
		}
		var t = 60;
		$(this).hide();
		$("#_code_time").show();
		$("#_code_time").html("(60s)");
		var timer = setInterval(function() {
			if(t > 1) {
				t--;
				$("#_code_time").html("(" + t + "s)");
			} else {
				$("#_code").show();
				$("#_code_time").hide();
				clearInterval(timer);
			}
		}, 1000);
		var data = {
			tel: _tel,
		};
		console.log(data);
		var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
		var deal = "account/getverifycode?";
		var url = objKeySort(deal, data, token);
		console.log(url);
		ajax_public(url, function(msg) {
			console.log(msg);
			if(msg.status != 0) {
				alert(msg.msg);
				$("#_code").show();
				$("#_code_time").html("60s");
				$("#_code_time").hide();
				clearInterval(timer);
			}
		});
	});
}
function refresh(){
	addressInit('prov', 'city', 'country');
	if(window.localStorage.loginStauts&&window.localStorage.loginStauts==1&&window.localStorage.loginAcc){
		$('#tel').val(window.localStorage.loginAcc);
		$("#selected").show();
	}
	var u_agent = navigator.userAgent; 
	if(u_agent.indexOf('Trident')>-1&&u_agent.indexOf('rv:11')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}else if(u_agent.indexOf('MSIE')>-1&&u_agent.indexOf('Trident')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}else if(u_agent.indexOf('MSIE')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}else if(u_agent.indexOf('Opera')>-1){ 
		alert("使用ie浏览器，可能导致 生态学院管理系统 部分页面功能异常， 推荐您使用 chorme 等 非IE内核 的浏览器!");
	}
}

/*选择申请版本的点击事件*/
function selectVersion(index,element){
	$(".xzxysearch1").find("img").hide();
	$(element).find("img").show();
	version = index;
}
/*提交的点击事件*/
function update(){
	var name = $("#jgmc").val();
	var province = $("#prov option:selected").text(); 
	var city = $("#city option:selected").text(); 
	var area = $("#country option:selected").text();
	if(province==''||city==''||area==''){
		alert("请输入完整的机构局域!");
		return false;
	}
	
	var addr = $("#xxdz").val();
	var people = $("#fzr").val();
	var phone = $("#lxdh").val();
	var accid = $("#accid").val();
	if(name == ''||addr == ''||people == ''||phone == ''||accid == ''){
		alert("请输入完整!");
		return false;
	}
	if(accid.length<6||accid.length>18){
		alert("账号id 请使用 6 ~ 18 位 英文 或 数字!");
		return false;
	}
	if(!/^[0-9a-zA-Z]+$/.test(accid)){
		alert("账号id请输入英文或数字！");
		return false;
	}
	var data = {
		versions:version,
		schname:name,
		province :province,
		city:city,
		area:area,
		addr:addr,
		manager:people,
		tel:phone,
		accid:accid
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "organization/add?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#registerShadow").animate({opacity:'0'},400);
			$("#registerMain").animate({top:'0%',opacity:'0'},400,function(){
				$("#register").hide();
			});
			setTimeout(function(){
				alert("您的注册申请已提交，我们工作人员会很快与您联系，请留意接听电话!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*修改密码的确认点击事件*/
function editAcc(){
	var accid = $("#accid1").val();
	var acc_user = $("#acc_user").val();
	var checkCode = $("#yzm1").val();
	var newPw = $("#newPw").val();
	var newPw1 = $("#newPw1").val();
	if(accid == ''||acc_user == ''||checkCode == ''||newPw == ''||newPw1 == ''){
		alert("请输入完整!");
		return false;
	}
	if(newPw != newPw1){
		alert("确认密码与新密码不同!请确认输入!");
		return false;
	}
	var data = {
		accid:accid,
		tel:acc_user,
		verifycode:checkCode,
		newPwd :$.md5(newPw),
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "account/managechgPwd?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#fhdl1").trigger("click");
			setTimeout(function(){
				alert("密码修改成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}
