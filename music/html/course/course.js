/*页码点击事件*/
var num_all = $("#all_num").html();
var num_curr = $("#curr_num").val();
var page_num = 1;
/*课程列表样式字符串*/
var kecheng = "<tr>"+
							"<td>%course_id</td>"+
							"<td>%course_date</td>"+
							"<td>%course_time</td>"+
							"<td>%class_name</td>"+
							"<td>%teacher</td>"+
							"<td>%textbook</td>"+
							"<td>%rate</td>"+
							"<td>%class_num</td>"+
							"<td>%classroom</td>"+
							"<td>"+
								"<div class='laoshi'>%supply</div>"+
								"<div class='xuanze'>选择老师</div>"+
							"</td>"+
							"<td>%status</td>"+
							"<td class='tobianji'>编辑</td>"+
						"</tr>";
/*上课成员样式字符串*/
var chengyuan = "<div class='xueyuanImg'>" +
	"<div style='background:url(%img) no-repeat center/100% 100%'>" +
	"<div class='removeXueyuan'>-</div>" +
	"</div>" +
	"<div style='text-align:center;'>%name</div>" +
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
/*选择歌曲的字符串样式*/
var musicStr = "<tr>" +
	"<td>" +
	"<div class='xzlsSelect'><img src='../../public/img/login_tip.png' /></div>" +
	"</td>" +
	"<td>%songid</td>" +
	"<td>" +
	'<img class="xzgqImg" src="%imgpath" />' +
	"</td>" +
	"<td>%name</td>" +
	"<td>%genre</td>" +
	"<td>%ltime</td>" +
	"<td>%bpm</td>" +
	"<td>%style</td>" +
	"<td>%difflv</td>" +
	"</tr>";
/*选择代课老师样式字符串*/
var teacherStr = "<tr>"+
							"<td>"+
								"<div class='xzlsSelect'><img src='../../public/img/login_tip.png' /></div>"+
							"</td>"+
							"<td>%tuid</td>"+
							"<td>"+
								"<div class='xzlsName'>"+
									"<div style='background:url(%head) no-repeat center/100% 100%;'></div>"+
									"<div>"+
										"<div class='teachName'>%teacher</div>"+
									"</div>"+
								"</div>"+
							"</td>"+
							"<td>%mobile</td>"+
							"<td>%status</td>"+
						"</tr>";
