$(function(){
	
	//改变登入状态下的头部欢迎栏
	arrName1();
	function arrName1(){
		var arrName = $.cookie("name");
		if(arrName){
			arrName = JSON.parse($.cookie("name"));
			$(".menu-center").html("<p>您好<span></span> 欢迎来到舒适100网！<span></span></p>")
			$(".menu-center p span").eq(0).html(arrName);
			$(".menu-center p span").eq(1).html("[注销]");
			
		}else{
			$(".menu-center").html("<p>您好<span></span> 欢迎来到舒适100网！<span></span></p><a href='logon.html'>[登录]</a><a href='register.html'>[注册]</a>")
		}
	}
	
	$(".menu-center p span").eq(1).click(function(){
		var arrName = $.cookie("name");
		if(arrName){
			arrName = "";
			$.cookie("name",arrName,{expires:30, path:"/"})
			arrName1();
		}
		
	})
	
	
	
	
	
	//控制商品下拉菜单显示隐藏
	var jr1 = false;
	var jr2 = false;
	var jr3 = false;
	$(".nave h2").mouseenter(function(){
		$(".product-list").css({"display":"block"});
		$(".j").css({"transform": "rotate(180deg)"});
		jr1 = false
	})
	
	$(".nave h2").mouseleave(function(){
		$(".product-list").css("display","none");
		jr1 = true;
		jrotate();
		
	})
	
	$(".product-list").mouseenter(function(){
		$(".product-list").css("display","block");
		$(".j").css({"transform": "rotate(180deg)"});
		jr2 = false;
	})
	
	$(".product-list").mouseleave(function(){
		$(".product-list").css("display","none")
		jr2 = true;
		jrotate()
	})
	$(".product-list-right").mouseenter(function(){
		$(this).css("display","block");
		$(".product-list").css("display","block");
		$(".j").css({"transform": "rotate(180deg)"});
		jr3 = false;
	})
	$(".product-list-right").mouseleave(function(){
		$(this).css("display","none");
		$(".product-list").css("display","none");
		jr3 = true;
		jrotate();
	})
	//选转下箭头图标
	function jrotate(){
		if(jr2==jr3==true){
			$(".j").css({"transform": "rotate(0deg)"});
		}
	}
	
	//窗口滚动商品导航栏固定在顶部
	var goods = $("#goods-detail-wrapper").offset().top
	$(window).scroll(function(){
		if($(window).scrollTop() >= goods){
			$("#goods-detail-wrapper").addClass("active1")
			
		}
		else if($(window).scrollTop() <= goods){
			$("#goods-detail-wrapper").removeClass("active1");
		}
	})
	
	
	//放大镜
	
	$(".sp-img dl dt").mouseenter(function(){
		$(".min-box").css("display","block");
		$(".big-box").css("display","block");
	})
	
	$(".sp-img dl dt").mouseleave(function(){
		$(".min-box").css("display","none");
		$(".big-box").css("display","none");
	})
	
	var dtTop = $(".sp-img dl dt").offset().top;
	var dtLeft = $(".sp-img dl dt").offset().left;
	
	//小区域面积
	$(".min-box").width($(".sp-img dl dt").width()*$(".big-box").width()/$(".big-box img").width());
	$(".min-box").height($(".sp-img dl dt").height()*$(".big-box").height()/$(".big-box img").height());
	
	//比例
	var scale = $(".big-box img").width()/$(".sp-img dl dt").width()
	
	$(".min-box").mousedown(function(e){
		e = e || event;
		var disX = e.offsetX;
		var disY = e.offsetY;
		$(".min-box").css("cursor","pointer")
		$(document).mousemove(function(e){
			
			e = e || event;
			var x = e.pageX - disX - dtLeft;
			var y = e.pageY - disY - dtTop;
			
			if(x<0){
				x=0;
			}
			if(x > $(".sp-img dl dt").width()-$(".min-box").width()){
				x = $(".sp-img dl dt").width()-$(".min-box").width()
			}
			if(y<0){
				y=0
			}
			if(y > $(".sp-img dl dt").height() - $(".min-box").height()){
				y = $(".sp-img dl dt").height() - $(".min-box").height()
			}
			
			$(".min-box").css({top:y,left:x})
			$(".big-box img").css({top:y*-scale,left:x*-scale})
		})
		$(document).mouseup(function(){
			$(document).off("mouseup")
			$(document).off("mousemove")
		})
	})
	
	
	
	//获取商品数据
	var oUrl = location.search;
	var params = oUrl.substring(oUrl.indexOf("?")+1);
	var arr1 = params.split("&")
	
	for(var x1=0; x1<arr1.length; x1++){
		var str = arr1[x1];
		var arr2 = str.split("=")
		if (arr2.length >= 2) {
			if (arr2[0] == "id") {
				var y1 = arr2[1];
			}
			else if (arr2[0] == "spIndex"){
				var z1 = arr2[1];
			}
		}
	}
	var myArr = []
	$.get("json/shopping-img.json",function(d){
		var arr = d[z1].shoppinglist;
		myArr = arr
		for(var i=0; i<arr.length; i++){
			var obj = arr[i];
			if(obj.id == y1){
				
				fn(obj);
			}
		}
	})
	function fn(obj){
		$("head title").html(obj.title2)
		$(".sp-img dl dt").find("img").attr("src",obj.img[0]);
		$(".sp-img dl dd ul li").find("img").attr("src",obj.img[0]);
		$(".big-box").find("img").attr("src",obj.img[0]);
		
		$(".details-text ul li").eq(0).find("h2").html(obj.title2)
		$(".details-text ul li").eq(0).find("p").html(obj.referral)
		
		$(".details-text ul li").eq(1).find("p").eq(0).html(obj.price+"元")
		
	}
	
	
	//商品购买数量
	var sum = 1;
	$(".amount a").eq(0).click(function(){
		sum++;
		$(".amount p").html(sum);
	})
	$(".amount a").eq(1).click(function(){
		sum--;
		if(sum <= 1){
			sum = 1
		}
		$(".amount p").html(sum);
		
	})
	
	//购物车加载cookie数据
	$(".buy").click(function(){
		location.href = "mycart.html"
	})
	
	
	$(".cart").click(function(){
		$(".cart-text").css("display","block")
		$(".cart-text").animate({left:340,top:40,opacity:0,fontSize:24},1000,function(){
			$(".cart-text").animate({left:300,top:61,opacity:100,fontSize:12},1)
				$(".cart-text").css("display","none")
		});
		
		pushCart();
		spNumber();
	})
	
	function pushCart(){
		var arrCart = $.cookie("cart")?JSON.parse($.cookie("cart")):[];
		
		var isExist = false;
		
		for(var j=0; j<arrCart.length; j++){
			if(arrCart[j].id == y1){
				arrCart[j].num += sum;
				isExist = true; 
			}
		}
		
		for(var i=0; i<myArr.length; i++){
			var obj = myArr[i];
			if(obj.id == y1 && isExist == false){
				obj.num = 1;
				obj.checked = true;
				arrCart.push(obj)
			}
		}
		$.cookie("cart",JSON.stringify(arrCart),{expires:30, path:"/"})
		console.log($.cookie("cart"))
	}
	
	//点击导航栏处购物车
	$(".shoppingcart").click(function(){
		
		$(".sc-text").css("display","block")
		$(".sc-text").animate({right:-50,top:-40,opacity:0,fontSize:24},1000,function(){
			$(".sc-text").animate({right:0,top:-18,opacity:100,fontSize:12},1)
				$(".sc-text").css("display","none")
		});
		
		
		pushCart();
		spNumber();
	})
	
	//改变头部购物车显示的商品种类数量
	spNumber();
	function spNumber(){
		var arr = $.cookie("cart");
		if(arr){
			
			arr = JSON.parse($.cookie("cart"))
		}
		
		$(".list li:nth-of-type(2)").find("span").html(arr.length);
		
	}
	
	
	//点击详情导航跳转页面
	
	$(".goods-detail-nav ul").on("click","a",function(){
		$(this).addClass("active").parent().siblings().find("a").removeClass("active")
		var index = $(this).parent().index();
		if(index == 0){
			$(window).scrollTop($(".details-main div").eq(index).offset().top)
		}
		else{
			$(window).scrollTop($(".details-main div").eq(index).offset().top-62)
		}
		
		console.log($(".details-main div").eq(index).offset().top)
		
	})
	$(window).scroll(function(){
		if($(window).scrollTop() >= $(".details-main div").eq(0).offset().top-62){
			$(".goods-detail-nav ul li a").eq(0).addClass("active").parent().siblings()
			.find("a").removeClass("active")
		}
		if($(window).scrollTop() >= $(".details-main div").eq(1).offset().top-62){
			$(".goods-detail-nav ul li a").eq(1).addClass("active").parent().siblings()
			.find("a").removeClass("active")
		}
		if($(window).scrollTop() >= $(".details-main div").eq(2).offset().top-62){
			$(".goods-detail-nav ul li a").eq(2).addClass("active").parent().siblings()
			.find("a").removeClass("active")
		}
		if($(window).scrollTop() >= $(".details-main div").eq(3).offset().top-62){
			$(".goods-detail-nav ul li a").eq(3).addClass("active").parent().siblings()
			.find("a").removeClass("active")
		}
	})
	

	
	
})




























