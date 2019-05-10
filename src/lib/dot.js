import SpaceObject from './space-object.js'

export default class Dot extends SpaceObject {
	constructor(clip, _right, _bottom, xPos, yPos) {
		super(clip, _right, _bottom, xPos,yPos)
		
		this.initDot()
		
		this.clip.cache(-8,-8,16,16);
		
		this.clip.addEventListener('tick', this.dotRun.bind(this))
	}
	
	initDot() {
		
		const vx  = Math.random() * 16 -8
		const vy = Math.random() * 16 -8
		const vr  = 20
		
		this.clip.scaleX = Math.random() * 1.25 + .75
		this.clip.scaleY = Math.random() * 1 + 1
		
		this.clip.rotation = Math.random() * 360;
		
		this.setVels(vx, vy, vr)
		
		this.clip.uncache();
		this.clip.cache(-20, -10, 40, 20); 
		
		this.objectType = "dot"
	}
	
	dotRun() {
		
		if (this.clip.alpha < 0) {
			this.kill()
		} else {
			this.clip.rotation += this.vr
			this.clip.x += this.vx
			this.clip.y += this.vy
			this.clip.alpha -= .02
		}
		this.checkWalls()
	}
}