/*代课老师对象*/
var daikeTeacher = '';
/*详情中学员id数组*/
var bianjistudent = [];
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
	/*编辑课程的点击事件*/
	$("#kechengBody").on("click",".tobianji",function(){
		var _this = this;
		showTeacher(function(){
			showRoom(function(){
				var course_id = $(_this).parent().find("td:nth-child(1)").html();
				detCourse(course_id);
			});
		});
	});
	$("#close_xgxy,#xgxyNo").on("click", function() {
		$("#xgxyShadow").animate({opacity: '0'}, 400);
		$("#xgxyMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#changeStudent").hide();
		});
	});
	/*添加学员和删除学员的点击事件*/
	$("#addXueyuan").on("click", function() {
		$("#xzxyTc").show();
		$("#xzxyShadow").animate({opacity: '0.3'}, 400);
		$("#xzxyMain").animate({top: '15%',opacity: '1'}, 400);
	});
	$("#changeStudent").on("click", ".removeXueyuan", function() {
		var _this = $(this).parent().parent();
		_this.hide("200", function() {
			_this.remove();
			$("#xueyuan").html($("#changeStudent .removeXueyuan").length);
		});
	});
	/*编辑课程中选择课程歌曲的点击事件*/
	$("#qiehuan,#tjgq").on("click",function(){
		selectmusic(1);
	});
	$("#close_tjjc,#xzgqNo").on("click",function(){
		$("#xzgqShadow").animate({opacity: '0'}, 400);
		$("#xzgqMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xzgq").hide();
		});
	});
	/*选择代课老师的点击事件*/
	$("#kechengBody").on("click",".xuanze",function(){
		daikeTeacher = $(this).parent().find(".laoshi");
		teacherSelect(1);
	});
	$("#close_xzls,#xzlsNo").on("click", function() {
		$("#xzlsShadow").animate({opacity: '0'}, 400);
		$("#xzlsMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xzls").hide();
		});
	});
	/*选择老师中搜索选择分类和搜索图标的点击事件*/
	$(".xzlssearch1").on("click", function() {
		var _this = $(this);
		$(".xzlssearch1").find("img").hide();
		_this.find("img").show();
		teacherSelect(2);
	});
	$("#xzlssousuo").on("click", function() {

	});
	/*选择老师中选择事件*/
	$("#xzls").on("click", ".xzlsSelect", function() {
		var _index = 0;
		var _this = $(this).find("img");
		$("#xzls").find(".xzlsSelect").find("img").hide();
		if(_this.css("display") != 'none') {
			_this.hide();
		} else {
			_this.show();
		}
	});
	/*选择歌曲中选择事件*/
	$("#musicBody").on("click", ".xzlsSelect", function() {
		$("#musicBody").find(".xzlsSelect").find("img").hide();
		$(this).find("img").show();
		return false;
	});
	/*选择学生关闭弹窗的事件*/
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
	$("#xzxysousuo").on("click", function() {
		
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
	/*添加学员和删除学员的点击事件*/
	$("#addXueyuan").on("click", function() {
		addstudentType = 1;
		$("#xyzt").val("");
		$(".xzxysearch1").find("img").hide();
		$(".xzxysearch1").eq(0).find("img").show();
		$("#yxzStudent").html("0");
		stuSelect(1);
	});
	/*课程重点字数监听方法*/
	$("#kczd").on("input", function() {
		var _length = $(this).val().length;
		$(".textareNum>span:nth-child(1)").html(_length);
		if(_length > 30) {
			$(".textareNum>span:nth-child(1)").addClass("colorRed");
		} else {
			$(".textareNum>span:nth-child(1)").removeClass("colorRed");
		}
	});
	/*监听筛选输入触发搜索*/
	$("#classess_select2").on("change",function(){
		chaxun(1);
	});
	/*选择歌曲中筛选触发事件*/
	$("#qkxz,#gqlx,#gqnd,#gqfg").on("change",function(){
		selectmusic(2);
	});
	/*清空的方法*/
	$("#_clear").on("click", function() {
		$("#classess_input1").val("");
		$("#classess_select2").val("999");
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
	  			alert("上课时间不能大于截止时间!");
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
	  			alert("上课时间不能大于截止时间!");
	  			return false;
	  		}
	  	}
	  	chaxun(1);
	  }
	});
	laydate.render({
	  elem: '#riqi' //指定元素
	  ,trigger: 'click'
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
	var date = new Date();
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	var starttime = formatDate(Date.parse(date) - 3600 * 24 * 1000 * 7);
	var endtime = formatDate(new Date(Date.parse(date) +  3600 * 24 * 1000 *7));
	$("#datetime1").val(starttime);
	$("#datetime2").val(endtime);
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
	return _time;
}

/*类型一搜索或切换每页显示时页码变换方法*/
function changePage(){
		num_all = $("#all_num").html();
		num_curr = $("#curr_num").val();
		$("#fenye_num").off("click", "div");
		$("#fenye_last,#fenye_next,#fenye_last_max,#fenye_next_max").off("click");
		yema_suanfa(num_all, num_curr);
}
/*课程管理中查询按钮的点事件*/
function chaxun(type) {
	var className = $("#classess_input1").val();
	var status = $("#classess_select2").val();
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
        etime = (Date.parse(date) +  365 * 3600 * 24 * 1000)/1000;
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
		className: className,
		status: parseInt(status),
		btime: btime,
		etime: etime,
		paixuname:paixuname,
		paixutype:paixutype,
		page: parseInt(page),
		size: parseInt($("#curr_num").val()),
		count:0,
	};
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "curriculum/byname?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var s ='';
			$.each(msg.data.info, function(index,element) {
				var status = '';
				if(element.status == 0){
					status = '未开始';
				}else if(element.status == 1){
					status = '已完成';
				}else if(element.status == 2){
					status = '停课';
				}else if(element.status == 3){
					status = '时间异常';
				}else if(element.status == 4){
					status = '已过期';
				}
				s += kecheng.replace("%course_id",element.course_id).replace("%course_date",element.course_date).replace("%course_time",element.course_time)
				.replace("%class_name",element.class_name).replace("%teacher",element.teacher).replace("%textbook",element.textbook).replace("%rate",element.rate)
				.replace("%class_num",element.class_num).replace("%classroom",element.classroom).replace("%supply",element.supply).replace("%status",status);
			});
			$("#kechengBody").html(s);
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

/*课程详情渲染方法*/
function detCourse(course_id){
	clearCourse();
	 var data = {
		course_id: course_id,
	};
	console.log(data);
	var token = window.sessionStorage.token;
	var deal = "curriculum/detail?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			$("#course_id").html(course_id);
			$("#bjmc").val(msg.data.class_name);
			$("#jcmc").val(msg.data.textbook);
			$("#kcjd").val(msg.data.rate);
			$("#kcmc").val(msg.data.course_name);
			
			if(!msg.data.musInfo.bpm){
				$("#tjgq").show();
				$("#kcgq").hide();
			}else{
				$("#musicid").html(msg.data.musInfo.usic_id);
				$("#musicName").html(msg.data.musInfo.music_name);
				$("#musicTime").html(msg.data.musInfo.ltime);
				$("#musicBpm").html(msg.data.musInfo.bpm);
				$("#musicNandu").html(msg.data.musInfo.difflv);
				$("#kcgq").show();
				$("#tjgq").hide();
			}
			
			$("#kczd").val(msg.data.course_imp);
			$(".textareNum>span:nth-child(1)").html(msg.data.course_imp.length);
			$("#jiaoanurl").css({background:"url("+msg.data.head+") no-repeat center/100% 100%"});
			$("#jiaoanurlnum").html(msg.data.course);
			$("#riqi").val(msg.data.cdata);
			$("#shijian1").val(msg.data.cbtime);
			$("#shijian2").val(msg.data.cetime);
			$("#rkls").val(msg.data.teacherid);
			$("#jiaoshi").val(msg.data.classroomid);
			$("#xueyuan").html(msg.data.stu.length);
			bianjistudent = msg.data.stu;
			
			var s = '';
			$.each(msg.data.stu, function(index,element) {
				s += chengyuan.replace("%img",element.head).replace("%name",element.stu_name).replace("%stuid",element.stu_id).replace("%head",element.head).replace("%stuName",element.stu_name);
			});
			$("#chengyuan").html(s);
			
			$("#changeStudent").show();
			$("#xgxyShadow").animate({opacity: '0.3'}, 400);
			$("#xgxyMain").animate({top: '10%',opacity: '1'}, 400);
		} else {
			alert(msg.msg);
		}
	});
}
/*清空详情弹窗*/
function clearCourse(){
	$("#course_id").html('');
			$("#bjmc").val("");
			$("#jcmc").val("");
			$("#kcjd").val("");
			$("#kcmc").val("");
				$("#musicid").html("");
				$("#musicName").html("");
				$("#musicTime").html("");
				$("#musicBpm").html("");
				$("#musicNandu").html("");
				$("#kcgq").hide();
				$("#tjgq").show();
			$("kczd").val('');
			$("riqi").val('');
			$("#shijian1").val("08:00");
			$("#shijian2").val("08:00");
			$("#rkls").val('1');
			$("#jiaoshi").val('1');
			$("#xueyuan").html("0");
			$("#chengyuan").html("");
}

