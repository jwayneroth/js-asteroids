import $ from 'jquery'

import Alien from './alien.js'
import Asteroid from './asteroid.js'
import Debris from './debris.js'
import Dot from './dot.js'
import KeyListener from './key.js'
import Laser from './Laser.js'
import Ship from './ship.js'
import Splinter from './splinter.js'

const ASTEROID_COUNT = 8;
const NUM_LASERS = 20;
const NUM_LIVES = 1;
const FIRE_DELAY = 175;

/*
 * AsteroidsGame
 * arg stage: cjs Stage Object
 */
export default class AsteroidsGame {
	constructor(stage, right, bottom, onKillCallback) { 
		//console.log('AsteroidsGame::constructor');
		
		this.stage = stage;
		this.stage.name = 'AsteroidsStage';
		this.canvas = stage.canvas;
		this.right = right
		this.bottom = bottom;
		this.onKillCallback = onKillCallback;
		this.fps = lib.properties.fps;
		
		this.key = new KeyListener();
		
		// flags
		this.firing = false;
		this.shipAlive = false;
		
		// arrs
		this.laserArray = new Array();
		this.enemiesArray = new Array();
		
		// counters
		this.ticks = 0;
		this.laserNo = 0;
		this.numKilled = 0;
		this.numToKill = 0;
		this.lifeNo = 0;
		this.numAliens = 0;
		this.numDots = 0;
		this.aliensOut = 0;
		this.splinterNo = 0;
		this.debrisNo = 0;
		this.levelNo = 1;
		this.alienDelay = 8000;
		
		// intervals
		this.makeAlienID = new GameTimer(this.makeAlien, this, 2 * this.fps);
		this.newLifeID = new GameTimer(this.activateShip, this, 1.2 * this.fps);
		//this.restartID = new GameTimer(this.retry, this, .8 * this.fps);
		this.firingID = new GameTimer(this.okToFire, this, FIRE_DELAY / 1000 * this.fps);
		this.newLevelID = new GameTimer(this.startNewLevel, this, 1 * this.fps);
		
		$(window).on('shipLifeChange', this.onShipLifeChange.bind(this));
		$(window).on('alienExit', this.alienExit.bind(this));
		$(window).on('alienLaserAdded', this.alienLaserAdded.bind(this));
		$(window).on('alienLaserKilled', this.alienLaserKilled.bind(this));
		
		this.makeLasers();
		this.makeAsteroids(ASTEROID_COUNT);
		this.makeShip();
		this.makeAlienID.start(this.ticks);
		
		createjs.Ticker.setFPS(this.fps);
		createjs.Ticker.addEventListener("tick", this.gameRun.bind(this));
	}
	
	/**
	 * updateSize
	 * reset right and bottom props on stage and all spaceObjects
	 */
	updateSize(w, h) {
		//console.log('AsteroidsGame::updateSize w: ' + w + ' h: ' + h);
		
		//const w = this.canvas.width,
		//      h = this.canvas.height;
		
		let i = 0;
		
		this.stage.width = this.right = w;
		this.stage.height = this.bottom = h;
		
		for(i=0; i<this.enemiesArray.length; i++) {
			this.enemiesArray[i].setWalls(w, h);
		}
		
		for(i=0; i<this.laserArray.length; i++) {
			this.laserArray[i].setWalls(w, h);
		}
		
		this.ship.setWalls(w, h);
	}
	
	onShipLifeChange(evt, alive) {
		this.shipAlive = alive;
	}
	
	alienLaserAdded(evt, laser) {
		this.enemiesArray.push(laser);
	}
	
	alienLaserKilled(evt, name) {
		this.removeEnemyByName(name);
	}
	
	alienExit(evt, name) {
		this.removeEnemyByName(name);
		this.aliensOut--;
		//this.checkProgress();
	}
	
	removeEnemyByName(name) {
		let i = 0;
		for(i=0; i<this.enemiesArray.length; i++) {
			if (this.enemiesArray[i].clip.name === name) {
				return this.enemiesArray.splice(i,1);
			}
		}
	}
	
