import createjs from "createjs";
import AsteroidsGame from './classes/game.js'
import './scss/styles.scss'

let canvas, stage, anim_container, dom_overlay_container;

function init() {
	console.log('init')
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	
	let game, lastW = -1, lastH = -1;
	
	function resizeCanvas() {
		const w = lib.properties.width,
					h = lib.properties.height;
		const iw = window.innerWidth,
					ih = window.innerHeight;
		const pRatio = window.devicePixelRatio || 1,
					xRatio = iw/w,
					yRatio = ih/h;

		if (iw === lastW && ih === lastH) return;

		canvas.width = w * pRatio * xRatio;
		canvas.height = h * pRatio * yRatio;

		canvas.style.width = dom_overlay_container.style.width =
												 anim_container.style.width = 
												 w * xRatio + 'px';

		canvas.style.height = anim_container.style.height =
													dom_overlay_container.style.height =
													h * yRatio + 'px';
	
		lastW = iw;
		lastH = ih;
	}

	resizeCanvas();
	
	game = new AsteroidsGame(stage);
	
	window.addEventListener('resize', function() {
		resizeCanvas()
		game.updateSize()
	});
}

window.addEventListener('load', init)