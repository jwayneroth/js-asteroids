import $ from 'jquery'

/**
 * AlienLaser
 */
class AlienLaser extends SpaceObject {
	constructor(clip, _right, _bottom, shipX, shipY, rotIn) {
		super(clip, _right, _bottom, shipX, shipY);
		
		this.rot = rotIn;
		this.clip.rotation = this.rot;
		this.objectType = "alienLaser";
		
		this.clip.addEventListener('tick', this.laserRun.bind(this));
	}
	
	laserRun() {
		if (this.clip.x < this.left - this.bounds.width / 2) {
			this.kill();
		} else if (this.clip.x > this.right + this.bounds.width / 2) {
			this.kill();
		} else if (this.clip.y < this.top - this.bounds.height / 2) {
			this.kill();
		} else if (this.clip.y > this.bottom + this.bounds.height / 2) {
			this.kill();
		} else {
			const laserrad = this.clip.rotation * Math.PI / 180;
			const lvx = Math.cos(laserrad) * 6;
			const lvy = Math.sin(laserrad) * 6;
			this.clip.x += lvx;
			this.clip.y += lvy;
		}
	}
	
	kill() {
		$(window).trigger('alienLaserKilled', [this.clip.name]);
		super.kill();
	}
}

/**
 * Alien
 */
import SpaceObject from './space-object.js'

export default class Alien extends SpaceObject {
	constructor(clip, ship, _right, _bottom, _xPos, _yPos) {
		super(clip, _right, _bottom, _xPos, _yPos);
		
		this.alienLaserCount = 0;
		this.ship = ship;
		//alienLaserMC = _alienLaserMC;
		this.initAlien();
		this.clip.addEventListener('tick', this.alienRun.bind(this));
	}
	
	initAlien() {
		
		this.objectType = "alien";
		this.sector = Math.round(Math.random() * 3 + 1);
		
		this.angle = 0;
		this.range = Math.random() * 45 + 10;
		this.vector = Math.random() * 2;
		this.mult= Math.random()* 1.5;
		this.fired = false;
		this.fireCount = 0;
		this.exitSpeed = Math.random() * 8 - 4;
		
		switch (this.sector) {
			case 1 :
				this.clip.x = this.right + 20;
				this.startY = this.bottom - 100;
				this.xspeed = -2.5;
				this.dir = "up";
				break;
				
			case 2 :
				this.clip.x = this.right + 20;
				this.startY = this.bottom - 50;
				this.xspeed = -2;
				this.dir = "up";
				break;
			
			case 3 :
				this.clip.x = this.right + 20;
				this.startY = this.top + 25;
				this.xspeed = -3.5;
				this.dir = "down";
				break;
			
			case 4 :
				this.clip.x = this.right + 20;
				this.startY = this.top + 100;
				this.xspeed = -3;
				this.dir = "down";
				break;
		}
		
		this.alienShootID = setInterval(this.alienShoot.bind(this), 4000)
	}
	
	alienShoot() {
		
		this.fireCount++;
		const dx = this.ship.getX() - this.clip.x;
		const dy = this.ship.getY() - this.clip.y;
		const fireAngle = Math.round(Math.random() * 3 + 1);
		const trueAngle = Math.atan2(dy, dx) * 180 / Math.PI;
		let setRot;
		
		switch (fireAngle) {
			case 1 :
				setRot = trueAngle;
				break;
			case 2 :
				setRot = trueAngle + 15;
				break;
			case 3 :
				setRot = trueAngle + Math.random() * 25;
				break
			case 4 :
				setRot = trueAngle - Math.random() * 50;
				break;
		}
		
		const laser_clip = new lib.alienLaser();
		laser_clip.name = "alienLaser" + this.clip.name.substring(5) + '-' + this.alienLaserCount;
		const alienLaser = new AlienLaser(laser_clip, this.right, this.bottom, this.clip.x, this.clip.y, setRot);
		$(window).trigger('alienLaserAdded', [alienLaser]);
		this.clip.stage.addChild(laser_clip);
		this.alienLaserCount++;
		
		if (this.fireCount >= 2) {
			clearInterval(this.alienShootID);
			clearInterval(this.alienLeaveID);
			this.alienLeaveID = setInterval(this.alienLeave.bind(this), 900);
		}
		
	}
	
	alienLeave() {
		clearInterval(this.alienLeaveID);
		this.fired = true;
	}
	
	checkWalls() {
		
		const clip = this.clip;
		let off = false;
		
		if (clip.x > this.right + this.bounds.width / 2) { //right
			clip.x = 0 - this.bounds.width / 2;
			off = true;
		}
		if (clip.x < 0 - this.bounds.width / 2) { //left
			clip.x = this.right + this.bounds.width / 2;
			off = true;
		}
		if (clip.y > this.bottom + this.bounds.height / 2) { //bottom
			if (clip.dir === "down") clip.dir = "up";
			off = true;
		}
		if (clip.y < 0 - this.bounds.height / 2) { //top
			if (this.dir === "up") clip.dir="down";
			off = true;
		}
		
		if (this.fired && off === true) {
			console.log('alien fired twice and off');
			$(window).trigger('alienExit', [this.clip.name]);
			this.kill();
		}
	}
	
	
	alienRun() {
	
		const yspeed = .07;
		
		if (this.fired) {
			
			this.clip.x += this.xspeed * 3;
			this.clip.y += this.exitSpeed;
			
		} else {
		
			this.clip.x += this.xspeed;
			this.clip.y = this.startY + Math.sin(this.angle) * this.range;
		
			if (this.dir === "down") {
				this.clip.y += this.vector;
				this.vector += this.mult;
				this.angle += yspeed;
			} else {
				this.clip.y += this.vector;
				this.vector -= this.mult;
				this.angle += yspeed;
			}
		}
		
		this.checkWalls();
	}
	
	kill() {
		//console.log('Alien::kill stage: ' + this.clip.stage.name);
		
		clearInterval(this.alienShootID);
		clearInterval(this.alienLeaveID);
		super.kill();
	}
}