	/**
	 * makeLasers
	 * we make twenty lasers at a time
	 * easier to convert to limited laser restriction
	 */
	makeLasers() {
		
		let laser_clip, laser;
		
		this.laserArray.splice(0);
		this.laserNo = 0;
		
		for (let i=0; i<NUM_LASERS; i++) {
			
			laser_clip = new lib.laser();
			laser_clip.name = 'laser' + i;
			laser_clip.visible = false;
			laser = new Laser(laser_clip, this.right, this.bottom, 100, 100, 0);
		
			this.stage.addChild(laser_clip);
			this.laserArray.push(laser);
		}
	}
	
	makeAsteroids(count) {
	
		let asteroid_clip, asteroid;
		
		for(let i = 0; i<count; i++) {
			
			asteroid_clip = new lib.asteroid();
			asteroid_clip.name = 'asteroid' + i;
			asteroid = new Asteroid(asteroid_clip, this.right, this.bottom);
			
			this.numToKill++;
			this.stage.addChild(asteroid_clip);
			this.enemiesArray.push(asteroid);
		}
	}
	
	makeShip() {
	
		const ship_clip = new lib.ship();
		
		ship_clip.name = 'ship';
		ship_clip.gotoAndStop('off');
		
		this.ship = new Ship(ship_clip, this.right, this.bottom, this.right/2, this.bottom/2, .3, .999, this.key);
		
		this.stage.addChild(ship_clip);
		
		this.activateShip();
	}
	
	makeAlien() {
		//console.log('AsteroidsGame::makeAlien ' + this.numAliens);
		
		const alien_clip = new lib.alien();
		const alien = new Alien(alien_clip, this.ship, this.right, this.bottom, 0, 0);
		
		alien_clip.name = 'alien' + this.numAliens;
		
		this.stage.addChild(alien_clip);
		
		this.numAliens++;
		this.aliensOut++;
		
		this.enemiesArray.push(alien);
		
		this.makeAlienID.setDelay(this.alienDelay / 1000 * this.fps);
		this.makeAlienID.start(this.ticks);
	}
	
	activateShip() {
		//console.log('AsteroidsGame::activateShip');
		
		this.ship.clip.x = this.right/2;
		this.ship.clip.y = this.bottom/2;
		this.ship.clip.rotation = 0;
		this.ship.setVels(0,0); //,12)
		this.ship.makeActive();
	}
	
	/**
	 * okToFire
	 * called via interval set after firing laser
	 */
	okToFire() {
		this.firing = false;
	}
	
	/**
	 * checkHits
	 * arg laser: Laser Object
	 * called by laser's tick function
	 */
	checkHits(laser) {
		//console.log('AsteroidsGame::checkHits\n\t x: ' + laser.clip.x + ' y: ' + laser.clip.y);
		
		// loop enemies array
		for (let i=0; i<this.enemiesArray.length; i++) {
			
			const enemy = this.enemiesArray[i];
			
			// we cant kill alienLasers
			if (enemy.objectType === "alienLaser") continue;
			
			// determine distance to enemy
			const dx = enemy.getX() - laser.getX();
			const dy = enemy.getY() - laser.getY();
			const dist = Math.sqrt(dx * dx + dy * dy);
			
			let bigD;
			
			if (enemy.getWidth() > enemy.getHeight()) {
				bigD = enemy.getWidth();
			} else {
				bigD = enemy.getHeight();
			}
			
			// distance short enough to kill enemy
			if (dist < bigD / 2 + 12) { //if (enemy.clip.hitTest(laser.clip.x, laser.clip.y)) {
				
				laser.kill();
				//explosion.start();
				
				if (enemy.objectType === 'asteroid') {
					this.makeDebris(enemy);
					this.numKilled++;
					this.checkProgress();
				} else if (enemy.objectType === 'debris') {
					this.makeSplinters(enemy);
					this.numKilled++;
					this.checkProgress();
				} else if (enemy.objectType === 'alien') {
					this.aliensOut--;
					this.makeShipDebris(enemy);
				}
				
				this.removeEnemyByName(enemy.clip.name); //this.enemiesArray.splice(i,1);
				
				this.onKillCallback(enemy.getX(), enemy.getY());
				
				break;
			}
		}
	}
	
