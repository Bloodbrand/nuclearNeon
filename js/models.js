define(['THREE', 'settings', 'shaders'],function(THREE, settings, shaders){
return function(){
	var trackSettings = settings.trackSettings;
return {
	makeShip: function () {
		var geometry = new THREE.CylinderGeometry(0, 6, 30, 3);
		var matrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
		geometry.applyMatrix(matrix);
		var material = shaders.trackShaderMaterial();
		var ship = new THREE.Mesh(geometry, material);
		ship.position.y = 15;
		ship.name = 'ship';
		return ship;
	},
	makeTrackModule: function () {
		var geometry = new THREE.BoxGeometry(trackSettings.moduleWidth, 1, trackSettings.moduleLength);
		var material = shaders.trackShaderMaterial();
		var module = new THREE.Mesh(geometry, material);
		var trackObject = this.makeTrackObject.pickObject();
		module.add(trackObject);
		module.add(this.makeTrackObject.returnSide());
		module.zValue = trackSettings.moduleLength;
		return module;
	}
	,
	makeTrackObject: {
		pickObject: function () {
			if (trackSettings.modulesWithoutSpike != trackSettings.spikeFrequency) {
				trackSettings.modulesWithoutSpike++;
				return this.returnPickup();
			}
			else {
				trackSettings.modulesWithoutSpike = 0;
				return this.returnSpike();
			}
		},
		returnPickup: function () {
			var geometry = new THREE.SphereGeometry(5, 4, 3);
			var randomColor = 0xffffff;

			if (trackSettings.pickupNum == trackSettings.maxConsecutivePickups) {
				trackSettings.pickupXpos = this.determinePosition();
				trackSettings.pickupNum = 1;
			}
			else trackSettings.pickupNum++;

<<<<<<< HEAD
			var material = new THREE.MeshBasicMaterial({color: randomColor, wireframe: false});
			var pickup = new THREE.Mesh(geometry, material);
			pickup.position.x = trackSettings.pickupXpos;
			pickup.position.y = trackSettings.pickupHeight;
			pickup.name = "pickup";
			return pickup;
		},
		returnSide: function () {
			var geometry = new THREE.BoxGeometry(1, 1, 1);
			var num = Math.random();
			var randomColor = new THREE.Color(0, 0, 1);
			var material = new THREE.MeshBasicMaterial({color: randomColor, wireframe: false});
			var side1 = new THREE.Mesh(geometry, material);
			var side2 = new THREE.Mesh(geometry, material);
			side1.position.x = -70;
			side1.position.y = num;
			side1.rotation.x = -Math.PI / 3;
			side1.scale.y = 2000;
			side1.scale.z = 100;
=======
		var material = new THREE.MeshBasicMaterial( {color: randomColor, wireframe: false} );
		var pickup = new THREE.Mesh( geometry, material );	
		pickup.position.x = trackSettings.pickupXpos;
		pickup.position.y = trackSettings.pickupHeight;
		pickup.name = "pickup";
		return pickup;		
	},
	returnSide: function(){
		var num = Math.random();
		var geometry = new THREE.BoxGeometry(num, num, num);
		var randomColor = new THREE.Color( 1, 1, 1);
		var material = new THREE.MeshBasicMaterial( {color: randomColor, wireframe: false} );
		var side1 = new THREE.Mesh( geometry, material );
		var side2 = new THREE.Mesh( geometry, material );
		side1.position.x = -70;	
		side1.position.y += num * 30;
		side1.rotation.x = -Math.PI / 2;
		side1.scale.y = 1000;
		side1.scale.z = 1;
>>>>>>> 5f73d32fe4625e88799c2365af25ede1e72138bb

			side2.position.x = 140;

<<<<<<< HEAD
			side1.add(side2);
			return side1;
		},
		returnSpike: function () {
			var geometry = new THREE.CylinderGeometry(0, 15, trackSettings.spikeHeight, 3);
			var material = new THREE.MeshBasicMaterial({color: 0xff0000});
			var spike = new THREE.Mesh(geometry, material);
			spike.position.x = this.determinePosition();
			spike.position.y = trackSettings.spikeHeight / 2;
			spike.name = "spike";
			return spike;
		},
		determinePosition: function () {
			var randomX = -(trackSettings.moduleWidth / 3) * 2 + ((trackSettings.moduleWidth / 3) *
				Math.ceil(Math.random() * 3));
			return randomX;
		}
	}
	,
	makePlane: function () {
		var geometry = new THREE.PlaneGeometry(12000, 12000, 75, 75);
		var roatationMatrix = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
		geometry.applyMatrix(roatationMatrix);

		var material = shaders.planeUnderneathMaterial(geometry);
		var plane = new THREE.Mesh(geometry, material);
		plane.position.set(-33, -170, -6000);
		return plane;
	}
}
}()
})
=======
		side1.add(side2);
		return side1;		
	},
	returnSpike: function () {
		var geometry = new THREE.CylinderGeometry( 0, 15, trackSettings.spikeHeight, 3 );
		//var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
		var material = shipShaderMaterial();
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

function makePlane () {
	var geometry = new THREE.SphereGeometry( 2500, 100, 100 );
	var roatationMatrix = new THREE.Matrix4().makeRotationY ( -Math.PI / 2 );
	geometry.applyMatrix(roatationMatrix);
	var roatationMatrix = new THREE.Matrix4().makeRotationX ( -Math.PI / 2 );
	geometry.applyMatrix(roatationMatrix);

	var material = planeUnderneathMaterial(geometry);
	var plane = new THREE.Mesh(geometry, material);
	plane.scale.z = 0;
	plane.scale.z = 3.5;
	plane.position.set(0, 0, -7000);
	return plane;
}
>>>>>>> 5f73d32fe4625e88799c2365af25ede1e72138bb
