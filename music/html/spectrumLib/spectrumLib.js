
/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;
/*谱例字符串样式*/
var puliStr = "<tr>"+
							"<td>%plid</td>"+
							"<td><img class='fengmiantu' src='%url'/></td>"+
							"<td>%plname</td>"+
							"<td>%cate1</td>"+
							"<td>%cate2</td>"+
							"<td>%ctime</td>"+
							"<td>%author</td>"+
						"</tr>";
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
	/*导入歌曲和关闭的点击事件*/
	$("#drgq").on("click", function() {
		$("#addMusic").show();
		$("#musicShadow").animate({opacity: '0.3'}, 400);
		$("#musicMain").animate({top: '40%',opacity: '1'}, 400);
	});
	$("#close_music").on("click", function() {
		$("#addMusic1").show();
		$("#musicShadow1").animate({opacity: '0.3'}, 400);
		$("#musicMain1").animate({top: '30%',opacity: '1'}, 400);
	});
	$("#close_music1,#musicNo").on("click", function() {
		$("#musicShadow1").animate({opacity: '0'}, 400);
		$("#musicMain1").animate({top: '20%',opacity: '0'}, 400, function() {
			$("#addMusic1").hide();
		});
	});
	$("#musicOk").on("click", function() {
		$("#musicShadow1").animate({opacity: '0'}, 400);
		$("#musicMain1").animate({top: '20%',opacity: '0'}, 400, function() {
			$("#addMusic1").hide();
		});
		$("#musicShadow").animate({opacity: '0'}, 400);
		$("#musicMain").animate({top: '20%',opacity: '0'}, 400, function() {
			$("#addMusic").hide();
		});
	});
	
	/*谱例列表的点击放大略缩图的点击事件*/
	$("#pulibody").on("click",".fengmiantu",function(){
		$(".bigImg").prop("src",$(this).attr("src"));
		$("#musicImg").show();
		$("#musicImgShadow").animate({opacity: '0.3'}, 400);
		$("#musicImgMain").animate({top: '40%',opacity: '1'}, 400);
	});
	$("#close_Img").on("click", function() {
		$("#musicImgShadow").animate({opacity: '0'}, 400);
		$("#musicImgMain").animate({top: '30%',opacity: '0'}, 400, function() {
			$("#musicImg").hide();
		});
	});
	/*监听筛选输入触发搜索*/
	$("#musci_select1,#musci_select2").on("change",function(){
		chaxun(1);
	});
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#teacher_input1").val("");
		$("#musci_select1").val("0");
		$("#musci_select2").val("0");
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
	chaxun(1);
}

/*筛选的点击时间*/
function saixuan(index, element) {
	$(element).addClass("_select2").siblings().removeClass("_select2");
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

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
function  chaxun(type){
	 var plname =$('#teacher_input1').val();
	 var cate1 =$('#musci_select1').val();
	 var cate2 =$('#musci_select2').val();
	 if(cate2 == "0"){
	 	cate2 = '';
	 }
    if(type == 1) {
        page = 1;
    } else if(type == 2) {
        page = page_num;
    } else {
        page = $("#curr_input").val();
    }

	 var data = {
	 	 "plname":plname,
	 	 "cate1":parseInt(cate1),
	 	 "cate2":cate2,
	 	 "size":parseInt($("#curr_num").val()),
	 	 "page":page,
		 "count":0,
	 }
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "teaching/pulilist?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	var song ='';
	        $.each(msg.data.info,function (index,element) {
	        	var _cate1 = '';
	        	var author = element.author;
	        	/*var _cate2 = '';*/
	        	if(element.cate1 == 0){
	        		_cate1 = '全部';
	        	}else{
	        		_cate1 = element.cate1+"分";
	        	}
	        	if(element.author == ''){
	        		author = "系统";
	        	}
	            song += puliStr.replace('%plid',element.plid).replace('%url',element.url).replace('%plname',element.plname).replace('%cate1',_cate1)
	            .replace('%cate2',element.cate2).replace('%ctime',nyrDate(element.ctime*1000)).replace('%author',author);
	        });
	        $("#pulibody").html(song);
	        if(type == 1){
	        	$("#all_num,#musicSum").html(msg.data.count);
		        changePage();
	        }
        }else{
        	alert(msg.msg);
        }
    });
}