// Laser

class Laser extends SpaceObject {
	
	constructor(clip, _right, _bottom, shipX, shipY, rotIn) {
		super(clip, _right, _bottom, shipX, shipY);
		
		this.rot = rotIn
		//this.clip.scaleX = 1.20
		//this.clip.scaleY = 3.5
		
		//laserRun();
	}
	
	laserRun() {
		console.log("Laser::laserRun" + this.clip);
		
			this.clip.rotation = this.rot
			const laserrad = this.rot * Math.PI / 180
			const lvx = Math.cos(laserrad) * 10//45
			const lvy = Math.sin(laserrad) * 10//45
			this.clip.x += lvx
			this.clip.y += lvy
			
			this.checkWalls()
	}
	
	checkWalls() {
		const clip = this.clip
		
		if (this.clip.x < this.left - this.bounds.width / 2) {
			this.kill()
		} else if (this.clip.x > this.right + this.bounds.width / 2) {
			this.kill()
		}
		if (this.clip.y < this.top - this.bounds.height / 2) {
			this.kill()
		} else if (this.clip.y > this.bottom + this.bounds.height / 2) {
			this.kill()
		}
	}
	
	kill() {
		this.clip.removeAllEventListeners()
		super.kill()
	}
}