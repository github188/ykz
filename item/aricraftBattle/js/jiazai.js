var jiaZai = {
	//属性
	ele:null,
	allBullet:{},
	allEnemy:{},
	allfire:{},//火力节点
	allscore:0,//总分数
	
	//方法
	//初始化游戏界面
	init: function(){
		jiaZai.ele = document.getElementById("mian");
		return this;
	},
	
	start: function(plane){
		//创建飞机
		myPlane.init(plane).move();
		//开火
		myPlane.fire();
		//背景图移动
		jiaZai.moveBackground()
		//创建敌机
		jiaZai.foundEnemy();
		//键盘事件
		jiaZai.listeningKeybord();
		//检测碰撞
		jiaZai.listeningCrash();
		//改变背景图
		jiaZai.changBg();
		
	},
	//背景图移动
	moveBackground: function(){
		var y = 0;
		setInterval(function(){
			
			jiaZai.ele.style.backgroundPositionY = y++ +"px";
			
		},50)
	},
	
	//创建敌机
	foundEnemy: function(){
		//创建大型飞机
		setInterval(function(){
			var flas = Math.random()>0.3 ? true : false;
			if(flas){
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_big);
				enemy.init().move();
			}
		},11000)
		//创建中型1飞机
		setInterval(function(){
			var flas = Math.random()>0.3 ? true : false;
			var a = Math.random()>0.5 ? Enemy.prototype.Enemy_Type_middle1 : Enemy.prototype.Enemy_Type_middle2;
			if(flas){
				var enemy = new Enemy(a);
				enemy.init().move();
			}
		},5000)
		//创建小型飞机
		setInterval(function(){
			var flas = Math.random()>0.5 ? true : false;
			if(flas){
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_small);
				enemy.init().move();
			}
		},1000)
	},
	
	//键盘监听事件
	listeningKeybord: function(){
		var speedx = 0;
		var speedy = 0;
		window.onkeydown = function(e){
			e = e || event;
			if(e.keyCode == 37){//向左
				speedx = -10;
			}
			if(e.keyCode == 38){//向上
				speedy = -10;
			}
			if(e.keyCode == 39){//向右
				speedx = 10;
			}
			if(e.keyCode == 40){//向下
				speedy = 10;
			}
		}
		window.onkeyup = function (){
			speedx = 0;
			speedy = 0;
		}
		setInterval(function(){
			var x = myPlane.ele.offsetLeft+ speedx;
			var y = myPlane.ele.offsetTop+ speedy;
			if(x<0){x = 0};
			if(x > jiaZai.ele.offsetWidth - myPlane.ele.offsetWidth){
				x = jiaZai.ele.offsetWidth - myPlane.ele.offsetWidth;
			}
			if(y <= 0){
				y = 0;
			}
			if( y >= jiaZai.ele.offsetHeight - myPlane.ele.offsetHeight){
				y = jiaZai.ele.offsetHeight - myPlane.ele.offsetHeight;
			}
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = y + "px";
			
		},40)
	},
	//检测碰撞
	listeningCrash: function(){
		setInterval(function(){//时时检测是否碰撞
			for(var i in jiaZai.allEnemy){//遍历所有敌机
				for(var j in jiaZai.allBullet){//遍历所有子弹
					if(isCrash(jiaZai.allBullet[j].ele,jiaZai.allEnemy[i].ele)){
						jiaZai.allBullet[j].bomb();//子弹爆炸；
						delete jiaZai.allBullet[j] //将子弹对象从allBullet中移除
						
						//扣血
						jiaZai.allEnemy[i].hurt();
					}
				}
				
				//自己的飞机和敌方飞机碰撞
				if(isCrash(jiaZai.allEnemy[i].ele ,myPlane.ele)){
					var over = document.createElement("di")
					jiaZai.ele.appendChild(over);
					over.className = "gameOvet";
					over.innerHTML = "Game Over"
					var score = document.createElement("div")
					jiaZai.ele.appendChild(score);
					score.className = "score";
					score.innerHTML = "总分数： "+jiaZai.allscore;
					
					//清除飞机
					jiaZai.ele.removeChild(myPlane.ele)
					
					var myName = prompt("您的总分数是:"+ jiaZai.allscore +", 请输入您的大名");
					if(myName){
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name:myName, score:jiaZai.allscore},
							async: true,
							
							success:function(data){
								
								//进入排行榜
								window.open("ranking.html");
								
							},
							error: function(){
								console.log("error");
							}
						})
					}
					
				}
				
			}
			
		},30)
	},
	
	//改变背景图
	changBg: function(){
		setTimeout(function(){
			jiaZai.ele.style.background = "url(images/bg2.jpg) repeat-y";
		},300000);
		setTimeout(function(){
			jiaZai.ele.style.background = "url(images/bg3.jpg) repeat-y";
		},600000)
		setTimeout(function(){
			jiaZai.ele.style.background = "url(images/bg4.jpg) repeat-y";
		},900000)
		setTimeout(function(){
			jiaZai.ele.style.background = "url(images/bg5.jpg) repeat-y";
		},1200000)
	}
}


































