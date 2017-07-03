

//子弹Bullet
class Bullet{
	constructor(){
		[this.ele,this.id]= [document.createElement("div"), parseInt(Math.random()*100000000)];
	}
	
	//方法init
	init(){
		//添加
		gameEngine.allBullet[this.id] = this;
		//console.log( gameEngine.allBullet );
		
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "bullet";
		
		//结构赋值
		let [a,b] = [ myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px",myPlane.ele.offsetTop - this.ele.offsetHeight + "px"]
		
		this.ele.style.left = a;
		this.ele.style.top = b;
		return this;
	};
	
	//方法move
	move(){
		let that = this;
		this.timer = setInterval(()=>{
		let y = that.ele.offsetTop - 10;
		if (y < -18) {
				clearInterval(that.timer); //停止移动
				gameEngine.ele.removeChild(that.ele); //移除子弹
				
				//删除
				delete gameEngine.allBullet[that.id];
			}
			else {
				that.ele.style.top = y + "px"; //移动
			}
		}, 50);
	};
	
	//爆炸
	boom(){
		clearInterval(this.timer); //停止移动
		
		this.ele.className = "bullet-die";
		
		const dieImgs = ["images2/die1.png", "images2/die2.png"]; 
		
		//结构赋值
		let [that,i] = [this,0];
		
		
		let dieTimer = setInterval(()=>{
			if (i >= 1){
				clearInterval(dieTimer); //停止爆炸
				gameEngine.ele.removeChild(that.ele); //移除子弹
			}else {
				that.ele.style.background = "url("+ dieImgs[++i] +") no-repeat";
			}
		}, 100);
	}
	
}







////子弹Bullet
//function Bullet(){
//	//属性ele
//	this.ele = document.createElement("div");
//	this.id = parseInt(Math.random()*100000000);
//	
//	//方法init
//	this.init = ()=>{
//		
//		//添加
//		gameEngine.allBullet[this.id] = this;
//		//console.log( gameEngine.allBullet );
//		
//		gameEngine.ele.appendChild(this.ele);
//		this.ele.className = "bullet";
//		
//		//结构赋值
//		let [a,b] = [ myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2 + "px",myPlane.ele.offsetTop - this.ele.offsetHeight + "px"]
//		
//		this.ele.style.left = a;
//		this.ele.style.top = b;
//		return this;
//	}
//	
//	//方法move
//	this.move = ()=>{
//		let that = this;
//		this.timer = setInterval(()=>{
//		let y = that.ele.offsetTop - 10;
//		if (y < -18) {
//				clearInterval(that.timer); //停止移动
//				gameEngine.ele.removeChild(that.ele); //移除子弹
//				
//				//删除
//				delete gameEngine.allBullet[that.id];
//			}
//			else {
//				that.ele.style.top = y + "px"; //移动
//			}
//		}, 50);
//	}
//	
//	
//	
//	
//	//爆炸
//	this.boom = ()=>{
//		clearInterval(this.timer); //停止移动
//		
//		this.ele.className = "bullet-die";
//		
//		const dieImgs = ["images2/die1.png", "images2/die2.png"]; 
//		
//		//结构赋值
//		let [that,i] = [this,0];
//		
//		
//		let dieTimer = setInterval(()=>{
//			if (i >= 1){
//				clearInterval(dieTimer); //停止爆炸
//				gameEngine.ele.removeChild(that.ele); //移除子弹
//			}else {
//				that.ele.style.background = "url("+ dieImgs[++i] +") no-repeat";
//			}
//		}, 100);
//	}
//	
//}

