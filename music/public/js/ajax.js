function ajax_public(url,callback) {
	$("#loading").show();
	setTimeout(function(){
		$("#loading").hide();
	},300);
    $.ajax({
        type: "get",
        url: encodeURI(url),
        dataType: "json",
        success: function(msg) {
            callback(msg);
        },
        error:function(msg){
            console.log(msg);
            console.log("链接网络错误,请稍后再试!");
        }
    });
}

function ajax_post(url,data,callback) {
	$("#loading").show();
	setTimeout(function(){
		$("#loading").hide();
	},300);
    $.ajax({
        type: "Post",
        url: encodeURI(url),
        cache: false,
        data:data,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function(msg) {
            callback(msg);
        },
        error:function(msg){
            console.log(msg);
            console.log("链接网络错误,请稍后再试!");
        }
    });
}


/**
 * 生成url通用方法
 * @param1 deal  String       接口协议
 * @param2 arys  Object       参数对象
 * @param3 token String       Token
 */
function objKeySort(deal,arys,token) {
    var host = 'http://106.15.53.15:8090/';  //eg: deal = "account/login?';
    var head = host += deal;

    //必须参数
    var must ={
        'from':1,
        'uid':parseInt(window.sessionStorage.uid),
        'time': (new Date()).getTime(),
        'type':parseInt(window.sessionStorage.type),
    };
    arys =$.extend(must,arys);

    var string =String();
    var params =String();
    var url =String();
    var newkey = Object.keys(arys).sort();
    var newObj = {};
    for(var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        if(typeof (arys[newkey[i]]) == "object"){
        	arys[newkey[i]] = JSON.stringify(arys[newkey[i]]).replace(/&/g,'');
        }else if(typeof (arys[newkey[i]]) == "string"){
        	arys[newkey[i]] = arys[newkey[i]].replace(/&/g,'');
        }
        string += arys[newkey[i]];
        // console.log(newkey[i]);
        params  +=(newkey[i] + '=' +arys[newkey[i]] +'&') ;

    }
    var sign = string +token;
    sign = 'sign=' + $.md5(sign);
    url = head + params + sign;   //url = 主机名 + 接口协议(与服务器一起来定) + 加密签名（sign） + 所有参数
    return url;
}
