import $ from 'jquery'

/**
 * Key
 * maintains object with depressed key codes
 */
export default class KeyListener {
	constructor() {
		console.log('KeyListener');
		this.keys = {};
		$(window).on('keydown', this.keydownHandler.bind(this));
		$(window).on('keyup', this.keyupHandler.bind(this));
	}
	
	isDown(keycode) {
		return this.keys[keycode];
	}
	
	keydownHandler(evt) {
		this.keys[evt.which] = true;
	}
	
	keyupHandler(evt) {
		this.keys[evt.which] = false;
	}
}