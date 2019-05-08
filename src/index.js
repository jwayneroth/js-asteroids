//var THREE = require('three');
import createjs from "createjs";
import AsteroidsGame from './lib/game.js'
import './scss/styles.scss'

var Stats = require('stats.js')

const DISPLACEMENT      = -.2, //-0.16,
			SPRING_STRENGTH   = 0.0005,
			DAMPEN            = 0.15, //0.998,
			RESOLUTION        = window.devicePixelRatio || 1;

let canvas, stage, anim_container, dom_overlay_container;
let game;
let scene, renderer, camera, planeGeometry, planeMap, planeMaterial, plane;
let callbacks, mousePressed, autoDistortTimer;
let composer;
let stats;

function init() {
	initGame();
	initThree();
}

function initThree() {
	stats = new Stats();
	stats.showPanel( 0 );
	document.body.appendChild( stats.dom );
	scene = new THREE.Scene();
	//scene.background = new THREE.TextureLoader().load('images/vector-bg.png');
	scene.background = new THREE.Color( 0x000000 );
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 0;
	//camera.lookAt(scene.position);
	renderer = new THREE.WebGLRenderer({
		antialias: true,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.autoClear = false;
	renderer.setPixelRatio(window.devicePixelRatio || 1);
	//renderer.shadowMap.enabled = true;
	renderer.render(scene, camera);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	createObjects();
	createSprings();
	//bindCallbacks();
	
	//////////////////////////////
	// from unreal bloom example
	//////////////////////////////
	var params = {
		exposure: 1.1,               // 0 - 2
		bloomStrength: 2.5, //1.5,  // 0 - 3 
		bloomThreshold: 0,          // 0 - 1
		bloomRadius: 0              // 0 - 1
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
	renderer.toneMappingExposure = Math.pow( params.exposure, 4.0 );
	//////////////////////////////
	
	//requestAnimationFrame( animate )
	createjs.Ticker.framerate = 26;
	createjs.Ticker.timingMode = 'RAF_SYNCHED';
	createjs.Ticker.addEventListener("tick", animate);
}

function animate () {
	stats.begin();
	
	updateVertexSprings();
	
	plane.material.map.needsUpdate = true
	plane.geometry.verticesNeedUpdate = true;
	plane.geometry.normalsNeedUpdate = true;
	plane.geometry.computeFaceNormals();
	plane.geometry.computeVertexNormals();
	
	//renderer.render(scene, camera);
	composer.render();
	
	game.gameRun();
	
	if (Date.now() % 1000 === 0) {
		console.log('Ticker FPS:' + createjs.Ticker.getMeasuredFPS());
	}
	stats.end();
	
	//requestAnimationFrame( animate );
}

function createObjects() {
	const maxWidth = visibleWidthAtZDepth( -100, camera);
	var height = visibleHeightAtZDepth( -100, camera )
	var width = height * camera.aspect;
	planeGeometry = new THREE.PlaneGeometry(width, height, 8, 8); //maxWidth, maxWidth/2, 20, 10);
	planeMap = new THREE.Texture(game.stage.canvas);  
	//planeMap.needsUpdate = true;  
	planeMap.minFilter = THREE.LinearFilter;
	planeMap.magFilter = THREE.LinearFilter;
	//planeMap.generateMipmaps = false;
	//planeMap.anisotropy = 16;
	//planeMap.flipY = false;
	planeMaterial = new THREE.MeshBasicMaterial();
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

function checkIntersection(mouseX, mouseY) {
	//console.log('checkIntersection', mouseX, mouseY);
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
		}, 350);
	}
}

function initGame() {
	console.log('init')
	canvas = document.getElementById("canvas");
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
	
	stage = new createjs.StageGL(canvas, { antialias: true });
	stage.setClearColor('#000000');
	
	const right = window.innerWidth;
	const bottom = window.innerHeight;
	const onKillCallback = function(dx, dy) {
		checkIntersection(dx, dy);
	};
	const onDieCallback = function(dx, dy) {
		checkIntersection(dx, dy);
	};
	game = new AsteroidsGame(stage, right, bottom, onKillCallback, onDieCallback);

	window.addEventListener('resize', function() {
		resizeCanvas();
		game.updateSize(window.innerWidth, window.innerHeight);
		//camera.aspect = window.innerWidth / window.innerHeight;
		//camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	});
}

window.addEventListener('load', init)