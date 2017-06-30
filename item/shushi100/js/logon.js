
$(function(){
	
	$(".but").click(function(){
		
		$.post("http://127.0.0.1/shushi100/php/logon.php",{username:$(".user").val(),pwd:$(".pwd").val()},function(a){
			
			var obj = JSON.parse(a);
			alert(obj.msg)
			
			var arrName = $(".user").val();
		
			$.cookie("name",JSON.stringify(arrName),{expires:30, path:"/"})
			location.href = "index.html";
		})
		
		
	})
	
})























