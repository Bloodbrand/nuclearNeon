define(['jquery', 'THREE', 'settings', 'gameManager', 'shaders'],
    function(jquery, THREE, settings, gameManager, shaders){
return function(){
    var container, camera, scene, renderer,
        trackObjectRaycaster, keyboard, colliderSystem, frameID;
    var width = window.innerWidth, height = window.innerHeight;
    var trackSettings = settings.trackSettings;

return{
    Init: function() {
        container = document.getElementById( 'container' );
        scene = new THREE.Scene();
        this.addRenderer();
        this.addCamera();
        this.addLight();
        gameManager.startGame(scene);
        this.addRaycasters();
        animate();
    }
    ,
    addRenderer: function(){
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );
        container.appendChild( renderer.domElement );
    }
    ,
    addCamera: function(){
        camera = new THREE.PerspectiveCamera( 45, width / height, settings.camNear, settings.camFar );
        camera.position.set(0, 45, 100);
        camera.lookAt(new THREE.Vector3( 0, 30, 0 ));
        scene.add( camera );
    }
    ,
    addLight: function () {
        scene.add( new THREE.AmbientLight( 0x808080 ) );

        var directionalLight = new THREE.DirectionalLight( 0xffffff );
        directionalLight.position.set( 0, 10, 0 );
        scene.add( directionalLight );
    }
    ,
    ///*game functions*/
    addRaycasters: function () {
        /*trackModuleRaycaster*/
        var origin = new THREE.Vector3().copy(camera.position);
        /*offset origin so modules always get deleted when off screen*/
        origin.z += trackSettings.moduleLength;
        var direction = new THREE.Vector3(0, -1, 0); // down
        gameManager.trackModuleRaycaster = new THREE.Raycaster(origin, direction);

        /*playerHeightRaycaster*/
        origin = new THREE.Vector3().copy(gameManager.returnPlayer().position);
        origin.y += 100;
        origin.z -= 10;
        direction = new THREE.Vector3(0, -1, 0); // down
        gameManager.playerHeightRaycaster = new THREE.Raycaster(origin, direction);
    }
    ,
    initKeyboard: function () {keyboard = new THREEx.KeyboardState() }
}
    function animate() {
        //TWEEN.update();
        //console.log(this.animate)
        frameID = requestAnimationFrame(animate);
        shaders.updateShaders(frameID);
        gameManager.gameLoop(frameID);
        renderer.render(scene, camera);
    }
}();
})
//var container, camera, scene, renderer, trackModuleRaycaster, playerHeightRaycaster,
//	trackObjectRaycaster, keyboard, colliderSystem, frameID;
//var scoreBoard;
//var width = window.innerWidth, height = window.innerHeight;
//
//Init();
//
//function Init() {
//	container = document.getElementById( 'container' );
//	scoreBoard = $('#score');
//
//	scene = new THREE.Scene();
//
//	addRenderer();
//	addCamera();
//	addLight();
//
//	startGame();
//	addRaycasters();
//	initKeyboard();
//
//	animate();
//}
//
///*scene functions*/
//function addRenderer() {
//	renderer = new THREE.WebGLRenderer();
//	renderer.setSize( width, height );
//	container.appendChild( renderer.domElement );
//}
//
//function addLight () {
//	var ambientLight = new THREE.AmbientLight( 0x808080 );
//	scene.add( ambientLight );
//
//	var directionalLight = new THREE.DirectionalLight( 0xffffff );
//	directionalLight.position.set( 0, 10, 0 );
//	scene.add( directionalLight );
//}
//
//function addCamera() {
//	camera = new THREE.PerspectiveCamera( 45, width / height, camNear, camFar );
//	camera.position.set(0, 45, 100);
//	camera.lookAt(new THREE.Vector3( 0, 30, 0 ));
//	scene.add( camera );
//}
//
//function animate() {
//    TWEEN.update();
//	frameID = requestAnimationFrame(animate);
//	updateShaders(frameID);
//	gameLoop(frameID);
//	renderer.render(scene, camera);
//}
//
///*game functions*/
//function addRaycasters () {
//	/*trackModuleRaycaster*/
//	var origin = new THREE.Vector3().copy(camera.position);
//	/*offset origin so modules always get deleted when off screen*/
//	origin.z += trackSettings.moduleLength;
//	var direction = new THREE.Vector3(0, -1, 0); // down
//	trackModuleRaycaster = new THREE.Raycaster(origin, direction);
//
//	/*playerHeightRaycaster*/
//	origin = new THREE.Vector3().copy(player.position);
//	origin.y += 100;
//	origin.z -= 10;
//	direction = new THREE.Vector3(0, -1, 0); // down
//	playerHeightRaycaster = new THREE.Raycaster(origin, direction);
//}
//
//function initKeyboard () {
//	keyboard = new THREEx.KeyboardState();
//}