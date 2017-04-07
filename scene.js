function renderPot(parentElement){
		var width = 470;
		var height = 400;

		var renderer, scene, camera, cube, wireframe,
				material, rotateP;

		rotateP = true;
		
		var loader = new THREE.STLLoader();
		
		function loadModel(modelFile){
				loader.load(
						modelFile,
						function ( geometry ) {
								var pot = new THREE.EdgesGeometry( geometry );
								scene.remove(wireframe);
								wireframe = new THREE.LineSegments( pot, material );
								wireframe.rotation.x = -1.5;
								wireframe.position.y = -4;
								wireframe.position.x = -10;
								scene.add( wireframe );
						}
				);
		}
		
		function setHeight(x){
				wireframe.scale.z = x;
		}
		function setLength(x){
				wireframe.scale.y = x;
		}
		function setWidth(x){
				wireframe.scale.x = x;
		}
		function setAngle(x){
				console.log('set angle not supported');}

		function setDiameter(x){
				setWidth(x);
				setLength(x);
		}

		function toggleRotation(){
				rotateP = !rotateP;
		}

		function setModel(x){
				console.log('set model to ', x);
				if(x === 'square'){
						loadModel('models/square.stl');
				}
				else if(x === 'ellipse'){
						loadModel('models/ellipse.stl');
				}else{
						console.error('can only load square or ellipse model');
				}
		}

		function init() {
				scene = new THREE.Scene();

				// background
				var backgroundPlaneGeo = new THREE.PlaneGeometry(200,200);
				var backgroundMaterial = new THREE.MeshBasicMaterial({color: 0xffffff });
				var backgroundPlane = new THREE.Mesh(backgroundPlaneGeo,
																						 backgroundMaterial);

				var spriteMap = new THREE.TextureLoader().load( "tuindame.JPG" );
				var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
				var sprite = new THREE.Sprite( spriteMaterial );
				sprite.scale.x = 25;
				sprite.scale.y = 50;
				sprite.position.z -= 15;
				sprite.position.y = 10;
				sprite.position.x = 10;
				scene.add( sprite );
								
				backgroundPlane.position.z = -50;
				scene.add(backgroundPlane);
				
				// Pot
				material =
						new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 2 } );
		
				camera = new THREE.PerspectiveCamera(50,
																						 width/height, 0.1, 1000);
				renderer = new THREE.WebGLRenderer( { antialias: true } );

				renderer.setSize( width, height );
				parentElement.appendChild(renderer.domElement);

				camera.position.z = 40;
				camera.position.y += 10;
				//camera.lookAt( scene.position );
				renderer.render(scene, camera);
		}
		
		function render() {
				requestAnimationFrame( render );
				renderer.render( scene, camera );
				if(wireframe && rotateP){
						wireframe.rotation.z += 0.01;
				}
		}

		init();
		render();

		return {
				setHeight: setHeight,
				setLength: setLength,
				setWidth: setWidth,
				setAngle: setAngle,
				setDiameter: setDiameter,
				setModel: setModel,
				toggleRotation: toggleRotation
		};
}
