import SpaceObject from './space-object.js'

export default class Splinter extends SpaceObject {
	constructor(clip, _right, _bottom, xPos, yPos) {
		super(clip, _right, _bottom, xPos, yPos)
		this.initDebris()
		this.clip.addEventListener('tick', this.splinterRun.bind(this))
	}
	
	initDebris() {
		
		this.objectType = "splinter"
		
		const vx  = Math.random() * 12 - 6
		const vy = Math.random() * 12 - 6
		const vr  = Math.random() * 120 - 60 //30
		
		this.clip.scaleX = Math.random() * 2 + .5
		this.clip.scaleY = Math.random() * 2 + .5
		
		this.clip.rotation = Math.random() * 360;
		
		this.setVels(vx, vy, vr)
	}
	
	splinterRun() {
		
		if (this.clip.alpha < 0) {
			this.kill()
		} else {
			this.clip.rotation += this.vr
			this.clip.x += this.vx
			this.clip.y += this.vy
			this.clip.alpha -= .01
		}
		this.checkWalls()
	}
}
