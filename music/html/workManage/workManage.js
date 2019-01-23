/*页码点击事件*/
var num_all = $("#all_num").html();   /*统计 总个数*/
var num_curr = $("#curr_num").val();  /*页尺寸*/
var page_num = 1;
/*周表中上下翻动页码数*/
var dataNUm = -1;
/*选择学员中学员列表的区别变量*/
var chengyuanFlag = '';
/*已有学员id数组*/
var studentType1 = [];
var studentType2 = [];
var studentType3 = [];
/*点击录入考勤是存储相关点击考勤的jquery对象*/
var workJq = '';
/*选择学生中学生样式字符串*/
var studentStr = "<tr>" +
	"<td>" +
	"<div class='xzxySelect'><img src='../../public/img/login_tip.png'/></div>" +
	"<div class='stuid' style='display: none;'>%id</div>" +
	"<div class='head' style='display: none;'>%head</div>" +
	"<div class='name' style='display: none;'>%name</div>" +
	"<div class='sex' style='display: none;'>%sex</div>" +
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
/*学生选择后头像样式*/
var StuStr = "<div class='xueyuan'>"+
							"<div class='headUrl' style='background:url(%headUrl) no-repeat center/100% 100%;'>"+
								"<div class='removeIcon'>-</div>"+
								"<img class='headUrlSex' src='../../public/img/%sexName.png'/>"+
							"</div>"+
							"<div class='stuName'>%stuName</div>"+
							"<div class='stuid' style='display: none;'>%stuid</div>"+
							"<div class='head' style='display: none;'>%head</div>"+
							"<div class='sex' style='display: none;'>%sex</div>"+
						"</div>";
/*考勤课程样式字符串*/
var timeStr1 = "<div class='time_box'>"+
						"<div>%time</div>"+
						"<div>"+
							"<div></div>"+
							"<div></div>"+
						"</div>"+
					"</div>";
var timeStr2 = "<div class='time_box'>"+
						"<div style='visibility: hidden;'></div>"+
						"<div>"+
							"<div></div>"+
							"<div></div>"+
						"</div>"+
					"</div>";
