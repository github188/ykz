//飞机拖动

function Dragplane(){
	this.plane = document.createElement("div");
}
Dragplane.prototype.init = function(){
	var oBox = document.getElementById("banner");
	this.plane.className = "plane";
	this.plane.style.left = (oBox.offsetWidth - 49)/2 + "px";
	this.plane.style.bottom =  60 + "px";
	oBox.appendChild(this.plane);
	return this;
}






















