/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;

/*账号列表样式字符串*/
var accStr = "<tr>" +
    "<td>%uid</td>" +
    "<td>%usename</td>" +
    "<td>%birth</td>" +
    "<td>%tel</td>" +
    "<td>%role</td>" +
    "<td>%ctime</td>" +
    "<td>%last_login</td>" +
    "<td>%operation</td>" +
    "</tr>";
/*排序识别参数：排序哪个，排序类型*/
var paixuname = 0,paixutype = 0;
$(function() {
	addlisten();
	dataRefresh();
});

/*事件监听方法*/
function addlisten() {
	/*页码select的点击选择事件*/
	$("#curr_num").change(function() {
		chaxun(1);
	});
	/*新建账号的点击事件*/
	$("#create_Acc").on("click", function() {
		$("#addStudent").show();
		$("#studentShadow").animate({
			opacity: '0.3'
		}, 400);
		$("#studentMain").animate({
			top: '21%',
			opacity: '1'
		}, 400);
	});
	/*新增账号弹窗中关闭按钮的点击事件*/
	$("#close_student,#studentNo").on("click", function() {
		$("#studentShadow").animate({
			opacity: '0'
		}, 400);
		$("#studentMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#addStudent").hide();
		});
	});
	/*学员详情中编辑学生信息和关闭学生编辑弹窗的点击事件*/
	$("#accBody").on("click",".toBianji",function() {
		var acc_id = $(this).parent().parent().find("td:nth-child(1)").html();
		detailClassroom(acc_id);
		return false;
	});
	$("#close_xgacc,#xgaccNo").on("click", function() {
		$("#xgxyShadow").animate({
			opacity: '0'
		}, 400);
		$("#xgxyMain").animate({
			top: '0%',
			opacity: '0'
		}, 400, function() {
			$("#changeStudent").hide();
		});
	});
	/*验证码发送按钮的点击事件*/
	$("#_code").on("click", function() {
		var _tel = $("#tel1").val();
		if(_tel == "") {
			alert("请先输入手机号!");
			return false;
		} else if(_tel.length != 11) {
			alert("请输入正确的手机、账号信息。");
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
	$("#_code2").on("click", function() {
		var _tel = $("#tel").val();
		if(_tel == "") {
			alert("请先输入手机号!");
			return false;
		} else if(_tel.length != 11) {
			alert("请输入正确的手机、账号信息。");
			return false;
		}
		var t = 60;
		$(this).hide();
		$("#_code_time2").show();
		$("#_code_time2").html("(60s)");
		var timer = setInterval(function() {
			if(t > 1) {
				t--;
				$("#_code_time2").html("(" + t + "s)");
			} else {
				$("#_code2").show();
				$("#_code_time2").hide();
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
				$("#_code2").show();
				$("#_code_time2").html("60s");
				$("#_code_time2").hide();
				clearInterval(timer);
			}
		});
	});
	/*重置密码的点击事件*/
	$("#accBody").on("click",".reset_password",function() {
		$("#now_acc").html($(this).parent().parent().find("td:nth-child(2)").html());
		$("#acc_id_pwd").html($(this).parent().parent().find("td:nth-child(1)").html());
		$("#czmm").show();
		$("#czmmShadow").animate({opacity: '0.3'}, 400);
		$("#czmmMain").animate({top: '40%',opacity: '1'}, 400);
		return false;
	});
	$("#close_czmm,#czmmNo").on("click", function() {
		$("#czmmShadow").animate({opacity: '0'}, 400);
		$("#czmmMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#czmm").hide();
		});
		return false;
	});
	/*输入确定的点击事件*/
	$("#table_ok").on("click", function() {
		var all = $("#all_num").html();
		var curr = $("#curr_num").val();
		var num_div = 0;
		if(all % curr > 0)
			num_div = parseInt(all / curr) + 1;
		else
			num_div = parseInt(all / curr);
		if($("#curr_input").val() == '') {
			return;
		} else if($("#curr_input").val() <= 0 || $("#curr_input").val() > num_div) {
			alert("请输入正确的页码!");
		}else{
			if(parseInt(page_num)>parseInt($("#curr_input").val())){
				page_num = parseInt($("#curr_input").val());
				last_next_max(page_num, 1);
				chaxun(2);
			}else if(parseInt(page_num)<parseInt($("#curr_input").val())){
				page_num = parseInt($("#curr_input").val());
				last_next_max(page_num, 2);
				chaxun(2);
			}
		}
	});
}

