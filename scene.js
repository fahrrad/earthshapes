
init();

var renderer, scene, camera, cube, pot;

function init() {
		scene = new THREE.Scene();
		material = new THREE.ShaderMaterial( {

        uniforms:       {
            showOutline: {type: 'f', value: 0 },
            ambientWeight: {type: 'f', value : 0 },
            diffuseWeight: {type: 'f', value : 1 },
            rimWeight: {type: 'f', value : 1 },
            specularWeight: {type: 'f', value : 1 },
            shininess: {type: 'f', value : 1 },
            invertRim: {type: 'i', value: 0 },
            inkColor: { type: 'v4', value: new THREE.Vector3( 0, 0,0 ) },
            solidRender: {type: 'i', value: 0 },
            resolution: {type: 'v2', value: new THREE.Vector2( 0, 0 ) },
            bkgResolution: {type: 'v2', value: new THREE.Vector2( 0, 0 ) },
            lightPosition: {type: 'v3', value: new THREE.Vector3( -100, 100, 0 ) },
            hatch1: { type: 't', value: THREE.ImageUtils.loadTexture( 'hatch_1.jpg' ) },
            paper: { type: 't', value: THREE.ImageUtils.loadTexture( 'placeholder.jpg' ) },
            repeat: { type: 'v2', value: new THREE.Vector2( 0, 0 ) }
        },
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent

    });

    material.uniforms.paper.value.generateMipmaps = false;
    material.uniforms.paper.value.magFilter = THREE.LinearFilter;
    material.uniforms.paper.value.minFilter = THREE.LinearFilter;

    material.uniforms.repeat.value.set( 1,1 );
    material.uniforms.hatch1.value.wrapS = material.uniforms.hatch1.value.wrapT = THREE.RepeatWrapping;
    material.uniforms.inkColor.value.set( 72, 72, 233, 1 );

		material.depthWrite = true;
    material.uniforms.showOutline.value = 0;

		material.uniforms.ambientWeight.value = 8 / 100;
    material.uniforms.diffuseWeight.value = 100 / 100;
    material.uniforms.rimWeight.value = 46 / 100;
    material.uniforms.specularWeight.value = 100  / 100;
    material.uniforms.shininess.value = 49;
    material.uniforms.invertRim.value = 1;
    material.uniforms.solidRender.value = 1;
		material.uniforms.repeat.value.set( 1,1 );

		var loader = new THREE.STLLoader();
		loader.load(
				// resource URL
				'pot.stl',
				// Function when resource is loaded
				function ( geometry ) {
						pot = new THREE.Mesh(geometry, material);

						scene.add( pot );
				},
				// Function called when download progresses
				function ( xhr ) {
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
				}
		);


		// Lights
		scene.add( new THREE.AmbientLight( 0x222222 ) );
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
		directionalLight.position.set( 1, 1, 1 ).normalize();
		scene.add( directionalLight );
		var pointLight = new THREE.PointLight( 0xffffff, 2, 800 );
		// particleLight.add( pointLight );

		camera = new THREE.PerspectiveCamera(75,
																				 window.innerWidth/window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );

		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild(renderer.domElement);
		var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		scene.add( ambientlight );
		var light = new THREE.PointLight( 0xff0000, 10, 10 );
		light.position.set( 0, 2, 0 );
		scene.add( light );
		
		var ambientlight = new THREE.AmbientLight( 0x404040 ); // soft white light
		scene.add( ambientlight );
		var light = new THREE.PointLight( 0xff0000, 10, 10 );
		light.position.set( 0, 2, 0 );
		scene.add( light );
		
		renderer.setSize( window.innerWidth, window.innerHeight );

		camera.position.z = 4;
		camera.lookAt( scene.position );
		renderer.render(scene, camera);

}

function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
		if(pot){
				// pot.rotation.y += 0.01;
				pot.rotation.z += 0.01;
				pot.rotation.x = -1;
				//				pot.rotation.y += 0.01

		}
		
}
render();
