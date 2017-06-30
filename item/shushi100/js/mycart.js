

$(function(){
	
	//获取cookie数据创建节点
	refresh();
	function refresh(){
		var arr = $.cookie("cart");

		if(arr){//解析cookie
			arr = JSON.parse($.cookie("cart"))
			$("#nothing-wrapper").css("display","none")
			$(".shopping-list").css("display","block")
			$("#close").css("display","block")
		}
		else{
			$("#nothing-wrapper").css("display","block")
			$(".shopping-list").css("display","none")
			$("#close").css("display","none")
		}
		if(arr.length == 0){
			$("#nothing-wrapper").css("display","block")
			$(".shopping-list").css("display","none")
			$("#close").css("display","none")
		}
		
		//清空dl中的所有dd
		$(".shopping-list dd").remove(".content");
		
		//总价
		var total = 0; 
		var k = 0;//商品选中个数
		//遍历arr,创建节点
		for(var i=0; i<arr.length; i++){
			var obj = arr[i];
			//创建dd节点基本结构
			$("<dd class='content'><div class='top'></div><ul></ul><div class='bottom'></div></dd>")
			.appendTo($(".shopping-list"));
			
			//给top创建节点
			$("<i class='ip'></i><input type='checkbox' /><p></p>")
			.appendTo($(".content").eq(i).find(".top"))
			$(".top p").html("【套餐】"+obj.title2)
			
			//给ul创建子节点
			$("<li></li><li></li><li></li><li></li><li></li><li></li>")
			.appendTo($(".content").eq(i).find("ul"));
			
			//给li节点添加数据
			$("<a href= details.html?id="+ obj.id +"&spIndex="+ obj.spIndex +"><img src="+ obj.img[0] +" /></a>")
			.appendTo($(".content").eq(i).find("ul").find("li").eq(0));
			
			$("<a href= details.html?id="+ obj.id +"&spIndex="+ obj.spIndex +">"+ obj.referral +"</a>")
			.appendTo($(".content").eq(i).find("ul").find("li").eq(1));
			
			$(".content").eq(i).find("ul").find("li").eq(2).html(obj.price+".00元");
			
			$("<a href='javascript:;' class='subtract'>-</a><p>"+ obj.num +"</p><a href='javascript:;' class='push'>+</a>")
			.appendTo($(".content").eq(i).find("ul").find("li").eq(3));
			
			$(".content").eq(i).find("ul").find("li").eq(4).html(obj.price*obj.num+" 元");
			
			$("<a href='javascript:;' class='delete'>删除</a>")
			.appendTo($(".content").eq(i).find("ul").find("li").eq(5));;
			
			//给bottom添加节点
			$("<a href=’javascript:;'><i></i><span>套餐物料明细表</span></a><a href=’javascript:;'><i></i><span>工程安装服务协议</span></a>")
			.appendTo($(".content").eq(i).find(".bottom"))
			
			//计算总价
			
			
			if(obj.checked){
				k++;
				total += obj.price*obj.num
			}
			
			//改变选中状态
			if(obj.checked == false){
				$(".content").eq(i).find(".ip").css("background-position-x",-28);
				$(".content").eq(i).find(".ip").parent().find("input").removeAttr("checked");
			}
			else{
				$(".content").eq(i).find(".ip").css("background-position-x",0);
				$(".content").eq(i).find(".ip").parent().find("input").attr("checked","checked");
			}
			
		}
		
		
		$("#close strong").eq(0).find("span").html(arr.length);
		$("#close strong").eq(1).find("span").html(k);
		$("#close strong").eq(2).find("span").html(total+"<span>元</span>")
		
		//改变购物车后面的商品数量
		$(".list li:nth-of-type(2)").find("span").html(arr.length)
		
	}
	
	//点击删除商品
	$(".shopping-list").on("click",".delete",function(){
		var index = $(this).index(".delete");
		
		var arr = JSON.parse($.cookie("cart"));
		arr.splice(index,1);
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
		
	})
	
	//点击增加减少商品个数
	$(".shopping-list").on("click",".push",function(){
		
		var index = $(this).index(".push");
		var arr = JSON.parse($.cookie("cart"));
		arr[index].num++;
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
		
	})
	
	$(".shopping-list").on("click",".subtract",function(){
		
		var index = $(this).index(".subtract");
		var arr = JSON.parse($.cookie("cart"));
		console.log(arr[index].num)
		if(arr[index].num <= 1){
			arr[index].num == 1;
		}else{
			arr[index].num--;
		}
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
		
	})
	
	//改变选中状态
	$(".shopping-list").on("click",".ip",function(){
		var index = $(this).index(".ip");
		var arr = JSON.parse($.cookie("cart"));
		arr[index].checked = !arr[index].checked;	
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
		isAllChecked();
	})
	
	//判断是否全选
	isAllChecked();
	function isAllChecked(){
	
		var arr = JSON.parse($.cookie("cart"));
		var sum = 0
		
		for(var i=0; i<arr.length; i++){
			if(arr[i].checked){
				sum++;
			}
		}

		if(sum == arr.length){
			$(".shopping-list dt ul li").eq(0).find("i").css("background-position-x",0)
			$(".shopping-list dt ul li").eq(0).find("i").parent()
			.find("input").attr("checked","checked")
		}
		else{
			$(".shopping-list dt ul li").eq(0).find("i").css("background-position-x",-28)
			$(".shopping-list dt ul li").eq(0).find("i").parent()
			.find("input").removeAttr("checked")
		}
	}
	
	$(".shopping-list dt ul li").eq(0).find("i").click(function(){
		
		var arr = JSON.parse($.cookie("cart"));
		for(var i=0; i<arr.length; i++){
			arr[i].checked = !arr[i].checked
		}
		
		$.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
		refresh();
		isAllChecked();
		
	})
	
	
	
	
})


































