/*数据初始化渲染方法*/
function dataRefresh() {
	if(window.sessionStorage.type == 1){
		$("#shengfen1").html("<option value='5' selected='selected'>系统管理员</option>");
	}else if(window.sessionStorage.type == 2){
		$("#shengfen1").html("<option value='3' selected='selected'>教务</option>");
	}else if(window.sessionStorage.type == 5){
		$("#shengfen1").html("<option value='6' selected='selected'>教务</option>");
	}else{
		$("#create_Acc").hide();
	}
	if(window.sessionStorage.type == 2){
		$("#phoneRed,#yanzhengmaBox").hide();
	}
	lay('.dateInput').each(function(){
	  laydate.render({
	    elem: this
	    ,trigger: 'click'
	  });
	}); 
	yema_suanfa(num_all, num_curr);
	/*我要参与中选择照片的点击事件*/
	$('#imgInput').change(function() {
		readURL(this, $("#studentImg"));
	});
	$('#imgInput1').change(function() {
		readURL(this, $("#studentImg1"));
	});
	chaxun(1);
}

function yema_suanfa(all, curr) {
	/*jquery控制的分页点击事件*/
	page_num = 1;
	var all = all;
	var curr = curr;
	var num_div = 0;
	if(all % curr > 0)
		num_div = parseInt(all / curr) + 1;
	else
		num_div = parseInt(all / curr);

	$("#fenye_num").html("");
	for(var i = 1; i <= num_div && i <= 5; i++) {
		$("#fenye_num").append("<div>" + i + "</div>")
	}
	$("#fenye_num>div:nth-child(1)").addClass("select_num");
	$("#fenye_num").on("click", "div", function() {
		page_num = $(this).html();
		$(this).addClass("select_num");
		$(this).siblings().removeClass("select_num");
		chaxun(2);
		return false;
	});

	$("#fenye_last").on("click", function() {
		if(page_num > 1) {
			page_num = parseInt(page_num) - 1;
			last_next_max(page_num, 1);
			chaxun(2);
		}
		return false;
	});
	$("#fenye_next").on("click", function() {
		if(page_num < num_div) {
			page_num = parseInt(page_num) + 1;
			last_next_max(page_num, 2);
			chaxun(2);
		}
		return false;
	});
	$("#fenye_last_max").on("click", function() {
		page_num = 1;
		last_next_max(page_num, 1);
		chaxun(2);
		return false;
	});
	$("#fenye_next_max").on("click", function() {
		page_num = num_div;
		last_next_max(page_num, 2);
		chaxun(2);
		return false;
	});
}
/*适应大量数据的上下翻页事件*/
function last_next_max(page_num, _type) {
	var _index = [];
	$.each($("#fenye_num>div"), function(index, element) {
		_index.push($(element).html());
	});
	if(_type == 1) {
		if(parseInt(page_num) >= parseInt(_index[0])) {
			var select_page = page_num - _index[0] + 1;
			$("#fenye_num>div:nth-child(" + select_page + ")").addClass("select_num").siblings().removeClass("select_num");
		} else {
			if(parseInt(page_num)<(parseInt(_index[0])-1)){
				var all = $("#all_num").html();
				var curr = $("#curr_num").val();
				var num_div = 0;
				if(all % curr > 0)
					num_div = parseInt(parseInt(all) / parseInt(curr)) + 1;
				else
					num_div = parseInt(parseInt(all) / parseInt(curr));
				$("#fenye_num").html("");
				for(var i = parseInt(page_num); i <= parseInt(num_div) && i <= parseInt(page_num)+4; i++) {
					$("#fenye_num").append("<div>" + i + "</div>")
				}
				$("#fenye_num>div:nth-child(1)").addClass("select_num");
			}else{
				$("#fenye_num").prepend("<div>" + page_num + "</div>");
				$("#fenye_num>div:last-child").remove();
				$("#fenye_num>div:nth-child(1)").addClass("select_num").siblings().removeClass("select_num");
			}
		}
	} else {
		if(parseInt(page_num) <= parseInt(_index[_index.length - 1])) {
			var select_page = page_num - _index[0] + 1;
			$("#fenye_num>div:nth-child(" + select_page + ")").addClass("select_num").siblings().removeClass("select_num");
		} else {
			if(parseInt(page_num)>(parseInt(_index[_index.length-1])+1)){
				$("#fenye_num").html("");
				for(var i = parseInt(page_num)-4; i <= parseInt(page_num) && i >0; i++) {
					$("#fenye_num").append("<div>" + i + "</div>")
				}
				$("#fenye_num>div:last-child").addClass("select_num");
			}else{
				$("#fenye_num").append("<div>" + page_num + "</div>");
				$("#fenye_num>div:nth-child(1)").remove();
				$("#fenye_num>div:last-child").addClass("select_num").siblings().removeClass("select_num");
			}
		}
	}
}

