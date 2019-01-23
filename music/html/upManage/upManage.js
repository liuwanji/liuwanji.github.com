/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;

/*广告列表样式css*/
var upStr = "<tr>"+
									"<td>%apkid</td>"+
									"<td>%packname</td>"+
									"<td>%type</td>"+
									"<td>%minversion</td>"+
									"<td>%newversion</td>"+
									"<td>%maxversion</td>"+
									"<td><div class='tableurl'>%url1</div></td>"+
									"<td><div class='tableurl'>%url2</div></td>"+
									"<td>%title</td>"+
									"<td>%explain</td>"+
									"<td>%luaversion</td>"+
									"<td><div class='tableurl'>%luaurl</div></td>"+
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
									"<td>%whiteversion</td>"+
									"<td>%whitenewversion</td>"+
									"<td><div class='tableurl'>%whiteurl</div></td>"+
									"<td>%whiteluaversion</td>"+
									"<td><div class='tableurl'>%whiteluaurl</div></td>"+
									"<td class='up_bianji' style='min-width:40px;'>编辑</td>"+
								"</tr>";
/*区别新增和编辑*/
var addoredit = 0;
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
	/*新建渠道的点击事件*/
	$("#create_up").on("click", function() {
		$("#tjqdTitle").html("新建渠道");
		$("#apkid").removeAttr("disabled");
		addoredit = 1;
		clearEdit();
		$("#tjqd").show();
		$("#tjqdShadow").animate({opacity: '0.3'}, 400);
		$("#tjqdMain").animate({top: '10%',opacity: '1'}, 400);
	});
	/*新增渠道弹窗中关闭按钮的点击事件*/
	$("#close_tjqd,#tjqdNo").on("click", function() {
		$("#tjqdShadow").animate({opacity: '0'}, 400);
		$("#tjqdMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#tjqd").hide();
		});
	});
	/*刷新缓存的点击事件*/
	$("#shuff").on("click", function() {
		$("#sxhc").show();
		$("#sxhcShadow").animate({opacity: '0.3'}, 400);
		$("#sxhcMain").animate({top: '30%',opacity: '1'}, 400);
	});
	/*刷新缓存弹窗中关闭按钮的点击事件*/
	$("#close_sxhc").on("click", function() {
		$("#sxhcShadow").animate({opacity: '0'}, 400);
		$("#sxhcMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#sxhc").hide();
		});
	});
	/*刷新缓存弹窗中单独刷新按钮的点击事件*/
	$("#sxhcOk").on("click",function(){
		var type = 0;
		$.each($(".shuaxin .danxuan"), function(index,element) {
			if($(element).find("div:nth-child(1)").hasClass("danxuanSelect")){
				type = index+1;
				return false;
			}
		});
		shuffOk(type);
	});
	$("#shuaxin1").on("click",function(){
		var type = 1;
		shuffOk(type);
	});
	$("#shuaxin2").on("click",function(){
		var type = 2;
		shuffOk(type);
	});
	/*编辑的点击事件*/
	$("#upBody").on("click",".up_bianji",function() {
		addoredit = 2;
		var acc_id = $(this).parent().find("td:nth-child(1)").html();
		detailBanner(acc_id);
		return false;
	});
	/*新增渠道中的单选的点击事件*/
	$("#whitetype .danxuan").on("click",function(){
		$("#whitetype .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
		$(this).find("div:nth-child(1)").addClass("danxuanSelect");
	});
	/*刷新缓存中单选的点击事件*/
	$(".shuaxin .danxuan").on("click",function(){
		$(".shuaxin .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
		$(this).find("div:nth-child(1)").addClass("danxuanSelect");
	});
	/*渠道列表中快捷开启关闭状态的点击事件*/
	$("#upBody").on("click",".qiyong,.guanbi",function(){
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
	  elem: '#uptime' //指定元素
	  ,type:'datetime'
	  ,eventElem: '#uptimeFocus'
	  ,trigger: 'click'
	});

	yema_suanfa(num_all, num_curr);
	getAPKID();
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
	var apkid = $("#classess_select2").val();
	var duantype = $("#classess_select3").val();
	
    var data= {
    	"apkid":parseInt(apkid),
	    "type":parseInt(duantype),
        "size":parseInt($("#curr_num").val()),
        "page":parseInt(page),
		"total":0,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "update/updateset/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var up ='';
	        $.each(msg.data.info,function (index,element) {
	        	var duantype = "";
	        	if(element.utype == 1){
	        		duantype = "PC端";
	        	}else if(element.utype == 2){
	        		duantype = "安卓端";
	        	}else if(element.utype == 3){
	        		duantype = "IOS端";
	        	}else if(element.utype == 4){
	        		duantype = "TV端";
	        	}
	        	var qiyong = '',guanbi = '';
	        	if(element.whitetype == 1){
	        		qiyong = "block";
	        		guanbi = "none";
	        	}else{
	        		qiyong = "none";
	        		guanbi = "block";
	        	}
	        	up += upStr.replace("%apkid",element.apkid).replace("%packname",element.packname).
	        	replace("%type",duantype).replace("%minversion",element.minversion).replace("%newversion",element.newversion).replace("%maxversion",element.maxversion).
	        	replace("%url1",element.url1).replace("%url2",element.url2).replace("%title",element.title).replace("%explain",element.explain).
	        	replace("%luaversion",element.luaversion).replace("%luaurl",element.luaurl).replace("%qiyong",qiyong).
	        	replace("%guanbi",guanbi).replace("%whiteversion",element.whiteversion).replace("%whitenewversion",element.whitenewversion).replace("%whiteurl",element.whiteurl).
	        	replace("%whiteluaversion",element.whiteluaversion).replace("%whiteluaurl",element.whiteluaurl);
	        });
	        $("#all_num,#countNum").html(msg.data.total);
	        $('#upBody').html(up);
	        if(type == 1) {
				changePage();
			}
        }else{
        	alert(msg.msg);
        }
    });
}

