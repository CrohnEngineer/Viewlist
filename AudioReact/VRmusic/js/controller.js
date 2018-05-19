function Controller(fn){
	this.aa=new AudioAnalyzer(fn,32);	
	this.vr=new videoRender(this.aa.fftSize/2/this.aa.bandRatio,4);
	this.connections=[];
	this.playing=false;
	bind(this, ["update","onkeypress","freqToAngle","play","playPause"]);
	//this.aa.el.onplay=this.update;
	//this.connect([this.aa.getEnergy,Math.sqrt, Math.sqrt,this.vr.setCylinderRadius]);
	//this.connect([this.aa.getEnergy,Math.sqrt, Math.sqrt,shadeOfRed,this.vr.setCylinderColor]);
	this.connect([this.aa.getNormBands, this.vr.setRoundCylindersHeight]);
	this.connect([this.aa.getNormBands, valuesToVUMeterColors,this.vr.setRoundCylindersColor]);
	this.connect([this.aa.getCentroid, this.freqToAngle, this.vr.setPointerCentr]);
	this.connect([this.aa.getEnergy, Math.sqrt,Math.sqrt, Math.sqrt,this.vr.setEnergyFloor]);

	this.vr.scene.addEventListener("enter-vr",this.play);
	document.getElementById("playPause").addEventListener('onclick',this.playPause);
	//this.update();
}
var vr;

Controller.prototype={
	play_:function(){
		//alert("hey");
		console.log("play");
		document.getElementById("playPause").style.display="none";
		this.aa.el.play();
		this.playing=true;
		navigator.getVRDisplays().then(
				function(displays){
					if(displays.length>0){
					vr=displays[0]; 
					vr.requestAnimationFrame(C.update);}
					else{vr=null; requestAnimationFrame(C.update);}
				}
			);

	},
	pause:function(){
		this.aa.el.pause();
		this.playing=false;
	},	
	playPause_:function(){
		console.log("touched");
		if(this.playing){this.aa.el.pause();}
		else{this.aa.el.play();}
	},	
	stop:function(){
		this.pause()
		this.aa.el.currentTime=0;
		//this.playing=false;		
		this.reset();
	},
	reset:function(){
		this.aa.reset();
		this.executeConnections()
	},
	executeConnections:function(){
		for(var c=0;c<this.connections.length; c++){
			var funcs=this.connections[c];
			var func=funcs[0];
			var value=func();
			for(var f=1;f<funcs.length; f++){				
				func=funcs[f];
				try{
					value=func(value);
				}
				catch(e){
					break
				}
			}
		}

	},
	update_:function(){
		if(this.playing){//if(!this.aa.el.paused){//
			
			//console.log("udpating");
			this.aa.update();
			//console.log("audio updated");
			this.executeConnections();	
			//console.log("connections");	
			
			if(vr!=null){
				vr.requestAnimationFrame(this.update);
			}
			else{requestAnimationFrame(this.update);}
			//console.log(this.playing);
		}
	},
	connect:function(funcs){
		this.connections.push(funcs);
	},
	onkeypress_:function(event){
		console.log(event);
		if(event.key==' ' && this.playing){
			C.pause();
		}
		else if(event.key==' ' && !this.playing){
			C.play();
		}
		else if(event.key=='p'){
			C.stop();
		}

	},
	freqToAngle_:function(value){
		return 2*value*Math.PI/this.aa.sampleRate;
	},

}

var fn="https://p.scdn.co/mp3-preview/720ea6159159533bccf1ba5023a8bee737b4e1b8?cid=774b29d4f13844c495f206cafdad9c86";//'sff.mp3';//
var C;


window.addEventListener('load', init, false);

function init() {
  C= new Controller(fn);    
  console.log('creating');
  document.onkeypress=C.onkeypress;
}
