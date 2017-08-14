import {SpaceObject} from './space-object'

let thrust //:Number;
let friction //:Number;
let active = false //:Boolean = false;
let makeAliveID //:Number;

class Ship extends SpaceObject {

	constructor(clip = null, //:String,
	            clipName = null, //:String,
	            target = null, //:MovieClip,
	            _right = 0, //:Number,
	            _bottom = 9, //:Number,
	            xPos = 0, //:Number,
	            yPos = 0, //:Number,
	            thrustIn = 0, //:Number,
	            frictionIn = 0, //:Number
	) {
		super(clip ,clipName, target, _right, _bottom, xPos, yPos)
		/*object._alpha = 0;
		thrust = thrustIn;
		friction = frictionIn;
		registerShip();
		setVels(0,0,10);*/
	}
	
	/*private function shipRun() {
		var ship:Ship = this;
		object.onEnterFrame = function() {
			if (Key.isDown(Key.LEFT)) {
				this._rotation -= ship.vr;
			} else if (Key.isDown(Key.RIGHT)) {
				this._rotation += ship.vr;
			}
			if (Key.isDown(Key.UP)) {
				var radians:Number = this._rotation * Math.PI / 180;
				var ax:Number = Math.cos(radians) * ship.thrust;
				var ay:Number = Math.sin(radians) * ship.thrust;
				ship.vx += ax;
				ship.vy += ay;
				if(this._currentFrame == 1){
					this.gotoAndPlay("run");
				}
			}else if(ship.active){
				this.gotoAndStop("active");
			}
			ship.vx *= ship.friction;
			ship.vy *= ship.friction;
			this._x += ship.vx;
			this._y += ship.vy;
			ship.checkWalls(this);
		};
	}
	public function getActive():Boolean{
		return this.active;
	}
	public function makeActive(){
		this.object._alpha = 100;
		//this.active = true;
		//this.object.gotoAndStop("active");
		this.object.gotoAndPlay('blinking');
		shipRun();
		clearInterval(makeAliveID);
		makeAliveID = setInterval(this,"makeAlive",3000);
		//trace("SHIP NOW ACTIVE!!");
	}
	private function makeAlive()
	{
		this.object.gotoAndStop("active");
		clearInterval(makeAliveID);
		this.active = true;
	}
	
	public function getPointX():Number{
		var rad:Number = object._rotation * Math.PI/180;
		var pointX:Number = object._x + Math.cos(rad) * 20;
		return pointX;
	}
	public function getPointY():Number{
		var rad:Number = object._rotation * Math.PI/180;
		var pointY:Number = object._y + Math.sin(rad) * 20;
		return pointY;
	}
	public function makeInactive(){
		this.active = false;
		this.object.gotoAndPlay(1);
		//trace("SHIP NOW INACTIVE!!");
	}
	public function kill() {
		delete object.onEnterFrame;
		//object._visible = false;
		removeMovieClip(object);
		//removeMovieClip(this.object);
	}
	private function registerShip() {
		Key.addListener(this);
	}*/
}
