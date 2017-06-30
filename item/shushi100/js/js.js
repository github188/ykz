//顶部img关闭
$(function(){
	//窗口改变大小改变body宽度；
	window.onresize=function(){
		if($(window).width()<1200){
			$("body").width(1200);
		}
		else{
			$("body").width($(window).width());
		}
	};
	
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
	
	
	//顶部图片链接span关闭
	$("#top_banner>a>span").click(function(){
		$("#top_banner").css("display","none");
	})
	
	//商品导航栏鼠标移入效果
	$(".product-list li").mouseenter(function(){
		$(".product-list-right").eq($(this).index()).css("display","block")
	})
	$(".product-list li").mouseleave(function(){
		$(".product-list-right").eq($(this).index()).css("display","none")
	})
	$(".product-list-right").mouseenter(function(){
		$(this).css("display","block")
	})
	$(".product-list-right").mouseleave(function(){
		$(this).css("display","none")
	})
	
	
	//加载banner图
	$.ajax({
		type:"GET",
		url:"json/banner_images.json",
		async:false,
		success: function(d){
			var arr = d.banner1;
			for(var i=0; i<arr.length; i++){
				
				var obj = arr[i];
				var b = "style='background:url("+ obj.img +") center no-repeat'";
				$("<li><a href='#' "+ b +" ></a></li>").appendTo(".banner-list");
				
				$("<li></li>").appendTo(".icon");
				
			}
		},
		error: function(){
			console.log("error");
		}
	})
	
	$(".banner-list li").eq(0).clone(true).appendTo(".banner-list");
	
	var liLength = $(".banner-list li").length;
	var liWidth = $("body").width();
	$(".banner-list li").width(liWidth);
	$(".banner-list").css("width",liLength*liWidth);
	
	//banner轮播图运动
	$(".icon").css("margin-left",-($(".icon").width()-8)/2)
	var i=1
	var j=1
	$(".icon li").eq(j-1).addClass("active")
	var bannertimer = setInterval(function(){
		move()
	},2000)
	
	function move(){
		if(i>=liLength){
			$(".banner-list").css("left",0)
			i=1;
		}
		if(j>=liLength-1){
			j=0
		}
		$(".banner-list").animate({left:-liWidth*(i++)})
		
		$(".icon li").eq(j++).addClass("active").siblings("li").removeClass("active");
	}
	
	$(".icon li").mouseenter(function(){
		clearInterval(bannertimer)
		i=j=$(this).index();
		move();
	})
	
	$(".banner").mouseenter(function(){
		clearInterval(bannertimer)
	})
	
	$(".banner").mouseleave(function(){
		bannertimer = setInterval(function(){
			move()
		},2000)
	})
	
	//banner右侧导航底部轮播效果
	var e=1
	setInterval(function(){
		brmListmover();
	},2000)
	function brmListmover(){
		if(e>=$(".brm-bottom-list ul li").size()){
			$(".brm-bottom-list ul").css("top",0)
			e=1;
		}
		$(".brm-bottom-list ul").animate({top:-$(".brm-bottom-list ul li")
		.height()*e++})
	}
	
	//主体导航下划线运动
	var itemWidth = $(".main-nave ul li").width()+20
	$(".main-nave ul li").mouseenter(function(){
		var index = $(this).index();
		$(".bottom-item").animate({left:itemWidth*index+10},100)
	})
	
	//案例banner部分运动
	var caseLi = $(".case-right ul li").size()/3
	var a = 0
	$(".case-right ul").css("width",($(".case-right ul li").width()+10)*caseLi*3-caseLi*10);
	$(".case-right i:nth-of-type(1)").click(function(){
		a--;
		crmove();
	})
	
	$(".case-right i:nth-of-type(2)").click(function(){
		a++;
		crmove();
	})
	
	function crmove(){
		if(a >= caseLi){//右边界
			a = caseLi-1
		}
		if(a < 0){//左边界
			a = 0;
		}
		$(".case-right ul").animate({left:-$(".case-right").width()*a})
	}
	
	
	//商城商品获取
	var myArr = [];
	$.get("json/shopping-img.json",function(d){
		var arr = d;
		myArr = arr;
		
		for(var k=0;k<arr.length; k++){
			
			var obj = arr[k]
		
			for(var i=0; i<obj.shoppingBnner.length; i++){
				var bannerImg = obj.shoppingBnner[i].img
				$("<li><a href='javascript:;'><img src="+ bannerImg +" /></a></li>")
				.appendTo($(".sp-banner-img").eq(k));
				$("<li></li>").appendTo($(".sp-banner-list").eq(k));
	
			}
			$("<img src="+ obj.shoppinglist[1].img[1] +" />").appendTo($(".sp-img-left").eq(k).find("a"));
			$(".sp-img-left").eq(k).find("a").attr("href","details.html?id="+obj.shoppinglist[1].id+"&spIndex="+k)
			$("<img src="+ obj.shoppinglist[3].img[1] +" />").appendTo($(".sp-img-right").eq(k).find("a"));
			$(".sp-img-right").eq(k).find("a").attr("href","details.html?id="+obj.shoppinglist[3].id+"&spIndex="+k)
			$(".sp-banner-img").eq(k).width(($(".sp-banner-img").eq(k).find("li").width()+2)*obj.shoppingBnner.length);
			//$(".sp-banner-list").eq(k).width($());
			$(".sp-banner-list").eq(k).css("margin-left",-($(".sp-banner-list").eq(k).width()-8)/2);
			$(".sp-banner-list").eq(k).find("li").eq(0).addClass("active")
			
			//创建商品列表
			
			for(var j=0; j<obj.shoppinglist.length;j++){//创建列表节点
				var oList = obj.shoppinglist[j];
				
				$("<li><a href='javascript:;'><dl><dt></dt><dd></dd><dd><span></span><span></span></i></dd></dl></a></li>")
				.appendTo($(".sp-list").eq(k));
				$("<img src="+ oList.img[0] +" />").appendTo($(".sp-list").eq(k).find("dt").eq(j));
				$(".sp-list").eq(k).find("li").eq(j).find("dd").eq(0).html(oList.title);
				$(".sp-list").eq(k).find("li").eq(j).find("dd").eq(1).find("span").eq(1).html(oList.unit+oList.price);
			}
			
			
			//轮播图运动
			var f = obj.shoppingBnner.length
			lunbomove(k,f);
		}
		
		$(".sp-main>ul").width($(".sp-main").width()*arr.length)
		
	})
	
	//轮播效果
	function lunbomove(k,f){
		var a=1;
		var e=1;
		var degree = k
		var spbannerimer = setInterval(function(){
			shoppingmove()
			
		},2000)
		function shoppingmove(){
			if(a>=f){
				
				a=0;
			}
			if(e>=f){
				e=0;
			}
			$(".sp-banner-img").eq(degree).animate({left:-($(".sp-banner-img").eq(degree).find("li").width()+2)*(a++)})
			
			$(".sp-banner-list").eq(degree).find("li").eq(e++).addClass("active").siblings("li").removeClass("active");
		}
		$(".sp-banner-list").eq(degree).find("li").mouseenter(function(){
			clearInterval(spbannerimer)
			a=e=$(this).index();
			shoppingmove();
		})
		
		$(".sp-banner").eq(degree).mouseenter(function(){
			clearInterval(spbannerimer)
		})
		
		$(".sp-banner").eq(degree).mouseleave(function(){
			spbannerimer = setInterval(function(){
				shoppingmove()
			},2000)
		})
		
	}
	
	//点击商品列表头部sp-title下的span产生的效果
	var spIndex = 0;
	
	$(".sp-title").on("click","span",function(){
		
		var index = $(this).index();
		spIndex = index-1;
		console.log(spIndex)
		$(".sp-main>ul").animate({left:-$(".sp-main").width()*(index-1)})
		
		$(this).addClass("activer").siblings("span").removeClass("activer")
		$(this).find("i").css("display","block").parent().siblings("span").find("i")
		.css("display","none")
	})
	
	
	//点击商品进入详情页
	
	$(".sp-list").on("click","li",function(){

		var index = $(this).index();

		var id = myArr[spIndex].shoppinglist[index].id;
		location.href = "details.html?id="+id+"&spIndex="+spIndex;
	})
		
	//choose部分选择效果
	$(".choose ul li").mouseenter(function(){
		$(this).find("div").addClass("cover-box-enter").removeClass("cover-box")
		.animate({top:0},500);
	})
	$(".choose ul li").mouseleave(function(){
		$(this).find("div").addClass("cover-box").removeClass("cover-box-enter")
		.animate({top:227},400);
		
	})
	
	//friendly_linkd点击效果
	
	//链接点击效果
	$(".fl-title a").click(function(){
		var index = $(this).index()
		$(this).addClass("active").siblings().removeClass("active")
		$(".fl-id").find("div").eq(index).css("display","block").siblings().css("display","none")
	})
	
	//点击改变fl-id高度
	var fHeigth = 1;
	$(".fl-title i").click(function(){
		$(".fl-title i").css("background-position-y",6*fHeigth)
		fHeigth *=-1;
		if(parseInt($(".fl-id").height()) == 56){
			$(".fl-id").css("height","auto") ;
		}
		else{
			$(".fl-id").css("height","56") ;
		}
	})
	
	
	//footerlink点击效果
	$(".footerlink").find("i").click(function(){
		$("#footerlink-wrapper").animate({left:-$("body").width()},500,function(){
			$("#bottom_pic_wrap").animate({left:0},500)
		});
	})
	
	$("#bottom_pic_wrap").click(function(){
		$("#bottom_pic_wrap").animate({left:-$("#bottom_pic_wrap img").width()},500,function(){
			$("#footerlink-wrapper").animate({left:0},500)
		})
	})
	
	//侧边导航栏点击效果
	$("#right-nave").find("li").eq(5).click(function(){
		$("#right-nave").css("display","none")
		$("#right-nave-min").css("display","block")
	})
	$("#right-nave").find("li").eq(4).click(function(){
		$("html,body").animate({scrollTop:0});
	})
	$("#right-nave-min").find("li").eq(1).click(function(){
		$("#right-nave").css("display","block")
		$("#right-nave-min").css("display","none")
	})
	
	
	//控制底部信息栏显示
	$(window).scroll(function(){
		if($(window).scrollTop() >= 667){
			$("#footerlink-wrapper").css("display","block")
			$("#bottom_pic_wrap").css("display","block")
		}
		if($(window).scrollTop() <= 667){
			$("#footerlink-wrapper").css("display","none")
			$("#bottom_pic_wrap").css("display","none")
		}
	})
	
})
