function photoCompress(img_id_jq, file, w, objDiv) {
	var ready = new FileReader();
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file);
	ready.onload = function(e) {
		var re = this.result;
		img_id_jq.attr('src', e.target.result);
		canvasDataURL(re, w, objDiv)
	}
}

function canvasDataURL(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.5; // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}
/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */
function convertBase64UrlToBlob(urlData) {

	var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  

	//处理异常,将ascii码小于0的转换为大于0  
	var ab = new ArrayBuffer(bytes.length);
	var ia = new Uint8Array(ab);
	for(var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}

	return new Blob([ab], {
		type: '',
		name: ''
	});
}
/*将我要参与页面中用户选中的图像显示出来*/
function readURL(input, element) {
	if(input.files && input.files[0]) {
		var files = Array.prototype.slice.call(input.files);
		if(files[0].size > 1024000 * 8) {
			// 文件大小自定义限制
			alert("图片大小过大!");
			return;
		}
		if(files[0].size < 1024000) {
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e) {
				element.attr('src', e.target.result);
			};
		} else {
			photoCompress(element, input.files[0], 0.05, function(base64) {
				var img = convertBase64UrlToBlob(base64)
				img.name = input.files[0]['name'];
				img.type = input.files[0]['type'];
				console.log(input.files[0].size);
				console.log(img.size);
				if(img.size > 1024000 * 2) {
					alert("图片大小过大!");
				}
			})
		}
	}
}

