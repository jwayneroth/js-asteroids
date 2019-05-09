import SpaceObject from './space-object.js'

export default class Follower extends SpaceObject {
	constructor(clip, _right, _bottom) {
		super(clip, _right, _bottom, 0, 0);
		//this.clip.cache(0, 0, 200, 200);
	}
}

