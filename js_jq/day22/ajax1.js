//创建对象
function createXHR(){
	if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}
	else{
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

/*
 ajax({
		type: "get",
		url: "http://60.205.181.47/myPHPCode2/checkname.php",
		data: {regname:"zhangsan", pwd:"123455"},
		async: true,
		
		success: function(){
			
		},
		error: function(){
			
		}
	})
 */
//封装ajax
function ajax(obj){
	var xhr = createXHR();
	var paramStr = getParamStr(date);
	if(obj.type.toLowerCase() == "get"){
		obj.url+= paramStr ? ("?"+paramStr) : "";
	}
	xhr.open(obj.type,obj.url,obj.async);
	
	if(obj.type.toLowerCase() == "get"){
		xhr.send(null);
	}
	else{
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(paramStr);
	}
	
	//接收数据
	if(obj.async){
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				callback();
			}
		}
	}
	else{
		callback();
	}
	function callback(){
		if(xhr.status == 200){
			if(obj.success){
				obj.success(xhr.responseText)
			}
			else if(obj.error){
				obj.error();
			}
		}
	}
}


//{regname:"zhangsan", pwd:"123455"} =>  "regname=zhangsan&pwd=123455"
function getParamStr(data){
	var arr = [];
	for(var key in date){
		var str = key + "=" + data[key];
		arr.push(str);
	}
	return arr.join("&");
}














