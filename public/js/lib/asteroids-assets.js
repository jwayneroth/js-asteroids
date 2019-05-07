(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.thrustparticle = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC33").ss(4.8,1,1).p("AgNAAIAbAA");
	this.shape.setTransform(-0.05,0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.thrustparticle, new cjs.Rectangle(-3.8,-2.3,7.6,4.8), null);


(lib.splinter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC33").ss(2,1,1).p("AgNAAIAbAA");
	this.shape.setTransform(-0.05,0.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.splinter, new cjs.Rectangle(-2.4,-0.9,4.8,2), null);


(lib.ship_inner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(2,1,1).p("AhignIBPgoIB3BPIh3BQIhQgog");
	this.shape.setTransform(9.975,8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AhjAoIABhPIBPgoIB3BPIh3BQg");
	this.shape_1.setTransform(9.975,8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.ship_inner, new cjs.Rectangle(-1,-1,22,18), null);


(lib.laser = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00FF99").ss(1,1,1).p("AAoAAIhPAA");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.laser, new cjs.Rectangle(-5,-1,10,2), null);


(lib.debris = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("AAAhPIBPBPIhPBQIhOgoIAAhPg");
	this.shape.setTransform(0.075,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.debris, new cjs.Rectangle(-15.2,-15,32.2,28.8), null);


(lib.asteroid = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("AmDjHIGJjIIEOBvIBzFXImBFZImMjIg");
	this.shape.setTransform(-0.05,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AmFDIIACmPIGJjIIEOBvIByFXImAFZg");
	this.shape_1.setTransform(-0.05,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.asteroid, new cjs.Rectangle(-40.1,-40.9,80.1,81.9), null);


(lib.alienLaser = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00FFCC").ss(1,1,1).p("AAAAjIgdgRIAAgjIAdgRIAeARIAAAjg");
	this.shape.setTransform(3.025,3.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00FFCC").s().p("AgdASIAAgjIAdgRIAeARIAAAiIgeASg");
	this.shape_1.setTransform(3.025,3.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.alienLaser, new cjs.Rectangle(-1,-1,8.1,9), null);


(lib.alien = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("ABGATQgTAegygBQgxgBgVgcQAAghASgPQAVgTAeAAQAfAAAVATQASAPAAAhg");
	this.shape.setTransform(16.275,4.8516);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AABAwQgxgBgVgcQAAghASgPQAVgTAeAAQAfAAAVATQASAPAAAhQgTAegvAAIgDgBg");
	this.shape_1.setTransform(16.275,4.8516);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer 7
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#00CC66").ss(1,1,1).p("ACmgDQAAAZgxARQgwAThFAAQhEAAgwgTQgxgRAAgZQADgSAvgSQAxgSBDAAQBFAAAwASQAuARACATg");
	this.shape_2.setTransform(16.55,9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("Ah0AoQgxgTAAgYQADgSAwgSQAwgSBEAAQBEAAAxASQAtARACATQgBAYgwATQgwAShFAAQhEAAgwgSg");
	this.shape_3.setTransform(16.55,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer 8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#00CC66").ss(1,1,1).p("AB/AAQgLAPgEAFQgHAIgPAHQgmAOg0AAQgzAAgmgOQgPgHgHgIQgHgKgIgKQAAgTAlgPQAkgOA1AAQA2AAAkAOQAlAPAAATg");
	this.shape_4.setTransform(16.55,12.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AhYAiQgQgGgHgHQgGgLgIgKQAAgTAlgPQAjgOA1AAQA1AAAlAOQAkAPABATIgQAVQgGAHgPAGQgmAPg0AAQgzAAglgPg");
	this.shape_5.setTransform(16.55,12.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.alien, new cjs.Rectangle(-1,-1,35.1,19.6), null);


(lib.ship = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{active:0,blinking:10,off:19,run:31});

	// timeline functions:
	this.frame_0 = function() {
		this.stop()
	}
	this.frame_18 = function() {
		this.gotoAndPlay('blinking')
	}
	this.frame_37 = function() {
		this.gotoAndPlay(0)
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(18).call(this.frame_18).wait(19).call(this.frame_37).wait(1));

	// Layer 4
	this.ship_inner = new lib.ship_inner();
	this.ship_inner.name = "ship_inner";
	this.ship_inner.parent = this;
	this.ship_inner.setTransform(2.15,0,1,1,0,0,0,10,8);

	this.timeline.addTween(cjs.Tween.get(this.ship_inner).wait(10).to({alpha:0},0).to({alpha:1},4).to({alpha:0},4).wait(13).to({alpha:1},0).wait(7));

	// Layer 7
	this.tp2 = new lib.thrustparticle();
	this.tp2.name = "tp2";
	this.tp2.parent = this;
	this.tp2.setTransform(-14.35,3.1,0.4,0.4,-30,0,0,0.2,0.1);

	this.tp3 = new lib.thrustparticle();
	this.tp3.name = "tp3";
	this.tp3.parent = this;
	this.tp3.setTransform(-12.85,0.6,0.4492,0.4492,44.9064,0,0,-0.1,0.4);
	this.tp3.alpha = 0.5;

	this.tp1 = new lib.thrustparticle();
	this.tp1.name = "tp1";
	this.tp1.parent = this;
	this.tp1.setTransform(-12.4,-3.5,0.45,0.45,-89.9883,0,0,0,0.5);

	this.tp5 = new lib.thrustparticle();
	this.tp5.name = "tp5";
	this.tp5.parent = this;
	this.tp5.setTransform(-9.65,1.15,0.4848,0.4848,-45,0,0,0,0.3);
	this.tp5.alpha = 0;

	this.tp4 = new lib.thrustparticle();
	this.tp4.name = "tp4";
	this.tp4.parent = this;
	this.tp4.setTransform(-10.75,-1.25,0.5714,0.5714,-45,0,0,0.1,0.4);
	this.tp4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.tp4,p:{alpha:0}},{t:this.tp5,p:{alpha:0}},{t:this.tp1,p:{alpha:1}},{t:this.tp3,p:{alpha:0.5}},{t:this.tp2,p:{alpha:1}}]},31).to({state:[{t:this.tp4,p:{alpha:0.5}},{t:this.tp5,p:{alpha:0.5}},{t:this.tp1,p:{alpha:0.5}},{t:this.tp3,p:{alpha:1}},{t:this.tp2,p:{alpha:0.5}}]},2).to({state:[{t:this.tp4,p:{alpha:1}},{t:this.tp5,p:{alpha:1}},{t:this.tp1,p:{alpha:0}},{t:this.tp3,p:{alpha:0.5}},{t:this.tp2,p:{alpha:0}}]},2).to({state:[{t:this.tp4,p:{alpha:0.5}},{t:this.tp5,p:{alpha:0.5}},{t:this.tp1,p:{alpha:0.5}},{t:this.tp3,p:{alpha:0}},{t:this.tp2,p:{alpha:0.5}}]},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.2,-9,29.299999999999997,18);


// stage content:
(lib.asteroidsassets = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);
// library properties:
lib.properties = {
	id: 'F6FDBA2BCF6A4601AD54B5D2634A1184',
	width: 500,
	height: 500,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['F6FDBA2BCF6A4601AD54B5D2634A1184'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;