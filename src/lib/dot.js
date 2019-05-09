import SpaceObject from './space-object.js'

export default class Dot extends SpaceObject {
	constructor(clip, _right, _bottom, xPos, yPos) {
		super(clip, _right, _bottom, xPos,yPos)
		this.initDot()
		this.clip.addEventListener('tick', this.dotRun.bind(this))
	}
	
	initDot() {
		this.objectType = "dot"
		
		const vx  = Math.random() * 16 -8
		const vy = Math.random() * 16 -8
		const vr  = 20
		
		//this.clip._xscale = this.clip._yscale = Math.random() * 30 + 10
		
		this.clip.scaleX = Math.random() * 2 + .5
		this.clip.scaleY = Math.random() * 2 + .5
		
		this.clip.rotation = Math.random() * 360;
		
		this.setVels(vx, vy, vr)
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
