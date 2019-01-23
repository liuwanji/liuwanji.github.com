/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;
/*添加学员类型*/
var addstudentType = 0;
/*编辑班级中学员列表*/
var bianjistudent = [];
/*星期时间增加删除按钮的点击事件*/
var time_string1 = "<div class='addInline1'>" +
	"<div><span style='color:red;'>* </span>星期</div>" +
	"<div style='margin-left:5px;'>" +
	"<select class='xingqi'>"+
	"<option value='1'>星期一</option>" +
	"<option value='2'>星期二</option>" +
	"<option value='3'>星期三</option>" +
	"<option value='4'>星期四</option>" +
	"<option value='5'>星期五</option>" +
	"<option value='6'>星期六</option>" +
	"<option value='7'>星期日</option>" +
	"</select>" +
	"</div>" +
	"<div style='margin-left:5px;'><span style='color:red;'>* </span>时间</div>" +
	"<div style='margin:0px 5px;'>" +
	"<input type='time' class='shijian' value='%time1'/>" +
	"</div>" +
	"-" +
	"<div style='margin-left:5px;'>" +
	"<input type='time' class='shijian2' value='%time2'/>" +
	"</div>" +
	"<div class='removeTime'>-</div>" +
	"</div>";
/*月时间增加删除按钮的点击事件*/
var time_string2 = "<div class='addInline1'>" +
	"<div><span style='color:red;'>* </span>号</div>" +
	"<div style='margin-left:5px;'>" +
	"<select class='xingqi'>"+
	"<option value='1'>1号</option><option value='2'>2号</option><option value='3'>3号</option><option value='4'>4号</option>" +
	"<option value='5'>5号</option><option value='6'>6号</option><option value='7'>7号</option><option value='8'>8号</option>" +
	"<option value='9'>9号</option><option value='10'>10号</option><option value='11'>11号</option><option value='12'>12号</option>" +
	"<option value='13'>13号</option><option value='14'>14号</option><option value='15'>15号</option><option value='16'>16号</option>" +
	"<option value='17'>17号</option><option value='18'>18号</option><option value='19'>19号</option><option value='20'>20号</option>" +
	"<option value='21'>21号</option><option value='22'>22号</option><option value='23'>23号</option><option value='24'>24号</option>" +
	"<option value='25'>25号</option><option value='26'>26号</option><option value='27'>27号</option><option value='28'>28号</option>" +
	"<option value='29'>29号</option><option value='30'>30号</option><option value='31'>31号</option>" +
	"</select>" +
	"</div>" +
	"<div style='margin-left:5px;'><span style='color:red;'>* </span>时间</div>" +
	"<div style='margin:0px 5px;'>" +
	"<input type='time' class='shijian' value='%time1'/>" +
	"</div>" +
	"-" +
	"<div style='margin-left:5px;'>" +
	"<input type='time' class='shijian2' value='%time2'/>" +
	"</div>" +
	"<div class='removeTime'>-</div>" +
	"</div>";
/*班级列表字符串*/
var banji = "<tr>" +
	"<td class='classid'>%index</td>" +
	"<td>%class_name</td>" +
	"<td>%textbook</td>" +
	"<td>%classStatus</td>" +
	"<td>%btime</td>" +
	"<td>%etime</td>" +
	"<td>%rate</td>" +
	"<td>%teacher</td>" +
	"<td>%stuNum</td>" +
	"<td>%courseTime</td>" +
	"<td>%statue</td>" +
	"<td class='toBianji'>编辑</td>" +
	"<td style='display:none'>%uid</td>" +
	"</tr>";
/*上课成员样式字符串*/
var chengyuan = "<div class='xueyuanImg'>" +
	"<div style='background:url(%img) no-repeat center/100% 100%'>" +
	"<div class='removeXueyuan'>-</div>" +
	"</div>" +
	"<div>%name</div>" +
	"<div style='display:none' class='stuid'>%stuid</div>" +
	"<div style='display:none' class='head'>%head</div>" +
	"<div style='display:none' class='stuName'>%stuName</div>" +
	"</div>";
/*选择学生中学生样式字符串*/
var studentStr = "<tr>" +
	"<td>" +
	"<div class='xzxySelect'><img src='../../public/img/login_tip.png'/></div>" +
	"<div class='stuid' style='display: none;'>%id</div>" +
	"<div class='head' style='display: none;'>%head</div>" +
	"<div class='name' style='display: none;'>%name</div>" +
	"</td>" +
	"<td>%stuid</td>" +
	"<td>" +
	"<div class='xzxyName'>" +
	"<div style='background:url(%img) no-repeat center/100% 100%;'></div>" +
	"<div>" +
	"<div>%stuName</div>" +
	"<div>%age岁</div>" +
	"</div>" +
	"</div>" +
	"</td>" +
	"<td>%mobile</td>" +
	"<td>%reg</td>" +
	"<td>%status</td>" +
	"</tr>";
