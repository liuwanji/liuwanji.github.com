/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;
/*学生详情页码点击事件*/
var num_all1 = $("#all_num1").html();
var num_curr1 = $("#curr_num1").val();
var page_num1 = 1;
/*学生样式字符串*/
var stu = "<tr>" +
	"<td>%stuid</td>" +
	"<td>" +
	"<div style='text-align:center;'><div style='background:url(%head) no-repeat center/100% 100%' class='student_img'>" +
	"<div class='img_sex' style='background:url(%sex) no-repeat center/100% 100%'></div>" +
	"</div>" +
	"<span class='student_name'>%stuName</span></div>" +
	"</td>" +
	"<td>%birth</td>" +
//	"<td>%mobile</td>" +
	"<td>%linkman</td>" +
	"<td>%reg</td>" +
	"<td>%etime</td>" +
	"<td>%residue</td>" +
	"<td>%total</td>" +
	"<td>%attendance</td>" +
	"<td>%acc_status</td>" +
	"<td>%status</td>" +
	"<td>" +
	"<div class='bianjistudent'>编辑</div>" +
	"</td>" +
	"</tr>";
/*学生详情样式字符串*/
var stuStr1 = "<tr>"+
							"<td>%course_date</td>"+
							"<td>%course_time</td>"+
							"<td>%course_name</td>"+
							"<td>%teacher</td>"+
							"<td>%textbook</td>"+
							"<td>%class</td>"+
							"<td>%classroom</td>"+
							"<td>%cstatus</td>"+
							"<td>%sstatus</td>"+
						"</tr>";
