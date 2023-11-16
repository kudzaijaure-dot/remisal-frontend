

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize( window.innerWidth, window.innerHeight );

renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild( renderer.domElement );



const loader = new THREE.GLTFLoader();

loader.load( 'assets/models/remisallogo3.gltf', function ( gltf ) {
	const mesh = gltf.scene;

	mesh.traverse((child) => {
		if(child.isMesh) {
			child.castShadow = true;
			child.receiveShadow = true;
		}
	})


	mesh.position.set(-0.5,-0.1,-0.4)

	scene.add( mesh );

}, undefined, function ( error ) {

	console.error( error );

} );

camera.position.set(-1,0.9,1.5);
camera.lookAt(1,1,-1);



const groundGeometry = new THREE.PlaneGeometry(20,20,32,32)
groundGeometry.rotateX(-Math.PI/2)

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
})

const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
groundMesh.castShadow = false;
groundMesh.receiveShadow = true;

scene.add(groundMesh)

const spotLight = new THREE.SpotLight(0xffffff, 7, 100, 0.12, 1.3);
spotLight.position.set(-5,22,8)
spotLight.castShadow = true;
scene.add(spotLight)



function animate() {
	requestAnimationFrame( animate );
	// controls.update();
	renderer.render( scene, camera );
}

animate();