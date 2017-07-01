
//创建雪花
function Snow(){
	this.ele = document.createElement("div");
}
Snow.prototype = new FirewormSnow();
Snow.prototype.init = function(src){
	FirewormSnow.prototype.init.call(this,src);
	this.ele.className = "box";
	this.ele.style.height = this.ele.style.width = parseInt(Math.random()*15) + "px";

	this.ele.style.top = 0+"px";
	document.body.appendChild(this.ele);
	return this;
}

Snow.prototype.fly = function(){
	var that = this;
	
	var tiemr2 = setInterval(function(){
		that.ele.style.top = that.ele.offsetTop + 3 +"px";
		that.ele.style.left = that.ele.offsetLeft + 1 +"px";
		if(that.ele.offsetTop >= document.documentElement.clientHeight || that.ele.offsetLeft >= document.documentElement.clientWidth){
			clearInterval(tiemr2);
			document.body.removeChild(that.ele);
			
		}
	},30)
	
	
}

var timer1 = setInterval(function(){
		var snow = new Snow();
		snow.init("images/snow.gif").fly()
},100)










