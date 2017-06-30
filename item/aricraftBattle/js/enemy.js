
function Enemy(type){
	this.ele = document.createElement("div");
	this.speed = 10; //敌机的速度；
	this.hp = 1; //敌机的血量;
	this.id = Math.random()*100000000;
	this.delimg = "";
	this.score = 10;
	//创建敌机节点
	this.init = function(){
		jiaZai.allEnemy[this.id] = this;
		jiaZai.ele.appendChild(this.ele);
		switch(type){
			case this.Enemy_Type_big: //大型飞机
			this.ele.className = "enemybig";
			this.speed = this.Enemy_Speed_big;
			this.hp = this.Enemy_Hp_big;
			this.delimg = "images/sj.png";
			this.score = 50;
			break;
			
			case this.Enemy_Type_middle1://中型1飞机
			this.ele.className = "enemymiddle1";
			this.speed = this.Enemy_Speed_middle1;
			this.hp = this.Enemy_Hp_middle1;
			this.delimg = "images/dfjbz.png";
			this.score = 25;
			break;
			
			case this.Enemy_Type_middle2://中型2飞机
			this.ele.className = "enemymiddle2";
			this.speed = this.Enemy_Speed_middle2;
			this.hp = this.Enemy_Hp_middle2;
			this.delimg = "images/dfjbz.png";
			this.score = 25;
			break;
			
			case this.Enemy_Type_small://小型飞机
			this.ele.className = "enemysmall";
			this.speed = this.Enemy_Speed_small;
			this.hp = this.Enemy_Hp_small;
			this.delimg = "images/ownbz.png";
			this.score = 10;
			break;
			
			default:
			console.log("error")
			break;
		}
		//位置
		this.ele.style.left = parseInt(Math.random()*(jiaZai.ele.offsetWidth - this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	//移动
	this.move = function(){
		var that = this;
		this.timer = setInterval(function(){
			var y = that.ele.offsetTop + that.speed;
			if(y > jiaZai.ele.offsetHeight){
				clearInterval(that.timer);
				jiaZai.ele.removeChild(that.ele);
				delete jiaZai.allEnemy[that.id];
			}
			else{
				that.ele.style.top = y + "px";
			}
		},40)
	};
	//掉血
	this.hurt = function(){
		this.hp--;
		if(this.hp == 0){
			this.bomb();
			jiaZai.allscore += this.score;
		}
	}
	this.bomb = function(){
		clearInterval(this.timer);
		this.ele.style.background = "url("+ this.delimg +") no-repeat";
		this.ele.style.backgroundSize = 100 +"%"+ " " + 100 +"%";
		var that = this;
		
		var deltimer = setInterval(function(){
			clearInterval(deltimer);
			jiaZai.ele.removeChild(that.ele);
			delete jiaZai.allEnemy[this.id];
		},300)
	}
	
}
Enemy.prototype = {
	Enemy_Type_big:1, //大型飞机
	Enemy_Type_middle1:2, //中型1飞机
	Enemy_Type_middle2:3, //中型2飞机
	Enemy_Type_small:4, //小型飞机
	
	Enemy_Speed_big:2, //大型飞机
	Enemy_Speed_middle1:5, //中型1飞机
	Enemy_Speed_middle2:5, //中型2飞机
	Enemy_Speed_small:8, //小型飞机
	
	Enemy_Hp_big:6, //大型飞机
	Enemy_Hp_middle1:3, //中型1飞机
	Enemy_Hp_middle2:3, //中型2飞机
	Enemy_Hp_small:1 //小型飞机
	
}





