/*选择教材中的样式字符串*/
var jiaocai = "<tr>"+
								"<td>"+
									"<div class='tjjcSelect'><img src='../../public/img/login_tip.png'/></div>"+
								"</td>"+
								"<td>%tbid</td>"+
								"<td>%tbook_type</td>"+
								"<td><img class='tjjcImg' src='%cover'/></td>"+
								"<td>%textbook</td>"+
								"<td>%author</td>"+
								"<td>%course_num</td>"+
							"</tr>";
/*选择教材成功后添加教材样式字符串*/
var jiaocai1 = "<div class='jiaocai'>"+
								"<div>"+
									"<img src='../../public/img/jiaocaifuhao.png'/>"+
									"<div class='string_hidden jiaocainame'>%jiaocainame</div>"+
									"<div class='jiaocaiid' style='display:none;'>%jiaocaiid</div>"+
								"</div>"+
								"<div>"+
									"<span><span class='tjjckeshi' style='color:#00ae5e;'>%jiaociakeshi</span><span>课时</span></span>"+
									"<img src='../../public/img/shanchu.png' class='removeJiaocai'/>"+
								"</div>"+
							"</div>";
/*新增班级中班级类型*/
var banji_type = 0;
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
	/*新建班级点击事件*/
	$("#create_banji").on("click", function() {
		showTeacher($("#zkls"),function(){
			showRoom($("#jiaoshi"),function(){
				$("#addClasses").show();
				$("#adShadow").animate({opacity: '0.3'}, 400);
				$("#addMain").animate({top: '10%',opacity: '1'}, 400);
			});
		});
	});
	/*新增班级弹窗中关闭按钮的点击事件*/
	$("#close_banji,#no_classes").on("click", function() {
		$("#adShadow").animate({opacity: '0'}, 400);
		$("#addMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#addClasses").hide();
		});
	});
	/*选择教材和继续添加的点击事件*/
	$("#xzjc,#jxtj").on("click", function() {
		$(".tjjcsearch1").find("img").hide();
		console.log($(".tjjcsearch1").eq(0).find("img").show());
		$("#jclx").val("");
		$("#yxzJc,#keshi").html("0");
		showJiaocai(1);
	});
	/*星期增加的点击事件*/
	$("#xinqi_time").on("click",".addTime",function() {
		var xingqiStr = time_string1.replace("%time1",$("#xinqi_time>div:last").find(".shijian").val())
						.replace("%time2",$("#xinqi_time>div:last").find(".shijian2").val());
		$("#xinqi_time").append(xingqiStr);
	});
	$("#xinqi_time").on("click", ".removeTime", function() {
		$(this).parent().remove();
	});
	/*月的增加事件*/
	$("#yue_time").on("click",".addTime",function() {
		var yueStr = time_string2.replace("%time1",$("#yue_time>div:last").find(".shijian").val())
						.replace("%time2",$("#yue_time>div:last").find(".shijian2").val());
		$("#yue_time").append(yueStr);
	});
	$("#yue_time").on("click", ".removeTime", function() {
		$(this).parent().remove();
	});
	/*周期改变的监听事件*/
	$("#zhouqi").change(function(){
		if($(this).val() == 1){
			$("#xinqi_time").show();
			$("#yue_time").hide();
		}else if($(this).val() == 2){
			$("#xinqi_time").hide();
			$("#yue_time").show();
		}
	});
	/*班级名称的输入监听事件*/
	$("#addName").on("input", function() {
		var _length = $(this).val().length;
		if(_length > 15) {
			$("#addNameNum span:nth-child(1)").html(_length).css({
				color: "red"
			});
		} else {
			$("#addNameNum span:nth-child(1)").html(_length).css({
				color: "#888"
			});
		}
	});
	/*添加学员和删除学员的点击事件*/
	$("#addXueyuan").on("click", function() {
		addstudentType = 1;
		$("#xyzt").val("");
		$(".xzxysearch1").find("img").hide();
		$(".xzxysearch1").eq(0).find("img").show();
		$("#yxzStudent").html("0");
		stuSelect(1);
	});
	$("#addXueyuan1").on("click", function() {
		addstudentType = 2;
		$("#xyzt").val("");
		$(".xzxysearch1").find("img").hide();
		$(".xzxysearch1").eq(0).find("img").show();
		$("#yxzStudent").html("0");
		stuSelect(1);
	});
	$("#addClasses").on("click", ".removeXueyuan", function() {
		var _this = $(this).parent().parent();
		_this.hide("200", function() {
			_this.remove();
		});
	});

	/*编辑弹窗中添加学员按钮和删除按钮的点击事件*/
	/*添加学员都在上面的监听事件中*/
	$("#bianji").on("click", ".removeXueyuan", function() {
		var _this = $(this).parent().parent();
		_this.hide("200", function() {
			_this.remove();
			$("#skcyNum").html($("#bianji .removeXueyuan").length);
		});
	});
	/*编辑按钮和取消编辑的点击事件*/
	$("#classes_bottom").on("click", ".toBianji", function() {
		var classid = $(this).parent().find(".classid").html();
		bianji(classid);
	});
	$("#close_bianji,#bianjiclose").on("click", function() {
		$("#bianjiShadow").animate({opacity: '0'}, 400);
		$("#bianjiMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#bianji").hide();
		});
	});

	/*选择学生弹窗的关闭事件*/
	$("#close_xzxy,#xzxsNo").on("click", function() {
		$("#xzxyShadow").animate({opacity: '0'}, 400);
		$("#xzxyMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xzxyTc").hide();
		});
	});
	/*选择学员中搜索选择分类和搜索图标的点击事件*/
	$(".xzxysearch1").on("click", function() {
		var _this = $(this);
		$(".xzxysearch1").find("img").hide();
		_this.find("img").show();
		stuSelect(2);
	});
	/*选择学员中选择事件*/
	$("#xzxyTc").on("click", ".xzxySelect", function() {
		var _index = 0;
		var _this = $(this).find("img");
		if(_this.css("display") != 'none') {
			_this.hide();
		} else {
			_this.show();
		}
		$.each($(".xzxySelect"), function(index, element) {
			if($(element).find("img").css("display") != "none") {
				_index++;
			}
		});
		$("#yxzStudent").html(_index);
	});

	/*添加教材搜索选择分类和搜索图标的点击事件*/
	/*添加教材中关闭按钮和取消按钮的点击事件*/
	$("#close_tjjc,#tjjcNo").on("click", function() {
		$("#tjjcShadow").animate({opacity: '0'}, 400);
		$("#tjjcMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#tjjc").hide();
		});
	});
	$(".tjjcsearch1").on("click", function() {
		var _this = $(this);
		$(".tjjcsearch1").find("img").hide();
		_this.find("img").show();
		showJiaocai(2);
	});
	/*教材教材中选择事件*/
	$("#tjjc").on("click", ".tjjcSelect", function() {
		var _index = 0;
		var _time = 0;
		var _this = $(this).find("img");
		if(_this.css("display") != 'none') {
			_this.hide();
		} else {
			_this.show();
		}
		$.each($(".tjjcSelect"), function(index, element) {
			if($(element).find("img").css("display") != "none") {
				_index++;
				_time += parseInt($(element).parent().parent().find("td:nth-child(7)").html());
			}
		});
		$("#yxzJc").html(_index);
		$("#keshi").html(_time);
	});
	/*新增班级中删除教材的点击事件*/
	$("#tjjcBox").on("click",".removeJiaocai",function(){
		var _this = $(this).parent().parent();
		_this.hide("200", function() {
			_this.remove();
			if($("#tjjcBox").html()==''){
				$("#xzjc").show();
				$("#jxtj").hide();
			}else{
				$("#xzjc").hide();
				$("#jxtj").show();
			}
		});
	});

	/*监听筛选输入触发搜索*/
	$("#classess_select2").on("change",function(){
		chaxun(1);
	});
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#classess_input1").val("");
		$("#classess_select2").val("0");
		$("#datetime1").val("");
		$("#datetime2").val("");
		chaxun(1);
	});
	/*输入框聚焦的事件*/
	laydate.render({
	  elem: '#datetime1' //指定元素
	  ,eventElem: '#dateFocus1'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var etime = $("#datetime2").val();
	  	var btime = Date.parse(value);
	  	if(etime != ''){
	  		etime = Date.parse(etime);
	  		if(btime > etime){
	  			$("#datetime1").val("");
	  			alert("开班时间不能大于截止时间!");
	  			return false;
	  		}
	  	}
	  	chaxun(1);
	  }
	});
	laydate.render({
	  elem: '#datetime2' //指定元素
	  ,eventElem: '#dateFocus2'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var btime = $("#datetime1").val();
	  	var etime = Date.parse(value);
	  	if(btime != ''){
	  		btime = Date.parse(btime);
	  		if(btime > etime){
	  			$("#datetime2").val("");
	  			alert("开班时间不能大于截止时间!");
	  			return false;
	  		}
	  	}
	  	chaxun(1);
	  }
	});
	laydate.render({
	  elem: '#kbsj' //指定元素
	  ,eventElem:'#kbsjImg'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var etime = $("#jzsj").val();
	  	var btime = Date.parse(value);
	  	if(etime != ''){
	  		etime = Date.parse(etime);
	  		if(btime > etime){
	  			$("#kbsj").val("");
	  			alert("开班时间不能大于截止时间!");
	  		}
	  	}
	  }
	});
	laydate.render({
	  elem: '#jzsj' //指定元素
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var btime = $("#kbsj").val();
	  	var etime = Date.parse(value);
	  	if(btime != ''){
	  		btime = Date.parse(btime);
	  		if(btime > etime){
	  			$("#jzsj").val("");
	  			alert("开班时间不能大于截止时间!");
	  		}
	  	}
	  }
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
	/*给定查询的初始化条件*/
//	var date = new Date();
//	date.setHours(0);
//	date.setMinutes(0);
//	date.setSeconds(0);
//	var starttime = formatDate(Date.parse(date) - 3600 * 24 * 1000 * 7);
//	var endtime = formatDate(new Date(Date.parse(date) +  3600 * 24 * 1000 *7));
//	$("#datetime1").val(starttime);
//	$("#datetime2").val(endtime);
	chaxun(1);
}
/*新增班级中班级类型选择的点击事件*/
function select_banji(element, index) {
	banji_type = index;
	$(element).addClass("select_banji").siblings().removeClass("select_banji");
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

/*创建班级接口*/
function createClass() {
	var textbook = [];
	$.each($(".jiaocai"), function(index,element) {
		textbook.push(parseInt($(element).find(".jiaocaiid").html()));
	});
	/*判断上课周期中开始时间不能大于结束时间的flag*/
	var flag_time = 1;
	var cycle_time = $("#zhouqi").val();
	var xingqi = [],xingqi1 = [],yue =[],yue1 = [],class_time=[],courseTime='';
	$.each($("#xinqi_time .addInline1"),function(index,element){
		if($(element).find(".shijian").val()!=""&&$(element).find(".shijian2").val()!=""){
			var xinqiData = {
				day : parseInt($(element).find(".xingqi").val()),
				btime : times($(element).find(".shijian").val()),
				etime : times($(element).find(".shijian2").val()),
			};
			var xingqiData1 = "周"+_num($(element).find(".xingqi").val())+" "+$(element).find(".shijian").val()+"-"+$(element).find(".shijian2").val();
			xingqi.push(xinqiData);
			xingqi1.push(xingqiData1);
		}
		/*判断上课周期中星期对应的时间结束时间不能小于开始时间*/
		if(cycle_time == 1){
				var btime = $(this).find(".shijian").val();
				var etime = $(this).find(".shijian2").val();
				if(btime!=''&&etime != ''){
					var time1 = btime.split(":");
					var time2 = etime.split(":");
					btime = parseInt(time1[0])*3600+parseInt(time1[1]*60);
					etime = parseInt(time2[0])*3600+parseInt(time2[1]*60);
					if(btime > etime){
			  			alert("上课周期中(星期)起始时间不能大于截止时间!");
			  			flag_time = 2;
			  			return false;
					}
				}
		}
	});
	$.each($("#yue_time .addInline1"),function(index,element){
		if($(element).find(".shijian").val()!=""&&$(element).find(".shijian2").val()!=""){
			var yueData = {
				day : parseInt($(element).find(".xingqi").val()),
				btime : times($(element).find(".shijian").val()),
				etime : times($(element).find(".shijian2").val()),
			};
			var yueData1 = $(element).find(".xingqi").val()+"号 "+$(element).find(".shijian").val()+"-"+$(element).find(".shijian2").val();
			yue.push(yueData);
			yue1.push(yueData1);
		}
		/*判断上课周期中月份对应的时间结束时间不能小于开始时间*/
		if(cycle_time == 2){
				var etime = $(this).find(".shijian2").val();
				var btime = $(this).find(".shijian").val();
				console.log(btime);
				console.log(etime);
				if(btime!=''&&etime != ''){
					var time1 = btime.split(":");
					var time2 = etime.split(":");
					btime = parseInt(time1[0])*3600+parseInt(time1[1]*60);
					etime = parseInt(time2[0])*3600+parseInt(time2[1]*60);
					if(btime > etime){
			  			alert("上课周期中(月份)起始时间不能大于截止时间!");
			  			flag_time = 2;
			  			return false;
					}
				}
		}
	});
	if(flag_time == 2){
		return false;
	}
	if(cycle_time == 1){
		if(xingqi.length == 0){
			alert("请输入上课周期：星期!");
			return false;
		}
		class_time = xingqi;
		$.each(xingqi1, function(index,element) {
			courseTime += element + ",";
		});
		courseTime = courseTime.substr(0,courseTime.length-1);
	}else if(cycle_time == 2){
		if(yue.length == 0){
			alert("请输入上课周期：日期!");
			return false;
		}
		class_time = yue;
		$.each(yue1, function(index,element) {
			courseTime = element + ",";
		});
		courseTime = courseTime.substr(0,courseTime.length-1);
	}
	if($("#kbsj").val() == ''){
		alert("请输入开班时间!");
		return false;
	}else{
		var btimeNUm = new Date($("#kbsj").val());
		btimeNUm.setHours(0);
		btimeNUm.setMinutes(0);
		btimeNUm.setSeconds(0);
		btimeNUm = Date.parse(btimeNUm)/1000;
		var today = new Date();
		today.setHours(0);
		today.setMinutes(0);
		today.setSeconds(0);
		today = Date.parse(today)/1000;
		if(btimeNUm<today){
			alert("开班日期不能选择今天以前！");
			return false;
		}
		var btime = Date.parse(new Date($("#kbsj").val()))/1000;
	}
	if($("#jzsj").val() == ''){
		alert("请输入截止时间!");
		return false;
	}else{
		var etime =Date.parse(new Date($("#jzsj").val()))/1000;
	}
	if($("#addName").val() == ''){
		alert("请输入班级名称!");
		return false;
	}else{
		var class_name = $("#addName").val();
	}
	if(banji_type == 0){
		alert("请选择班级类型!");
		return false;
	}else{
		class_type = banji_type;
	}
	if(textbook.length == 0){
		alert("请先添加教材!");
		return false;
	}
	var teacherid = parseInt($("#zkls").val());
	var students = [];
	var studenttype = [];
	$.each($("#chengyuan").find(".xueyuanImg"), function(index,element) {
		students.push(parseInt($(element).find(".stuid").html()));
		studenttype.push(1);
	});
	if($("#jiaoshi").html() == ''){
		var classroom = 0;
	}else{
		var classroom = parseInt($("#jiaoshi").val());
	}
	var data = {
		cuid:0,
		textbook: textbook, // todo  教材 假数据
		cycle_time:parseInt(cycle_time),
		class_time:class_time,
		courseTime:courseTime,
		btime:btime,
		etime:etime,
		class_name:class_name,
		class_type:class_type,
		teacherid:teacherid,
		students:students,
		classroom:classroom,
		studenttype:studenttype
	}
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "class/add?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#adShadow").animate({opacity: '0'}, 400);
			$("#addMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#addClasses").hide();
			});
			setTimeout(function(){
				alert("新增班级成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}
/*汉字数字的转换方法*/
function _num(num){
	if(num == 1){
		return "一";
	}else if(num == 2){
		return "二";
	}else if(num == 3){
		return "三";
	}else if(num == 4){
		return "四";
	}else if(num == 5){
		return "五";
	}else if(num == 6){
		return "六";
	}else if(num == 7){
		return "日";
	}
}
/*格式化时分时间为时间戳*/
function times(date){
	var time1 = parseInt(date.slice(0,2));
	var time2 = parseInt(date.slice(3,6));
	return time1*3600+time2*60;
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
/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
/*班级管理中查询按钮的点事件*/
function chaxun(type) {
	var class_name = $("#classess_input1").val();
	var class_type = $("#classess_select2").val();
	var btime = $("#datetime1").val();
	var etime = $("#datetime2").val();
	if(btime != ''){
		btime = new Date(btime);
		btime.setHours(0);
		btime = Date.parse(btime) / 1000;
	}else{
		btime = 0;
	}
	if(etime != ''){
		etime = new Date(etime);
		etime.setHours(0);
		etime = Date.parse(etime) / 1000;
	}else{
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        etime = (Date.parse(date) +  3650 * 3600 * 24 * 1000)/1000;
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
		class_name: class_name,
		class_type: parseInt(class_type),
		btime: btime,
		etime: etime,
		paixuname:paixuname,
		paixutype:paixutype,
		page: parseInt(page),
		size: parseInt($("#curr_num").val()),
		"count":0,
		"over":0,
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "class/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			$.each(msg.data.info, function(index, element) {
				var textbook = '';
				var classStatus = '';
				var status = '';
				var courseTime = '';
				if(element.class_type == 1) {
					classStatus = "初级";
				} else if(element.class_type == 2) {
					classStatus = "中级";
				} else if(element.class_type == 3) {
					classStatus = "高级";
				}
				if(element.status == 0){
					status = "<div>全部</div>";
				}else if(element.status == 1) {
					status = "<div class='wkb'>未开班</div>";
				} else if(element.status == 2) {
					status = "<div class='zc'>正常</div>";
				} else if(element.status == 3) {
					status = "<div class='yjy'>已结业</div>";
				} else if(element.status == 4) {
					status = "<div class='wkb'>课程不足</div>";
				} else if(element.status == 3) {
					status = "<div style='color:red;'>课程异常</div>";
				}
				courseTime += "<div style='max-height:130px;overflow-y:auto;'>";
				$.each(element.textbook, function(index, element) {
					courseTime += element.name + '<br>';
				});
				courseTime += "</div>";
//				$.each(element.courseTime, function(index, element) {
//					courseTime += "<div>每周" + element.weekDay + hhmmdate(new Date(element.ctime)) + "</div>";
//				});
				s += banji.replace("%index", element.classid).replace("%class_name", element.class_name).replace("%textbook", courseTime).replace("%classStatus", classStatus)
					.replace("%btime", formatDate(new Date(element.btime * 1000))).replace("%etime", formatDate(new Date(element.etime * 1000))).replace("%rate", element.rate).replace("%teacher", element.teacher).replace("%stuNum", element.stuNum)
					.replace("%courseTime", "<div style='max-width:220px;margin:0 auto;'>"+element.courseTime+"</div>").replace("%statue", status).replace("%cuid", element.cuid);
			});
			$("#classTableBody").html(s);
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


/*编辑详情的接口*/
function bianji(classid){
	showTeacher($("#classTeacher"),function(){
		showRoom($("#classHome"),function(){
			var data = {
				classid: parseInt(classid),
			};
			console.log(data);
			var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
			var deal = "class/detail?";
			var url = objKeySort(deal, data, token);
			console.log(url);
			ajax_public(url, function(msg) {
				console.log(msg);
				if(msg.status == 0) {
					$("#cuid").html(classid);
					$("#bianjiname1").html(msg.data.class_name);
					$("#className").val(msg.data.class_name);
					if(msg.data.class_type == 1){
						$("#bklx").html("初级");
					}else if(msg.data.class_type == 2){
						$("#bklx").html("中级");
					}else if(msg.data.class_type == 3){
						$("#bklx").html("高级");
					}
					$("#dqzt").find("option[value="+msg.data.status+"]").attr("selected",true); 
					$("#bianjikbsj").html(formatDate(new Date(msg.data.btime * 1000)) + " 至 " + formatDate(new Date(msg.data.etime * 1000)));
					$("#sksj").html(msg.data.courseTime);
					$("#classTeacher").val(msg.data.teacher.id);
					$("#classHome").val(msg.data.classroom.id);
					var skjc = '';
					$.each(msg.data.textbook,function(index,element){
						skjc += element+" ";
					});
					$("#skjc").html(skjc);
					$("#zks").html(msg.data.course_all);
					$("#dqks").html(msg.data.course_num);
					var s = '';
					$.each(msg.data.students, function(index,element) {
						s += chengyuan.replace("%img",element.head).replace("%name",element.stu_name).replace("%stuid",element.stuid).replace("%head",element.head).replace("%stuName",element.stu_name);
					});
					$("#skcyNum").html(msg.data.students.length);
					$("#chengyuan1").html(s);
					bianjistudent = msg.data.students;
					
					$("#bianji").show();
					$("#bianjiShadow").animate({opacity: '0.3'}, 400);
					$("#bianjiMain").animate({top: '20%',opacity: '1'}, 400);
				} else {
					alert(msg.msg);
				}
			});
		});
	});
	
}

/*编辑班级的点击事件*/
function bianjibanji(){
	var cuid = $("#bianji").find("#cuid").html();
	var class_name = $("#className").val();
	var teacherid = $("#classTeacher").val();
	var classroom = $("#classHome").val();
	if(class_name == '' || teacherid == '' || classroom == ''){
		alert("请输入完整!");
		return false;
	}
	
	var oldstudent = [];
	$.each($("#chengyuan1").find(".xueyuanImg"), function(index,element) {
		oldstudent.push(parseInt($(element).find(".stuid").html()));
	});
	
	var students = [];
	var studenttype = [];
	if(bianjistudent.length == 0){
		$.each(oldstudent, function(index,element) {
			students.push(element);
			studenttype.push(1);
		});
	}else if(oldstudent.length == 0&&bianjistudent.length != 0){
		$.each(bianjistudent, function(index,element) {
			students.push(element.stuid);
			studenttype.push(2);
		});
	}else if(bianjistudent.length != 0&&oldstudent.length != 0){
		var remo= [];
		var newObiect = [];
		$.each(bianjistudent, function(index,element) {
			var flag = 1;
			$.each(oldstudent, function(index1,element1) {
				if(parseInt(element.stuid) == parseInt(element1)){
					flag = 2;
					newObiect.push(element1);
					return;
				}
			});
			if(flag == 1){
				remo.push(element.stuid);
			}
		});
		
		var add = [];
		$.each(oldstudent, function(index,element) {
			var flag = 1;
			$.each(newObiect, function(index1,element1) {
				if(parseInt(element) == parseInt(element1)){
					flag = 2;
					return;
				}
			});
			if(flag == 1){
				add.push(element);
			}
		});
		$.each(remo, function(index,element) {
			students.push(element);
			studenttype.push(2);
		});
		$.each(add, function(index,element) {
			students.push(element);
			studenttype.push(1);
		});
	}
	
	var data = {
		cuid : parseInt(cuid),
		class_name : class_name,
		teacherid : parseInt(teacherid),
		classroom : parseInt(classroom),
		students : students,
		studenttype : studenttype
	};
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "class/add?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#bianjiShadow").animate({opacity: '0'}, 400);
			$("#bianjiMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#bianji").hide();
			});
			setTimeout(function(){
				alert("编辑成功!");
			},500);
		}else{
			alert(msg.msg);
		}
	});
}

