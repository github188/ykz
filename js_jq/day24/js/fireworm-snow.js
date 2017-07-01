
//创建萤火虫和雪花父级
function FirewormSnow(){
	
	
}
//创建子节点
FirewormSnow.prototype.init = function(src){
	this.ele.src = src;
	this.ele.style.left = this.randomPoint().left+"px";
	
}

//运动
FirewormSnow.prototype.fly = function(){
	var that = this;
	animate(this.ele,this.randomPoint(),function(){
		that.fly();
	});
}

//随机位置
FirewormSnow.prototype.randomPoint = function(){
	var x = parseInt(Math.random()*document.documentElement.clientWidth);
	var y = parseInt(Math.random()*document.documentElement.clientHeight);
	return {left:x, top:y};
}

















