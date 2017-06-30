
$(function(){
	//随机生成4位数验证码
	function randomNumber(){
		var newNumber = "";
		function j(){
		   var n = parseInt(Math.random()*62);
		   if(n<10){
		   		return n;
		   } 
		   if(10 <= n && n < 36){//A-Z
		   	return String.fromCharCode(n+55)
		   } 
		   if(n >= 36){//a-z
		   		return String.fromCharCode(n+61)
		   	}
			   
		}
		for(var i=0; i<4; i++){
			newNumber += j();
		}
		return newNumber;
	}
	
	$(".box").eq(1).find("input").eq(1).val(randomNumber());
	
	
	
	var flag1 = false;
	
	//验证手机号是否合法
	
	$(".box").eq(0).find("input").keyup(function(){
		var value = $(this).val();
		var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[05-9]))\d{8}$/;
		if (reg.test(value)){
			$(".box").eq(0).find("p").html("");
			flag1 = true;
		}
		else {
			$(".box").eq(0).find("p").html("手机号不合法");
			flag1 = false;
		}
	})
	
	//验证验证码合不合法
	var flag2 = false;
	$(".box").eq(1).find("input").eq(0).keyup(function(){
		fn();
	})
	
	//点击生成验证码
	$(".box").eq(1).find("input").eq(1).click(function(){
		$(".box").eq(1).find("input").eq(1).val(randomNumber());
		fn();
	})
	
	//验证验证码是否一致
	function fn(){
		if ($(".box").eq(1).find("input").eq(0).val() == $(".box").eq(1).find("input").eq(1).val()){
			$(".box").eq(1).find("p").html("");
			flag2 = true;
		}
		else {
			$(".box").eq(1).find("p").html("验证码不合法");
			flag2 = false;
		}
	}
	
	
	//验证密码是否一致
	
	var flag4 = false;
	$(".box").eq(2).find("input").keyup(function(){
		var value = $(this).val();
		var reg = /^.{6,20}$/;
		if (reg.test(value)){
			$(".box").eq(2).find("p").html("");
			flag4 = true;
		}
		else{
			$(".box").eq(2).find("p").html("密码不合法");
			flag4 = false;
		}
		if(value.length>20){
			$(".box").eq(2).find("p").html("密码长度不能超过20");
			flag4 = false;
		}
	})
	
	var flag5 = false;
	$(".box").eq(3).find("input").keyup(function(){
		var value = $(this).val();
		
		if(value == $(".box").eq(2).find("input").val()){
			
			$(".box").eq(3).find("p").html("")
			flag5 = true;
		}
		else{
			$(".box").eq(3).find("p").html("密码不一致");
			flag5 = false;
		}
	})
	
	$(".checked").click(function(){
		if(!$(this).prop("checked")){
			$(".sub").attr("disabled","disabled");
			$(".sub").css("background","#dddddd");
		}
		else{
			$(".sub").removeAttr("disabled");
			$(".sub").css("background","#ff5500");
		}
	})
	
	$(".sub").click(function(){
		
		if(flag1&&flag2&&flag4&&flag5){	
			$.post("http://127.0.0.1/shushi100/php/register.php",{username:$(".box").eq(0).find("input").val(),pwd:$(".box").eq(2).find("input").val(),nickname:$(".box").eq(3).find("input").val()},function(a){
				var obj = JSON.parse(a);
				alert(obj.msg);
				
				var arrName = $(".box").eq(0).find("input").val();
		
				$.cookie("name",JSON.stringify(arrName),{expires:30, path:"/"})
				
				location.href = "index.html";
			})
			
			
		}
		else if(!flag1){
			$(".box").eq(0).find("p").html("手机号不合法");
		}
		else if(!flag2){
			$(".box").eq(1).find("p").html("验证码不合法");
		}
		else if(!flag4){
			$(".box").eq(2).find("p").html("密码不合法");
		}
		else if(!flag5){
			$(".box").eq(3).find("p").html("密码不一致");
		}
	})
	
	
})

































