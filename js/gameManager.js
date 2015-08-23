define(['THREE', 'jquery', 'models', 'settings'],
	function(THREE, jquery, models, settings){
return function(){
	var _this = this;
	var startTime, currentTime, player;
	var trackHolder = new THREE.Object3D(), underPlanesHolder = new THREE.Object3D();
	var trackObjectsArray = [], scoreBoard = $('#score');

<<<<<<< HEAD
return{
	trackModuleRaycaster: {}
	,
	playerHeightRaycaster: {}
	,
	startGame: function(scene){
		_this.startTime = new Date().getTime();
		this.generateTrack.addInitialModule();
		this.generateTrack.addModule(settings.maxModules, 0);
		_this.player = models.makeShip();
		scene.add(trackHolder);
		scene.add(_this.player);
		scene.add(underPlanesHolder.add(models.makePlane()));
	}
	,
	gameLoop: function () {
		this.manageTime();
		//takeInput();
		this.moveTrack();
		//movePlayer.update();
		//rangeToObj();
		this.detectOffscreenModule();
	}
	,
	manageTime: function () {
		_this.currentTime = new Date().getTime();
		scoreBoard.text('distance: ' + -Math.floor(((_this.startTime - _this.currentTime) / 100) *
				settings.speed).toString());
	}
	,
	returnPlayer: function(){
		return _this.player;
	}
	,
	generateTrack: {
		totalModules: Number(0)
		,
		addModule: function (num) {
			for (var module = 0; module < num; module++) {
				var newTrack = models.makeTrackModule();
				trackObjectsArray.push(newTrack);
				var length = trackHolder.children.length;
				var lastModule = trackHolder.children[length-1];
				newTrack.position.z = lastModule.position.z - (lastModule.zValue / 2)
					- (newTrack.zValue / 2);

				//wave pattern
				newTrack.position.y = Math.sin(this.totalModules) * 5;
				//rotation
				//newTrack.rotation.z = this.totalModules * (Math.PI / 22.5);
				this.totalModules++;
=======
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
			//camera.rotation.z += Math.PI / 20;
			this.totalModules++;
>>>>>>> 5f73d32fe4625e88799c2365af25ede1e72138bb

				trackHolder.add(newTrack);
			}
		}
		,
		addInitialModule: function() {
			//add module at start, no check every add for length
			var newTrack = models.makeTrackModule();
			trackHolder.add(newTrack);
		}
	}
	,
	moveTrack: function() {
		for (var module = 0; module < trackHolder.children.length; module++)
			trackHolder.children[module].position.z += settings.speed;
			//underPlanesHolder.position.z += speed;

	}
	,
	detectOffscreenModule: function () {
		var intersects = this.trackModuleRaycaster.intersectObjects( trackHolder.children );
		if(intersects[0]){
			trackHolder.remove(intersects[0].object);
			trackObjectsArray.shift();
			this.generateTrack.addModule(1);
		}
	}
}
}()
})

//var startTime, currentTime;
//var trackHolder = new THREE.Object3D(), underPlanesHolder = new THREE.Object3D();
//var trackObjectsArray = [];
//var player;
//
//function startGame () {
//	startTime = new Date().getTime();
//	generateTrack.addInitialModule();
//	generateTrack.addModule(maxModules, 0);
//	player = makeShip();
//
//	scene.add(trackHolder);
//	scene.add(player);
//	scene.add(underPlanesHolder.add(makePlane()));
//}
//
//function gameLoop () {
//	manageTime();
//	takeInput();
//	moveTrack();
//	movePlayer.update();
//	rangeToObj();
//	detectOffscreenModule();
//}
//
//var generateTrack = {
//	totalModules: Number(0),
//	addModule: function (num) {
//		for (var module = 0; module < num; module++) {
//			var newTrack = makeTrackModule();
//			var length = trackHolder.children.length;
//			var lastModule = trackHolder.children[length-1];
//			newTrack.position.z = lastModule.position.z - (lastModule.zValue / 2)
//				- (newTrack.zValue / 2);
//
//			//wave pattern
//			newTrack.position.y = Math.sin(this.totalModules) * 5;
//
//			//rotation
//			//newTrack.rotation.z = this.totalModules * (Math.PI / 22.5);
//			this.totalModules++;
//
//			trackHolder.add(newTrack);
//		};
//	},
//	addInitialModule: function() {
//		//add module at start, no check every add for length
//		var newTrack = makeTrackModule();
//		trackHolder.add(newTrack);
//	}
//}
//
//function moveTrack () {
//	for (var module = 0; module < trackHolder.children.length; module++)
//		trackHolder.children[module].position.z += speed;
//
//	//underPlanesHolder.position.z += speed;
//
//}
//
//function detectOffscreenModule () {
//	var intersects = trackModuleRaycaster.intersectObjects( trackHolder.children );
//	if(intersects[0]){
//		trackHolder.remove(intersects[0].object);
//		trackObjectsArray.shift();
//		generateTrack.addModule(1);
//	}
//}
//
//function manageTime () {
//	currentTime = new Date().getTime();
//	scoreBoard.text('distance: ' + -Math.floor(((startTime - currentTime) / 100) * speed).toString());
//}
//
//
//function rangeToObj () {
//
//}
