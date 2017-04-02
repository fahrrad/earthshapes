
init();

var renderer, scene, camera, cube, pot, wireframe;

function init() {
		scene = new THREE.Scene();

		var material =
				new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );

		var loader = new THREE.STLLoader();
		loader.load(
				// resource URL
				'models/ellipse.stl',
				// Function when resource is loaded
				function ( geometry ) {
						pot = new THREE.EdgesGeometry( geometry );
						wireframe = new THREE.LineSegments( pot, material );
						wireframe.rotation.x = -1;
						scene.add( wireframe );
				},
				// Function called when download progresses
				function ( xhr ) {
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
				}
		);


		// Lights
		camera = new THREE.PerspectiveCamera(75,
																				 window.innerWidth/window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer( { antialias: true } );

		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild(renderer.domElement);

		camera.position.z = 40;
		camera.lookAt( scene.position );
		renderer.render(scene, camera);

}

function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
		if(wireframe){
				wireframe.rotation.z += 0.01;
				
		}
		
}
render();
