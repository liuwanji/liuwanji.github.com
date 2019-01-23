/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;

/*广告列表样式css*/
var bannerStr = "<tr>"+
									"<td>%autoid</td>"+
									"<td>%theme</td>"+
									"<td><img src='%img' class='bannerImg'/></td>"+
									"<td>%btime</td>"+
									"<td>%etime</td>"+
									"<td>%jumpstatus</td>"+
									"<td>%sort</td>"+
									"<td>%usertype</td>"+
									"<td>"+
										"<div class='chakan'>查看</div>"+
									"</td>"+
									"<td style='position:relative;'>"+
										"<div class='qiyong' style='display:%qiyong;'>"+
											"<div class='qiyong_zhi'>启用</div>"+
											"<div class='qiyong_yuan'></div>"+
										"</div>"+
										"<div class='guanbi' style='display: %guanbi;'>"+
											"<div class='guanbi_zhi'>关闭</div>"+
											"<div class='guanbi_yuan'></div>"+
										"</div>"+
										"<div class='zhezhao'></div>"+
									"</td>"+
									"<td class='banner_bianji'>编辑</td>"+
								"</tr>";
/*选择校区css*/
var xiaoquStr1 = "<tr>"+
								"<td>"+
									"<div class='duoxuan'><img src='../../public/img/login_tip.png' /></div>"+
								"</td>"+
								"<td>%autoid</td>"+
								"<td>%schoolname</td>"+
								"<td>%tel</td>"+
								"<td>"+
									"%schstatus"+
								"</td>"+
							"</tr>";
