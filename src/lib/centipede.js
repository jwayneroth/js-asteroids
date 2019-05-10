import SpaceObject from './space-object.js'

export default class Centipede extends SpaceObject {
	constructor(clip, _right, _bottom) {
		super(clip, _right, _bottom, 0, 0);
		
		this.init();
		
		//this.clip.uncache();
		//this.clip.cache(0, 0, 200, 200);
		
		this.clip.addEventListener('tick', this.centipedeRun.bind(this));
	}
	
	init() {
		
		let vxp, vyp, rat;
		
		const vector = Math.round(Math.random() * 3 + 1);
		
		this.objectType = "centipede";
		
		this.totalHits = 5;
		this.hits = 0;
		this.angle = 0;
		this.drift = Math.random() * 5.5 - 2.75;
		
		// left or right moving
		if (vector === 1 || vector === 2) {
			
			this.vy = Math.random() * .12 + .06;
			this.amplitude = Math.random() * this.bottom/7 + 5;
			this.baseline = Math.random() * this.bottom;
			
			// left
			if (vector === 1) {
				this.dir = "left";
				this.clip.x = this.right + 50;
				this.vx = Math.random() * -5 - 5;
				this.baseRotation = -90;
				vxp = Math.abs(this.vx)/10;
				
			// right
			} else  {
				this.dir = "right";
				this.clip.x = -50;
				this.vx = Math.random() * 5 + 5;
				this.baseRotation = 90;
				vxp = -this.vx/10;
			}
			
			vyp = this.amplitude / (this.bottom/7 + 5);
			rat = vyp / vxp;
			
			//console.log(this.dir);
			//console.log('vy: ' + this.vy.toFixed(2) + ' vx: ' + this.vx.toFixed(2));
			//console.log('vyp: ' + vyp.toFixed(2) + ' vxp: ' + vxp.toFixed(2) + ' rat: ' + rat.toFixed(2) + ' rrange: ' + this.rrange.toFixed(2));
			
		// up or down moving
		} else {
			
			this.vx = Math.random() * .12 + .06;
			this.amplitude = Math.random() * this.right/7 + 5;
			this.baseline = Math.random() * this.right;
			
			// down
			if (vector === 3) {
				this.dir = "down";
				this.clip.y = -50;
				this.vy = Math.random() * 5 + 5;
				this.baseRotation = -180;
				vyp = this.vy/10;
				
			// up
			} else {
				this.dir = "up";
				this.clip.y = this.bottom + 50;
				this.vy = Math.random() * -5 - 5;
				this.baseRotation = 0;
				vyp = this.vy/10;
			}
			
			vxp = this.amplitude / (this.right/7 + 5);
			rat = vxp / vyp;
			
			//console.log(this.dir);
			//console.log('vy: ' + this.vy.toFixed(2) + ' vx: ' + this.vx.toFixed(2));
			//console.log('vyp: ' + vyp.toFixed(2) + ' vxp: ' + vxp.toFixed(2) + ' rat: ' + rat.toFixed(2) + ' rrange: ' + this.rrange.toFixed(2));
		}
		this.rrange = rat * 60;
	}
	
	addFollowers(arr) {
		
		let i = 0;
		let follower;
		
		for(i; i < arr.length; i++) {
			
			follower = arr[i];
			follower.index = i;
			
			follower.vx = follower.vy = 0;
			follower.spring = .03;
			follower.friction = .9;
			
			if (i === 0) {
				follower.x = this.clip.x;
				follower.y = this.clip.y;
			} else  {
				follower.x = arr[i-1].x;
				follower.y = arr[i-1].y;
			}
		}
		
		this.followers = arr;
	}
	