/* 格式化时间方法，结果类型 yy-mm-dd*/
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if(month.length < 2) month = '0' + month;
    if(day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
/*初始化查询列表的点击事件*/
function chaxun(type){
	var page = '';
	if(type == 1) {
		page = 1;
	} else if(type == 2) {
		page = page_num;
	} else {
		page = $("#curr_input").val();
	}
    var data= {
    	"paixuname":paixuname,
		"paixutype":paixutype,
        "size":parseInt($("#curr_num").val()),
        "page":parseInt(page),
		"total":0,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "account/list?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var acc ='';
	        $.each(msg.data.info,function (index,element) {
	        	var role = '';
	        	var birth = element.birth;
	        	var tel = '';
	        	var last_login = '';
	        	var operation = "";
	        	if(element.role == 1){
	        		role = '超级管理员';
	        	}else if(element.role == 2){
	        		role = '校长';
	        	}else if(element.role == 3){
	        		role = '教务';
	        	}else if(element.role == 5){
	        		role = '系统管理员';
	        	}else if(element.role == 6){
	        		role = '系统教务';
	        	}else if(element.role == 10){
	        		role = '教师';
	        	}else if(element.role == 20){
	        		role = '学员';
	        	}else if(element.role == 30){
	        		role = '游客';
	        	}
	        	if(element.birth == ''){
	        		birth = '保密';
	        	}
	        	if(element.last_login == 0){
	        		last_login = '暂无登录记录'
	        	}else{
	        		last_login = formatDate(element.last_login*1000)
	        	}
	        	
	        	if(element.tel == ''){
	        		tel = "暂无手机号信息";
	        	}else{
	        		tel = element.tel;
	        	}
	        	
	        	if(window.sessionStorage.type == 1){
	        		if(element.role == 5){
	        			operation = "<div class='toBianji'>编辑</div><div class='reset_password'>重置密码</div>";
	        		}else if(element.role == 6){
	        			operation = "<div class='reset_password'>重置密码</div>";
	        		}
	        	}else if(window.sessionStorage.type == 5){
	        		operation = "<div class='toBianji'>编辑</div><div class='reset_password'>重置密码</div>";
	        	}else if(window.sessionStorage.type == 2){
	        		if(element.role == 3){
	        			operation = "<div class='toBianji'>编辑</div><div class='reset_password'>重置密码</div>";
	        		}else if(element.role == 10){
	        			operation = "<div class='reset_password'>重置密码</div>";
	        		}
	        	}else if(window.sessionStorage.type == 3 | window.sessionStorage.type == 6){
	        		operation = "<div class='reset_password'>重置密码</div>";
	        	}
	        	
	            acc += accStr.replace('%uid',element.uid).replace('%usename',element.usename).replace('%birth',birth).replace('%tel',tel).replace('%role',role)
	            .replace('%ctime',formatDate(element.ctime*1000)).replace('%last_login',last_login).replace("%operation",operation);
	        });
	        $("#all_num").html(msg.data.total);
	        $('#accBody').html(acc);
	        if(type == 1) {
				$("#all_num").html(msg.data.count);
				changePage();
			}
        }else{
        	alert(msg.msg);
        }
    });
}

/*新建账号的方法*/
function createAcc(){
	var acc_id = 0;
	var accid = $("#accid1").val();
	var acc_name = $("#stu_name1").val();
	var identy =  $("#shengfen1").val();
	var tel = $("#tel1").val();
	var code = $("#code1").val();
	var birth = $("#csny1").val();
	var sex = $("#sex1").val();
	var addr = $("#jtdz1").val();
	var wechat = $("#wechat1").val();
	var fname = $("#fname1").val();
	var ftel = $("#ftel1").val();
	var relation = $("#relation1").val();
	if(acc_name == ''){
		alert("请输入姓名!");
		return false;
	}
	if(identy == ''){
		alert("请选择身份!");
		return false;
	}
	if(accid == ''){
		alert("请输入登录账号!");
		return false;
	}
	if(accid.length < 6 || accid.length > 18){
		alert("登录账号请使用6~18位英文或数字!");
		return false;
	}
	if(!/^[0-9a-zA-Z]+$/.test(accid)){
		alert("登录账号请输入英文或数字！");
		return false;
	}
	if(tel == ''&&window.sessionStorage.type != 2){
		alert("请输入手机号!");
		return false;
	}
	if(code == ''&&window.sessionStorage.type != 2){
		alert("请输入验证码!");
		return false;
	}
	var ext = '';
	var head = $("#studentImg").attr("src");
	if(head == ''||head=='../../public/img/morenBG.png'){
		alert("请上传头像!");
		return false;
	}else{
		ext = head.split(",")[0].split("/")[1].split(";")[0];
		console.log(ext);
		head =head.split(",")[1];
		if(!head){
			head = '';
		}else{
			head = encodeURIComponent(head);
		}
	}
	
	var data= {
        acc_id:parseInt(acc_id),
        acc_name:acc_name,
        identy:parseInt(identy),
		acc_user:accid,
        tel:tel,
        code:code,
        birth:birth,
        sex:parseInt(sex),
        addr:addr,
        wechat:wechat,
        fname:fname,
        ftel:ftel,
        relation:parseInt(relation),
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "account/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_post(url,"head="+head+"&ext"+ext,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	chaxun(1);
        	$("#studentShadow").animate({opacity: '0'}, 400);
			$("#studentMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#addStudent").hide();
			});
			setTimeout(function(){
				alert("新增成功!");
			},500);
        }else{
        	alert(msg.msg);
        }
    });
}

