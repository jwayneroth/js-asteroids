import $ from 'jquery'

import SpaceObject from './space-object.js'
import KeyListener from './key.js'

const ROTATION_VEL = 10

export default class Ship extends SpaceObject {

	constructor(clip, _right, _bottom, xPos, yPos, thrustIn, frictionIn, keyListener = new KeyListener()) {
		super(clip, _right, _bottom, xPos, yPos)
		
		console.log('Ship::constructor')
		
		this.tickDelegate = null
		this.keyDelegate = null
		
		this.makeAliveID = null
		this.thrust = thrustIn
		this.friction = frictionIn
		
		this.setVels(0,0) //,12)
		this.vr = ROTATION_VEL    
		
		this.key = keyListener;  
	}
	
	setBounds() {
		//console.log('Ship::setBounds')
		this.bounds = this.clip.ship_inner.nominalBounds
	}
	
	makeActive() {
		//console.log('Ship::makeActive')
		
		this.active = true
		
		clearInterval(this.makeAliveID)
		this.makeAliveID = setInterval(this.makeAlive.bind(this), 1000)
		
		this.clip.gotoAndPlay('blinking')
		
		this.tickDelegate = this.shipRun.bind(this)
		this.clip.addEventListener('tick', this.tickDelegate)
	}
	
	makeInactive() {
		//console.log('Ship::makeInactive')
		
		this.active = false
		
		this.clip.removeAllEventListeners()
		
		this.clip.gotoAndStop('off');
	}
	
	makeAlive() {
		//console.log('Ship::makeAlive')
		
		this.alive = true
		this.clip.gotoAndStop("active")
		clearInterval(this.makeAliveID)
		$(window).trigger('shipLifeChange', [true])
	}
	
	shipRun() {
		//console.log('shipRun')
		
		// left
		if (this.key.isDown(37)) {
			this.clip.rotation -= this.vr
		// right
		} else if (this.key.isDown(39)) {
			this.clip.rotation += this.vr
		}
		// up
		if (this.key.isDown(38)) {
			const radians = this.clip.rotation * Math.PI / 180;
			const ax = Math.cos(radians) * this.thrust;
			const ay = Math.sin(radians) * this.thrust;
			this.vx += ax;
			this.vy += ay;
			if(this.clip.currentLabel === "active") {
				this.clip.gotoAndPlay("run");
			}
		}
		
		this.vx *= this.friction;
		this.vy *= this.friction;
		
		this.clip.x += this.vx;
		this.clip.y += this.vy;

		this.checkWalls();
	}
	
	getActive() {
		return this.active;
	}
	
	getPointX() {
		const rad = this.clip.rotation * Math.PI/180
		const pointX = this.clip.x + Math.cos(rad) // * 20
		return pointX
	}
	
	getPointY() {
		const rad = this.clip.rotation * Math.PI/180
		const pointY = this.clip.y + Math.sin(rad) // * 20
		return pointY
	}
}
