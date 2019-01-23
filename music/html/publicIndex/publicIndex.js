$(function(){
	addlisten_Index();
	refresh_Index();
});


/*事件监听方法*/
function addlisten_Index(){
	/*顶部修改密码。更换手机号等tip弹窗 鼠标移入的事件监听*/
	$("#user_box").on("mouseenter",function(){
		$(".user_direction").css({transform:"rotate(-180deg)"});
		$("#user_box_up").show();
		$("#user_box_up").stop().animate({
			opacity:"1",
			top:"60px"
		},300);
	});
	$("#user_box_up").on("mouseenter",function(){
		$("#user_box").off("mouseleave");
		$(".user_direction").css({transform:"rotate(-180deg)"});
		$("#user_box_up").show();
		$("#user_box_up").stop().animate({
			opacity:"1",
			top:"60px"
		},300);
	});
	$("#user_box").on("mouseleave",function(){
		$(".user_direction").css({transform:"rotate(0deg)"});
		$("#user_box_up").stop().animate({opacity:"0",top:"85px"},300,function(){
			$("#user_box_up").hide();
		});
	});
	$("#user_box_up").on("mouseleave",function(){
		$("#user_box").on("mouseleave",function(){
			$(".user_direction").css({transform:"rotate(0deg)"});
			$("#user_box_up").stop().animate({opacity:"0",top:"85px"},300,function(){
				$("#user_box_up").hide();
			});
		});
		$(".user_direction").css({transform:"rotate(0deg)"});
		$("#user_box_up").stop().animate({opacity:"0",top:"85px"},300,function(){
			$("#user_box_up").hide();
		});
	});
	
	$("#user_box_up>div").on("mouseenter",function(){
		$(this).find(".user_box_up_img1").hide();
		$(this).find(".user_box_up_img2").show();
		$(this).find("span").css({color:"#2f80ed"});
	});
	$("#user_box_up>div").on("mouseleave",function(){
		$(this).find(".user_box_up_img1").show();
		$(this).find(".user_box_up_img2").hide();
		$(this).find("span").css({color:"#000"});
	});
	
	/*修改密码的点击事件*/
	$("#changePassword").on("click", function() {
		resetEditPwd();
		if(window.sessionStorage.type == 1 ||window.sessionStorage.type == 2 || window.sessionStorage.type == 5 || window.sessionStorage.type == 6){
			$("#xgmm1").show();
			$("#xgmm1Shadow").animate({opacity: '0.3'}, 400);
			$("#xgmm1Main").animate({top: '25%',opacity: '1'}, 400);
		}else if(window.sessionStorage.type == 3){
			$("#xgmm2").show();
			$("#xgmm2Shadow").animate({opacity: '0.3'}, 400);
			$("#xgmm2Main").animate({top: '25%',opacity: '1'}, 400);
		}
	});
	/*新增账号弹窗中关闭按钮的点击事件*/
	$("#close_xgmm1").on("click", function() {
		$("#xgmm1Shadow").animate({opacity: '0'}, 400);
		$("#xgmm1Main").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xgmm1").hide();
		});
	});
	$("#close_xgmm2").on("click", function() {
		$("#xgmm2Shadow").animate({opacity: '0'}, 400);
		$("#xgmm2Main").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xgmm2").hide();
		});
	});
	
	/*更换手机号的点击事件*/
	$("#changePhone").on("click", function() {
		resetChangeTel();
			$("#ghsjh").show();
			$("#ghsjhShadow").animate({opacity: '0.3'}, 400);
			$("#ghsjhMain").animate({top: '25%',opacity: '1'}, 400);
	});
	/*更换手机号的关闭按钮点击事件*/
	$("#close_ghsjh").on("click", function() {
		$("#ghsjhShadow").animate({opacity: '0'}, 400);
		$("#ghsjhMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#ghsjh").hide();
		});
	});
	
	
	/*验证码发送按钮的点击事件*/
	$("#fsyzm1").on("click", function() {
		var _tel = $("#changePwdTel").val();
		if(_tel == "") {
			alert("请先输入手机号!");
			return false;
		} else if(_tel.length != 11) {
			alert("请输入正确的手机号。");
			return false;
		}
		var t = 60;
		$(this).hide();
		$("#fsyzm_time1").show();
		$("#fsyzm_time1").html("(60s)");
		var timer1 = setInterval(function() {
			if(t > 1) {
				t--;
				$("#fsyzm_time1").html("(" + t + "s)");
			} else {
				$("#fsyzm1").show();
				$("#fsyzm_time1").hide();
				clearInterval(timer1);
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
				$("#fsyzm1").show();
				$("#fsyzm_time1").html("60s");
				$("#fsyzm_time1").hide();
				clearInterval(timer1);
			}
		});
	});
	
	$("#fsyzm2").on("click", function() {
		var _tel = $("#newTel1").val();
		if(_tel == "") {
			alert("请先输入手机号!");
			return false;
		} else if(_tel.length != 11) {
			alert("请输入正确的手机号。");
			return false;
		}
		var t = 60;
		$(this).hide();
		$("#fsyzm_time2").show();
		$("#fsyzm_time2").html("(60s)");
		var timer2 = setInterval(function() {
			if(t > 1) {
				t--;
				$("#fsyzm_time2").html("(" + t + "s)");
			} else {
				$("#fsyzm2").show();
				$("#fsyzm_time2").hide();
				clearInterval(timer2);
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
				$("#fsyzm2").show();
				$("#fsyzm_time2").html("60s");
				$("#fsyzm_time2").hide();
				clearInterval(timer2);
			}
		});
	});
}
/*初始化事件*/
function refresh_Index(){
	if(window.sessionStorage.type == 1 || window.sessionStorage.type == 2 || window.sessionStorage.type == 5  || window.sessionStorage.type == 6){
		$("#changePhone").show();
	}
}

