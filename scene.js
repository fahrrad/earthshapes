function renderPot(parentElement){
		var width = 470;
		var height = 400;

		var renderer, scene, camera, cube, pot,
				rotateP;

		rotateP = true;
		
		var loader = new THREE.STLLoader();
		var materialLoader = new THREE.TextureLoader();
			
		function loadModel(modelFile){
				loader.load(
						modelFile,
						function ( geometry ) {
								loadModelWithTexture(geometry, 'assets/wooden.jpg');
						}
				);
		}

		function loadModelWithTexture(geometry, texture) {
				materialLoader.load(texture, function(m){
						var purpleMat = new THREE.MeshPhongMaterial( { color: 0xe8ba23, shininess: 30 } );
						var material = new THREE.MeshBasicMaterial( { map:m } );
						scene.remove(pot);
						pot = new THREE.Mesh( geometry, purpleMat );
						
						pot.rotation.x = -1.5;

						pot.position.y = -10;
						pot.position.x = -5;

						pot.castShadow = true;
						pot.receiveShadow = true;
						scene.add(pot);
							
				},function ( xhr ) {
						console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
				},function ( xhr ) {
						console.log( 'An error happened' );
				});
		}
		
		function setHeight(x){
				pot.scale.z = x;
		}
		function setLength(x){
				pot.scale.y = x;
		}
		function setWidth(x){
				pot.scale.x = x;
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
				sprite.position.z -= 25;
				sprite.position.y = 0;
				sprite.position.x = 17;
				scene.add( sprite );

				//Lights
				hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
				hemiLight.color.setHSL( 0.6, 1, 0.6 );
				hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
				hemiLight.position.set( 0, 500, 0 );
				scene.add( hemiLight );


				var dirLight = new THREE.DirectionalLight(0xffffff, 1);
				dirLight.position.set(10, 10, 10);
				dirLight.castShadow = true;
				scene.add(dirLight);

				
				backgroundPlane.position.z = -50;
				scene.add(backgroundPlane);
				
				camera = new THREE.PerspectiveCamera(50,
																						 width/height, 0.1, 1000);
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.shadowMap.enabled = true;				

				
				// Ground
				var plane = new THREE.Mesh(
					new THREE.PlaneBufferGeometry( 100, 100 ),
					new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
				);
				plane.receiveShadow= true;
				plane.rotation.x = -Math.PI/2;
				plane.position.y = -15;
//				scene.add( plane );

				renderer.setSize( width, height );
				parentElement.appendChild(renderer.domElement);

				camera.position.z = 60;
				camera.position.y += 10;
				// camera.lookAt( scene.position );
				renderer.render(scene, camera);
		}
		
		function render() {
				requestAnimationFrame( render );
				renderer.render( scene, camera );
				if(pot && rotateP){
						pot.rotation.z += 0.01;
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