/*拉取主课老师列表*/
function showTeacher(element,callback){
	var data ={
		"teachname":'',
		"status":0,    /*1.正常上课 2.无课 3.请假 4.未开班 5.已离职*/
		"paixuname":0,
		"paixutype":0,
		"page":1,
		"size":500,
		"count":1,
		"free":1,
	}
    var token = window.sessionStorage.token;
    var deal = "teacher/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var s = '';
			var teacherClass = "<option value='%tid'>%teacher</option>";
			$.each(msg.data.info, function(index,element) {
				s += teacherClass.replace("%tid",element.tid).replace("%teacher",element.teacher);
			});
			element.html(s);
			callback();
		}else{
			alert(msg.msg);
		}
    });

}
/*拉取上课教室列表*/
function showRoom(element,callback){
	var data= {
		"paixuname":0,
		"paixutype":0,
        "size":500,
        "page":1,
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
        	var s = '';
			var roomClass = "<option value='%roomid'>%roomname</option>";
			$.each(msg.data.info, function(index,element) {
				s += roomClass.replace("%roomid",element.roomid).replace("%roomname",element.roomname);
			});
			element.html(s);
			callback();
        }else{
        	alert(msg.msg);
        }
    });

}


/*选择学员页面 学员筛选*/
function stuSelect(type) {
	if(type == 1){
	    var data ={
	        "stu_name":'',
	        "status":0,   /*JS获取学员状态值 */    /* 1-正常 2-停课 3-已结业 4-未开班 5-未分班*/
	        "etime":0,
	        "stustatus":1,
	        "paixuname":0,
	    	"paixutype":0,
	        "size":1000,
	        "page":1,
	        "count":1,
	        "over":1,
	    }
	}else if(type == 2){
		$("#yxzStudent").html("0");
		var status = '';
		$.each($(".xzxysearch1"), function(index,element) {
			if($(element).find("img").css("display") != "none"){
				if(index == 0){
					status = 0;
				}else if(index == 1){
					status = 4;
				}else if(index == 2){
					status = 5;
				}
			}
		});
	    var data ={
	        "stu_name":$('#xyzt').val(),
	        "status":status,   /*JS获取学员状态值 */    /* 1-正常 2-停课 3-已结业 4-未开班 5-未分班*/
	        "etime":0,
	        "stustatus":1,
	        "paixuname":0,
			"paixutype":0,
	        "size":1000,
	        "page":1,
	        "count":1,
	        "over":1,
	    }
	}
    console.log(data);
    var token = window.sessionStorage.token;
    var deal = "student/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
   ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var s = '';
			var date = new Date();
			$.each(msg.data.info, function(index,element) {
				var age = date.getFullYear() - (new Date(element.birth)).getFullYear();
				var status = '';
				var mobile = '';
				if(element.status == 1){
					status = "<div class='status1'>正常</div>";
				}else if(element.status == 2){
					status = "<div class='status2'>停课</div>";
				}else if(element.status == 3){
					status = "<div class='status3'>已结业</div>";
				}else if(element.status == 4){
					status = "<div class='status4'>未开班</div>";
				}else if(element.status == 5){
					status = "<div class='status5'>未分班</div>";
				}
				if(element.mobile == ''){
					mobile = '暂无手机号';
				}else{
					mobile = element.mobile;
				}
				s += studentStr.replace("%id",element.stuid).replace("%head",element.head).replace("%name",element.stuName).replace("%stuid",element.stuid).replace("%img",element.head).replace("%stuName",element.stuName)
					.replace("%age",age).replace("%mobile",mobile).replace("%reg",formatDate(element.reg*1000)).replace("%status",status);
			});
			$("#xzxybody").html(s);
			
			$("#xzxyTc").show();
			$("#xzxyShadow").animate({opacity: '0.3'}, 400);
			$("#xzxyMain").animate({top: '15%',opacity: '1'}, 400);
		}else{
			alert(msg.msg);
		}
    });

}

