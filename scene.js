
init();

var renderer, scene, camera, cube, pot, wireframe;

function init() {
		scene = new THREE.Scene();

		// background
		var backgroundPlaneGeo = new THREE.PlaneGeometry(200,200);
		var backgroundMaterial = new THREE.MeshBasicMaterial({color: 0xffffff });
		var backgroundPlane = new THREE.Mesh(backgroundPlaneGeo,
																				 backgroundMaterial); 
		backgroundPlane.position.z = -30;
		scene.add(backgroundPlane);
		
		// Pot
		var material =
				new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
		var loader = new THREE.STLLoader();
		loader.load(
				'models/ellipse.stl',
				function ( geometry ) {
						pot = new THREE.EdgesGeometry( geometry );
						wireframe = new THREE.LineSegments( pot, material );
						wireframe.rotation.x = -1;
						wireframe.position.y = 2;
						wireframe.position.x = -20;
						scene.add( wireframe );
				}
		);


		camera = new THREE.PerspectiveCamera(50,
																				 window.innerWidth/window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer( { antialias: true } );

		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild(renderer.domElement);

		camera.position.z = 40;
		camera.position.y += 10;
		//camera.lookAt( scene.position );
							renderer.render(scene, camera);}
		;

function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
		if(wireframe){
				wireframe.rotation.z += 0.01;
		}
}
render();
