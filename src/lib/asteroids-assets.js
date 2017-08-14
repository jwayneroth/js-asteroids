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
	this.shape.setTransform(0,0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.thrustparticle, new cjs.Rectangle(-3.8,-2.3,7.6,4.8), null);


(lib.splinter = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC33").ss(2,1,1).p("AgNAAIAbAA");
	this.shape.setTransform(0,0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.splinter, new cjs.Rectangle(-2.4,-0.9,4.8,2), null);


(lib.ship_inner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("AhignIBPgoIB3BPIh3BQIhQgog");
	this.shape.setTransform(10,8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

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
	this.shape.setTransform(0.1,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.debris, new cjs.Rectangle(-15.2,-15,32.2,28.8), null);


(lib.asteroid = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("AmDjHIGJjIIEOBvIBzFXImBFZImMjIg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#111111").s().p("AmFDIIACmPIGJjIIEOBvIByFXImAFZg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.asteroid, new cjs.Rectangle(-40.1,-40.9,80.1,81.9), null);


(lib.alienLaser = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00FFCC").ss(1,1,1).p("AAAAjIgdgRIAAgjIAdgRIAeARIAAAjg");
	this.shape.setTransform(3,3.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#00FFCC").s().p("AgdASIAAgjIAdgRIAeARIAAAiIgeASg");
	this.shape_1.setTransform(3,3.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.alienLaser, new cjs.Rectangle(-1,-1,8.1,9), null);


(lib.alien = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("ABGATQgTAegygBQgxgBgVgcQAAghASgPQAVgTAeAAQAfAAAVATQASAPAAAhg");
	this.shape.setTransform(16.3,4.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#111111").s().p("AABAwQgxgBgVgcQAAghASgPQAVgTAeAAQAfAAAVATQASAPAAAhQgTAegvAAIgDgBg");
	this.shape_1.setTransform(16.3,4.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer 7
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#00CC66").ss(1,1,1).p("ACmgDQAAAZgxARQgwAThFAAQhEAAgwgTQgxgRAAgZQADgSAvgSQAxgSBDAAQBFAAAwASQAuARACATg");
	this.shape_2.setTransform(16.6,9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#111111").s().p("Ah0AoQgxgTAAgYQADgSAwgSQAwgSBEAAQBEAAAxASQAtARACATQgBAYgwATQgwAShFAAQhEAAgwgSg");
	this.shape_3.setTransform(16.6,9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer 8
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#00CC66").ss(1,1,1).p("AB/AAQgLAPgEAFQgHAIgPAHQgmAOg0AAQgzAAgmgOQgPgHgHgIQgHgKgIgKQAAgTAlgPQAkgOA1AAQA2AAAkAOQAlAPAAATg");
	this.shape_4.setTransform(16.6,12.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#111111").s().p("AhYAiQgQgGgHgHQgGgLgIgKQAAgTAlgPQAjgOA1AAQA1AAAlAOQAkAPABATIgQAVQgGAHgPAGQgmAPg0AAQgzAAglgPg");
	this.shape_5.setTransform(16.6,12.7);

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
	this.ship_inner.parent = this;
	this.ship_inner.setTransform(2.2,0,1,1,0,0,0,10,8);

	this.timeline.addTween(cjs.Tween.get(this.ship_inner).wait(10).to({alpha:0},0).to({alpha:1},4).to({alpha:0},4).wait(13).to({alpha:1},0).wait(7));

	// Layer 7
	this.instance = new lib.thrustparticle();
	this.instance.parent = this;
	this.instance.setTransform(-14.3,3.1,0.4,0.4,-30,0,0,0.2,0.1);

	this.instance_1 = new lib.thrustparticle();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-12.8,0.6,0.449,0.449,44.9,0,0,-0.1,0.4);
	this.instance_1.alpha = 0.5;

	this.instance_2 = new lib.thrustparticle();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-12.4,-3.5,0.45,0.45,-90,0,0,0,0.5);

	this.instance_3 = new lib.thrustparticle();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-9.6,1.2,0.485,0.485,-45,0,0,0,0.3);
	this.instance_3.alpha = 0;

	this.instance_4 = new lib.thrustparticle();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-10.7,-1.2,0.571,0.571,-45,0,0,0.1,0.4);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4,p:{alpha:0}},{t:this.instance_3,p:{alpha:0}},{t:this.instance_2,p:{alpha:1}},{t:this.instance_1,p:{alpha:0.5}},{t:this.instance,p:{alpha:1}}]},31).to({state:[{t:this.instance_4,p:{alpha:0.5}},{t:this.instance_3,p:{alpha:0.5}},{t:this.instance_2,p:{alpha:0.5}},{t:this.instance_1,p:{alpha:1}},{t:this.instance,p:{alpha:0.5}}]},2).to({state:[{t:this.instance_4,p:{alpha:1}},{t:this.instance_3,p:{alpha:1}},{t:this.instance_2,p:{alpha:0}},{t:this.instance_1,p:{alpha:0.5}},{t:this.instance,p:{alpha:0}}]},2).to({state:[{t:this.instance_4,p:{alpha:0.5}},{t:this.instance_3,p:{alpha:0.5}},{t:this.instance_2,p:{alpha:0.5}},{t:this.instance_1,p:{alpha:0}},{t:this.instance,p:{alpha:0.5}}]},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.3,-8.5,21,17);


// stage content:
(lib.asteroidsassets = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;
// library properties:
lib.properties = {
	width: 500,
	height: 500,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;