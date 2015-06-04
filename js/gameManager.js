var startTime, currentTime;
var trackHolder = new THREE.Object3D(), underPlanesHolder = new THREE.Object3D(); 
var trackObjectsArray = [];
var player;

function startGame () {
	startTime = new Date().getTime();
	generateTrack.addInitialModule();
	generateTrack.addModule(maxModules, 0);
	player = makeShip();

	scene.add(trackHolder);
	scene.add(player);
	scene.add(underPlanesHolder.add(makePlane()));
}

function gameLoop () {	
	manageTime();
	takeInput();
	moveTrack();
	movePlayer.update();
	rangeToObj();
	detectOffscreenModule();
}

var generateTrack = {
	totalModules: Number(0),
	addModule: function (num) {		
		for (var module = 0; module < num; module++) {
			var newTrack = makeTrackModule();
			var length = trackHolder.children.length;
			var lastModule = trackHolder.children[length-1];
			newTrack.position.z = lastModule.position.z - (lastModule.zValue / 2) 
				- (newTrack.zValue / 2);

			//wave pattern
			//newTrack.position.y = Math.sin(this.totalModules) * 5;

			//rotation
			//newTrack.rotation.z = this.totalModules * (Math.PI / 22.5);
			this.totalModules++;

			trackHolder.add(newTrack);
		};
	},
	addInitialModule: function() {
		//add module at start, no check every add for length
		var newTrack = makeTrackModule();
		trackHolder.add(newTrack);
	}
}

function moveTrack () {
	for (var module = 0; module < trackHolder.children.length; module++) 
		trackHolder.children[module].position.z += speed;

	//underPlanesHolder.position.z += speed;

}

function detectOffscreenModule () {	
	var intersects = trackModuleRaycaster.intersectObjects( trackHolder.children );
	if(intersects[0]){
		trackHolder.remove(intersects[0].object);
		trackObjectsArray.shift();
		generateTrack.addModule(1);
	} 
}

function manageTime () {
	currentTime = new Date().getTime();
	scoreBoard.text('distance: ' + -Math.floor(((startTime - currentTime) / 100) * speed).toString());
}


function rangeToObj () {

}