	moveFollower(follower, tx, ty) {
		//console.log('moveFollower', tx, ty);
		
		follower.vx += (tx - follower.x) * follower.spring;
		follower.vy += (ty - follower.y) * follower.spring;
		
		follower.vx *= follower.friction;
		follower.vy *= follower.friction;
		
		follower.x += follower.vx;
		follower.y += follower.vy;
		
		var dx = follower.x - tx;
		var dy = follower.y - ty;
		var angle = Math.atan2(dy, dx);
    //console.log('angle: ' + angle.toFixed(2));
		//follower.rotation = this.baseRotation + (follower.index * 10) + Math.sin(this.angle) * (90 + follower.index * 20);
		follower.rotation = -(angle / Math.PI * 360); //this.baseRotation + Math.sin(this.angle) * this.rrange;
	}
	
	removeFollower(name) {
		let i, idx = null;
		for(i=0; i<this.followers.length; i++) {
			if (this.followers[i].name === name) idx = i;
		}
		if (idx !== null) this.followers.splice(idx, 1);
	}
	
	centipedeRun() {
		//console.log('Centipede::centipedeRun', Math.sin(this.angle));
		
		let i = 0;
		const sine = Math.sin(this.angle);
		
		//console.log(this.rrange.toFixed(2) + ' : ' + sine.toFixed(2));
		
		this.clip.rotation = this.baseRotation + sine * this.rrange;
		
		if (this.dir === 'left' || this.dir === 'right') {
			
			this.clip.x += this.vx;
			this.clip.y = this.baseline + sine * this.amplitude;
			this.angle += this.vy;
			
		} else {
			
			this.clip.y += this.vy;
			this.clip.x = this.baseline + sine * this.amplitude;
			this.angle += this.vx;
		}
		
		this.baseline += this.drift;
		
		for(i; i<this.followers.length; i++) {
			if (i === 0) {
				this.moveFollower(this.followers[i], this.clip.x, this.clip.y);
			} else {
				this.moveFollower(this.followers[i], this.followers[i-1].x, this.followers[i-1].y);
			}
		}
		
		//this.clip.updateCache();
		
		this.checkWalls();
	}
	
	checkWalls() {
		
		const clip = this.clip
		
		let hit = 0;
		
		if (this.dir === 'left' || this.dir === 'right') {
			
			if (clip.x > this.right + this.bounds.width / 2) {
				clip.x = 0 - this.bounds.width / 2;
				hit = 1;
			}
			if (clip.x < 0 - this.bounds.width / 2) {
				clip.x = this.right + this.bounds.width / 2
				hit = 1;
			}
			if (clip.y > this.bottom + this.bounds.height / 2) {
				this.baseline =  -(this.clip.y - this.baseline);
				this.clip.y = this.baseline + Math.sin(this.angle) * this.amplitude;
				hit = 1;
			}
			if (clip.y < 0 - this.bounds.height / 2) {
				this.baseline = this.bottom - (this.clip.y - this.baseline);
				this.clip.y = this.baseline + Math.sin(this.angle) * this.amplitude;
				hit = 1;
			}
		
		} else  {
		
			if (clip.x > this.right + this.bounds.width / 2) {
				this.baseline =  -(this.clip.x - this.baseline);
				clip.x = this.baseline + Math.sin(this.angle) * this.amplitude;
				hit = 1;
			}
			if (clip.x < 0 - this.bounds.width / 2) {
				this.baseline = this.right - (this.clip.x - this.baseline);
				clip.x = this.baseline + Math.sin(this.angle) * this.amplitude;
				hit = 1;
			}
			if (clip.y > this.bottom + this.bounds.height / 2) {
				clip.y = 0 - this.bounds.height/2;
				hit = 1;
			}
			if (clip.y < 0 - this.bounds.height / 2) {
				clip.y = this.bottom + this.bounds.height/2;
				hit = 1;
			}
		}
		
		if (hit) {
			let i, follower;
			for (i=0; i<this.followers.length; i++) {
				follower = this.followers[i];
				if (i === 0) {
					follower.x = this.clip.x;
					follower.y = this.clip.y;
				} else  {
					follower.x = this.followers[i-1].x;
					follower.y = this.followers[i-1].y;
				}
			}
		}
	}
}

