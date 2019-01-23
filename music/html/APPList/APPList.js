/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;

/*列表样式css*/
var apkStr = "<tr>"+
									"<td>%autoid</td>"+
									"<td>%appid</td>"+
									"<td>%name</td>"+
									"<td>%apkid</td>"+
									"<td>%remarks</td>"+
									"<td class='apk_bianji'>编辑</td>"+
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
	$("#create_apk").on("click", function() {
		$("#apklistTitle").html("新建");
		$("#appid").removeAttr("disabled");
		addoredit = 1;
		clearEdit();
		$("#apklist").show();
		$("#apklistShadow").animate({opacity: '0.3'}, 400);
		$("#apklistMain").animate({top: '25%',opacity: '1'}, 400);
	});
	/*新增渠道弹窗中关闭按钮的点击事件*/
	$("#close_apklist,#apklistNo").on("click", function() {
		$("#apklistShadow").animate({opacity: '0'}, 400);
		$("#apklistMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#apklist").hide();
		});
	});
	/*编辑的点击事件*/
	$("#applistBody").on("click",".apk_bianji",function() {
		addoredit = 2;
		var acc_id = $(this).parent().find("td:nth-child(2)").html();
		detailBanner(acc_id);
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
        "size":parseInt($("#curr_num").val()),
        "page":parseInt(page),
		"total":0,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "update/relation/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var apk ='';
	        $.each(msg.data.info,function (index,element) {
	        	var apkid = '';
	        	$.each(element.apkid, function(index,element) {
	        		if(index == 0){
	        			apkid += element;
	        		}else{
	        			apkid += ","+element;
	        		}
	        	});
	        	apk += apkStr.replace("%autoid",element.autoid).replace("%appid",element.appid).replace("%name",element.name).
	        	replace("%apkid",apkid).replace("%remarks",element.remarks);
	        });
	        $("#all_num,#countNum").html(msg.data.total);
	        $('#applistBody').html(apk);
	        if(type == 1) {
				changePage();
			}
        }else{
        	alert(msg.msg);
        }
    });
}

/*新建广告的方法*/
function createAPK(){
	var appid = $("#appid").val();
	if(appid == ''){
		alert("请输入Appid!");
		return false;
	}
	var name = $("#apkname").val();
	if(name == ''){
		alert("请输入应用名!");
		return false;
	}
	var apkid = $("#apkid").val().split(",");
	$.each(apkid, function(index,element) {
		apkid[index] = parseInt(element);
	});
	if(apkid.length == ''){
		alert("请输入Apkid!");
		return false;
	}
	var remarks = $("#remarks").val();
	if(remarks == ''){
		alert("请输入备注!");
		return false;
	}
	var data= {
        addoredit:addoredit,
        appid:parseInt(appid),
        name:name,
        apkid:apkid,
        remarks:remarks
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "update/relation/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url,function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	chaxun(1);
        	$("#apklistShadow").animate({opacity: '0'}, 400);
			$("#apklistMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#apklist").hide();
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
	$("#apklistTitle").html("编辑");
	$("#appid").prop("disabled","disabled");
	clearEdit();
	 var data = {
		appid: parseInt(acc_id),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "update/relation/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#appid").val(acc_id);
			$("#apkname").val(msg.data.name);
			var apkid = '';
	        $.each(msg.data.apkid, function(index,element) {
	        		if(index == 0){
	        			apkid += element;
	        		}else{
	        			apkid += ","+element;
	        		}
	        });
			$("#apkid").val(apkid);
			$("#remarks").val(msg.data.remarks);

			$("#apklist").show();
			$("#apklistShadow").animate({opacity: '0.3'}, 400);
			$("#apklistMain").animate({top: '25%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});

}
/*清空编辑输入信息*/
function clearEdit(){
	$("#appid").val("");
	$("#apkname").val("");
	$("#apkid").val("");
	$("#remarks").val("");
}