	makeDebris(asteroid) {
		
		const maxRadius = 10;
		const numDebris = 2; // Math.round(Math.random() * 1 + 2)
		let radius, angle, debrisX, debrisY, debris_clip, debris;
		
		for (var i=0; i<numDebris; i++) {
			this.numToKill++;
			this.debrisNo++;
			
			radius = Math.random() * maxRadius;
			angle = Math.random() * (Math.PI * 2);
			debrisX = Math.cos(angle) * radius + asteroid.getX();
			debrisY = Math.sin(angle) * radius + asteroid.getY();
			
			debris_clip = new lib.debris();
			debris_clip.name = 'debris' + this.debrisNo;
			debris = new Debris(debris_clip, this.right, this.bottom, debrisX, debrisY);
			// randomize debris velocities around the asteroid's vels
			debris.setVels(asteroid.vx + (Math.random() * 8 - 4), asteroid.vy + (Math.random() * 8 - 4), )
			
			this.stage.addChild(debris_clip);
			this.enemiesArray.push(debris);
		}
		
		asteroid.kill();
	}
	
	makeSplinters(debris) {
		//console.log('AsteroidsGame::makeSplinters')
		
		const numSplinters = 15;
		const maxRadius = 10;
		let radius, angle, splinterX, splinterY, splinter_clip, splinter;
		
		for (var i=0; i<numSplinters; i++) {
			this.splinterNo++;
			
			radius = Math.random() * maxRadius;
			angle = Math.random() * (Math.PI * 2);
			splinterX = Math.cos(angle) * radius + debris.getX();
			splinterY = Math.sin(angle) * radius + debris.getY();
			
			splinter_clip = new lib.splinter();
			splinter_clip.name = 'splinter' + this.splinterNo;
			splinter = new Splinter(splinter_clip, this.right, this.bottom, splinterX, splinterY);
			
			this.stage.addChild(splinter_clip);
		}
		
		debris.kill();
	}
	
	/**
	 * checkShip
	 * arg enemy: any of several SpaceObject types
	 * called in loop of enemies array in main gameLoop
	 */
	checkShip(enemy) {
		
		if (this.ship.getActive()) {
		
			const dx = enemy.getX() - this.ship.getX();
			const dy = enemy.getY() - this.ship.getY();
			const dist = Math.sqrt(dx * dx + dy * dy);
			
			let bigD;
			
			if(enemy.getWidth() > enemy.getHeight()) {
				bigD = enemy.getWidth();
			} else {
				bigD = enemy.getHeight();
			}
			
			if (dist < bigD / 2 + 12) { //if (ship.object.hitTest(enemy.object)){
				
				console.log('ship crashed with ' + enemy.clip.name);
				
				this.makeShipDebris(this.ship);
				//explosion.start();
				this.shipAlive = false;
				this.ship.makeInactive();
				
				//if (1) { //this.lifeNo < NUM_LIVES) {
					
				this.lifeNo++;
				this.newLifeID.start(this.ticks);
				
				/*} else {
					this.killGame();
					this.restartID.start(this.ticks);
				}*/
				
				if (enemy.objectType === "alien") {
					this.makeShipDebris(enemy);
					const removed = this.removeEnemyByName(enemy.clip.name);
					this.aliensOut--;
					console.log('crash with alien, alien');
					return true;
				}
			}
		}
	}
	
	makeShipDebris(craft) {
		//console.log('makeShipDebris craft: ' + craft.objectType);
		
		const totalDots = 20;
		const radius = 30;
		let angle, dotX, dotY, dot_clip, dot;
		
		for (let i = 0; i < totalDots; i++) {
			angle = Math.random() * (Math.PI * 2);
			dotX = Math.cos(angle) * radius + craft.getX();
			dotY = Math.sin(angle) * radius + craft.getY();
			dot_clip = new lib.splinter();
			dot_clip.name = 'dot' + (this.numDots + i);
			dot = new Dot(dot_clip, this.right, this.bottom, dotX, dotY);
			this.stage.addChild(dot_clip);
		}
		
		if (craft.objectType === "alien") craft.kill();
	}
	