var WorkStr = "<div class='courseBox'>"+
							"<div>"+
								"<div>%class_name</div>"+
								"<div><img src='../../public/img/time.png'/><div>%btime-%etime</div></div>"+
							"</div>"+
							"<div>"+
								"<div class='string_hidden'>"+
									"<img src='../../public/img/time.png'/>"+
									"<span>班级人数: <span>%stu_a<span style='display:%classNumDisplay;'>+%stu_c</span></span></span>"+
								"</div>"+
								"<div class='string_hidden'>"+
									"<img src='../../public/img/progress.png'/>"+
									"<span>第<span>%courseNum</span>节/共<span>%textbookAll</span>节</span>"+
								"</div>"+
								"<div class='string_hidden'>"+
									"<img src='../../public/img/jiaoshi.png'/>"+
									"<span>教室: <span>%classRoom</span></span>"+
								"</div>"+
							"</div>"+
							"<div>"+
								"<img src='../../public/img/zhongdain.png'/>"+
								"<span class='string_hidden'>"+
									"课程: <span>%course</span>"+
								"</span>"+
							"</div>"+
							"<div>"+
								"<div>"+
									"<img src='../../public/img/laoshiicon.png'/>"+
									"<div>老师: <span>%teacher</span></div>"+
									"<div class='courseQingjia' style='display:%daikeDisplay1;'>%status1</div>"+
								"</div>"+
								"<div  style='display:%daikeDisplay2;'>"+
									"<img src='../../public/img/laoshiicon.png'/>"+
									"<div>代课老师: <span>%teacher_d</span></div>"+
								"</div>"+
							"</div>"+
							"<div>"+
								"<div class='zcqd'>"+
									"<div>正常签到</div>"+
									"<div>%sign</div>"+
								"</div>"+
								"<div class='qjxy'>"+
									"<div>请假学员</div>"+
									"<div>%leave</div>"+
								"</div>"+
								"<div class='kkxy' style='border-right: none;'>"+
									"<div>旷课学员</div>"+
									"<div>%truant</div>"+
								"</div>"+
							"</div>"+
							"<div class='course_id' style='display: none;'>%course_id</div>"+
							"<div class='classid' style='display: none;'>%classid</div>"+
							"<div class='courseBoxBottom1' style='display:%display1;'>"+
								"<div class='lr'>录入考勤</div>"+
							"</div>"+
							"<div class='courseBoxBottom2' style='display:%display2;'>"+
								"<div class='ylr'>已录入</div>"+
								"<div class='_bianji'>编辑</div>"+
							"</div>"+
					"</div>";
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
	/*请假学员和旷课学员的点击事件*/
	$("#courseList").on("click",".qjxy,.kkxy",function(){
		geterrlist($(this).parent().parent());
	});
	$("#close_kqyc,#kqycOk").on("click",function(){
		$("#kqycShadow").animate({opacity:'0'},400);
		$("#kqycMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#kqyc").hide();
		});
	});
	/*录入考勤的点击事件*/
	$("#courseList").on("click",".lr",function(){
		chongzhiWork();
		workJq = $(this).parent().parent();
		detWork($(this).parent().parent().find(".course_id").html(),1);
	});
	$("#courseList").on("click","._bianji",function(){
		chongzhiWork();
		workJq = $(this).parent().parent();
		detWork($(this).parent().parent().find(".course_id").html(),2);
	});
	$("#close_lrkq,#lrkqNo").on("click",function(){
		$("#lrkqShadow").animate({opacity:'0'},400);
		$("#lrkqMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#lrkq").hide();
		});
	});
	/*选择老师的点击事件(关闭)*/
	$("#close_xzls,#xzlsNo").on("click",function(){
		$("#xzlsShadow").animate({opacity:'0'},400);
		$("#xzlsMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#xzls").hide();
		});
	});
	/*选择学员的点击事件*/
	$("#close_xzxs,#xzxsNo").on("click",function(){
		$("#xzxsShadow").animate({opacity:'0'},400);
		$("#xzxsMain").animate({top:'0%',opacity:'0'},400,function(){
			$("#xzxs").hide();
		});
	});
	/*学员头像的移除事件*/
	$(".workMain").on("click",".removeIcon",function(){
		var _this = $(this).parent().parent();
		_this.hide("200", function() {
			_this.remove();
		});
	});
	/*选择老师弹窗中选择老师事件*/
	$("#xzlsTable").on("click",'.xzlsSelect',function(){
		$(".xzlsSelect").find("img").hide();
		$(this).find("img").show();
		return false;
	});
	/*选择学生弹窗中选择学生事件*/
	$("#xzxsTable").on("click",'.xzxySelect',function(){
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
		if(_index>=$(".xzxySelect").length){
			$(".xzxySelectAll").find("img").show();
		}else{
			$(".xzxySelectAll").find("img").hide();
		}
		$("#yxz").html(_index);
	});
	/*选择学员中全选的点击事件*/
	$(".xzxySelectAll").on("click",function(){
		var _this = $(this).find("img");
		if(_this.css("display")!="none"){
			_this.hide();
			$(".xzxySelect").find("img").hide();
			$("#yxz").html("0");
		}else{
			_this.show();
			$(".xzxySelect").find("img").show();
			$("#yxz").html($(".xzxySelect").length);
		}
	});
	/*考勤日期前后翻页的点击事件*/
	$("#kaoqing_left").on("click",function(){
		dataNUm--;
		if(dataNUm == 0){
			$("#todayCourse").hide();
		}else{
			$("#todayCourse").show();
		}
		var _date = new Date();
		_date.setHours(0);
		_date.setSeconds(0);
		_date.setMinutes(0);
		_date = Date.parse(_date) + dataNUm*(3600 * 24 * 1000);
		refreshWork(_date);
		
	});
	$("#kaoqing_right").on("click",function(){
		dataNUm++;
		if(dataNUm == 0){
			$("#todayCourse").hide();
		}else{
			$("#todayCourse").show();
		}
		var _date = new Date();
		_date.setHours(0);
		_date.setSeconds(0);
		_date.setMinutes(0);
		_date = Date.parse(_date) + dataNUm*(3600 * 24 * 1000);
		refreshWork(_date);
	});
	$("#todayCourse").on("click",function(){
		$(this).hide();
		dataNUm = 0;
		var _date = new Date();
		_date.setHours(0);
		_date.setSeconds(0);
		_date.setMinutes(0);
		_date = Date.parse(_date) + dataNUm*(3600 * 24 * 1000);
		refreshWork(_date);
	});
}