var xiaoquStr2 = "<tr>"+
								"<td>%autoid</td>"+
								"<td>%schoolname</td>"+
								"<td>%tel</td>"+
								"<td>"+
									"%schstatus"+
								"</td>"+
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
	$("#create_Banner").on("click", function() {
		$("#bannerTitle").html("新建广告");
		$("#guanggaobianhao").hide();
		clearEdit();
		$("#xzgg").show();
		$("#xzggShadow").animate({opacity: '0.3'}, 400);
		$("#xzggMain").animate({top: '12%',opacity: '1'}, 400);
	});
	/*新增账号弹窗中关闭按钮的点击事件*/
	$("#close_xzgg,#bannerNo").on("click", function() {
		$("#xzggShadow").animate({opacity: '0'}, 400);
		$("#xzggMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xzgg").hide();
		});
	});
	/*查看的点击事件*/
	$("#bannerBody").on("click",".chakan",function(){
		$("#selectxqName2").val("");
		$("#xqlbDx .danxuan").eq(0).find("div:nth-child(1)").addClass("danxuanSelect");
		$("#xqlbDx .danxuan").eq(1).find("div:nth-child(1)").removeClass("danxuanSelect");
		$("#yxzxqlist").html("0");
		$("#bannerid").html($(this).parent().parent().find("td:nth-child(1)").html());
		campusList2();
	});
	/*校区列表中确认的点击事件*/
	$("#xqlbOk").on("click",function(){
		$("#xqlbShadow").animate({opacity: '0'}, 400);
		$("#xqlbMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xqlb").hide();
		});
	});
	/*学员详情中编辑学生信息和关闭学生编辑弹窗的点击事件*/
	$("#bannerBody").on("click",".banner_bianji",function() {
		var acc_id = $(this).parent().find("td:nth-child(1)").html();
		detailBanner(acc_id);
		return false;
	});
	/*新增编辑广告中推送校区类型选择的点击事件*/
	$("#xqtype").on("change",function(){
		if($(this).val() == "2"){
			$("#tsxq").show();
		}else{
			$("#tsxq").hide();
		}
	});
	/*选择校区的点击事件*/
	$("#xzxq,#xuanzeAdd").on("click",function(){
		$("#selectxqName1").val("");
		$("#selectxqDx .danxuan").eq(0).find("div:nth-child(1)").addClass("danxuanSelect");
		$("#selectxqDx .danxuan").eq(1).find("div:nth-child(1)").removeClass("danxuanSelect");
		$(".allselectcampus").find("img").hide();
		$("#yxzcampus").html("0");
		campusList1(0);
	});
	/*选择校区中校区状态的选择点击事件*/
	$("#selectxqDx .danxuan").on("click",function(){
		$("#selectxqDx .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
		$(this).find("div:nth-child(1)").addClass("danxuanSelect");
		$(".allselectcampus").find("img").hide();
		$("#yxzcampus").html("0");
		campusList1(0);
	});
	$("#xqlbDx .danxuan").on("click",function(){
		$("#xqlbDx .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
		$(this).find("div:nth-child(1)").addClass("danxuanSelect");
		$("#yxzxqlist").html("0");
		campusList2();
	});
	$(".allselectcampus").on("click",function(){
		var _this = $(this).find("img");
		if(_this.css("display")!="none"){
			_this.hide();
			$("#xzxqBody1 .duoxuan").find("img").hide();
			$("#yxzcampus").html("0");
		}else{
			_this.show();
			$("#xzxqBody1 .duoxuan").find("img").show();
			$("#yxzcampus").html($("#xzxqBody1 .duoxuan").length);
		}
	});
	$("#xzxqBody1").on("click",".duoxuan",function(){
		var _index = 0;
		var _this = $(this).find("img");
		if(_this.css("display") != 'none') {
			_this.hide();
		} else {
			_this.show();
		}
		$.each($("#xzxqBody1 .duoxuan"), function(index, element) {
			if($(element).find("img").css("display") != "none") {
				_index++;
			}
		});
		if(_index>=$("#xzxqBody1 .duoxuan").length){
			$(".allselectcampus").find("img").show();
		}else{
			$(".allselectcampus").find("img").hide();
		}
		$("#yxzcampus").html(_index);
	});
	/*校区选择弹窗中关闭按钮的点击事件*/
	$("#close_selectxq,#selectxqNo").on("click", function() {
		$("#selectxqShadow").animate({opacity: '0'}, 400);
		$("#selectxqMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#selectxq").hide();
		});
	});
	/*选择校区展示弹窗中关闭按钮的点击事件*/
	$("#close_xqlb,#xqlbOk").on("click", function() {
		$("#xqlbShadow").animate({opacity: '0'}, 400);
		$("#xqlbMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xqlb").hide();
		});
	});
	/*新增编辑广告中的单选的点击事件*/
	$("#kaiqistatus .danxuan").on("click",function(){
		$("#kaiqistatus .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
		$(this).find("div:nth-child(1)").addClass("danxuanSelect");
	});
	/*广告列表中快捷开启关闭状态的点击事件*/
	$("#bannerBody").on("click",".qiyong,.guanbi",function(){
		var autoid = $(this).parent().parent().find("td:nth-child(1)").html();
		var status = 1;
		if($(this).hasClass("qiyong")){
			status = 2;
		}else{
			status = 1;
		}
		quickjStatus(this,autoid,status);
	});
	/*搜索输入框的监听事件*/
	$("#classess_select2,#classess_select3").on("change",function(){
		chaxun(1);
	});
	/*清空的点击事件*/
	$("#_clear").on("click", function() {
		$("#classess_input1").val("");
		$("#datetime1").val("");
		$("#classess_select2").val("999");
		$("#classess_select3").val("0");
		chaxun(1);
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
	/*输入框聚焦的事件*/
	laydate.render({
	  elem: '#datetime1' //指定元素
	  ,type:'datetime'
	  ,eventElem: '#dateFocus1'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	setTimeout(function(){
	  		chaxun(1);
	  	},1);
	  }
	});
	laydate.render({
	  elem: '#start_time' //指定元素
	  ,type:'datetime'
	  ,eventElem: '#startfocus'
	  ,trigger: 'click'
	});
	laydate.render({
	  elem: '#end_time' //指定元素
	  ,type:'datetime'
	  ,eventElem: '#endfocus'
	  ,trigger: 'click'
	});

	yema_suanfa(num_all, num_curr);
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
function dateFtt(fmt,date)   
{ //author: meizz
	date = new Date(date);
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
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
	var schname = $("#classess_input1").val();
	if($("#datetime1").val() == ''){
		var date = new Date();
	    etime = (Date.parse(date) +  365 * 3600 * 24 * 1000)/1000;
	}else{
		var date = new Date($("#datetime1").val());
		var etime = Date.parse(date)/1000;
	}
	var usertype = $("#classess_select2").val();
	var status = $("#classess_select3").val();
    var data= {
    	"schname":schname,
	    "etime":etime,
	    "usertype":parseInt(usertype),
	    "status":parseInt(status),
	    "paixuname":paixuname,
		"paixutype":paixutype,
        "size":parseInt($("#curr_num").val()),
        "page":parseInt(page),
		"total":0,
		"open":0
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "advs/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var banner ='';
	        $.each(msg.data.info,function (index,element) {
	        	var jumpstatus = "";
	        	if(element.jumpstatus == 0){
	        		jumpstatus = "无操作";
	        	}else if(element.jumpstatus == 1){
	        		jumpstatus = "打开网页";
	        	}else if(element.jumpstatus == 2){
	        		jumpstatus = "打开歌曲";
	        	}else if(element.jumpstatus == 3){
	        		jumpstatus = "打开课时";
	        	}
	        	var usertype = '';
	        	if(element.usertype == 0){
	        		usertype = "全部用户";
	        	}else if(element.usertype == 1){
	        		usertype = "注册用户";
	        	}else if(element.usertype == 2){
	        		usertype = "校区用户";
	        	}
	        	var qiyong = '',guanbi = '';
	        	if(element.openstate == 1){
	        		qiyong = "block";
	        		guanbi = "none";
	        	}else if(element.openstate == 2){
	        		qiyong = "none";
	        		guanbi = "block";
	        	}
	        	banner += bannerStr.replace("%autoid",element.autoid).replace("%theme",element.theme).replace("%img",element.url)
	        	.replace("%btime",dateFtt("yyyy-MM-dd hh:mm:ss",element.btime*1000)).replace("%etime",dateFtt("yyyy-MM-dd hh:mm:ss",element.etime*1000))
	        	.replace("%jumpstatus",jumpstatus).replace("%sort",element.sort).replace("%usertype",usertype).replace("%qiyong",qiyong).replace("%guanbi",guanbi);
	        });
	        $("#all_num,#countNum").html(msg.data.total);
	       	$("#open").html(msg.data.total-msg.data.open);
	        $('#bannerBody').html(banner);
	        if(type == 1) {
				changePage();
			}
        }else{
        	alert(msg.msg);
        }
    });
}