/*选择学员的点击事件*/
function selectStudent(){
	var studentObject = [];
	$.each($(".xzxySelect"), function(index,element) {
		if($(element).find("img").css("display") != "none"){
			var s = {
				stuid:$(element).parent().find(".stuid").html(),
				head:$(element).parent().find(".head").html(),
				name:$(element).parent().find(".name").html(),
			};
			studentObject.push(s);
		}
	});
	console.log(studentObject);
	
	if(addstudentType == 1){
		var oldstuObject = [];
		$.each($("#chengyuan").find(".xueyuanImg"), function(index,element) {
				var s = {
					stuid:$(element).find(".stuid").html(),
					head:$(element).find(".head").html(),
					name:$(element).find(".stuName").html(),
				};
				oldstuObject.push(s);
		});
		console.log(oldstuObject);
		
		var stuObject = [];
		if(oldstuObject.length == 0){
			$.each(studentObject,function(index,element){
				stuObject.push(element);
			});
		}else if(studentObject.length == 0){
			$.each(oldstuObject,function(index,element){
				stuObject.push(element);
			});
		}else if(oldstuObject.length != 0&&studentObject.length != 0){
			$.each(oldstuObject,function(index,element){
				stuObject.push(element);
			});
			$.each(studentObject, function(index,element) {
				var flag = 1;
				$.each(oldstuObject, function(index1,element1) {
					if(parseInt(element.stuid) == parseInt(element1.stuid)){
						flag = 2;
						return ;
					}
				});
				if(flag == 1){
					stuObject.push(element);
				}
			});
		}
		console.log(stuObject);
		
		var s = '';
		$.each(stuObject, function(index,element) {
			s += chengyuan.replace("%img",element.head).replace("%name",element.name).replace("%stuid",element.stuid).replace("%head",element.head).replace("%stuName",element.name);
		});
		$("#chengyuan").html(s);
	}else if(addstudentType == 2){
		var oldstuObject = [];
		$.each($("#chengyuan1").find(".xueyuanImg"), function(index,element) {
				var s = {
					stuid:$(element).find(".stuid").html(),
					head:$(element).find(".head").html(),
					name:$(element).find(".stuName").html(),
				};
				oldstuObject.push(s);
		});
		console.log(oldstuObject);
		
		var stuObject = [];
		if(oldstuObject.length == 0){
			$.each(studentObject,function(index,element){
				stuObject.push(element);
			});
		}else if(studentObject.length == 0){
			$.each(oldstuObject,function(index,element){
				stuObject.push(element);
			});
		}else if(oldstuObject.length != 0&&studentObject.length != 0){
			$.each(oldstuObject,function(index,element){
				stuObject.push(element);
			});
			$.each(studentObject, function(index,element) {
				var flag = 1;
				$.each(oldstuObject, function(index1,element1) {
					if(parseInt(element.stuid) == parseInt(element1.stuid)){
						flag = 2;
						return ;
					}
				});
				if(flag == 1){
					stuObject.push(element);
				}
			});
		}
		console.log(stuObject);
		
		var s = '';
		$.each(stuObject, function(index,element) {
			s += chengyuan.replace("%img",element.head).replace("%name",element.name).replace("%stuid",element.stuid).replace("%head",element.head).replace("%stuName",element.name);
		});
		$("#skcyNum").html(stuObject.length);
		$("#chengyuan1").html(s);
	}
	
	
	$("#xzxyShadow").animate({opacity: '0'}, 400);
	$("#xzxyMain").animate({top: '0%',opacity: '0'}, 400, function() {
		$("#xzxyTc").hide();
	});
}


