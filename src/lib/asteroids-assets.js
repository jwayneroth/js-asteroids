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


(lib.ship = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{active:0,blinking:10,run:31});

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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC66").ss(1,1,1).p("AgTBQIhQgoIABhPIBPgoIB3BPg");
	this.shape.setTransform(2.1,0);

	this.instance = new lib.ship_inner();
	this.instance.parent = this;
	this.instance.setTransform(2.2,0,1,1,0,0,0,10,8);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.instance}]},10).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},4).to({state:[{t:this.instance}]},13).wait(7));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10).to({_off:false},0).to({alpha:1},4).to({alpha:0},4).wait(13).to({alpha:1},0).wait(7));

	// Layer 7
	this.instance_1 = new lib.thrustparticle();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-14.3,3.1,0.4,0.4,-30,0,0,0.2,0.1);

	this.instance_2 = new lib.thrustparticle();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-12.8,0.6,0.449,0.449,44.9,0,0,-0.1,0.4);
	this.instance_2.alpha = 0.5;

	this.instance_3 = new lib.thrustparticle();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-12.4,-3.5,0.45,0.45,-90,0,0,0,0.5);

	this.instance_4 = new lib.thrustparticle();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-9.6,1.2,0.485,0.485,-45,0,0,0,0.3);
	this.instance_4.alpha = 0;

	this.instance_5 = new lib.thrustparticle();
	this.instance_5.parent = this;
	this.instance_5.setTransform(-10.7,-1.2,0.571,0.571,-45,0,0,0.1,0.4);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5,p:{alpha:0}},{t:this.instance_4,p:{alpha:0}},{t:this.instance_3,p:{alpha:1}},{t:this.instance_2,p:{alpha:0.5}},{t:this.instance_1,p:{alpha:1}}]},31).to({state:[{t:this.instance_5,p:{alpha:0.5}},{t:this.instance_4,p:{alpha:0.5}},{t:this.instance_3,p:{alpha:0.5}},{t:this.instance_2,p:{alpha:1}},{t:this.instance_1,p:{alpha:0.5}}]},2).to({state:[{t:this.instance_5,p:{alpha:1}},{t:this.instance_4,p:{alpha:1}},{t:this.instance_3,p:{alpha:0}},{t:this.instance_2,p:{alpha:0.5}},{t:this.instance_1,p:{alpha:0}}]},2).to({state:[{t:this.instance_5,p:{alpha:0.5}},{t:this.instance_4,p:{alpha:0.5}},{t:this.instance_3,p:{alpha:0.5}},{t:this.instance_2,p:{alpha:0}},{t:this.instance_1,p:{alpha:0.5}}]},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.8,-9,22,18);


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