/*新建广告的方法*/
function createBanner(){
	if($("#bianhao").html()==''){
		var autoid = 0;
	}else{
		var autoid = parseInt($("#bianhao").html());
	}
	var usertype = $("#userType").val();
	var btime = $("#start_time").val();
	var etime = $("#end_time").val();
	if(btime == ''||etime == ''){
		alert("请输入活动时间!");
		return false;
	}
	btime = Date.parse(btime)/1000;
	etime = Date.parse(etime)/1000;
	var theme = $("#ggzt").val();
	var sort = $("#paixu").val();
	if(sort == ''){
		alert("请输入排序!");
		return false;
	}
	var url = $("#imgaddr").val();
	if(url == ''){
		alert("请输入图片地址!");
		return false;
	}
	var jumpstatus = $("#tztype").val();
	var jumpurl = $("#tzdz").val();
//	if(jumpurl == ''){
//		alert("请输入跳转地址!");
//		return false;
//	}
	var pushstatus = $("#xqtype").val();
	var schpush = [];
	$.each($("#xuanzeInput span"), function(index,element) {
		schpush.push(parseInt($(element).html()));
	});
	if(pushstatus == 1){
		schpush = [];
	}
	if(pushstatus == 2&&schpush.length == 0){
		alert("请选择推送校区!");
		return false;
	}
	var reserve1 = $("#canshu1").val();
	var reserve2 = $("#canshu2").val();
	var Remarks = $("#Remarks").val();
	var status = 1;
	$.each($("#kaiqistatus .danxuan"), function(index,element) {
		if($(element).find("div:nth-child(1)").hasClass("danxuanSelect")){
			status = index+1;
			return false;
		}
	});
	
	
	var data= {
        autoid:autoid,
        usertype:parseInt(usertype),
        btime:btime,
        etime:etime,
        theme:theme,
        sort:parseInt(sort),
        url:url,
        jumpstatus:parseInt(jumpstatus),
        jumpurl:jumpurl,
        pushstatus:parseInt(pushstatus),
        schpush:schpush,
        reserve1:reserve1,
        reserve2:reserve2,
        Remarks:Remarks,
        status:parseInt(status)
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "advs/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	chaxun(1);
        	$("#xzggShadow").animate({opacity: '0'}, 400);
			$("#xzggMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#xzgg").hide();
			});
			setTimeout(function(){
				if($("#bianhao").html()==''){
					alert("新增成功!");
				}else{
					alert("编辑成功!");
				}
			},500);
        }else{
        	alert(msg.msg);
        }
    });
}