/*排序识别参数：排序哪个，排序类型*/
var paixuname = 0,paixutype = 0;
var paixuname1 = 0,paixutype1 = 0;
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
	$("#curr_num1").change(function() {
		chaxunDet(1);
	});
	/*学生列表进入学生详情和退出学生详情的点击事件*/
	$("#stubody").on("click", "tr", function() {
		detStudent($(this).find("td:nth-child(1)").html());
		return false;
	});
	$("#lsxqFanhui").on("click", function() {
		$("#classes_main").show();
		$("#classes_main1").hide();
		return false;
	});
	/*新建学员点击事件*/
	$("#create_student").on("click", function() {
		resetaddStu();
		$("#addStudent").show();
		$("#studentShadow").animate({opacity: '0.3'}, 400);
		$("#studentMain").animate({top: '16.8%',opacity: '1'}, 400);
		return false;
	});
	/*新增学员弹窗中关闭按钮的点击事件*/
	$("#close_student,#studentNo").on("click", function() {
		$("#studentShadow").animate({opacity: '0'}, 400);
		$("#studentMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#addStudent").hide();
		});
	});
	/*学员列表进入学生详情和退出学生详情的点击事件*/
	$("#stubody").on("click", "tr", function() {
		$("#classes_main").hide();
		$("#classes_main1").show();
		return false;
	});
	$("#xsxqFanhui").on("click", function() {
		$("#classes_main").show();
		$("#classes_main1").hide();
		return false;
	});
	/*学员详情中编辑学生信息和关闭学生编辑弹窗的点击事件*/
	$("#bjxsxq").on("click", function() {
		var stuid = $(this).parent().parent().find("#stuid2").html();
		bianji(stuid);
		return false;
	});
	/*编辑按钮和取消编辑的点击事件*/
	$("#stubody").on("click", ".bianjistudent", function() {
		var stuid = $(this).parent().parent().find("td:nth-child(1)").html();
		bianji(stuid);
		return false;
	});
	$("#close_xgxy,#xgxyNo").on("click", function() {
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
	/*监听筛选输入触发搜索*/
	$("#student_select1").on("change",function(){
		chaxun(1);
	});
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#student_input1").val("");
		$("#student_select1").val("0");
		$("#xsdqsj").val("");
		chaxun(1);
	});

	/*我要参与中选择照片的点击事件*/
	$('#imgInput').change(function() {
		readURL(this, $("#studentImg"));
	});
	$('#imgInput1').change(function() {
		readURL(this, $("#studentImg1"));
	});
	/*添加学员中账号状态的选择*/
	$("#accstatus .danxuan").on("click",function(){
		$("#accstatus .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
		$(this).find("div:nth-child(1)").addClass("danxuanSelect");
		return false;
	});
	/*创建成功弹窗中关闭按钮和确认，复制学生码的点击事件*/
	$("#close_cjcg,#cjcgok").on("click",function(){
		$("#cjcgShadow").animate({opacity: '0'}, 400);
		$("#cjcgMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#cjcg").hide();
		});
	});
	/*升级为正式账号的点击事件*/
	$('#update_acc').on("click",function(){
		$("#stuid_form").html($('#stuid').html());
		$("#zwzszh").show();
		$("#zwzszhShadow").animate({opacity: '0.3'}, 400);
		$("#zwzszhMain").animate({top: '40%',opacity: '1'}, 400);
	});
	$("#close_zwzszh,#zwzszhno").on("click",function(){
		$("#zwzszhShadow").animate({opacity: '0'}, 400);
		$("#zwzszhMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#zwzszh").hide();
		});
	});
	
	$("#cjcgno").on("click",function(){
		var Url2=$("#cjcg_code").html();
    	console.log(Url2);
		const input = document.createElement('input');
	    input.setAttribute('readonly', 'readonly');
	    input.setAttribute('value', Url2);
	    document.body.appendChild(input);
	    var u = navigator.userAgent,
		app = navigator.appVersion;
	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
	    if(isiOS){
	    	input.setSelectionRange(0, 9999);
	    }else{
	    	input.select();
	    }
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			alert('复制成功!');
		}
	    document.body.removeChild(input);
	});
	/*编辑学生信息中的复制学生码的点击事假*/
	$('#copy_code').on("click",function(){
		var Url2=$("#stu_code1").html();
    	console.log(Url2);
		const input = document.createElement('input');
	    input.setAttribute('readonly', 'readonly');
	    input.setAttribute('value', Url2);
	    document.body.appendChild(input);
	    var u = navigator.userAgent,
		app = navigator.appVersion;
	    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
	    if(isiOS){
	    	input.setSelectionRange(0, 9999);
	    }else{
	    	input.select();
	    }
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			alert('复制成功!');
		}
	    document.body.removeChild(input);
	});
	/*table中账号状态鼠标移动的监听事件*/
	$(".stu_acc_help").on("mouseenter",function(){
		var tipx = $(".stu_acc_help").offset().left;
		var tipy = $(".stu_acc_help").offset().top;
		$("#stu_acc_tip").show();
		$("#stu_acc_tip").stop().animate({opacity:1,top:tipy+30,left:tipx-50},500);
	});
	$(".stu_acc_help").on("mouseleave",function(){
		$("#stu_acc_tip").stop().animate({opacity:0},500,function(){$("#stu_acc_tip").hide()});
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
	$("#table_ok1").on("click", function() {
		var all = $("#all_num1").html();
		var curr = $("#curr_num1").val();
		var num_div = 0;
		if(all % curr > 0)
			num_div = parseInt(all / curr) + 1;
		else
			num_div = parseInt(all / curr);
		if($("#curr_input1").val() == '') {
			return;
		} else if($("#curr_input1").val() <= 0 || $("#curr_input1").val() > num_div) {
			alert("请输入正确的页码!");
		}else{
			if(parseInt(page_num1)>parseInt($("#curr_input1").val())){
				page_num1 = parseInt($("#curr_input1").val());
				last_next_max1(page_num1, 1);
				chaxunDet(2);
			}else if(parseInt(page_num1)<parseInt($("#curr_input1").val())){
				page_num1 = parseInt($("#curr_input1").val());
				last_next_max1(page_num1, 2);
				chaxunDet(2);
			}
		}
	});
}
/*数据初始化渲染方法*/
function dataRefresh() {
	var tipx = $(".stu_acc_help").offset().left;
	var tipy = $(".stu_acc_help").offset().top;
	$("#stu_acc_tip").css({top:tipy+30,left:tipx-50});
	laydate.render({
	  elem: '#xsdqsj' //指定元素
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
			chaxun(1);
		}
	});
	laydate.render({
	  elem: '#csny' //指定元素
	  ,trigger: 'click'
	});
	laydate.render({
	  elem: '#birth' //指定元素
	  ,trigger: 'click'
	});
	yema_suanfa(num_all, num_curr);
	yema_suanfa1(num_all1, num_curr1);
	/*给定查询的初始化条件*/
//	var date = new Date();
//	date.setHours(0);
//	date.setMinutes(0);
//	date.setSeconds(0);
//	var starttime = formatDate(Date.parse(date) - 3600 * 24 * 1000 * 7);
//	$("#xsdqsj").val(starttime);
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
/*排序按钮的点击事件*/
function riqisheng(index, element) {
	//	$(".loading_div").show();
}

/*学生详情中表格组件的相关事件*/
function yema_suanfa1(all, curr) {
	/*jquery控制的分页点击事件*/
	page_num1 = 1;
	var all = all;
	var curr = curr;
	var num_div = 0;
	if(all % curr > 0)
		num_div = parseInt(all / curr) + 1;
	else
		num_div = parseInt(all / curr);

	$("#fenye_num1").html("");
	for(var i = 1; i <= num_div && i <= 5; i++) {
		$("#fenye_num1").append("<div>" + i + "</div>")
	}
	$("#fenye_num1>div:nth-child(1)").addClass("select_num");
	$("#fenye_num1").on("click", "div", function() {
		page_num1 = $(this).html();
		$(this).addClass("select_num");
		$(this).siblings().removeClass("select_num");
		chaxunDet(2);
		return false;
	});

	$("#fenye_last1").on("click", function() {
		if(page_num1 > 1) {
			page_num1 = parseInt(page_num1) - 1;
			last_next_max1(page_num1, 1);
			chaxunDet(2);
		}
		return false;
	});
	$("#fenye_next1").on("click", function() {
		if(page_num1 < num_div) {
			page_num1 = parseInt(page_num1) + 1;
			last_next_max1(page_num1, 2);
			chaxunDet(2);
		}
		return false;
	});
	$("#fenye_last_max1").on("click", function() {
		page_num1 = 1;
		last_next_max1(page_num1, 1);
		chaxunDet(2);
		return false;
	});
	$("#fenye_next_max1").on("click", function() {
		page_num1 = num_div;
		last_next_max1(page_num1, 2);
		chaxunDet(2);
		return false;
	});
}

/*适应大量数据的上下翻页事件*/
function last_next_max1(page_num, _type) {
	var _index = [];
	$.each($("#fenye_num1>div"), function(index, element) {
		_index.push($(element).html());
	});
	if(_type == 1) {
		if(parseInt(page_num) >= parseInt(_index[0])) {
			var select_page = page_num - _index[0] + 1;
			$("#fenye_num1>div:nth-child(" + select_page + ")").addClass("select_num").siblings().removeClass("select_num");
		} else {
			if(parseInt(page_num)<(parseInt(_index[0])-1)){
				var all = $("#all_num1").html();
				var curr = $("#curr_num1").val();
				var num_div = 0;
				if(all % curr > 0)
					num_div = parseInt(parseInt(all) / parseInt(curr)) + 1;
				else
					num_div = parseInt(parseInt(all) / parseInt(curr));
				$("#fenye_num1").html("");
				for(var i = parseInt(page_num); i <= parseInt(num_div) && i <= parseInt(page_num)+4; i++) {
					$("#fenye_num1").append("<div>" + i + "</div>")
				}
				$("#fenye_num1>div:nth-child(1)").addClass("select_num");
			}else{
				$("#fenye_num1").prepend("<div>" + page_num + "</div>");
				$("#fenye_num1>div:last-child").remove();
				$("#fenye_num1>div:nth-child(1)").addClass("select_num").siblings().removeClass("select_num");
			}
		}
	} else {
		if(parseInt(page_num) <= parseInt(_index[_index.length - 1])) {
			var select_page = page_num - _index[0] + 1;
			$("#fenye_num1>div:nth-child(" + select_page + ")").addClass("select_num").siblings().removeClass("select_num");
		} else {
			if(parseInt(page_num)>(parseInt(_index[_index.length-1])+1)){
				$("#fenye_num1").html("");
				for(var i = parseInt(page_num)-4; i <= parseInt(page_num) && i >0; i++) {
					$("#fenye_num1").append("<div>" + i + "</div>")
				}
				$("#fenye_num1>div:last-child").addClass("select_num");
			}else{
				$("#fenye_num1").append("<div>" + page_num + "</div>");
				$("#fenye_num1>div:nth-child(1)").remove();
				$("#fenye_num1>div:last-child").addClass("select_num").siblings().removeClass("select_num");
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
//				var img = convertBase64UrlToBlob(base64)
//				img.name = input.files[0]['name'];
//				img.type = input.files[0]['type'];
				if(img.size > 1024000 * 2) {
					alert("图片大小过大!");
				}else{
					element.attr('src', base64);
				}
			})
		}
	}
}

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
/*学生详情中类型一搜索或切换每页显示时页码变换方法*/
function changePage1(){
		num_all1 = $("#all_num1").html();
		num_curr1 = $("#curr_num1").val();
		$("#fenye_num1").off("click", "div");
		$("#fenye_last1,#fenye_next1,#fenye_last_max1,#fenye_next_max1").off("click");
		yema_suanfa1(num_all1, num_curr1);
}
/*学员列表接口*/
function chaxun(type) {
	var stu_name = $("#student_input1").val();
	var status = $("#student_select1").val();
	var etime = $("#xsdqsj").val();
	if(etime != ''){
		etime = new Date(etime);
		etime.setHours(0);
		etime = Date.parse(etime) / 1000;
	}else{
		etime = 0;
	}
	var page = '';
	if(type == 1) {
		page = 1;
	} else if(type == 2) {
		page = page_num;
	} else {
		page = $("#curr_input").val();
	}
	var data = {
		stu_name: stu_name,
		status: parseInt(status),
		etime: etime,
		stustatus:0,
		paixuname:paixuname,
		paixutype:paixutype,
		page: parseInt(page),
		size: parseInt($("#curr_num").val()),
		count:0,
		over:0
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "student/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			var rel = '';
			$.each(msg.data.info, function(index, element) {
				var status = '';
				var linkman = '';
				var imgSex = '';
				var acc_status = '';
				if(element.status == 0){
					status = "<div>全部</div>";
				}else if(element.status == 1) {
					status = "<div class='zc'>正常上课</div>";
				} else if(element.status == 2) {
					status = "<div class='tk'>停课</div>";
				} else if(element.status == 3) {
					status = "<div class='yjy'>已结业</div>";
				} else if(element.status == 4) {
					status = "<div class='wkb'>未开班</div>";
				} else if(element.status == 5){
					status = "<div class='wkb'>未分班</div>";
				}
				
				if(element.linkman.relation == '') {
		                    rel = "暂未选择";
		                }else if(element.linkman.relation == 1) {
		                    rel = "爸爸";
		                } else if(element.linkman.relation == 2) {
		                    rel = "妈妈";
		                } else if(element.linkman.relation == 3) {
		                    rel = "爷爷";
		                } else if(element.linkman.relation == 4) {
		                    rel = "奶奶";
		                }else if(element.linkman.relation == 5) {
		                    rel = "外公";
		                }else if(element.linkman.relation == 6) {
		                    rel = "外婆";
		                }
				
				if(element.sex == 1){
					imgSex = '../../public/img/nv.png';
				}else{
					imgSex = '../../public/img/nan.png';
				}
				var tetime = formatDate(new Date(element.etime * 1000));
				if(element.etime==0){
		                    tetime ="暂无";
		                }
				
				linkman = element.linkman.name + " (" + rel + ") " + element.linkman.phone;
				
				if(element.acc_status.statue == 1){
					acc_status = "<div>试听账号</div>";
				}else if(element.acc_status.statue == 2){
					acc_status = "<div style='color:#f8bd46;'>未绑定</div><div>学生码: "+element.acc_status.stuCode+"</div>";
				}else if(element.acc_status.statue == 3){
					acc_status = "<div style='color:#00ad5f;'>已绑定</div><div>学生码: "+element.acc_status.stuCode+"</div><div>绑定账号: "+element.acc_status.bindAcc+"</div>";
				}
				
				s += stu.replace("%stuid", element.stuid).replace("%head", element.head).replace("%sex", imgSex).replace("%stuName", element.stuName).replace("%birth", element.birth )
					.replace("%linkman", linkman).replace("%teacher", element.teacher).replace("%reg", formatDate(new Date(element.reg * 1000)))
					.replace("%etime", tetime).replace("%residue", element.residue).replace("%total", element.total).replace("%attendance", element.attendance)
					.replace("%acc_status", acc_status).replace("%status", status).replace("%cuid", element.cuid);
			});
			$("#stubody").html(s);
			if(type == 1) {
				$("#all_num,#countNum").html(msg.data.count);
				$("#noCourse").html(msg.data.over);
				changePage();
			}
		} else {
			alert(msg.msg);
		}
	});

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
/*格式话时间方法 结果类型 hh:mm*/
function hhmmdate(date) {
	var _time = '';
	if(date.getHours() < 10) {
		_time += "0" + date.getHours() + ":";
	} else {
		_time += date.getHours();
	}
	if(date.getMinutes() < 10) {
		_time += "0" + date.getMinutes();
	} else {
		_time += date.getMinutes();
	}
}

