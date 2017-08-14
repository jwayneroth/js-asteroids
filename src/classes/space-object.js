export class SpaceObject {
	/*private var vx:Number;
	private var vy:Number;
	private var vr:Number;
	public var right:Number;
	public var bottom:Number;
	public var left:Number;
	public var top:Number;
	public var object:MovieClip;
	private var target:MovieClip;
	public var objectType:String = "object";*/

	constructor(clip = null, //:String, 
	            clipName = '', //:String, 
	            _targetClip = null, //:MovieClip, 
	            _right = 0, //:Number, 
	            _bottom = 0, //:Number,
	            xPos = 0, //:Number,
	            yPos = 0, //:Number
	) {
	
		target = _targetClip;
		object = target.attachMovie(clip, clipName, target.getNextHighestDepth());
		object._x = xPos;
		object._y = yPos;
		right = _right;
		bottom = _bottom;
		top = 0;
		left = 0;
		setVels();
	}
	
	run() {
		this.checkWalls(object);
	}
	
	checkWalls(clip) {
		if (clip._x > right + clip._width / 2) {
			clip._x = 0 - clip._width / 2;
		}
		if (clip._x < 0 - clip._width / 2) {
			clip._x = right + clip._width / 2;
		}
		if (clip._y > bottom + clip._height / 2) {
			clip._y = 0 - clip._height / 2;
		}
		if (clip._y < 0 - clip._height / 2) {
			clip._y = bottom + clip._height / 2;
		}
	}
	
	/*public function setX(xPos:Number) {
		object._x = xPos;
	}
	public function setY(yPos:Number) {
		object._y = yPos;
	}
	public function setScales(_scale:Number){
		object._xscale = object._yscale = _scale;
	}
	public function getX():Number {
		return object._x;
	}
	public function getY():Number {
		return object._y;
	}
	public function getWidth():Number {
		return object._width;
	}
	public function getHeight():Number{
		return object._height;
	}
	public function setRotation(rot:Number):Void {
		object._rotation = rot;
	}
	public function getRotation():Number {
		return object._rotation;
	}
	public function setVels(_vx:Number, _vy:Number, _vr:Number) {
		if (arguments.length > 0) {
			vx = _vx;
			vy = _vy;
			if (arguments.length == 3) {
				vr = _vr;
			}
		} else {
			vx = 0;
			vy = 0;
			vr = 0;
		}
	}
	public function kill() {

		delete object.onEnterFrame;
		//object._visible = false;
		object.removeMovieClip(this);
		//removeMovieClip(this.object);
	}
	private function setWalls(walls:MovieClip) {
		if (walls == _root) {
			trace("targetMC is set to ROOT!!!");
			right = Stage.width;
			bottom = Stage.height;
		} else {
			right = walls._width;
			bottom = walls._height;
			//right = 800;
			//bottom = 400;
		}
		left = 0;
		top = 0;
	}*/
}