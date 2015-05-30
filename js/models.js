function makeShip () {
	var geometry = new THREE.CylinderGeometry( 0, 6, 30, 3 );
	var matrix = new THREE.Matrix4().makeRotationX ( - Math.PI / 2 );
	geometry.applyMatrix(matrix);
	var material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
	var ship = new THREE.Mesh( geometry, material );
	ship.position.y = 5;
	ship.name = 'ship';
	return ship;
}

function makeTrackModule () {
	var geometry = new THREE.BoxGeometry( trackSettings.moduleWidth, 1, trackSettings.moduleLength );
	var material = trackShaderMaterial();
	var module = new THREE.Mesh( geometry, material );	
	var trackObject = addTrackObject.pickObject();
	trackObjectsArray.push(trackObject);	
	module.add(trackObject);
	module.add(addTrackObject.returnSide());
	module.zValue = trackSettings.moduleLength;
	return module;
}

var addTrackObject = {
	pickObject: function() {
		if(trackSettings.modulesWithoutSpike != trackSettings.spikeFrequency){
			trackSettings.modulesWithoutSpike++;
			return this.returnPickup();
		}
		else {
			trackSettings.modulesWithoutSpike = 0;
			return this.returnSpike();
		}
	},
	returnPickup: function(){
		var geometry = new THREE.SphereGeometry( 5, 4, 3 );
		var randomColor = 0xffffff ;

		if(trackSettings.pickupNum == trackSettings.maxConsecutivePickups){
			trackSettings.pickupXpos = this.determinePosition();
			trackSettings.pickupNum = 1;
		}
		else trackSettings.pickupNum++;

		var material = new THREE.MeshBasicMaterial( {color: randomColor, wireframe: false} );
		var pickup = new THREE.Mesh( geometry, material );	
		pickup.position.x = trackSettings.pickupXpos;
		pickup.position.y = trackSettings.pickupHeight;
		pickup.name = "pickup";
		return pickup;		
	},
	returnSide: function(){
		var geometry = new THREE.SphereGeometry( 3, 2, 20 );
		var num = Math.random();
		var randomColor = new THREE.Color( num, 0, 0);

		var material = new THREE.MeshBasicMaterial( {color: randomColor, wireframe: true} );
		var side1 = new THREE.Mesh( geometry, material );
		var side2 = new THREE.Mesh( geometry, material );
		side1.position.x = -70;	
		side1.position.y = 20;
		side1.rotation.x = -num;
		side1.scale.y = 75 * (num + 1);
		side1.scale.z = 75 * (num + 1);

		side2.position.x = 140;	

		side1.add(side2);
		return side1;		
	},
	returnSpike: function () {
		var geometry = new THREE.CylinderGeometry( 0, 5, trackSettings.spikeHeight, 3 );
		var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		var spike = new THREE.Mesh( geometry, material );
		spike.position.x = this.determinePosition();
		spike.position.y = trackSettings.spikeHeight / 2;
		spike.name = "spike";
		return spike;		
	},
	determinePosition: function(){
		var randomX = -(trackSettings.moduleWidth / 3) * 2 + ((trackSettings.moduleWidth / 3) * 
			Math.ceil(Math.random() * 3));
		return randomX;
	}
}