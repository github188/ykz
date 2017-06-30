
//创建火力
function Bigfire(){
	this.ele = document.createElement("div");
	this.id = Math.random()*100000000;
	
	this.init = function(){
		jiaZai.ele.appendChild(this.ele);
		jiaZai.allfire[this.id] = this;
		this.ele.className = "bigfire";
		this.ele.style.left = jiaZai.ele.offsetWidth - this.ele.offsetWidth +"px";
		this.ele.style.top = -this.offsetHeight + "px";
		
		return this;
	};
	
	this.move = function(){
		var that = this;
		var xSpeed = Math.random()>0.5 ? -10 : 10;
		var ySpeed = 3;
		var timer = setInterval(function(){
			var x = that.ele.offsetLeft + xSpeed*-1
			if(x<0 || x>jiaZai.ele.offsetWidth - that.ele.offsetWidth){
				  xSpeed *= -1;
			}
			if(that.ele.offsetTop>jiaZai.ele.offsetHeight){
				clearInterval(timer);
				jiaZai.ele.removeChild(that.ele);
				delete jiaZai.allfire[that.id];
			}else{
				that.ele.style.left = x + "px" ;
				that.ele.style.top = that.ele.offsetTop + ySpeed + "px";
			}
		},40)
	}
}