/*编辑课程信息的点击事件*/
function editCourse(){
	var course_id = $("#course_id").html();
	var course_name = $("#kcmc").val();
	var music = $("#musicid").html();
	var course_imp = $("#kczd").val();
	var cdata = $("#riqi").val();
	var cbtime = $("#shijian1").val();
	var cetime = $("#shijian2").val();
	var teacherid = $("#rkls").val();
	var classroomid = $("#jiaoshi").val();
	
	if(parseInt(course_imp.length) >parseInt($(".textareNum>span:nth-child(2)").html())){
		alert("课程重点字数超过限制!");
		return false;
	}
	var oldstudent = [];
	$.each($("#chengyuan").find(".xueyuanImg"), function(index,element) {
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
			students.push(element.stu_id);
			studenttype.push(2);
		});
	}else if(bianjistudent.length != 0&&oldstudent.length != 0){
		var remo= [];
		var newObiect = [];
		$.each(bianjistudent, function(index,element) {
			var flag = 1;
			$.each(oldstudent, function(index1,element1) {
				if(parseInt(element.stu_id) == parseInt(element1)){
					flag = 2;
					newObiect.push(element1);
					return;
				}
			});
			if(flag == 1){
				remo.push(element.stu_id);
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
	if(cdata == ''||cbtime==''||cetime==''){
		alert("请输入日期时间!");
		return false;
	}else if(teacherid == ''||!teacherid){
		alert("请选择任课老师!");
		return false;
	}else if(classroomid == ''||!classroomid){
		alert("请选择教室!");
		return false;
	}
	var datatime = new Date(cdata);
	datatime.setHours(0);
	datatime.setSeconds(0);
	datatime.setMinutes(0);
	var arr1= cbtime.split(":");
    var arr2= cetime.split(":");
    var time1= arr1[0]*3600+arr1[1]*60;
    var time2= arr2[0]*3600+arr2[1]*60;
    var cbtime =Date.parse(datatime)/1000 +time1;
    var cetime =Date.parse(datatime)/1000 +time2;
    var data = {
		course_id:parseInt(course_id),
		course_name:course_name,
		music:parseInt(music),
		course_imp:course_imp,
		cbtime:cbtime,
		cetime:cetime,
		teacherid:parseInt(teacherid),
		classroomid:parseInt(classroomid),
		stuid:students,
		stype:studenttype
	};
	 console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "curriculum/modify?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			chaxun(1);
			$("#xgxyShadow").animate({opacity:'0'},400);
			$("#xgxyMain").animate({top:'0%',opacity:'0'},400,function(){
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
				if(element.birth == ''){
					var age = "保密";
				}else{
					var age = date.getFullYear() - (new Date(element.birth)).getFullYear();
				}
				var status = '';
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
				s += studentStr.replace("%id",element.stuid).replace("%head",element.head).replace("%name",element.stuName).replace("%stuid",element.stuid).replace("%img",element.head).replace("%stuName",element.stuName)
					.replace("%age",age).replace("%mobile",element.mobile).replace("%reg",formatDate(element.reg*1000)).replace("%status",status);
			});
			$("#xzxybody").html(s);
			
			$("#xzxyTc").show();
			$("#xzxyShadow").animate({
				opacity: '0.3'
			}, 400);
			$("#xzxyMain").animate({
				top: '15%',
				opacity: '1'
			}, 400);
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
		$("#xueyuan").html(stuObject.length);
		$("#chengyuan").html(s);
	
	
	$("#xzxyShadow").animate({opacity: '0'}, 400);
	$("#xzxyMain").animate({top: '0%',opacity: '0'}, 400, function() {
		$("#xzxyTc").hide();
	});
}

/*拉取主课老师列表*/
function showTeacher(callback){
	var data ={
		"teachname":'',
		"status":1,    /*1-无课 2-未开班 3-正常上课 4-已离职 5-请假*/
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
			$("#rkls").html(s);
			callback();
		}else{
			alert(msg.msg);
		}
    });

}
/*拉取上课教室列表*/
function showRoom(callback){
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
			$("#jiaoshi").html(s);
			callback();
        }else{
        	alert(msg.msg);
        }
    });

}

