export default class SpaceObject {
	constructor(clip, _right, _bottom, xPos, yPos) {
		
		clip.x = xPos
		clip.y = yPos
		
		this.clip = clip
		this.right = _right
		this.bottom = _bottom
		this.top = 0
		this.left = 0
		
		//clip.cache(clip.nominalBounds.x, clip.nominalBounds.y, clip.nominalBounds.width, clip.nominalBounds.height, 1);
		
		this.setVels()
		this.setBounds()
	}
	
	setBounds() {
		this.bounds = this.clip.nominalBounds
	}
	
	setVels(_vx, _vy, _vr) {
		this.vx = _vx;
		this.vy = _vy;
		if (arguments.length === 3) this.vr = _vr;
	}
	
	run() {
		this.checkWalls(object)
	}
	
	checkWalls() {
		
		const clip = this.clip
		
		if (clip.x > this.right + this.bounds.width / 2) {
			clip.x = 0 - this.bounds.width / 2
		}
		if (clip.x < 0 - this.bounds.width / 2) {
			clip.x = this.right + this.bounds.width / 2
		}
		if (clip.y > this.bottom + this.bounds.height / 2) {
			clip.y = 0 - this.bounds.height / 2
		}
		if (clip.y < 0 - this.bounds.height / 2) {
			clip.y = this.bottom + this.bounds.height / 2
		}
	}
	
	setWalls(right, bottom) {
		this.right = right
		this.bottom = bottom
	}
	
	setX(xPos) {
		this.clip.x = xPos
	}
	
	setY(yPos) {
		this.clip.y = yPos
	}
	
	getRotation() {
		return this.clip.rotation
	}
	
	setRotation(rot) {
		this.clip.rotation = rot
	}
	
	setScales(_scale) {
		this.clip.scaleX = this.clip.scaleY = _scale
	}
	
	getX() {
		return this.clip.x
	}
	
	getY() {
		return this.clip.y
	}
	
	getWidth() {
		return this.bounds.width
	}
	
	getHeight() {
		return this.bounds.height
	}
	
	kill() {
		//console.log('SpaceObject::kill ' + this.clip.name + ' ' + this.clip.stage.numChildren)
		this.clip.removeAllEventListeners()
		this.clip.stage.removeChild(this.clip)
	}
}