/*获取学生详情的接口*/
function bianji(stuid){
	var data = {
        stuid: parseInt(stuid),
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "student/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#stuid").html(stuid);
			$("#xgxytel").val(msg.data.tel);
			$("#stu_name").val(msg.data.stu_name);
			$("#studentImg1").prop("src",msg.data.head);
			if(msg.data.sex!='')
				$("#sex").find("option[value="+msg.data.sex+"]").attr("selected",true); 
			$("#changeZks").val(msg.data.course);
			$("#birth").val(msg.data.birth);
//			$("#age").val(msg.data.age);
			$("#jtdz1").val(msg.data.addr);
			$("#wechat").val(msg.data.wechat);
			$("#fname").val(msg.data.fname);
			$("#ftel").val(msg.data.ftel);
			if(msg.data.relation!='')
				$("#relation").find("option[value="+msg.data.relation+"]").attr("selected",true);
			else
				$("#relation").val("");
			if(msg.data.acc_status.statue == 1){
				$("#stuStatus2,#stuStatus3").hide();
				$("#stuStatus1").show();
			}else if(msg.data.acc_status.statue == 2){
				$("#stu_code1").html(msg.data.acc_status.stuCode);
				$("#stuStatus1,#stuStatus3").hide();
				$("#stuStatus2").show();
			}else if(msg.data.acc_status.statue == 3){
				$("#stu_code").html(msg.data.acc_status.stuCode);
				$("#stu_bind_acc").html(msg.data.acc_status.bindAcc);
				$("#stuStatus1,#stuStatus2").hide();
				$("#stuStatus3").show();
			}

			$("#changeStudent").show();
			$("#xgxyShadow").animate({opacity: '0.3'}, 400);
			$("#xgxyMain").animate({top: '16.8%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});

}

/*编辑学生的点击事件*/
function editStudent(){
	var stuid = $("#stuid").html();
	var stu_name = $("#stu_name").val();
//	var age = $("#age").val();
	var tel = $("#xgxytel").val();
//	var checkcode = $('#checkcode').val();
	var birth = $("#birth").val();
	var course = $("#changeZks").val();
	var sex = $("#sex").val();
	var addr = $("#jtdz1").val();
	var wechat = $("#wechat").val();
	var fname = $("#fname").val();
	var ftel = $("#ftel").val();
	var relation = $("#relation").val();
	if(stu_name == ''){
		alert("请输入学生姓名!");
		return false;
	}
	if(sex == ''){
		alert("请输入学生性别!");
		return false;
	}
	if(birth == ''){
		alert("请输入出生年月!");
		return false;
	}
//	if(tel == ''){
//		alert("请输入手机号!");
//		return false;
//	}
	if(course == ''){
		alert("请输入总课时!");
		return false;
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
	var data = {
		'stuid':parseInt(stuid),
		'stu_name':stu_name,
//		'age':age,
		'tel':tel,
		'birth':birth,
		'course':parseInt(course),
		'checkcode':0,
		'sex':sex,
		'addr':addr,
		'wechat':wechat,
		'fname':fname,
		'ftel':ftel,
		'relation':relation,
   };
	console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "student/add?";
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
				alert("修改成功!");
			},500);
		}else{
			alert(msg.msg);
		}
    });

}