/*数据初始化渲染方法*/
function dataRefresh(){
	laydate.render({
	  elem: '#dateWork' //指定元素
	   ,eventElem: '#dateWorkImg'
	  ,trigger: 'click'
	  ,done: function(value, date){ //监听日期被切换
	  	var _date = new Date(value);
		_date.setHours(0);
		_date.setSeconds(0);
		_date.setMinutes(0);
		_date = Date.parse(_date);
		var _today = new Date();
		_today.setHours(0);
		_today.setSeconds(0);
		_today.setMinutes(0);
		_today = Date.parse(_today);
		dataNUm = (_date-_today)/(3600*24*1000);
		if(dataNUm == 0){
			$("#todayCourse").hide();
		}else{
			$("#todayCourse").show();
		}
		refreshWork(_date);
	  }
	});
	$("#todayCourse").trigger("click");
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
/*刷新考勤也的事件*/
function refreshWork(today){
	$("#dateWork").val(formatDate(today));
	var data ={
	    coursetime:today/1000,
	};
    console.log(data);
    var token = window.sessionStorage.token;
    var deal = "attendance/list?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var _flag = 0;
			var _time = '';
			var s = '';
			s += "<div style='width:100%;overflow:visible;display: flex;justify-content: flex-start;flex-wrap:wrap;'>"
			$.each(msg.data.info.course, function(index,element) {
				if(index!=0){
					if(element.btime != msg.data.info.course[index-1].btime){
						s += "</div><div style='width:100%;overflow:visible;display: flex;justify-content: flex-start;flex-wrap:wrap;'>";
						var flag_num = parseInt((_flag-1)/3)+1;
						for(var i=1;i<flag_num;i++)
							_time += timeStr2;
						_flag = 1;
						_time += timeStr1.replace("%time",element.btime);
					}else{
						_flag++;
					}
				}else{
					_flag++;
					_time += timeStr1.replace("%time",element.btime);
				}
				
				var status1 = '';
				if(element.status1 == 1){
					status1 = '无课';
				}else if(element.status1 == 2){
					status1 = '未开班';
				}else if(element.status1 == 3){
					status1 = '正常上课';
				}else if(element.status1 == 4){
					status1 = '已离职';
				}else if(element.status1 == 5){
					status1 = '请假';
				}
				var daikeDisplay = 'block';
				var teacher_d = '暂无';
				if(element.teacher_d!=''){
					teacher_d = element.teacher_d;
				}else{
					daikeDisplay = "none";
				}
				var display1 = '',display2 = '';
				if(element.workstatus==1){
					display1 = "none";
					display2 = "block";
				}else{
					display2 = "none";
					display1 = "block";
				}
				var classNumDisplay = 'inline';
				if(element.stu_c == 0){
					classNumDisplay = "none";
				}
				
				s += WorkStr.replace("%classid",element.classid).replace("%course_id",element.course_id).replace("%class_name",element.class_name)
				.replace("%btime",element.btime).replace("%etime",element.etime).replace("%stu_a",element.stu_a).replace("%classNumDisplay",classNumDisplay)
				.replace("%stu_c",element.stu_c).replace("%courseNum",element.courseNum).replace("%textbookAll",element.textbookAll)
				.replace("%classRoom",element.classRoom).replace("%course",element.course).replace("%teacher",element.teacher).replace("%daikeDisplay1",daikeDisplay)
				.replace("%daikeDisplay2",daikeDisplay).replace("%status1",status1).replace("%teacher_d",teacher_d).replace("%sign",element.sign)
				.replace("%leave",element.leave).replace("%truant",element.truant).replace("%display1",display1).replace("%display2",display2);
			});
			s += "</div>";
			$("#courseTime").html(_time);
			$("#courseList").html(s);
			if(_time == ''){
			$("#courseList").html("<div style='margin:30vh 120px 0px 0px;color:#888;text-align:center;'>当天暂无课程考勤哦~~</div>");
		}
		}else{
			alert(msg.msg);
		}
    });
}