/*新建更新配置的方法*/
function createBanner(){
	var apkid = $("#apkid").val();
	if(apkid == ''){
		alert("请输入apk编号!");
		return false;
	}
	var packname = $("#packname").val();
	if(apkid == ''){
		alert("请输入apk包名!");
		return false;
	}
	var type = $("#duantype").val();
	var minversion = $("#minversion").val();
	if(minversion == ''){
		alert("请输入允许登录的最低版本!");
		return false;
	}
	var newversion = $("#newversion").val();
	if(newversion == ''){
		newversion = 0;
	}
	var maxversion = $("#maxversion").val();
	if(maxversion == ''){
		maxversion = 0;
	}
	var appsize = $("#appsize").val();
	if(appsize == ''){
		alert("请输入包体大小!");
		return false;
	}
	var url1 = $("#url1").val();
	if(url1 == ''){
		alert("请输入下载地址1!");
		return false;
	}
	var url2 = $("#url2").val();
	if(url2 == ''){
		alert("请输入下载地址2!");
		return false;
	}
	var title = $("#title").val();
	if(title == ''){
		alert("请输入更新标题!");
		return false;
	}
	var explain = $("#explain").val();
	if(explain == ''){
		alert("请输入更新说明!");
		return false;
	}
	var md5 = $("#md5").val();
	var btime = $("#uptime").val();
//	if(btime == ''){
//		alert("请输入开始更新时间!");
//		return false;
//	}else{
//		btime = Date.parse(btime)/1000;
//	}
	var luaversion = $("#luaversion").val();
	if(luaversion == ''){
		luaversion = 0;
	}
	var luaurl = $("#luaurl").val();
	var whitetype = 1;
	$.each($("#whitetype .danxuan"), function(index,element) {
		if($(element).find("div:nth-child(1)").hasClass("danxuanSelect")){
			whitetype = index+1;
			return false;
		}
	});
	var whiteversion = $("#whiteversion").val();
	if(whiteversion == ''){
		whiteversion = 0;
	}
	var whitenewversion = $("#whitenewversion").val();
	if(whitenewversion == ''){
		whitenewversion = 0;
	}
	var whiteurl = $("#whiteurl").val();
	var whiteluaversion = $("#whiteluaversion").val();
	if(whiteluaversion == ''){
		whiteluaversion = 0;
	}
	var whiteluaurl = $("#whiteluaurl").val();
	
	var data= {
        addoredit:addoredit,
        apkid:parseInt(apkid),
        packname:packname,
        type:parseInt(type),
        minversion:parseInt(minversion),
        newversion:parseInt(newversion),
        maxversion:parseInt(maxversion),
        appsize:appsize,
        url1:url1,
        url2:url2,
        title:title,
        explain:explain,
        md5:md5,
        btime:btime,
        luaversion:parseInt(luaversion),
        luaurl:luaurl,
        whitetype:parseInt(whitetype),
        whiteversion:parseInt(whiteversion),
        whitenewversion:parseInt(whitenewversion),
        whiteurl:whiteurl,
        whiteluaversion:parseInt(whiteluaversion),
        whiteluaurl:whiteluaurl,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "update/updateset/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	chaxun(1);
        	$("#tjqdShadow").animate({opacity: '0'}, 400);
			$("#tjqdMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#tjqd").hide();
			});
			setTimeout(function(){
				if(addoredit == 1){
					alert("新增成功!");
				}else if(addoredit == 2){
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
	$("#tjqdTitle").html("编辑渠道");
	$("#apkid").prop("disabled","disabled");
	clearEdit();
	 var data = {
		apkid: parseInt(acc_id),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/updateset/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#apkid").val(msg.data.apkid);
			$("#packname").val(msg.data.packname);
			$("#duantype").val(msg.data.type);
			$("#minversion").val(msg.data.minversion);
			$("#newversion").val(msg.data.newversion);
			$("#maxversion").val(msg.data.maxversion);
			$("#appsize").val(msg.data.appsize);
			$("#url1").val(msg.data.url1);
			$("#url2").val(msg.data.url2);
			$("#title").val(msg.data.title);
			$("#explain").val(msg.data.explain);
			$("#md5").val(msg.data.md5);
			$("#uptime").val(dateFtt("yyyy-MM-dd hh:mm:ss",msg.data.btime*1000));
			$("#operatetime").val(dateFtt("yyyy-MM-dd hh:mm:ss",msg.data.operatetime*1000));
			$("#luaversion").val(msg.data.luaversion);
			$("#luaurl").val(msg.data.luaurl);
			$("#whiteversion").val(msg.data.whiteversion);
			$("#whitenewversion").val(msg.data.whitenewversion);
			$("#whiteurl").val(msg.data.whiteurl);
			$("#whiteluaversion").val(msg.data.whiteluaversion);
			$("#whiteluaurl").val(msg.data.whiteluaurl);
			$("#whitetype .danxuan").find("div:nth-child(1)").removeClass("danxuanSelect")
			$("#whitetype .danxuan").eq(parseInt(msg.data.whitetype)-1).find("div:nth-child(1)").addClass("danxuanSelect");

			$("#tjqd").show();
			$("#tjqdShadow").animate({opacity: '0.3'}, 400);
			$("#tjqdMain").animate({top: '10%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});

}
/*清空编辑输入信息*/
function clearEdit(){
	$("#apkid").val("");
	$("#packname").val("");
	$("#duantype").val("1");
	$("#minversion").val("");
	$("#newversion").val("");
	$("#maxversion").val("");
	$("#url1").val("");
	$("#url2").val("");
	$("#title").val("");
	$("#explain").val("");
	$("#md5").val("");
	$("#uptime").val("");
	$("#operatetime").val("");
	$("#luaversion").val("");
	$("#luaurl").val("");
	$("#whiteversion").val("");
	$("#whitenewversion").val("");
	$("#whiteurl").val("");
	$("#whiteluaversion").val("");
	$("#whiteluaurl").val("");
	$("#whitetype .danxuan").eq(0).find("div:nth-child(1)").addClass("danxuanSelect");
	$("#whitetype .danxuan").eq(1).find("div:nth-child(1)").removeClass("danxuanSelect");
}


/*快捷开启或关闭状态的开关点击事件*/
function quickjStatus(element,autoid,status){
	var data = {
		apkid: parseInt(autoid),
		status:status,
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/updateset/modify?";
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


/*刷新缓存中提交的点击事件*/
function shuffOk(type){
	var data = {
		type: parseInt(type),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/updateset/freshcache?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#sxhcShadow").animate({opacity: '0'}, 400);
			$("#sxhcMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#sxhc").hide();
			});
			setTimeout(function(){
				alert("刷新缓存成功!");
			},500);
		} else {
			alert(msg.msg);
		}
	});
}


/*拉起appid*/
function getAPKID(){
	var data = {
		status: 0,
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/updateset/selectapk?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
				var s = '<option value="0">全部</option>';
				var apkid_option = "<option value='%apkid'>%apkid1 (%packname)</option>";
				$.each(msg.data.info, function(index,element) {
					s += apkid_option.replace("%apkid",element.apkid).replace("%packname",element.packname).replace("%apkid1",element.apkid);
				});
				$("#classess_select2").html(s);
		} else {
			alert(msg.msg);
		}
	});
}