/*创建学生的点击事件*/
function createStudent(){
	var stuid = '0';
	var stu_name = $("#stu_name1").val();
//	var age = $("#age1").val();
	var tel = $("#tel1").val();
//	var checkcode = $('#checkcode').val();
	var course = $("#zks").val();
	var birth = $("#csny").val();
	var sex = $("#sex1").val();
	var addr = $("#jtdz").val();
	var wechat = $("#wechat1").val();
	var fname = $("#fname1").val();
	var ftel = $("#ftel1").val();
	var connect = $("#relation1").val();
	var acc_status = 1;
	$.each($("#accstatus .danxuan"), function(index,element) {
		if($(element).find("div:nth-child(1)").hasClass("danxuanSelect")){
			acc_status = index+1;
			return false;
		}
	});
	if(stu_name == ''){
		alert("请输入学生姓名!");
		return false;
	}
	if(sex == ''){
		alert("请输入学生性别!");
		return false;
	}
	if(birth == ''){
		alert("请输入出生年月!");
		return false;
	}
//	if(tel == ''){
//		alert("请输入手机号!");
//		return false;
//	}
//	if(checkcode == ''){
//		alert("请输入验证码!");
//		return false;
//	}
	if(course == ''){
		alert("请输入总课时!");
		return false;
	}
	var ext = '';
	var head = $("#studentImg").attr("src");
	if(head == ''||head == '../../public/img/morenBG.png'){
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
	var data = {
		'stuid':parseInt(stuid),
		'stu_name':stu_name,
//		'age':age,
		'tel':tel,
		'checkcode':0,
		'course':course,
		'birth':birth,
		'sex':sex,
		'addr':addr,
		'wechat':wechat,
		'fname':fname,
		'ftel':ftel,
		'relation':connect,
		'acc_status':acc_status
   };
   console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "student/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_post(url,"head="+head+"&ext="+ext,function(msg) {
        console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#studentShadow").animate({opacity: '0'}, 400);
			$("#studentMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#addStudent").hide();
			});
			setTimeout(function(){
				if(acc_status == 1){
					alert("新增成功!");
				}else{
					$("#cjcg_name").html(msg.data.name);
					$("#cjcg_code").html(msg.data.stuCode);
					$("#cjcg").show();
					$("#cjcgShadow").animate({opacity: '0.3'}, 400);
					$("#cjcgMain").animate({top: '35%',opacity: '1'}, 400);
				}
			},500);
		}else{
			alert(msg.msg);
		}
    });

}
/*重置添加学员弹窗中输入框的内容*/
function resetaddStu(){
	$("#stu_name1").val("");
	$("#sex1").val("1");
	$("#studentImg").prop("src","../../public/img/morenBG.png");
	$("#csny").val("");
	$("#zks").val("");
	$("#tel1").val("");
	$("#wechat1").val("");
	$("#jtdz").val("");
	$("#fname1").val("");
	$("#ftel1").val("");
	$("#relation1").val("");
	$("#accstatus .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
	$("#accstatus .danxuan:nth-child(1)").find("div:nth-child(1)").addClass("danxuanSelect");
}

/*学生详情页初始化方法*/
function detStudent(stuid){
	var data = {
        stuid: parseInt(stuid),
        paixuname:0,
        paixutype:0,
        size:parseInt($("#curr_num1").val()),
        page:1,
        count:0,
        type1:0
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "student/info?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#stuid2").html(stuid);
			$("#xsxqImg").prop("src",msg.data.info.head);
			$("#stu_name2").html(msg.data.info.stu_name);
			if(msg.data.info.sex == 2){
				$(".nan").show();
				$(".nv").hide();
			}else{
				$(".nan").hide();
				$(".nv").show();
			}
			$("#birh2").html(msg.data.info.birh);
			$("#age2").html(msg.data.info.age+"岁");
			$("#tel2").html(msg.data.info.tel);
			$("#reg2").html(formatDate(msg.data.info.reg*1000));
			var status = "";
			if(msg.data.info.status == 0){
				status = '全部';
			}else if(msg.data.info.status == 1){
				status = '正常上课';
			}else if(msg.data.info.status == 2){
				status = '停课';
			}else if(msg.data.info.status == 3){
				status = '已结业';
			}else if(msg.data.info.status == 4){
				status = '未开班';
			}else if(msg.data.info.status == 5){
				status = '未分班';
			}
			$("#status,#status1").html(status);
			$("#addr2").html(msg.data.info.addr);
			$("#fname2").html(msg.data.info.fname);
			$("#ftel2").html(msg.data.info.ftel);
			var relation = '';
			if(msg.data.info.relation == ''){
				relation = '暂未填写';
			}else if(msg.data.info.relation == 1){
				relation = "爸爸";
			}else if(msg.data.info.relation == 2){
				relation = "妈妈";
			}else if(msg.data.info.relation == 3){
				relation = "爷爷";
			}else if(msg.data.info.relation == 4){
				relation = "奶奶";
			}else if(msg.data.info.relation == 5){
				relation = "外公";
			}else if(msg.data.info.relation == 6){
				relation = "外婆";
			}
			$("#relation2").html(relation);
			$("#courseAll").html(msg.data.info.courseAll);
			$("#courseNum").html(msg.data.info.courseNum);
			$("#courseSy").html(msg.data.info.courseAll - msg.data.info.courseNum);
			
			$("#tum").html(msg.data.info.tum);
			$("#review").html(msg.data.info.review);
			$("#scoreNum").html(msg.data.info.scoreNum);
			
			$("#classes_main").hide();
			$("#classes_main1").show();
			chaxunDet(1);
		} else {
			alert(msg.msg);
		}
	});

}