/*选择歌曲事件*/
function selectmusic(type) {
	if(type == 1) {
		var name = '';
		var genre = 0;
		var style = 0;
		var re_type = 0;
		var difflv = 0;
		$('#gqmc').val("");
		$('#gqlx').val(0);
		$('#gqfg').val(0);
		$('#qkxz').val(0);
		$('#gqnd').val("");
	} else {
		var name = $('#gqmc').val();
		var genre = $('#gqlx').val();
		var style = $('#gqfg').val();
		var re_type = $("#qkxz").val();
		var difflv = $("#gqnd").val();
		if(difflv == '') {
			difflv = 0;
		}
	}

	var data = {
		"name": name,
		"genre": genre,
		"style": style,
		"re_type": re_type,
		"difflv": difflv,
		"paixuname":0,
		"paixutype":0,
		"size": 2000,
		"page": 1,
		"total": 0,
	}
	console.log(data);
	var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
	var deal = "song/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.status == 0) {
			var song = '';
			$.each(msg.data.info, function(index, element) {
				var genre = '';
				if(element.genre == 1) {
					genre = "初级";
				} else if(element.genre == 2) {
					genre = "中级";
				} else if(element.genre == 3) {
					genre = "高级";
				}
				song += musicStr.replace('%songid', element.songid).replace('%imgpath', element.imgpath.replace(/ /g,"%20")).replace('%name', element.name).replace('%genre', genre)
					.replace('%ltime', element.ltime).replace('%bpm', element.bpm).replace('%style', element.style).replace('%difflv', element.difflv);
			});
			$("#musicBody").html(song);
			$("#xzgq").show();
			$("#xzgqShadow").animate({
				opacity: '0.3'
			}, 400);
			$("#xzgqMain").animate({
				top: '10%',
				opacity: '1'
			}, 400);
		} else {
			alert(msg.msg);
		}
	});
}

