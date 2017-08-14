/**
 * Debris
 */

class Debris extends SpaceObject {
	constructor(clip, _right, _bottom, xPos, yPos) {
		super(clip, _right, _bottom, xPos, yPos);
		this.initDebris();
		this.clip.addEventListener('tick', this.debrisRun.bind(this));
	}

	initDebris() {
		
		this.objectType = "debris";
		
		const vx = Math.random() * 10 - 5;
		const vy = Math.random() * 10 - 5;
		const vr = Math.random() * 12 - 6;
		
		//this.clip.scaleX =this.clip.scaleY = Math.random() * 1.50 + 1.00
		
		this.setVels(vx, vy, vr);
	}
	
	debrisRun() {
		this.clip.x += this.vx;
		this.clip.y += this.vy;
		this.clip.rotation += this.vr;
		this.checkWalls();
	}
}