/*学员详情中搜索方法*/
function chaxunDet(type){
	var page = '';
	if(type == 1) {
		page = 1;
	} else if(type == 2) {
		page = page_num1;
	} else {
		page = $("#curr_input1").val();
	}
	var data = {
		stuid: parseInt($("#stuid2").html()),
		paixuname:paixuname1,
		paixutype:paixutype1,
		page: parseInt(page),
		size: parseInt($("#curr_num1").val()),
		count:0,
		type1:1
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "student/info?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			$.each(msg.data.list, function(index, element) {
				var cstatus = '';
				if(element.cstatus == 0){
					cstatus = '未开始';
				}else if(element.cstatus == 1){
					cstatus = '已完成';
				}else if(element.cstatus == 2){
					cstatus = '停课';
				}else if(element.cstatus == 3){
					cstatus = '时间异常';
				}else if(element.cstatus == 4){
					cstatus = '已过期';
				}
				var sstatus = '';
				if(element.sstatus == 1){
					sstatus = '请假';
				}else if(element.sstatus == 2){
					sstatus = '签到';
				}else if(element.sstatus == 3){
					sstatus = '未签到';
				}else if(element.sstatus == 4){
					sstatus = '旷课';
				}
				s += stuStr1.replace("%course_date", element.course_date).replace("%course_time", element.course_time).replace("%course_name", element.course_name)
				.replace("%teacher", element.teacher).replace("%textbook", element.textbook).replace("%class", element.class).replace("%classroom", element.classroom)
				.replace("%cstatus", cstatus).replace("%sstatus", sstatus);
			});
			$("#stuDetBody").html(s);
			if(type == 1) {
				$("#all_num1").html(msg.data.count);
				changePage1();
			}
		} else {
			alert(msg.msg);
		}
	});
}


/*确认转为正式账号的点击事件*/
function ToFormAcc(){
	var data = {
        stuid: parseInt($("#stuid_form").html()),
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "student/modifystatus?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#zwzszhShadow").animate({opacity: '0'}, 400);
			$("#zwzszhMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#zwzszh").hide();
			});
			$("#xgxyShadow").animate({opacity: '0'}, 400);
			$("#xgxyMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#changeStudent").hide();
			});
			setTimeout(function(){
				chaxun(1);
				$("#cjcg_name").html(msg.data.name);
				$("#cjcg_code").html(msg.data.stuCode);
				$("#cjcg").show();
				$("#cjcgShadow").animate({opacity: '0.3'}, 400);
				$("#cjcgMain").animate({top: '35%',opacity: '1'}, 400);
			},500);
			
		} else {
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

/*学生详情排序的点击事件方法*/
function paixu1(type1,type2){
	paixuname1 = type1;
	paixutype1 = type2;
	chaxunDet(1);
}