/*选择代课老师查询方法*/
function teacherSelect(type){
	if(type == 1){
		$("#laoshi_name").val("");
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
	    var data ={
	        "teachname":$('#laoshi_name').val(),
	        "status":0,   /*JS获取学员状态值 */    /* 1-正常 2-停课 3-已结业 4-未开班 5-未分班*/
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
			$("#xzlsTable").html(s);
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
	$("#teacher_id").html(_index.find("td:nth-child(2)").html());
	$("#teacher_name").html(_index.find(".teachName").html());
	$("#selectedTeacher").show();
	$("#selectTeacher").hide();
	$("#xzlsShadow").animate({opacity:'0'},400);
	$("#xzlsMain").animate({top:'0%',opacity:'0'},400,function(){
		$("#xzls").hide();
	});
}

/*选择学员的点击事件*/
function selectStu(index){
	chengyuanFlag=$("#chengyuanList"+index);
	$("#xyxm").val("");
	$(".xzxySelectAll").find("img").hide();
	$("#yxz").html("0");
	stuSelect(1);
}
/*选择学员页面 学员筛选*/
function stuSelect(type) {
	if(type == 1){
	    var data ={
	    	"course_id":parseInt($("#course_id").html()),
	        "stu_name":'',
	    }
	}else if(type == 2){
		$(".xzxySelectAll").find("img").hide();
		$("#yxz").html("0");
	    var data ={
	    	"course_id":parseInt($("#course_id").html()),
	        "stu_name":$('#xyxm').val(),
	    }
	}
	
    console.log(data);
    var token = window.sessionStorage.token;
    var deal = "curriculum/stuinfo?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var oldStudent = [];
			$.each($("#chengyuanList1").find(".xueyuan"), function(index,element) {
				var s = {
					stuid:$(element).find(".stuid").html(),
				};
				oldStudent.push(s);
			});
			$.each($("#chengyuanList2").find(".xueyuan"), function(index,element) {
				var s = {
					stuid:$(element).find(".stuid").html(),
				};
				oldStudent.push(s);
			});
			$.each($("#chengyuanList3").find(".xueyuan"), function(index,element) {
				var s = {
					stuid:$(element).find(".stuid").html(),
				};
				oldStudent.push(s);
			});
			var newStudent = [];
			$.each(msg.data.list, function(index,element) {
				var flag = 0;
				$.each(oldStudent, function(index1,element1) {
						if(parseInt(element.stu_id) == parseInt(element1.stuid)){
							flag = 1;
						}
				});
				if(flag == 0){
					newStudent.push(element);
				}
			});
			
			var s = '';
			$.each(newStudent, function(index,element) {
				s += studentStr.replace("%id",element.stu_id).replace("%head",element.head).replace("%name",element.stu_name).replace("%stuid",element.stu_id).replace("%img",element.head).replace("%stuName",element.stu_name)
					.replace("%sex",element.sex).replace("%age",element.age).replace("%mobile",element.tel);
			});
			$("#xzxsTable").html(s);
			
			$("#xzxs").show();
			$("#xzxsShadow").animate({opacity: '0.3'}, 400);
			$("#xzxsMain").animate({top: '15%',opacity: '1'}, 400);
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
				sex:$(element).parent().find(".sex").html(),
			};
			studentObject.push(s);
		}
	});
	console.log(studentObject);
	
		var oldstuObject = [];
		$.each(chengyuanFlag.find(".xueyuan"), function(index,element) {
				var s = {
					stuid:$(element).find(".stuid").html(),
					head:$(element).find(".head").html(),
					name:$(element).find(".stuName").html(),
					sex:$(element).find(".sex").html(),
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
			var sex = '';
			if(element.sex == 1){
				sex = "nan";
			}else if(element.sex == 2){
				sex = "nv";
			}
			s += StuStr.replace("%headUrl",element.head).replace("%stuName",element.name).replace("%stuid",element.stuid)
			.replace("%head",element.head).replace("%sexName",sex).replace("%sex",element.sex);
		});
		chengyuanFlag.html(s);
	
	
	$("#xzxsShadow").animate({opacity: '0'}, 400);
	$("#xzxsMain").animate({top: '0%',opacity: '0'}, 400, function() {
		$("#xzxs").hide();
	});
}