/*账号详情*/
function detailBanner(acc_id){
	$("#bannerTitle").html("编辑广告");
	$("#guanggaobianhao").show();
	clearEdit();
	 var data = {
		autoid: parseInt(acc_id),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "advs/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#bianhao").html(acc_id);
			$("#userType").val(msg.data.usertype);
			if(msg.data.btime)
				$("#start_time").val(dateFtt("yyyy-MM-dd hh:mm:ss",msg.data.btime*1000));
			if(msg.data.etime)
				$("#end_time").val(dateFtt("yyyy-MM-dd hh:mm:ss",msg.data.etime*1000));
			$("#ggzt").val(msg.data.theme);
			$("#paixu").val(msg.data.sort);
			$("#imgaddr").val(msg.data.url);
			$("#tztype").val(msg.data.jumpstatus);
			$("#tzdz").val(msg.data.jumpurl);
			$("#xqtype").val(msg.data.pushstatus);
			if(msg.data.pushstatus == 2){
				$("#tsxq").show();
				if(msg.data.schpush.length == 0){
					$("#xzxq").show();
					$("#xuanze").hide();
				}else{
					var s = '';
					$.each(msg.data.schpush, function(index,element) {
						if(index == 0){
							s += "<span>"+element+"</span>";
						}else{
							s += ",<span>"+element+"</span>";
						}
					});
					$("#xuanzeInput").html(s);
					$("#xzxq").hide();
					$("#xuanze").show();
				}
				
			}
			$("#canshu1").val(msg.data.reserve1);
			$("#canshu2").val(msg.data.reserve2);
			$("#Remarks").val(msg.data.Remarks);
			$("#kaiqistatus .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
			$("#kaiqistatus .danxuan").eq(parseInt(msg.data.status)-1).find("div:nth-child(1)").addClass("danxuanSelect");

			$("#xzgg").show();
			$("#xzggShadow").animate({opacity: '0.3'}, 400);
			$("#xzggMain").animate({top: '12%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});

}
/*清空编辑输入信息*/
function clearEdit(){
	$("#bianhao").html("");
	$("#userType").val("0");
	$("#start_time").val("");
	$("#end_time").val("");
	$("#ggzt").val("");
	$("#paixu").val("");
	$("#imgaddr").val("");
	$("#tzdz").val("");
	$("#tztype").val("0");
	$("#xqtype").val("1");
	$("#tsxq").hide();
	$("#xzxq").show();
	$("#xuanze").hide();
	$("#xuanzeInput").html("");
	$("#canshu1").val("");
	$("#canshu2").val("");
	$("#Remarks").val("");
	$("#kaiqistatus .danxuan").eq(0).find("div:nth-child(1)").addClass("danxuanSelect");
	$("#kaiqistatus .danxuan").eq(1).find("div:nth-child(1)").removeClass("danxuanSelect");
}


/*拉取选择的校区列表*/
function campusList1(autoid){
	var status = 0;
	$.each($("#selectxqDx .danxuan"), function(index,element) {
		if($(element).find("div:nth-child(1)").hasClass("danxuanSelect")){
			status = index;
			return false;
		}
	});
	var schname = $("#selectxqName1").val();
	var data = {
		autoid: parseInt(autoid),
		status:status,
		schname:schname
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "advs/getcampus?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			$.each(msg.data.info, function(index,element) {
				var schstatus = '';
				if(element.schstatus == 1){
					schstatus = "<div class='campuswsh'>未审核</div>"
				}else if(element.schstatus == 2){
					schstatus = "<div class='campusbtg'>不通过</div>"
				}else if(element.schstatus == 3){
					schstatus = "<div class='campuszcsy'>正常</div>"
				}else if(element.schstatus == 4){
					schstatus = "<div class='campusdq'>到期</div>"
				}else if(element.schstatus == 5){
					schstatus = "<div class='campusjy'>禁用</div>"
				}
				s += xiaoquStr1.replace("%autoid",element.autoid).replace("%schoolname",element.schoolname)
					.replace("%tel",element.tel).replace("%schstatus",schstatus);
			});
			$("#xzxqBody1").html(s);
				
			$("#selectxq").show();
			$("#selectxqShadow").animate({opacity: '0.3'}, 400);
			$("#selectxqMain").animate({top: '12%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

function campusList2(){
	var autoid = $("#bannerid").html();
	var status = 0;
	$.each($("#xqlbDx .danxuan"), function(index,element) {
		if($(element).find("div:nth-child(1)").hasClass("danxuanSelect")){
			status = index;
			return false;
		}
	});
	var schname = $("#selectxqName2").val();
	var data = {
		autoid: parseInt(autoid),
		status:status,
		schname:schname
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "advs/getcampus?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			$.each(msg.data.info, function(index,element) {
				var schstatus = '';
				if(element.schstatus == 1){
					schstatus = "<div class='campuswsh'>未审核</div>"
				}else if(element.schstatus == 2){
					schstatus = "<div class='campusbtg'>不通过</div>"
				}else if(element.schstatus == 3){
					schstatus = "<div class='campuszcsy'>正常</div>"
				}else if(element.schstatus == 4){
					schstatus = "<div class='campusdq'>到期</div>"
				}else if(element.schstatus == 5){
					schstatus = "<div class='campusjy'>禁用</div>"
				}
				s += xiaoquStr2.replace("%autoid",element.autoid).replace("%schoolname",element.schoolname)
					.replace("%tel",element.tel).replace("%schstatus",schstatus);
			});
			$("#xzxqBody2").html(s);
			$("#yxzxqlist").html(msg.data.info.length);
			
			$("#xqlb").show();
			$("#xqlbShadow").animate({opacity: '0.3'}, 400);
			$("#xqlbMain").animate({top: '12%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/*选择校区确定事件*/
function selectedCampus(){
	var campus = [];
	$.each($("#xzxqBody1 .duoxuan"), function(index,element) {
		if($(element).find("img").css("display")!="none"){
			campus.push(parseInt($(element).parent().parent().find("td:nth-child(2)").html()));
		}
	});
	var s = '';
	$.each(campus, function(index,element) {
		if(index == 0){
			s += "<span>"+element+"</span>";
		}else{
			s += ",<span>"+element+"</span>";
		}
	});
	if(s != ''){
		$("#xuanzeInput").html(s);
		$("#xuanze").show();
		$("#xzxq").hide();
	}
	$("#selectxqShadow").animate({opacity: '0'}, 400);
	$("#selectxqMain").animate({top: '0%',opacity: '0'}, 400, function() {
		$("#selectxq").hide();
	});
}


/*快捷开启或关闭状态的开关点击事件*/
function quickjStatus(element,autoid,status){
	var data = {
		autoid: parseInt(autoid),
		status:status,
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "advs/modify?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$(element).hide().siblings().show();
			setTimeout(function(){
				$(element).parent().find(".zhezhao").hide();
			},3000);
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