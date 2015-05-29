function shaderMaterial () {
	var material = new THREE.ShaderMaterial({ 
		uniforms: {}, 
		attributes: {}, 
		vertexShader: vertexShader(), 
		fragmentShader: fragmentShader(),
		transparent: true,
		wireframe: false
	});

	return material;
}

function vertexShader () {
	var vertSh = 

	"varying vec2 vUv;"+	
	"void main(){"+
	"vUv = uv;"+
	"gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);}"

	return vertSh;
}

function fragmentShader () {
	var fragSh = 

	"varying vec2 vUv;"+
	"void main(){"+
	"float color = 0.0;"+
	"vec2 position = vUv;"+
	"color = (sin((position.x) * 15.7 ) / 2.0) / sin(position.y * 3.1);"+
	"if(color < 0.0) discard;"+
	"gl_FragColor=vec4( 0, color / 3.0, color, 1.0);}"

	return fragSh;
}

//"color += tan((position.x) * 100.0 ) * tan((position.y) * 100.0 );"+
//"color += tan((position.x + position.y) * 51.0);"+
//"sin((position.x) * 100.0 ) / sin((position.y) * 100.0 ),"+
//"sin(gl_FragCoord.y / 5.0)*22.0+color*5.0, 0.5);}"