/*账号详情*/
function detailClassroom(acc_id){
	clearEdit();
	 var data = {
		acc_id: parseInt(acc_id),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "account/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#acc_id").html(acc_id);
			$("#accid").val(msg.data.acc_user);
			$("#stu_name").val(msg.data.acc_name);
			$("#shengfen").val(msg.data.identy);
			$("#tel").val(msg.data.tel);
			$("#csny").val(msg.data.birth);
			$("#sex").val(msg.data.sex);
			$("#jtdz").val(msg.data.addr);
			$("#wechat").val(msg.data.wechat);
			$("#fname").val(msg.data.fname);
			$("#ftel").val(msg.data.ftel);
			$("#relation").val(msg.data.relation);
			$("#studentImg1").prop("src",msg.data.head);
			
			$("#changeStudent").show();
			$("#xgxyShadow").animate({opacity: '0.3'}, 400);
			$("#xgxyMain").animate({top: '21%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});

}
/*编辑账号*/
function editClassroom(){
	var acc_id = $("#acc_id").html();
	var accid = '';
	var acc_name = $("#stu_name").val();
	var identy =  $("#shengfen").val();
	var tel = $("#tel").val();
	var code = $("#code2").val();
	var birth = $("#csny").val();
	var sex = $("#sex").val();
	var addr = $("#jtdz").val();
	var wechat = $("#wechat").val();
	var fname = $("#fname").val();
	var ftel = $("#ftel").val();
	var relation = $("#relation").val();
	if(acc_name == ''){
		alert("请输入姓名!");
		return false;
	}
	if(identy == ''){
		alert("请选择身份!");
		return false;
	}
	if(relation != null){
		relation = parseInt(relation);
	}else{
		relation = 1;
	}
	var ext = '';
	var head = $("#studentImg1").attr("src");
	if(head == ''){
		alert("请上传头像!");
		return false;
	}else{
		ext = head.split(",")[0].split("/")[1].split(";")[0];
		console.log(ext);
		head =head.split(",")[1];
		if(!head){
			head = '';
		}else{
			head = encodeURIComponent(head);
		}
	}
	
	var data= {
        acc_id:parseInt(acc_id),
        acc_name:acc_name,
        acc_user:accid,
        identy:parseInt(identy),
        tel:tel,
        code:code,
        birth:birth,
        sex:parseInt(sex),
        addr:addr,
        wechat:wechat,
        fname:fname,
        ftel:ftel,
        relation:relation,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "account/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_post(url,"head="+head+"&ext="+ext,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	chaxun(1);
        	$("#xgxyShadow").animate({opacity: '0'}, 400);
			$("#xgxyMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#changeStudent").hide();
			});
			setTimeout(function(){
				alert("编辑成功!");
			},500);
        }else{
        	alert(msg.msg);
        }
    });

}
/*清空编辑输入信息*/
function clearEdit(){
	$("#acc_id").html("");
	$("#accid").val("");
	$("#studentImg1").prop("src","");
	$("#stu_name").val("");
	$("#shengfen").val(3);
	$("#tel").val("");
	$("#code2").val("");
	$("#csny").val("");
	$("#sex").val(1);
	$("#jtdz").val("");
	$("#wechat").val("");
	$("#fname").val("");
	$("#ftel").val("");
	$("#relation").val(1);
}

/*确认重置密码的点击事件*/
function resetPwdOk(){
	var data= {
       acc_id:parseInt($("#acc_id_pwd").html())
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "account/resetPwd?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	$("#close_czmm").trigger("click");
			setTimeout(function(){
				alert("重置密码成功!");
			},500);
        }else{
        	alert(msg.msg);
        }
    });
}

/*排序的点击事件方法*/
function paixu(type1,type2){
	paixuname = type1;
	paixutype = type2;
	chaxun(1);
}