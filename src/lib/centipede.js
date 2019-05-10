import SpaceObject from './space-object.js'

export default class Centipede extends SpaceObject {
	constructor(clip, _right, _bottom, _delay=6000) {
		super(clip, _right, _bottom, 0, 0);
		
		this.init();
		
		this.clip.eye.cache(-8,-8,16,16);
		this.clip.cache(-64, -64, 128, 128);
		
		var home = this;
		
		this.beginRunID = setTimeout(function() {
			home.clip.addEventListener('tick', home.centipedeRun.bind(home));
		}, _delay);
	}
	
	init() {
		
		let vamp, vaxis, curve;
		
		const vector = Math.round(Math.random() * 3 + 1);
		
		this.objectType = "centipede";
		
		this.totalHits = 3;
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
				vaxis = Math.abs(this.vx)/10;
				
			// right
			} else  {
				this.dir = "right";
				this.clip.x = -50;
				this.vx = Math.random() * 5 + 5;
				this.baseRotation = 90;
				vaxis = -this.vx/10;
			}
			
			vamp = this.amplitude / (this.bottom/7 + 5);
			
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
				vaxis = this.vy/10;
				
			// up
			} else {
				this.dir = "up";
				this.clip.y = this.bottom + 50;
				this.vy = Math.random() * -5 - 5;
				this.baseRotation = 0;
				vaxis = this.vy/10;
			}
			
			vamp = this.amplitude / (this.right/7 + 5);
		}
		
		// rrange is range of rotation of centipede head
		// it is constrained by ratio of curved motion amplitude to speed on perpendicular axis
		// ie. centipedes with very large arced motion rotate their heads more ;)
		curve = vamp / vaxis;
		this.rrange = curve * 60;
		
		// we store the ratio for follower friction val
		this.curve = Math.abs(curve);
	}
	
	addFollowers(arr) {
		
		let i = 0;
		let follower;
		
		const spring = .02 + this.curve * .04;
		
		//console.log('addFollowers curve: ' + this.curve.toFixed(2) + ' spring: ' + spring.toFixed(2));
		
		for(i; i < arr.length; i++) {
			
			follower = arr[i];
			follower.index = i;
			
			follower.vx = follower.vy = 0;
			follower.spring = spring;
			follower.friction = .8;
			
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
		
		follower.rotation = this.clip.rotation;
		
		/* 
		var dx = follower.x - tx;
		var dy = follower.y - ty;
		var angle = Math.atan2(dy, dx);
		*/
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
	
	takeHit() {
		
		this.hits++;
		
		if (this.hits >= this.totalHits) {
			return true;
		}
		
		const mult = this.hits * 100;
		
		this.clip.uncache();
		this.clip.eye.uncache();
		
		this.clip.eye.filters = [
			new createjs.ColorFilter(0,0,0,1,255,255-mult,50,0)
		];
		
		this.clip.eye.cache(-8,-8,16,16);
		this.clip.cache(-64, -64, 128, 128);
		
		return false;
	}
}