/*第一种修改密码的确认点击事件*/
function changePW1(){
	var tel = $("#changePwdTel").val();
	var verifycode = $("#yanzhengma1").val();
	var newPwd = $("#newPwd1").val();
	var okPwd = $("#okPwd1").val();
	if(tel == ''){
		alert("请输入手机号!");
		return false;
	}
	if(verifycode == ''){
		alert("请输入验证码!");
		return false;
	}
	if(newPwd == ''){
		alert("请输入新密码!");
		return false;
	}
	if(okPwd == ''){
		alert("请输入确认密码!");
		return false;
	}
	if(newPwd != okPwd){
		alert("确认密码与新密码不同!请确认输入!");
		return false;
	}
	var data = {
		tel:tel,
		verifycode:verifycode,
		newPwd :$.md5(newPwd),
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "account/changePwdbycode?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#close_xgmm1").trigger("click");
			setTimeout(function(){
				alert("密码修改成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*第二种修改密码的确认点击事件*/
function changePW2(){
	var oldPwd = $("#oldPwd2").val();
	var newPwd = $("#newPwd2").val();
	var okPwd = $("#okPwd2").val();
	if(oldPwd == ''){
		alert("请输入原密码!");
		return false;
	}
	if(newPwd == ''){
		alert("请输入新密码!");
		return false;
	}
	if(okPwd == ''){
		alert("请输入确认密码!");
		return false;
	}
	if(newPwd != okPwd){
		alert("确认密码与新密码不同!请确认输入!");
		return false;
	}
	var data = {
		oldPwd:oldPwd,
		newPwd :$.md5(newPwd),
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "account/changePwdbyold?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#close_xgmm2").trigger("click");
			setTimeout(function(){
				alert("密码修改成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*更换手机号弹窗中确定按钮的点击事件*/
function changePhoneTel(){
	var oldTel = $("#oldTel1").val();
	var newTel = $("#newTel1").val();
	var verifycode = $("#yanzhengma2").val();
	if(oldTel == ''){
		alert("请输入原手机号码!");
		return false;
	}
	if(newTel == ''){
		alert("请输入新手机号码!");
		return false;
	}else if(newTel.length != 11){
		alert("请输入正确的 新手机号码!");
		return false;
	}
	
	if(verifycode == ''){
		alert("请输入验证码!");
		return false;
	}
	var data = {
		oldTel:oldTel,
		newTel :newTel,
		verifycode:verifycode
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "account/changeTel?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			$("#close_ghsjh").trigger("click");
			setTimeout(function(){
				alert("手机号更换成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*清除修改密码和更换手机号中内容*/
function resetEditPwd(){
	$("#changePwdTel,#yanzhengma1,#newPwd1,#okPwd1,#oldPwd2,#newPwd2,#okPwd2").val("");
}
function resetChangeTel(){
	$("#oldTel1,#newTel1,#yanzhengma2").val("");
}
