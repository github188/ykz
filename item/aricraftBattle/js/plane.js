
//创建飞机
var myPlane = {
	ele:null,
	fireInterval: 500,//子弹创建速度
	init: function(plane){
		this.ele = document.createElement("div");
		jiaZai.ele.appendChild(this.ele);
		this.ele.className = "myplane";
		this.ele.style.background = "url(images/own"+ plane +".png)"
		this.ele.style.top = jiaZai.ele.offsetHeight - this.ele.offsetHeight + "px";
		this.ele.style.left = (jiaZai.ele.offsetWidth - this.ele.offsetWidth)/2 + "px";	
		return this;
	},
	
	//移动
	move: function(){
		this.ele.onmousedown = function(e){
			e = e || event;
			var disx = e.offsetX;
			var disy = e.offsetY;
			
			document.onmousemove = function(e){
				e = e || event;
				var x = e.pageX - disx - jiaZai.ele.offsetLeft;
				if(x < 0){
					x = 0;
				};
				if(x > jiaZai.ele.offsetWidth - myPlane.ele.offsetWidth){
					x = jiaZai.ele.offsetWidth - myPlane.ele.offsetWidth
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = e.pageY - disy + "px";
				
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	//开火
	fire: function(){
		setInterval(function(){
		
			var bullet = new Bullet();
			bullet.init().move();
		
		},myPlane.fireInterval)
	}
}






















