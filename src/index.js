//var THREE = require('three');
import createjs from "createjs";
import AsteroidsGame from './lib/game.js'
import './scss/styles.scss'
import vectorbg from './assets/images/vector-bg.png';

const DISPLACEMENT      = -.3, //-0.16,
			SPRING_STRENGTH   = 0.0005,
			DAMPEN            = 0.15, //0.998,
			RESOLUTION        = window.devicePixelRatio || 1;
	
let canvas, stage, anim_container, dom_overlay_container;
let game;
let scene, renderer, camera, planeGeometry, planeMap, planeMaterial, plane;
let callbacks, mousePressed, autoDistortTimer;
let composer;

function init() {
	initGame();
	initThree();
}

function initThree() {
	scene = new THREE.Scene();
	//scene.background = new THREE.TextureLoader().load('images/vector-bg.png');
	scene.background = new THREE.Color( 0x121212 );
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 0;
	camera.lookAt(scene.position);
	renderer = new THREE.WebGLRenderer({
		antialias: false,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.shadowMap.enabled = true;
	renderer.render(scene, camera);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	createObjects();
	createSprings();
	//bindCallbacks();
	
	//////////////////////////////
	// from unreal bloom example
	//////////////////////////////
	var params = {
		exposure: 1,
		bloomStrength: 2.5, //1.5,
		bloomThreshold: 0,
		bloomRadius: 0
	};
	
	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	//var pointLight = new THREE.PointLight( 0xffffff, 1 );
	//camera.add( pointLight );
	
	var renderScene = new THREE.RenderPass( scene, camera );
	
	var bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
	bloomPass.threshold = params.bloomThreshold;
	bloomPass.strength = params.bloomStrength;
	bloomPass.radius = params.bloomRadius;
	
	composer = new THREE.EffectComposer( renderer );
	composer.setSize( window.innerWidth, window.innerHeight );
	composer.addPass( renderScene );
	composer.addPass( bloomPass );
	renderer.toneMapping = THREE.ReinhardToneMapping;
	//////////////////////////////
	
	requestAnimationFrame( animate )
}

function animate () {
	updateVertexSprings();
	plane.material.map.needsUpdate = true
	plane.geometry.verticesNeedUpdate = true;
	plane.geometry.normalsNeedUpdate = true;
	plane.geometry.computeFaceNormals();
	plane.geometry.computeVertexNormals();
	//renderer.render(scene, camera);
	composer.render();
	requestAnimationFrame( animate );
}

function createObjects() {
	const maxWidth = visibleWidthAtZDepth( -100, camera);
	var height = visibleHeightAtZDepth( -100, camera )
	var width = height * camera.aspect;
	planeGeometry = new THREE.PlaneGeometry(width, height, 20, 10); //maxWidth, maxWidth/2, 20, 10);
	planeMap = new THREE.Texture(game.stage.canvas);    
	planeMap.minFilter = THREE.LinearFilter;
	planeMap.magFilter = THREE.LinearFilter;
	planeMap.generateMipmaps = false;
	//planeMap.flipY = false;
	planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
	planeMaterial.map = planeMap;
	plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = false;
	plane.geometry.dynamic = true;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = -100;
	scene.add(plane);
}

function createSprings() {
	var planeFaces = plane.geometry.faces;
	for(var f = 0; f < planeFaces.length; f++) {
		var face = planeFaces[f];
		if(face instanceof THREE.Face3) {
			createSpring(face.a, face.b);
			createSpring(face.b, face.c);
			createSpring(face.c, face.a);
		} else {
			createSpring(face.a, face.b);
			createSpring(face.b, face.c);
			createSpring(face.c, face.d);
			createSpring(face.d, face.a);
		}
	}
}

function createSpring(start, end) {
	var planeVertices  = plane.geometry.vertices;
	var startVertex    = planeVertices[start];
	var endVertex      = planeVertices[end];
	if(!startVertex.springs) {
		startVertex.springs = [];
		startVertex.normal = startVertex.clone().normalize();
		startVertex.originalPosition = startVertex.clone();
	}
	if(!endVertex.springs) {
		endVertex.springs = [];
		endVertex.normal = startVertex.clone().normalize();
		endVertex.originalPosition = endVertex.clone();
	}
	if(!startVertex.velocity) {
		startVertex.velocity = new THREE.Vector3();
	}
	startVertex.springs.push({
		start   : startVertex,
		end     : endVertex,
		length  : startVertex.length(endVertex)
	})
}

function visibleWidthAtZDepth ( depth, camera ) {
	var height = visibleHeightAtZDepth( depth, camera )
	return height * camera.aspect
}

function visibleHeightAtZDepth ( depth, camera ) {
	var cameraOffset = camera.position.z;
	if ( depth < cameraOffset ) { 
		depth -= cameraOffset
	} else {
		depth += cameraOffset
	}
	var vFOV = camera.fov * Math.PI / 180
	return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth )
}

function displaceFace(face, magnitude) {
	//console.log('displaceFace');
	displaceVertex(face.a, magnitude);
	displaceVertex(face.b, magnitude);
	displaceVertex(face.c, magnitude);
	if(face instanceof THREE.Face4) {
		displaceVertex(face.d, magnitude);
	}
}

function displaceRandomFace() {
	var planeFaces      = plane.geometry.faces,
			randomFaceIndex = Math.floor(Math.random() * planeFaces.length),
			randomFace      = planeFaces[randomFaceIndex];
	displaceFace(randomFace, DISPLACEMENT);
	autoDistortTimer = setTimeout(displaceRandomFace, 100);
}

function displaceVertex(vertex, magnitude) {
	var planeVertices = plane.geometry.vertices;
	planeVertices[vertex].velocity.add(
		planeVertices[vertex].normal.clone().multiplyScalar(magnitude)
	)
}

function updateVertexSprings() {
	var planeVertices  = plane.geometry.vertices,
			vertexCount    = planeVertices.length,
			vertexSprings  = null,
			vertexSpring   = null,
			extension      = 0,
			length         = 0,
			force          = 0,
			vertex         = null,
			acceleration   = new THREE.Vector3(0, 0, 0);
	while(vertexCount--) {
		vertex = planeVertices[vertexCount];
		vertexSprings = vertex.springs;
		if(!vertexSprings) {
			continue;
		}
		for(var v = 0; v < vertexSprings.length; v++) {
			vertexSpring = vertexSprings[v];
			length = vertexSpring.start.length(vertexSpring.end);
			extension = vertexSpring.length - length;
			acceleration.copy(vertexSpring.start.normal).multiplyScalar(extension * SPRING_STRENGTH);
			vertexSpring.start.velocity.add(acceleration);
			acceleration.copy(vertexSpring.end.normal).multiplyScalar(extension * SPRING_STRENGTH);
			vertexSpring.end.velocity.add(acceleration);
			vertexSpring.start.add(vertexSpring.start.velocity)
			vertexSpring.end.add(vertexSpring.end.velocity)
			vertexSpring.start.velocity.multiplyScalar(DAMPEN);
			vertexSpring.end.velocity.multiplyScalar(DAMPEN);
		}
		vertex.add(
			vertex.originalPosition.clone().sub(
				vertex
			).multiplyScalar(0.03)
		);
	}
}

function checkIntersection(evt) {
	var mouse = new THREE.Vector2(),
			mouseX    = evt.offsetX || evt.clientX,
			mouseY    = evt.offsetY || evt.clientY,
			raycaster = new THREE.Raycaster(),
			intersects = null
	mouse.x = (mouseX / window.innerWidth) * 2 - 1
	mouse.y = -(mouseY / window.innerHeight) * 2 + 1
	//console.log('checkIntersection', mouseX, mouseY)
	raycaster.setFromCamera( mouse, camera );
	intersects = raycaster.intersectObject(plane);
	if(intersects.length) {
		displaceFace(intersects[0].face, DISPLACEMENT);
	}
}

function checkIntersectionMod(mouseX, mouseY) {
	//console.log('checkIntersectionMod', mouseX, mouseY);
	var mouse = new THREE.Vector2(),
			//mouseX    = evt.offsetX || evt.clientX,
			//mouseY    = evt.offsetY || evt.clientY,
			raycaster = new THREE.Raycaster(),
			intersects = null
	mouse.x = (mouseX / window.innerWidth) * 2 - 1
	mouse.y = -(mouseY / window.innerHeight) * 2 + 1
	raycaster.setFromCamera( mouse, camera );
	intersects = raycaster.intersectObject(plane);
	if(intersects.length) {
		const dID = setInterval(function() {
			displaceFace(intersects[0].face, DISPLACEMENT);
		}, 50);
		setTimeout(function() {
			clearInterval(dID);
		}, 500);
	}
}

function bindCallbacks() {
	callbacks = {
		onResize: function() {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		},
		onMouseOver: function(evt) {
			mousePressed = true;
			checkIntersection(evt);
			clearTimeout(autoDistortTimer);
		},
		onMouseMove: function(evt) {
			if(mousePressed) {
				checkIntersection(evt);
			}
		},
		onMouseOut: function() {
			console.log('onMouseOut');
			mousePressed = false;
			autoDistortTimer = setTimeout(displaceRandomFace, 2000);
		},
		onSelectStart: function() {
			return false;
		},
		onKeyUp: function(evt) {
			var key = evt.key || evt.keyCode;
			console.log('key pressed!', key)
			if (key === 'Enter' || key === 'Ent' || key === 13) {
				console.log('Enter pressed!')
				document.removeEventListener('keyup', callbacks.onKeyUp, false)
				canvasUpdated = false
				return
			}
			if(userTextInputStarted === false) {
				userTextInputStarted = true
				canvasUpdated = true
				document.getElementById('introText').textContent = key
			} else {
				document.getElementById('introText').textContent += key
			}
		},
		onInput: function(evt) {
			document.getElementById('introText').textContent = evt.target.value
			canvasUpdated = true
		},
		onClick: function(evt) {
			console.log("I've been touched!")
			document.getElementById('user_name').focus()
		},
		onNameFormSubmit: function (evt) {
			console.log('User name form submitted!')
			evt.preventDefault()
			window.user_name = document.getElementById('user_name').value
			console.log('username is: ' + window.user_name)
			return false
		}
	}
	window.addEventListener('resize', callbacks.onResize, false)
	window.addEventListener('mouseover', callbacks.onMouseOver, false)
	window.addEventListener('mousemove', callbacks.onMouseMove, false)
	window.addEventListener('mouseout', callbacks.onMouseOut, false)
}

function initGame() {
	console.log('init')
	canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");

	let lastW = -1, lastH = -1;

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
	
	const right = window.innerWidth;
	const bottom = window.innerHeight;
	const onKillCallback = function(dx, dy) {
		checkIntersectionMod(dx, dy);
		//clearTimeout(autoDistortTimer);
	};
	
	game = new AsteroidsGame(stage, right, bottom, onKillCallback);

	window.addEventListener('resize', function() {
		resizeCanvas();
		game.updateSize(window.innerWidth, window.innerHeight);
	});
}

window.addEventListener('load', init)