/*注册申请版本*/
var version = 1;
$(function() {
	button_addlister();
	refresh();
});

function button_addlister() {
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
			setTimeout(function(){
				alert("密码修改成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}