/*录入考勤方法*/
function editWork(){
	var course_id = $('#course_id').html();
	var c_status = $('#courseStatus').val();
	var teacher_d = $('#teacher_id').html();
	if(teacher_d == ''){
		teacher_d = 0;
	}
	var arrive = [],arr_type=[],leave = [],lea_type=[],truant = [],tru_type=[];
	
	var oldstudent1 = [];
	$.each($("#chengyuanList1").find(".xueyuan"), function(index,element) {
		oldstudent1.push(parseInt($(element).find(".stuid").html()));
	});
	if(studentType1.length == 0){
		$.each(oldstudent1, function(index,element) {
			arrive.push(element);
			arr_type.push(1);
		});
	}else if(oldstudent1.length == 0&&studentType1.length != 0){
		$.each(studentType1, function(index,element) {
			arrive.push(element.id);
			arr_type.push(2);
		});
	}else if(studentType1.length != 0&&oldstudent1.length != 0){
		var remo= [];
		var newObiect = [];
		$.each(studentType1, function(index,element) {
			var flag = 1;
			$.each(oldstudent1, function(index1,element1) {
				if(parseInt(element.id) == parseInt(element1)){
					flag = 2;
					newObiect.push(element1);
					return;
				}
			});
			if(flag == 1){
				remo.push(element.id);
			}
		});
		
		var add = [];
		$.each(oldstudent1, function(index,element) {
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
			arrive.push(element);
			arr_type.push(2);
		});
		$.each(add, function(index,element) {
			arrive.push(element);
			arr_type.push(1);
		});
	}
	
	
	var oldstudent2 = [];
	$.each($("#chengyuanList2").find(".xueyuan"), function(index,element) {
		oldstudent2.push(parseInt($(element).find(".stuid").html()));
	});
	if(studentType2.length == 0){
		$.each(oldstudent2, function(index,element) {
			leave.push(element);
			lea_type.push(1);
		});
	}else if(oldstudent2.length == 0&&studentType2.length != 0){
		$.each(studentType2, function(index,element) {
			leave.push(element.id);
			lea_type.push(2);
		});
	}else if(studentType2.length != 0&&oldstudent2.length != 0){
		var remo= [];
		var newObiect = [];
		$.each(studentType2, function(index,element) {
			var flag = 1;
			$.each(oldstudent2, function(index1,element1) {
				if(parseInt(element.id) == parseInt(element1)){
					flag = 2;
					newObiect.push(element1);
					return;
				}
			});
			if(flag == 1){
				remo.push(element.id);
			}
		});
		
		var add = [];
		$.each(oldstudent2, function(index,element) {
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
			leave.push(element);
			lea_type.push(2);
		});
		$.each(add, function(index,element) {
			leave.push(element);
			lea_type.push(1);
		});
	}
	
	
	var oldstudent3 = [];
	$.each($("#chengyuanList3").find(".xueyuan"), function(index,element) {
		oldstudent3.push(parseInt($(element).find(".stuid").html()));
	});
	if(studentType3.length == 0){
		$.each(oldstudent3, function(index,element) {
			truant.push(element);
			tru_type.push(1);
		});
	}else if(oldstudent3.length == 0&&studentType3.length != 0){
		$.each(studentType3, function(index,element) {
			truant.push(element.id);
			tru_type.push(2);
		});
	}else if(studentType3.length != 0&&oldstudent3.length != 0){
		var remo= [];
		var newObiect = [];
		$.each(studentType3, function(index,element) {
			var flag = 1;
			$.each(oldstudent3, function(index1,element1) {
				if(parseInt(element.id) == parseInt(element1)){
					flag = 2;
					newObiect.push(element1);
					return;
				}
			});
			if(flag == 1){
				remo.push(element.id);
			}
		});
		
		var add = [];
		$.each(oldstudent3, function(index,element) {
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
			truant.push(element);
			tru_type.push(2);
		});
		$.each(add, function(index,element) {
			truant.push(element);
			tru_type.push(1);
		});
	}
	
	
    var data ={
        course_id:parseInt(course_id),
        c_status:parseInt(c_status),
        teacher_d:parseInt(teacher_d),
        arrive:arrive,
        arr_type:arr_type,
        leave:leave,
        lea_type:lea_type,
        truant:truant,
        tru_type:tru_type,
    };
    console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "attendance/modify?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
//			workJq.find(".courseBoxBottom1").hide();
//			workJq.find(".courseBoxBottom2").show();
			var _date = new Date($("#dateWork").val());
				_date.setHours(0);
				_date.setSeconds(0);
				_date.setMinutes(0);
				_date = Date.parse(_date);
				refreshWork(_date);
			$("#lrkqShadow").animate({opacity:'0'},400);
			$("#lrkqMain").animate({top:'0%',opacity:'0'},400,function(){
				$("#lrkq").hide();
			});
			setTimeout(function(){
				alert("录入考勤成功!");
			},500);
		}else{
			alert(msg.msg);
		}
    });
}

/*重置录入考勤弹窗内容*/
function chongzhiWork(){
	$("#course_id").html("");
	$("#courseStatus").val(1);
	$("#teacherName").html("");
	$("#teacher_id").html("");
	$("#teacher_name").html("");
	$("#selectedTeacher").hide();
	$("#selectTeacher").show();
	$("#chengyuanList1,#chengyuanList2,#chengyuanList3").html("");
}

