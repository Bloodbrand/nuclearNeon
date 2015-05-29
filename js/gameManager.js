var trackHolder = new THREE.Object3D();
var trackObjectsArray = [];
var player;

function startGame () {
	generateTrack.addInitialModule();
	generateTrack.addModule(maxModules, 0);
	scene.add(trackHolder);

	player = makeShip();
	scene.add(player);
}

function gameLoop () {	
	takeInput();
	moveTrack();
	movePlayer.update();
	detectOffscreenModule();
}

var generateTrack = {
	totalModules: Number(0),
	addModule: function (num) {		
		for (var module = 0; module < num; module++) {
			var newTrack = makeTrackModule();
			var length = trackHolder.children.length;
			var lastModule = trackHolder.children[length-1];
			newTrack.position.z = lastModule.position.z - lastModule.zValue / 2 - newTrack.zValue / 2 ;

			//wave pattern
			newTrack.position.y = Math.sin(this.totalModules) * 5;
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
}

function detectOffscreenModule () {	
	var intersects = trackModuleRaycaster.intersectObjects( trackHolder.children );
	if(intersects[0]){
		trackHolder.remove(intersects[0].object);
		trackObjectsArray.shift();
		generateTrack.addModule(1);
	} 
}

function detectTrackObjects (obj) {
	//if(obj){if(obj.object.parent) obj.object.parent.remove(obj.object);
	if(obj)
	console.log(obj.object.name)
	
}
