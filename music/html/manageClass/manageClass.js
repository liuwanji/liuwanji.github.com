/*页码点击事件*/
var num_all = $("#all_num").html();   /*统计 总个数*/
var num_curr = $("#curr_num").val();  /*页尺寸*/
var page_num = 1;
/*教室列表样式字符串*/
var room = "<tr>" +
    "<td>%roomid</td>" +
    "<td>%roomname</td>" +
    "<td>%caddr</td>" +
    "<td>%include</td>" +
    "<td>%use_class</td>" +
    "<td>%use_stu</td>" +
    "<td>%courseTime</td>" +
    "<td>" +
    "<div class='toBianji'>编辑</div>" +
    "</td>" +
    "</tr>";
/*排序识别参数：排序哪个，排序类型*/
var paixuname = 0,paixutype = 0;
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
	/*新建教室的点击事件*/
	$("#create_jiaoshi").on("click",function(){
		$("#addClasses").show();
		$("#adShadow").animate({opacity:'0.3'},400);
		$("#addMain").animate({top:'35%',opacity:'1'},400);
	});
	/*新增教室弹窗中关闭按钮的点击事件*/
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
	$("#roomBody").on("click",".toBianji",function(){
		var roomid = $(this).parent().parent().find("td:nth-child(1)").html();
		detailClassroom(roomid);
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

/*教室详情*/
function detailClassroom(roomid){
	 var data = {
		roomid: parseInt(roomid),
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "classroom/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#roomid").html(roomid);
			$("#classroom1").val(msg.data.roomname);
			$("#include1").val(msg.data.include);
			$("#caddr1").val(msg.data.caddr);
			
			$("#editClasses").show();
			$("#editShadow").animate({opacity:'0.3'},400);
			$("#editMain").animate({top:'35%',opacity:'1'},400);
		} else {
			alert(msg.msg);
		}
	});

}
/*编辑教室*/
function editClassroom(){
	var classroom = $('#classroom1').val();
	var include = $('#include1').val();
	var caddr = $('#caddr1').val();
	if(classroom == ''||include == '' || caddr ==''){
		alert('请输入完整!');
		return false;
	}
    var data ={
        "roomid":parseInt($("#roomid").html()),
        "roomname":classroom,
        "include":parseInt(include),
        "caddr":caddr,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "classroom/add?";
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
/*新增教室*/
function createClassroom() {
	var classroom = $('#classroom').val();
	var include = $('#include').val();
	var caddr = $('#caddr').val();
	if(classroom == ''||include == '' || caddr ==''){
		alert('请输入完整!');
		return false;
	}
    var data ={
        "roomid":0,
        "roomname":classroom,
        "include":parseInt(include),
        "caddr":caddr,
    };
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "classroom/add?";
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
/*教室列表显示*/
function chaxun(type) {
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
        "count":0
    };

    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "classroom/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	 var cla ='';
        	 var tcourseTime='';
	        $.each(msg.data.info,function (index,element) {

                if(element.courseTime ==0){
                    tcourseTime ="暂无";
				}
                tcourseTime =formatDate(element.courseTime*1000);
	            cla += room.replace('%roomid',element.roomid).replace('%roomname',element.roomname).replace('%caddr',element.caddr).replace('%include',element.include).replace('%use_class',element.use_class).replace('%use_stu',element.use_stu).replace('%courseTime',tcourseTime);
	        });
	        $('#roomBody').html(cla);
	        if(type == 1) {
				$("#all_num").html(msg.data.count);
				changePage();
			}
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