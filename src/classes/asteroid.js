import SpaceObject from './space-object.js'

export default class Asteroid extends SpaceObject {
	constructor(clip, _right, _bottom) {
		super(clip, _right, _bottom, 0, 0);
		
		this.clip = clip;
		this.right = _right;
		this.bottom = _bottom;
		this.top = 0;
		this.left = 0;
		this.initAsteroid();
		this.clip.addEventListener('tick', this.asteroidRun.bind(this));
	}
	
	initAsteroid() {
		
		this.objectType = "asteroid";
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
	
	asteroidRun() {
		//console.log('Asteroid::asteroidRun');
		this.clip.x += this.vx;
		this.clip.y += this.vy;
		this.clip.rotation += this.vr;
		this.checkWalls();
	}
}

