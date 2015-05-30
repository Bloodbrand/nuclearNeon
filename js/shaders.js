var shaderSettings = {
	planeUnderneathSettings:{
		uniforms: {
		  	amplitude: {
		    type: 'f',
		    value: 1
		  	}
		},
		attributes: {
		 	displacement: {
		    type: 'f',
		    value: []
		 	}
		}
	}
}

function updateShaders (frameNumber) {
	shaderSettings.planeUnderneathSettings.
		uniforms.amplitude.value = Math.sin(frameNumber / 30) ;
}

function trackShaderMaterial () {
	var material = new THREE.ShaderMaterial({ 
		uniforms: {}, 
		attributes: {}, 
		vertexShader: vertexShader(), 
		fragmentShader: fragmentShader(),
		transparent: true,
		wireframe: false
	});

	return material;

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
		//lanes
		"color = (sin((position.x) * 15.8 ) / 2.0) / sin(position.y * 3.1);"+
		//circles under lanes
		"if(color < 0.3) color = sin(position.y * 50.0) * sin(position.x * 50.0);"+
		"gl_FragColor=vec4( 0, color / 3.0, color, 1.0);}"

		return fragSh;
	}
}

function planeUnderneathMaterial (geometry) {
	var material = new THREE.ShaderMaterial({ 
      	uniforms: shaderSettings.planeUnderneathSettings.uniforms,
		attributes: shaderSettings.planeUnderneathSettings.attributes, 
		vertexShader: vertexShader(), 
		fragmentShader: fragmentShader(),
		transparent: true,
		wireframe: true
	});

	var verts = geometry.vertices;

	var values = shaderSettings.planeUnderneathSettings.attributes.displacement.value;

	for (var v = 0; v < verts.length; v++) {
	  values.push(Math.sin(Math.random()) * 50);	  
	  //values.push(0);
	}

	return material;

	function vertexShader () {
		var vertSh = 

		"attribute float displacement;"+
		"uniform float amplitude;"+
		"varying vec2 vUv;"+
		"varying vec3 vNormal;"+
		"void main(){"+	
		"vUv = uv;"+
		"vNormal = normal;"+
		"vec3 newPosition = position + normal * vec3(displacement * amplitude);"+
		"gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);}"

		return vertSh;
	}

	function fragmentShader () {
		var fragSh = 

		"uniform float amplitude;"+
		"varying vec2 vUv;"+
		"void main(){"+
		"float color = 0.0;"+
		"vec2 position = vUv;"+
		"color = sin(position.y * (amplitude * 20.0)) * sin(position.x * 100.0);"+
		//"color = sin((position.x) * 50.0 ) / sin((gl_FragCoord.y / 21.0));"+
		//"color = sin(position.y + (amplitude / 3.0)) / sin((gl_FragCoord.x / 21.0));"+
		"if(color < 0.2) color  = 1.0; else discard;"+
		"gl_FragColor=vec4( 0, color / 2.0, color, 1.0);}"

		return fragSh;
	}
}


//"color += tan((position.x) * 100.0 ) * tan((position.y) * 100.0 );"+
//"color += tan((position.x + position.y) * 51.0);"+
//"sin((position.x) * 100.0 ) / sin((position.y) * 100.0 ),"+
//"sin(gl_FragCoord.y / 5.0)*22.0+color*5.0, 0.5);}"