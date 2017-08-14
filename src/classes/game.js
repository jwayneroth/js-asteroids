import createjs from "createjs";

//import lib from '../lib/asteroids-assets'
import Ship from './ship';

export class AsteroidsGame {
	constructor() { 
		
		console.log('AsteroidsGame::constructor')
		
		let ship_clip = new lib.ship();
		this.stage = new createjs.Stage(document.getElementById('canvas'));
		this.stage.addChild(ship_clip);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", this.stage);
		
	}
}
