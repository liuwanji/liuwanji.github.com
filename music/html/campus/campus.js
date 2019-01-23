


$(function () {
	addlisten();
	showSch();
});

/*事件监听方法*/
function addlisten() {
	/*修改资料的点击事件*/
	$("#xgzl").on("click", function() {
		$("#campus_main").find("input,textarea").removeAttr("readonly");
		$("#campus_main").find("input").removeClass("noborderInput");
		$("#campus_main").find("textarea").removeClass("noborderText");
		$(this).hide();
		$("#updateLogo,.baocunquxiao,#imgInput").show();
	});
	$("#xiaoquNo").on("click", function() {
		$("#campus_main").find("input,textarea").prop("readonly", "readonly");
		$("#campus_main").find("input").addClass("noborderInput");
		$("#campus_main").find("textarea").addClass("noborderText");
		$("#xgzl").show();
		$("#updateLogo,.baocunquxiao,#imgInput").hide();
	});
	
	/*我要参与中选择照片的点击事件*/
	$('#imgInput').change(function() {
		readURL(this, $("#studentImg"));
	});
}

function photoCompress(img_id_jq, file, w, objDiv) {
	var ready = new FileReader();
	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	ready.readAsDataURL(file);
	ready.onload = function(e) {
		var re = this.result;
		img_id_jq.attr('src', e.target.result);
		canvasDataURL(re, w, objDiv)
	}
}

function canvasDataURL(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width,
			h = that.height,
			scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 0.5; // 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}
/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */
function convertBase64UrlToBlob(urlData) {

	var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  

	//处理异常,将ascii码小于0的转换为大于0  
	var ab = new ArrayBuffer(bytes.length);
	var ia = new Uint8Array(ab);
	for(var i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}

	return new Blob([ab], {
		type: '',
		name: ''
	});
}
/*将我要参与页面中用户选中的图像显示出来*/
function readURL(input, element) {
	if(input.files && input.files[0]) {
		var files = Array.prototype.slice.call(input.files);
		if(files[0].size > 1024000 * 8) {
			// 文件大小自定义限制
			alert("图片大小过大!");
			return;
		}
		if(files[0].size < 1024000) {
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e) {
				element.attr('src', e.target.result);
			};
		} else {
			photoCompress(element, input.files[0], 0.05, function(base64) {
				var img = convertBase64UrlToBlob(base64)
//				img.name = input.files[0]['name'];
//				img.type = input.files[0]['type'];
//				console.log(input.files[0].size);
//				console.log(img.size);
				element.attr('src', base64);
				if(img.size > 1024000 * 2) {
					alert("图片大小过大!");
				}
			})
		}
	}
}

/* 页面加载详情*/
function showSch() {
	var data ={'schid':0};

    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "organization/selectinfo?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_public(url, function(msg) {
        console.log(msg);
        $('#studentImg').attr("src",msg.data.head);
        $('#campusId').html(msg.data.id);
        $('#xiaoquName').val(msg.data.schname);
        $('#connect').val(msg.data.manager);
        $('#schTel').val(msg.data.tel1+','+msg.data.tel2+','+msg.data.tel3);
        $('#schAddr').val(msg.data.addr);
        $('#jyfw').val(msg.data.range);
        $('#jgjj').val(msg.data.des);
        $('#roomNum').html(msg.data.classroom);
        $('#teaNum').html(msg.data.teacher);
        $('#teaAll').html(msg.data.teacherAll);
        $('#class').html(msg.data.class);
        $('#classAll').html(msg.data.classAll);
        $('#course1').html(msg.data.course);
        $('#textbook').html(msg.data.textbook);
        $('#music1').html(msg.data.music);
        $('#stuNum').html(msg.data.stuNum);
        $('#stuAll').html(msg.data.stuAll);
    });
}
/*点击修改保存事件*/
function upInfo() {
	var tel = $('#schTel').val();
	tel = tel.split(",");
	var tel1 = tel[0];
	var tel2 = tel[1];
	var tel3 = tel[2];
	var schid = $('#campusId').html();
	var schname = $('#xiaoquName').val();
	var manager = $('#connect').val();
	var addr = $('#schAddr').val();
	var range = $('#jyfw').val();
	var des = $('#jgjj').val()
    if(tel==''||schname==''||manager==''||addr==''||range==''||des==''){
        alert("请输入完整!");
        return false;
    }
    var ext = '';
    var head = $("#studentImg").attr("src");
	if(head == ''||head == '../../public/img/campusLogo.jpg'){
		alert("请上传头像!");
		return false;
	}else{
		ext = head.split(",")[0].split("/")[1].split(";")[0];
		console.log(ext);
		head =head.split(",")[1];
		if(!head){
			head = '';
		}else{
			head = encodeURIComponent(head);
		}
	}
	var data ={
        "schid":parseInt(schid),
		"schname":schname,
		"manager":manager,
		"tel1":tel1,
		"tel2":tel2,
		"tel3":tel3,
		"addr":addr,
		"range":range,
		"des":des,
	}
	console.log(data);
    var token = window.sessionStorage.token; // todo 测试用token 正式 要在站点缓存取！
    var deal = "organization/modify?";
    var url = objKeySort(deal, data, token);
    console.log(url);
    ajax_post(url,"head="+head+"&ext="+ext, function(msg) {
        console.log(msg);
        if(msg.status == 0){
        	$('#musicIndexImg').attr("src",$("#studentImg").attr("src"));
        	$('#musicIndexName').html($('#xiaoquName').val());
        	$("#campus_main").find("input,textarea").prop("readonly", "readonly");
			$("#campus_main").find("input").addClass("noborderInput");
			$("#campus_main").find("textarea").addClass("noborderText");
			$("#xgzl").show();
			$("#updateLogo,.baocunquxiao,#imgInput").hide();
			setTimeout(function(){
				alert("编辑成功!");
			},200);
        }else{
            alert(msg.msg);
        }
    });

}