	checkProgress() {
		console.log(this.numKilled + ' of ' + this.numToKill + ' killed w/ ' + this.aliensOut + ' aliens');
		
		if (this.numKilled >= this.numToKill) {
			
			//if (!this.aliensOut) {
			
			//if (this.levelNo < NUM_LEVELS) {
				
			//this.enemiesArray.splice(0);
			this.numToKill = 0;
			this.numKilled = 0;
			this.levelNo++;
			
			if (this.alienDelay >= 2000) this.alienDelay -= 1000;
			
			//this.gameState = "level " + this.levelNo;
				
			//this.clearTextID = setInterval(this,"clearText",800);
			this.newLevelID.start(this.ticks);
			this.makeAlienID.setDelay(this.alienDelay / 1000 * this.fps);
			this.makeAlienID.start(this.ticks);
			
			/*} else {
				killGame();
				gameState = "YOU WON THE GAME!!!";
				stageMC._parent.gotoAndStop("gameOver");
			}*/
			//}
			
		}
	}
	
	startNewLevel() {
		console.log('starting level ' + this.levelNo);
		this.makeAsteroids(ASTEROID_COUNT + this.levelNo * this.levelNo);
	}
	
	checkGameTimers() {
		
		const ticks = this.ticks;
		
		this.makeAlienID.check(ticks);
		this.newLifeID.check(ticks);
		//this.restartID.check(ticks);
		this.firingID.check(ticks);
		this.newLevelID.check(ticks);
	}
	
	/**
	 * gameRun
	 * tick event handler
	 * main game loop
	 */
	gameRun() {
		//console.log('gameRun');
		
		this.ticks++;
		
		// is ship alive
		if (this.shipAlive) {
			
			// is ship firing (spacebar Depressed)
			if (this.key.isDown(32) === true) {
				if (!this.firing) {
					
					if(this.laserNo >= this.laserArray.length) this.makeLasers();
					
					this.firingID.start(this.ticks);
					
					this.firing = true;
				
					const game = this;
					const laser = this.laserArray[this.laserNo];
					const laser_clip = laser.clip;
				
					laser_clip.visible = true;
					laser.setX(this.ship.getPointX());
					laser.setY(this.ship.getPointY());
					laser.setRotation(this.ship.getRotation());
					
					laser_clip.addEventListener('tick', function() {
						
						if (laser_clip.x < laser.left - laser.bounds.width / 2) {
							laser.kill(); //console.log('laser off left');
						} else if (laser_clip.x > laser.right + laser.bounds.width / 2) {
							laser.kill(); //console.log('laser off right');
						} else if (laser_clip.y < laser.top - laser.bounds.height / 2) {
							laser.kill(); //console.log('laser off top');
						} else if (laser_clip.y > laser.bottom + laser.bounds.height / 2) {
							laser.kill(); //console.log('laser off bottom');
						} else {
							game.checkHits(laser);
							const laserrad = laser_clip.rotation * Math.PI / 180;
							const lvx = Math.cos(laserrad) * 40;
							const lvy = Math.sin(laserrad) * 40;
							laser_clip.x += lvx;
							laser_clip.y += lvy;
						}
					})
				
					//shot.start(); // sound
				
					this.laserNo++;
				}
			}
			
			for (let i = 0; i < this.enemiesArray.length; i++) {
				this.checkShip(this.enemiesArray[i]); // this.enemiesArray.splice(i,1);
			}
		}
		// GameTimers replace js intervals (for pause on tab change)
		this.checkGameTimers();
		
		// render
		this.stage.update();
	}
}

/**
 * GameTimer
 */
class GameTimer {
	constructor(cb, scope, delay) {
		
		this.cb = cb;
		this.cbScope = scope;
		this.delay = delay;
		
		this.begin = 0;
		this.end = 0;
		
		this.running = false;
	}
	
	start(ticks) {
		this.begin = ticks;
		this.end = ticks + this.delay;
		this.running = true;
	}
	
	check(ticks) {
		
		if (this.running === false) return;
		
		if (ticks >= this.end) {
			this.running = false;
			this.cb.call(this.cbScope);
		}
	}
	
	clear() {
		this.running = false;
	}
	
	setDelay(delay) {
		this.delay = delay;
	}
}