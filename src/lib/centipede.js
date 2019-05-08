import SpaceObject from './space-object.js'

export default class Centipede extends SpaceObject {
	constructor(clip, follower, _right, _bottom) {
		super(clip, _right, _bottom, 0, 0);
		
		this.init();
		
		this.initFollowers(follower);
		
		this.clip.addEventListener('tick', this.centipedeRun.bind(this));
	}
	
	init() {
		
		this.objectType = "centipede";
		this.sector = Math.round(Math.random() * 3 + 1);
		
		switch (this.sector) {
			case (1) :
				this.clip.x = Math.random() * 40 - 20; //x between -20 and 20
				this.clip.y = Math.random() * this.bottom;
				break;
			case (2) :
				this.clip.x = Math.random() * this.right;
				this.clip.y = Math.random() * 20 - 10;   // y between -10 and 10;
				break;
			case (3) :
				this.clip.x = Math.random() * 20 + (this.right - 10); // x between right - 10 and right + 10
				this.clip.y = Math.random() * this.bottom;
				break;
			case (4) :
				this.clip.x = Math.random() * this.right;
				this.clip.y = Math.random() * 20 + (this.bottom - 10); // y between bottom -10 and bottom + 10;
				break;
		}
		const vx = Math.random() * 12 - 6;
		const vy = Math.random() * 12 - 6;
		const vr = Math.random() * 6 - 3;
		
		this.setVels(vx, vy, vr);
		
		//this.clip.scaleX = this.clip.scaleY = Math.random() + 1.0;
		
	}
	
	initFollowers(followerClip) {
		const followerCount = 5;
		
		let i = 0;
		let follower;
		
		this.spring = .03;
		this.friction = .9;
		this.gravity = 2;
	
		this.followers = [];
		
		for(i; i < followerCount; i++) {
			follower = new followerClip();
			follower.name = 'follower' + i;
			follower.vx = follower.vy = 0;
			follower.cache(0,0,40,45);
			console.log('follower bounds');
			this.clip.addChild(follower);
			this.followers.push(follower);
			console.log(follower);
		}
	}
	
	moveFollower(follower, tx, ty) {
		follower.vx += (tx - follower.x) * this.spring;
		follower.vy += (ty - follower.y) * this.spring;
		follower.vy += this.gravity;
		follower.vx *= this.friction;
		follower.vy *= this.friction;
		follower.x += follower.vx;
		follower.y += follower.vy;
	}
	
	centipedeRun() {
		//console.log('Asteroid::asteroidRun');
		
		let i = 0;
		let follower;
		
		this.clip.x += this.vx;
		this.clip.y += this.vy;
		this.clip.rotation += this.vr;
		
		for(i; i<this.followers.length; i++) {
			follower = this.followers[i];
			if (i === 0) {
				this.moveFollower(follower, this.clip.x, this.clip.y);
			} else  {
				this.moveFollower(follower, this.followers[i-1].x, this.followers[i-1].y);
			}
		}
		
		this.checkWalls();
	}
}