/*考勤详情方法*/
function detWork(course_id,workstatus){
	var data ={
	    course_id:parseInt(course_id),
	};
	
    console.log(data);
    var token = window.sessionStorage.token;
    var deal = "attendance/detail?";
    var url = objKeySort(deal, data, token);
    console.log(url);
   ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			$("#course_id").html(course_id);
			if(workstatus == 1){
				$("#courseStatus").val(1);
			}else{
				$("#courseStatus").val(msg.data.c_status);
			}
			$("#teacherName").html(msg.data.teacher);
			if(msg.data.teacher_d||msg.data.teacher_d == 0){
				$("#teacher_id").html(msg.data.teacher_d);
				$("#teacher_name").html(msg.data.teacher_name);
				$("#selectedTeacher").show();
				$("#selectTeacher").hide();
			}
			studentType1 = msg.data.arrive;
			studentType2 = msg.data.leave;
			studentType3 = msg.data.truant;
			var s = '';
			$.each(msg.data.arrive, function(index,element) {
				var sex = '';
				if(element.sex == 1){
					sex = "nan";
				}else if(element.sex == 2){
					sex = "nv";
				}
				s += StuStr.replace("%headUrl",element.head).replace("%stuName",element.name).replace("%stuid",element.id)
				.replace("%head",element.head).replace("%sexName",sex).replace("%sex",element.sex);
			});
			$("#chengyuanList1").html(s);
			s= '';
			$.each(msg.data.leave, function(index,element) {
				var sex = '';
				if(element.sex == 1){
					sex = "nan";
				}else if(element.sex == 2){
					sex = "nv";
				}
				s += StuStr.replace("%headUrl",element.head).replace("%stuName",element.name).replace("%stuid",element.id)
				.replace("%head",element.head).replace("%sexName",sex).replace("%sex",element.sex);
			});
			$("#chengyuanList2").html(s);
			s= '';
			$.each(msg.data.truant, function(index,element) {
				var sex = '';
				if(element.sex == 1){
					sex = "nan";
				}else if(element.sex == 2){
					sex = "nv";
				}
				s += StuStr.replace("%headUrl",element.head).replace("%stuName",element.name).replace("%stuid",element.id)
				.replace("%head",element.head).replace("%sexName",sex).replace("%sex",element.sex);
			});
			$("#chengyuanList3").html(s);
			
			$("#lrkq").show();
			$("#lrkqShadow").animate({opacity:'0.3'},400);
			$("#lrkqMain").animate({top:'15%',opacity:'1'},400);
		}else{
			alert(msg.msg);
		}
    });
}

/*考勤异常列表获得的方法*/
function geterrlist(element){
	var course_id = element.find(".course_id").html();
	    var data ={
	        course_id:parseInt(course_id),
	    };
	
    console.log(data);
    var token = window.sessionStorage.token;
    var deal = "attendance/errlist?";
    var url = objKeySort(deal, data, token);
    console.log(url);
   ajax_public(url, function(msg) {
        console.log(msg);
		if(msg.status == 0){
			var s = '';
			var work = "<tr><td>%name</td><td>%tel</td><td>%fname</td><td>%reltion</td><td>%ftel</td><td>%c_status</td><td>%range</td></tr>";
			$.each(msg.data.list, function(index,element) {
				var reltion = '';
				var c_status = '';
				if(element.reltion == 1){
					reltion = '爸爸';
				}else if(element.reltion == 2){
					reltion = '妈妈';
				}else if(element.reltion == 3){
					reltion = '爷爷';
				}else if(element.reltion == 4){
					reltion = '奶奶';
				}else if(element.reltion == 5){
					reltion = '外公';
				}else if(element.reltion == 6){
					reltion = '外婆';
				}
				if(element.c_status == 1){
					c_status = "<div class='colorBlue'>请假</div>";
				}else if(element.c_status == 2){
					c_status = "<div class='colorGreen'>已签到</div>";
				}else if(element.c_status == 3){
					c_status = "<div class='colorRed'>未签到</div>";
				}else if(element.c_status == 4){
					c_status = "<div class='colorRed'>旷课</div>";
				}
				s += work.replace("%name",element.name).replace("%tel",element.tel).replace("%fname",element.fname)
				.replace("%reltion",reltion).replace("%ftel",element.ftel).replace("%c_status",c_status).replace("%range",element.range);
			});
			$("#kqycTable").html(s);
			
			$("#kqyc").show();
			$("#kqycShadow").animate({opacity:'0.3'},400);
			$("#kqycMain").animate({top:'30%',opacity:'1'},400);
		}else{
			alert(msg.msg);
		}
    });

}
