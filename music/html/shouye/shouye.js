/*当前日期*/
var today = "";
var dateIndex = 0;
/*首页样式字符串*/
var _time = "<div class='time_box'>"+
						"<div>%time</div>"+
						"<div>"+
							"<div></div>"+
							"<div></div>"+
						"</div>"+
					"</div>";
var _time1 = "<div class='time_box'>"+
						"<div style='visibility:hidden;'></div>"+
						"<div>"+
							"<div></div>"+
							"<div></div>"+
						"</div>"+
					"</div>";
var _course = "<div class='_course'>"+
						"<div>%class_name</div>"+
						"<div>"+
							"<div class='string_hidden'>"+
								"<img src='../../public/img/time.png'/>"+
								"<div>%btime ~ %etime</div>"+
							"</div>"+
							"<div class='string_hidden'>"+
								"<img src='../../public/img/progress.png'/>"+
								"<div>第<span>%courseNum</span>节/共<span>%textbookAll</span>节</div>"+
							"</div>"+
							"<div class='string_hidden'>"+
								"<img src='../../public/img/teacher.png'/>"+
								"<div>老师: <span>%teacher</span></div>"+
							"</div>"+
							"<div class='string_hidden'>"+
								"<img src='../../public/img/jiaoshi.png'/>"+
								"<span>教室: <span>%classRoom</span></span>"+
							"</div>"+
						"</div>"+
						"<div>"+
							"<img src='../../public/img/zhongdain.png'/>"+
							"<div class='string_hidden'>"+
								"课程: <span>%course</span>"+
							"</div>"+
						"</div>"+
						"<div>"+
							"<img src='../../public/img/student.png'/>"+
							"<div>"+
								"<div>学生: </div>";
								
var _student = 					"<div class='student_img' style='background: url(%img) no-repeat center/100% 100%;'><div class='img_status status%status'></div></div>";

								
$(function() {
	addlisten();
	dataRefresh();
});

/*数据初始化渲染方法*/
function dataRefresh() {
	today = new Date();
	today.setHours(0);
	today.setSeconds(0);
	today.setMinutes(0);
	var oneday = 1000 * 60 * 60 * 24;
	var lastday = new Date(Date.parse(today)-oneday);
	var nextday = new Date(Date.parse(today)+oneday);
	$("#lastday").html((lastday.getMonth()+1)+"-"+lastday.getDate());
	$("#nextday").html((nextday.getMonth()+1)+"-"+nextday.getDate());
	refreshShouye({coursetime:0});
}
/*事件监听方法*/
function addlisten() {
	/*上一天下一天课程的切换点击事件*/
	$("#lastCourse").on("click",function(){
		dateIndex--;
		var oneday = 1000 * 60 * 60 * 24;
		var last = Date.parse(today)+dateIndex*oneday;
		if(dateIndex == 0){
			refreshShouye({coursetime:0});
		}else{
			refreshShouye({coursetime:last/1000});
		}
		var lastday = new Date(last-oneday);
		var nextday = new Date(last+oneday);
		$("#lastday").html((lastday.getMonth()+1)+"-"+lastday.getDate());
		$("#nextday").html((nextday.getMonth()+1)+"-"+nextday.getDate());
	});
	$("#nextCourse").on("click",function(){
		dateIndex++;
		var oneday = 1000 * 60 * 60 * 24;
		var next = Date.parse(today)+dateIndex*oneday;
		if(dateIndex == 0){
			refreshShouye({coursetime:0});
		}else{
			refreshShouye({coursetime:next/1000});
		}
		var lastday = new Date(next-oneday);
		var nextday = new Date(next+oneday);
		$("#lastday").html((lastday.getMonth()+1)+"-"+lastday.getDate());
		$("#nextday").html((nextday.getMonth()+1)+"-"+nextday.getDate());
	});
}

/*今日课程*/
function todayCourse(){
	dateIndex = 0;
	dataRefresh();
}

/*首页数据刷新方法*/
function refreshShouye(data){
	var data = data;
	console.log(data);
	var token = window.sessionStorage.token;; // todo 测试用token 正式 要在站点缓存取！
	var deal = "homepage/select?";
	var url = objKeySort(deal, data, token);
	console.log(url);
	ajax_public(url, function(msg) {
		console.log(msg);
		if(msg.data.schInfo){
			$("#_sum").html(msg.data.stuInfo.stu_all);
			$("#_today").html(msg.data.stuInfo.on_class);
			$("#_leave").html(msg.data.stuInfo.lostClass);
			$("#_expire").html(msg.data.stuInfo.expire);
	
			$("#teacher_num").html(msg.data.schInfo.tea_num);
			$("#kecheng_num").html(msg.data.schInfo.course);
			$("#banji_num").html(msg.data.schInfo.classAll);
			$("#music_num").html(msg.data.schInfo.musAll);
		}
		
		var s1 = "";
		var s2 = "";
		$.each(msg.data.course.course, function(index, element) {
			if(index != 0){
				if(element.btime == msg.data.course.course[index-1].btime){
					s1 += _time1;
				}else{
					s1 += _time.replace("%time",element.btime);
				}
			}else{
				s1 += _time.replace("%time",element.btime);
			}
			s2 += _course.replace("%class_name",element.class_name).replace("%btime",element.btime).replace("%etime",element.etime).replace("%courseNum",element.courseNum).replace("%textbookAll",element.textbookAll)
					.replace("%teacher",element.teacher).replace("%classRoom",element.classRoom).replace("%course",element.course);
			$.each(element.studInfo, function(index,element) {
				s2 += _student.replace("%img",element.img).replace("%status",element.status);
			});
			s2 += "</div></div></div>";
		});
		$("#_time").html(s1);
		$("#course_date").html(s2);
		if(s1 == ''){
			$("#course_date").html("<div style='margin:30vh 110px 0px 0px;color:#888;text-align:center;'>当天暂无课程哦~~</div>");
		}
	});
}
