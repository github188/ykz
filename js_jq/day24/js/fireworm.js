//创建萤火虫
function Fireworm(){
	this.ele = document.createElement("img");
}
Fireworm.prototype = new FirewormSnow();
Fireworm.prototype.init = function(src){
	FirewormSnow.prototype.init.call(this,src);
	this.ele.style.top = this.randomPoint().top+"px";
	document.body.appendChild(this.ele);
	return this;
}

var cont = 20;
var timer = setInterval(function(){
	cont--
	if( cont > 0){
		var firewom = new Fireworm();
		firewom.init("images/1.jpg").fly();
	}
	else{
		clearInterval(timer);
	}
},1000)





