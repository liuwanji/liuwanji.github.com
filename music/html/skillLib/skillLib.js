/*页码点击事件*/
var num_all = $("#all_num").html();   /*统计 总个数*/
var num_curr = $("#curr_num").val();  /*页尺寸*/
var page_num = 1;
/*教室列表样式字符串*/
var skillStr = "<tr>"+
	"<td>%skillid</td>" +
	"<td><img class='skillimg' src='%img'></td>" +
	"<td>%skill</td>" +
	"<td>%resource</td>" +
	"<td>%author</td>" +
	"<td>%ctime</td>" +
	"<td>%skillstatus</td>" +
	"<td>%bianji</td>" +
	"</tr>";

$(function() {
	addlisten();
	dataRefresh();
});


/*事件监听方法*/
function addlisten(){
	/*页码select的点击选择事件*/
	$("#curr_num").change(function() {
		chaxun(1);
	});
	/*新建技巧的点击事件*/
	$("#create_jiaoshi").on("click",function(){
		$("#addClasses").show();
		$("#adShadow").animate({opacity:'0.3'},400);
		$("#addMain").animate({top:'30%',opacity:'1'},400);
	});
	/*新增技巧弹窗中关闭按钮的点击事件*/
	$("#close_jiaoshi,#no_classes").on("click",function(){
		$("#adShadow").animate({opacity:'0'},400);
		$("#addMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#addClasses").hide();
		});
	});
	$("#close_edit,#no_classes1").on("click",function(){
		$("#editShadow").animate({opacity:'0'},400);
		$("#editMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#editClasses").hide();
		});
	});
	/*编辑的点击事件*/
	$("#skillBody").on("click",".toBianji",function(){
		var skillid = $(this).parent().parent().find("td:nth-child(1)").html();
		detailClassroom(skillid);
	});
	/*新建技巧中技巧名称的输入监听事件*/
	$("#skillname").on("input",function(){
		var _length = $(this).val().length;
		$("#createNameNum>span:nth-child(1)").html(_length);
	});
	/*修改技巧中技巧名称的输入监听事件*/
	$("#skillname1").on("input",function(){
		var _length = $(this).val().length;
		$("#editNameNum>span:nth-child(1)").html(_length);
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
function dataRefresh(){
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

/*格式 年月日时分秒*/
function add0(m){return m<10?'0'+m:m }
function nyrDate(needTime)
   {
  	 //needTime是整数，否则要parseInt转换
   	   var time = new Date(needTime);
   	   var y = time.getFullYear();
  	   var m = time.getMonth()+1;
  	   var d = time.getDate();
  	   var h = time.getHours();
 	  var mm = time.getMinutes();
 	  var s = time.getSeconds();
  	  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
   }


/*技巧详情*/
function detailClassroom(skillid){
	$("#skillname1").val("");
	$("#skilladdr1").val("");
	$("#imageaddr1").val("");
	$("#skillstatus1").val("");
	$("#editNameNum>span:nth-child(1)").html(0);
	 var data = {
		skillid: parseInt(skillid),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "skill/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#skillid").html(skillid);
			$("#skillname1").val(msg.data.skill);
			$("#editNameNum>span:nth-child(1)").html(msg.data.skill.length);
			$("#skilladdr1").val(msg.data.resource);
			$("#imageaddr1").val(msg.data.img);
			$("#skillstatus1").val(msg.data.skillstatus);
			
			$("#editClasses").show();
			$("#editShadow").animate({opacity:'0.3'},400);
			$("#editMain").animate({top:'30%',opacity:'1'},400);
		} else {
			alert(msg.msg);
		}
	});

}
/*编辑技巧*/
function editClassroom(){
	var skillid = $("#skillid").html();
	var skill = $('#skillname1').val();
	var resource = $('#skilladdr1').val();
	var img = $('#imageaddr1').val();
	var skillstatus = $("#skillstatus1").val();
	if(skill == ''||resource == '' || img ==''){
		alert('请输入完整!');
		return false;
	}
    var data ={
        "skillid":parseInt(skillid),
        "skill":skill,
        "resource":resource,
        "img":img,
        "skillstatus":parseInt(skillstatus)
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "skill/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#editShadow").animate({opacity:'0'},400);
			$("#editMain").animate({top:'0%',opacity:'0'},400,function(){
				$("#editClasses").hide();
			});
			setTimeout(function(){
				alert("编辑成功!");
			},500);
		}else{
			alert(msg.msg);
		}
    });

}
/*新增技巧*/
function createClassroom() {
	var skill = $('#skillname').val();
	var resource = $('#skilladdr').val();
	var img = $('#imageaddr').val();
	var skillstatus = $("#skillstatus").val();
	if(skill == ''||resource == '' || img ==''){
		alert('请输入完整!');
		return false;
	}
    var data ={
        "skillid":0,
        "skill":skill,
        "resource":resource,
        "img":img,
        "skillstatus":parseInt(skillstatus)
    };
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "skill/add?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#adShadow").animate({opacity:'0'},400);
			$("#addMain").animate({top:'0%',opacity:'0'},400,function(){
				$("#addClasses").hide();
			});
			setTimeout(function(){
				alert("新增成功!");
			},500);
		}else{
			alert(msg.msg);
		}
    });

}

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
/*技巧列表显示*/
function chaxun(type) {
	var skill = $("#classess_input1").val();
	var page = '';
	if(type == 1) {
		page = 1;
	} else if(type == 2) {
		page = page_num;
	} else {
		page = $("#curr_input").val();
	}
    var data= {
    	"skill":skill,
        "size":parseInt($("#curr_num").val()),
        "page":page,
        "count":0
    };

    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "skill/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	 var cla ='';
	        $.each(msg.data.info,function (index,element) {
	        	var skillstatus = '';
	        	if(element.skillstatus == 1){
	        		skillstatus = '开启';
	        	}else if(element.skillstatus == 2){
	        		skillstatus = '关闭';
	        	}
	        	var tobianji = '';
	        	if(element.skilltype == 1){
	        		tobianji = "<div class='toBianji'>编辑</div>";
	        	}else if(element.skilltype == 2){
	        		tobianji = "<div style='color:#888;'>仅查看</div>";
	        	}
	            cla += skillStr.replace('%skillid',element.skillid).replace('%img',element.img).replace('%skill',element.skill)
	            	.replace('%resource',element.resource).replace('%author',element.author).replace('%ctime',nyrDate(element.ctime*1000))
	            	.replace('%skillstatus',skillstatus).replace('%skilltype',element.skilltype).replace('%bianji',tobianji);
	        });
	        $('#skillBody').html(cla);
	        if(type == 1) {
				$("#all_num,#skillSum").html(msg.data.count);
				changePage();
			}
        }else{
        	alert(msg.msg);
        }
    });
}