/*选择歌曲中的确认选择的点击事假*/
function musicOkSelect() {
	var _index = '';
	$.each($("#musicBody").find(".xzlsSelect"), function(index, element) {
		if($(element).find("img").css("display") != "none") {
			_index = $(element).parent().parent();
		}
	});
	//	if(_index == ''){
	//		alert("请选择歌曲!");
	//	}else{
	$("#musicid").html(_index.find("td:nth-child(2)").html());
	$("#musicName").html(_index.find("td:nth-child(4)").html());
	$("#musicTime").html(_index.find("td:nth-child(6)").html());
	$("#musicBpm").html(_index.find("td:nth-child(7)").html());
	$("#musicNandu").html(_index.find("td:nth-child(9)").html());
	$("#kcgq").show();
	$("#tjgq").hide();
	$("#xzgqShadow").animate({
		opacity: '0'
	}, 400);
	$("#xzgqMain").animate({
		top: '0%',
		opacity: '0'
	}, 400, function() {
		$("#xzgq").hide();
	});
	//	}
}

/*选择代课老师查询方法*/
function teacherSelect(type){
	if(type == 1){
		$(".xzlssearch1").find("img").hide();
		$(".xzlssearch1").eq(0).find("img").show();
		$("#lsxm").val("");
	    var data ={
	        "teachname":'',
	        "status":0,   /*JS获取学员状态值 */    /* 1-正常 2-停课 3-已结业 4-未开班 5-未分班*/
	        "paixuname":0,
		"paixutype":0,
	        "size":2000,
	        "page":1,
	        "count":1,
	        "free":1,
	    }
	}else if(type == 2){
		var status = '';
		$.each($(".xzlssearch1"), function(index,element) {
			if($(element).find("img").css("display") != "none"){
				if(index == 0){
					status = index;
				}else if(index == 1){
					status = 2;
				}
			}
		});
	    var data ={
	        "teachname":$('#lsxm').val(),
	        "status":status,   /*JS获取学员状态值 */    /* 1-正常 2-停课 3-已结业 4-未开班 5-未分班*/
	        "paixuname":0,
		"paixutype":0,
	        "size":2000,
	        "page":1,
	        "count":1,
	        "free":1,
	    }
	}
	
    console.log(data);
    var token = window.sessionStorage.token;
    var deal = "teacher/select?";
    var url = objKeySort(deal, data, token);
    console.log(url);
   ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var s = '';
			$.each(msg.data.info, function(index,element) {
				var status = '';
				if(element.status ==1) {
					status = "<div style='color:green;'>正常上课</div>";
				} else if(element.status == 3) {
					status = "<div style='color:#ffb752;'>请假</div>";
				} else if(element.status == 5) {
                    status = "<div style='color:red;'>已离职</div>";
                }else if(element.status == 2) {
                    status = "<div style='color:#ffb752;'>无课</div>";
                }else if(element.status == 4) {
                    status = "<div style='color:#ffb752;'>未开班</div>";
                }
				s += teacherStr.replace("%tuid",element.tid).replace("%head",element.head).replace("%teacher",element.teacher)
				.replace("%mobile",element.mobile).replace("%status",status);
			});
			$("#xzlsBody").html(s);
			$("#xzls").show();
			$("#xzlsShadow").animate({opacity: '0.3'}, 400);
			$("#xzlsMain").animate({top: '15%',opacity: '1'}, 400);
		}else{
			alert(msg.msg);
		}
    });
}

/*选择代课老师的确定事件*/
function teaOkselect(){
	var _index = '';
	$.each($("#xzls").find(".xzlsSelect"), function(index, element) {
		if($(element).find("img").css("display") != "none") {
			_index = $(element).parent().parent();
		}
	});
	if(_index == ''){
		$("#xzlsShadow").animate({opacity: '0'}, 400);
		$("#xzlsMain").animate({top: '0%',opacity: '0'}, 400, function() {
			$("#xzls").hide();
		});
		return false;
	}
	var data = {
		course_id:parseInt(daikeTeacher.parent().parent().find("td:nth-child(1)").html()),
		teacher_d:parseInt(_index.find("td:nth-child(2)").html()),
	};
	 console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "curriculum/changedid?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var laoshiStr = "<div><div style='display:none;' class='daikeTeacherId'>%tid</div><div>%name</div></div>"
			var s = laoshiStr.replace("%tid",_index.find("td:nth-child(2)").html()).replace("%name",_index.find(".teachName").html());
			daikeTeacher.html(s);
			
			$("#xzlsShadow").animate({opacity: '0'}, 400);
			$("#xzlsMain").animate({top: '0%',opacity: '0'}, 400, function() {
				$("#xzls").hide();
			});
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