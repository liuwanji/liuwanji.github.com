/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;

/*广告列表样式css*/
var bmdStr = "<tr>"+
									"<td>%appid</td>"+
									"<td>%type</td>"+
									"<td>%list</td>"+
									"<td>%ip</td>"+
									"<td class='bmd_bianji'>编辑</td>"+
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
	$("#create_Banner").on("click", function() {
		$("#bmdTitle").html("新建白名单");
		$("#appid").removeAttr("disabled");
		addoredit = 1;
		clearEdit();
		$("#bmd").show();
		$("#bmdShadow").animate({opacity: '0.3'}, 400);
		$("#bmdMain").animate({top: '30%',opacity: '1'}, 400);
	});
	/*新增渠道弹窗中关闭按钮的点击事件*/
	$("#close_bmd,#bmdNo").on("click", function() {
		$("#bmdShadow").animate({opacity: '0'}, 400);
		$("#bmdMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#bmd").hide();
		});
	});
	/*编辑的点击事件*/
	$("#bmdBody").on("click",".bmd_bianji",function() {
		addoredit = 2;
		var acc_id = $(this).parent().find("td:nth-child(1)").html();
		detailBanner(acc_id);
		return false;
	});
	/*搜索输入框的监听事件*/
	$("#classess_select2,#classess_select3").on("change",function(){
		chaxun(1);
	});
	/*清空的点击事件*/
	$("#_clear").on("click", function() {
		$("#classess_select2").val("0");
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
	yema_suanfa(num_all, num_curr);
	getAPPID();
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
	var appid = $("#classess_select2").val();
	var duantype = $("#classess_select3").val();
	
    var data= {
    	"appid":parseInt(appid),
	    "type":parseInt(duantype),
        "size":parseInt($("#curr_num").val()),
        "page":parseInt(page),
		"total":0,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "update/white/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var bmd ='';
	        $.each(msg.data.info,function (index,element) {
	        	var wtype = '';
	        	if(element.wtype == 1){
	        		wtype = "设备号";
	        	}else if(element.wtype == 2){
	        		wtype = "UID";
	        	}
	        	var list = '';
	        	$.each(element.list, function(index1,element1) {
	        		if(index1 == 0){
	        			list += element1;
	        		}else{
	        			list += "," + element1;
	        		}
	        	});
	        	bmd += bmdStr.replace("%appid",element.appid).replace("%type",wtype).replace("%list",list).
	        	replace("%ip",element.ip);
	        });
	        $("#all_num,#countNum").html(msg.data.total);
	        $('#bmdBody').html(bmd);
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
	var appid = $("#appid").val();
	if(!appid){
		alert("请输入应用ID!");
		return false;
	}
	var type = $("#duantype").val();
	var list = $("#list").val().split(",");
	$.each(list,function(index,element){
		list[index] = parseInt(element);
	});
	if(list.length == 0){
		alert("请输入白名单数据!");
		return false;
	}
	var ip = $("#ip").val();
	if(ip == ''){
		alert("请输入服务器IP!");
		return false;
	}
	var data= {
        addoredit:addoredit,
        appid:parseInt(appid),
        type:parseInt(type),
        list:list,
        ip:ip
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "update/white/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	chaxun(1);
        	$("#bmdShadow").animate({opacity: '0'}, 400);
			$("#bmdMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#bmd").hide();
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
	$("#bmdTitle").html("编辑渠道");
	$("#appid").prop("disabled","disabled");
	clearEdit();
	 var data = {
		appid: parseInt(acc_id),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/white/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#appid").val(msg.data.appid);
			$("#duantype").val(msg.data.type);
			var list = '';
			$.each(msg.data.list, function(index,element) {
				if(index == 0){
	        		list += element;
	        	}else{
	        		list += "," + element;
	        	}
			});
			$("#list").val(list);
			$("#ip").val(msg.data.ip);

			$("#bmd").show();
			$("#bmdShadow").animate({opacity: '0.3'}, 400);
			$("#bmdMain").animate({top: '30%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});

}
/*清空编辑输入信息*/
function clearEdit(){
	$("#appid").val("");
	$("#duantype").val("1");
	$("#list").val("");
	$("#ip").val("");
}


/*拉起appid*/
function getAPPID(){
	var data = {
		status: 0,
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/white/selectapp?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
				var s = '<option value="0">全部</option>';
				var apkid_option = "<option value='%appid'>%appid1</option>";
				$.each(msg.data.info, function(index,element) {
					s += apkid_option.replace("%appid",element.appid).replace("%packname",element.packname).replace("%appid1",element.appid);
				});
				$("#classess_select2").html(s);
		} else {
			alert(msg.msg);
		}
	});
	
	var data = {
		status: 0,
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/relation/selectapp?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
				var s = '';
				var apkid_option = "<option value='%appid'>%appid1</option>";
				$.each(msg.data.info, function(index,element) {
					s += apkid_option.replace("%appid",element.appid).replace("%packname",element.packname).replace("%appid1",element.appid);
				});
				$("#appid").html(s);
		} else {
			alert(msg.msg);
		}
	});
}