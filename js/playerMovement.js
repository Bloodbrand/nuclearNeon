var movePlayer = {
	moduleBelow: undefined,
	moduleBelowID: 0,	
	verticalTweenTime: 100,
	horizontalTweenTime: 100,
	tweeningHorizontal: false,
	playerLane: 0,
	laneWidth: trackSettings.moduleWidth / 3,
	jumping: false,
	vertical: function () {
		//tween only when above new module
		if(detectModuleChange())
		{
			this.moduleBelowID = this.moduleBelow.object.id;			
			tweenPlayer.followTrack(this.moduleBelow.object.position.y + playerHeight / 2, 
				this.verticalTweenTime);
			playerHeightRaycaster.ray.origin.y = player.position.y + 100;	
		}
	},
	horizontal: function (dir) {
		if(this.tweeningHorizontal) return;
		var movement;
		switch(dir){
			case -1:
				if(this.playerLane == -1) return;
				this.playerLane += dir;
				movement = -movePlayer.laneWidth;
			break;
			case 1:
				if(this.playerLane == 1) return;
				this.playerLane += dir;	
				movement = movePlayer.laneWidth;
			break;
		}

		tweenPlayer.sideways(player.position.x + movement, movePlayer.horizontalTweenTime);

	},
	jump: function(){
		tweenPlayer.jump();
	},
	update: function(){
		this.moduleBelow = getObjectBelow(trackHolder.children);	
		if(!this.jumping) this.vertical();
	}
}

function getObjectBelow (array) {
	var moduleIntersects = playerHeightRaycaster.intersectObjects( array );
	if(moduleIntersects[0]) return moduleIntersects[0];	
}

function detectModuleChange () {
	if(movePlayer.moduleBelow && movePlayer.moduleBelow.object.id != movePlayer.moduleBelowID){
		// var collider = THREEx.Collider.createFromObject3d(movePlayer.moduleBelow.object.children[0]);		
		// console.log(collider)
		// colliders.push(collider);

	    //  var helper	= new THREEx.ColliderHelper(collider);
		// helper.material.color.set('green');
		// movePlayer.moduleBelow.object.children[0].add(helper);
		// helper.update();
		return true;
	}
	else return false;
}

var tweenPlayer = {
	sideways: function(value, time){	
		var sideTween = new TWEEN.Tween(player.position);
		var raycasterTween = new TWEEN.Tween(playerHeightRaycaster.ray.origin);

		movePlayer.tweeningHorizontal = true;
		var rotTween = new TWEEN.Tween(player.rotation);
		rotTween.to({ z: (-Math.PI / 2) * (value / movePlayer.laneWidth) }, time);
		rotTween.start();

		sideTween.to({ x: value }, time);
		raycasterTween.to({ x: value }, time);
		rotTween.onComplete(function() {movePlayer.tweeningHorizontal = false;});
		sideTween.start();
		raycasterTween.start();
	},
	followTrack: function(value, time){	
		var followTween = new TWEEN.Tween(player.position);
		followTween.to({ y: value }, time);
		followTween.start();
	},
	jump: function () {
		if(movePlayer.jumping) return;
		movePlayer.jumping = true;
		var jumpTween = new TWEEN.Tween(player.position);
		jumpTween.to({ y: 50 }, 500);
		jumpTween.easing(TWEEN.Easing.Cubic.Out);
		jumpTween.start();

		var landTween = new TWEEN.Tween(player.position);
		landTween.easing(TWEEN.Easing.Cubic.In);
		landTween.to({ y: movePlayer.moduleBelow.object.position.y }, 500);

		jumpTween.chain(landTween);		
		landTween.onComplete(function() {movePlayer.jumping = false;});
	}			
}