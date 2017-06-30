
//创建子弹
function Bullet(){
	this.ele = document.createElement("div");
	this.id = Math.random()*1000000000;
	
	this.init = function(){
		jiaZai.allBullet[this.id] = this;
		jiaZai.ele.appendChild(this.ele);
		this.ele.className = "bullet1";
		this.ele.style.left = myPlane.ele.offsetLeft + (myPlane.ele.offsetWidth - this.ele.offsetWidth)/2 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	};
	this.move = function(){
		var that = this;
		this.timer = setInterval(function(){
			var y = that.ele.offsetTop - 10;
			if(y < -that.ele.offsetHeight){
				clearInterval(that.timer);
				jiaZai.ele.removeChild(that.ele);
				delete jiaZai.allBullet[that.id];
			}
			else{
				that.ele.style.top = y + "px";
			}
		},30)
	};
	
	//爆炸
	this.bomb = function(){
		clearInterval(this.timer);
		this.ele.className = "bomb";
		this.ele.style.left = myPlane.ele.offsetLeft + (myPlane.ele.offsetWidth - this.ele.offsetWidth)/2 + "px";
		
		var that = this;
		var deltimer = setInterval(function(){
			clearInterval(deltimer);
			jiaZai.ele.removeChild(that.ele);
			delete jiaZai.allBullet[that.id];
		},400)
		
	}
}





