/*拉取教材的方法*/
function showJiaocai(type){
	var textbook = $("#jclx").val();
	var tbook_type = 0;
	$.each($(".tjjcsearch1"), function(index,element) {
		if($(element).find("img").css("display")!="none"){
			tbook_type = index;
			return ;
		}
	});
	
	if(type == 2){
		$("#yxzJc,#keshi").html("0");
		var data = {
			textbook: textbook,
			tbook_type: tbook_type,
			type1:1,
			page: 1,
			size: 1000,
			count: 0
		};
	}else if(type == 1){
		var data = {
			textbook: '',
			tbook_type: 0,
			type1:1,
			page: 1,
			size: 1000,
			count: 0
		};
	}
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "teaching/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s = '';
			$.each(msg.data.info, function(index, element) {
				var tbook_type = '';
				if(element.tbook_type == 1) {
					tbook_type = "<div>初级</div>";
				} else if(element.tbook_type == 2) {
					tbook_type = "<div>中级</div>";
				} else if(element.tbook_type == 3) {
					tbook_type = "<div>高级</div>";
				}

				s += jiaocai.replace("%tbid", element.tbid).replace("%tbook_type", tbook_type).replace("%cover", element.cover)
					.replace("%textbook", element.textbook).replace("%author", element.author).replace("%course_num", element.course_num);
			});
			$("#tjjcBody").html(s);
			$("#tjjc").show();
			$("#tjjcShadow").animate({opacity: '0.3'}, 400);
			$("#tjjcMain").animate({top: '10%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/*确认选择教材的点击事件*/
function selectJiaocai(){
	var newJiaocai = [];
	$.each($(".tjjcSelect"), function(index,element) {
		if($(element).find("img").css("display") != "none"){
			var s = {
				name:$(element).parent().parent().find("td:nth-child(5)").html(),
				id:$(element).parent().parent().find("td:nth-child(2)").html(),
				keshi:$(element).parent().parent().find("td:nth-child(7)").html(),
			}
			newJiaocai.push(s);
		}
	});
		var oldJiaocai = [];
		$.each($("#tjjcBox").find(".jiaocai"), function(index,element) {
				var s = {
					name:$(element).find(".jiaocainame").html(),
					id:$(element).find(".jiaocaiid").html(),
					keshi:$(element).find(".tjjckeshi").html(),
				};
				oldJiaocai.push(s);
		});
		
		var jiacaiObject = [];
		if(oldJiaocai.length == 0){
			$.each(newJiaocai,function(index,element){
				jiacaiObject.push(element);
			});
		}else if(newJiaocai.length == 0){
			$.each(oldJiaocai,function(index,element){
				jiacaiObject.push(element);
			});
		}else if(oldJiaocai.length != 0&&oldJiaocai.length != 0){
			$.each(oldJiaocai,function(index,element){
				jiacaiObject.push(element);
			});
			$.each(newJiaocai, function(index,element) {
				var flag = 1;
				$.each(oldJiaocai, function(index1,element1) {
					if(parseInt(element.id) == parseInt(element1.id)){
						flag = 2;
						return ;
					}
				});
				if(flag == 1){
					jiacaiObject.push(element);
				}
			});
		}
		console.log(jiacaiObject);
		
		var s = '';
		$.each(jiacaiObject, function(index,element) {
			s += jiaocai1.replace("%jiaocainame",element.name).replace("%jiaocaiid",element.id).replace("%jiaociakeshi",element.keshi);
		});
		$("#tjjcBox").html(s);
		if($("#tjjcBox").html()==''){
			$("#xzjc").show();
			$("#jxtj").hide();
		}else{
			$("#xzjc").hide();
			$("#jxtj").show();
		}
		$("#tjjcShadow").animate({opacity: '0'}, 400);
		$("#tjjcMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#tjjc").hide();
		});
}



/*排序的点击事件方法*/
function paixu(type1,type2){
	paixuname = type1;
	paixutype = type2;
	chaxun(1);
}
