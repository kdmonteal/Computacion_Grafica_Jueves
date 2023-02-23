/*  Author(A): Kelly Daniella Marin
    Date of creation: 16-02-2023
    Last modification: 23-02-2023 */

// Principales variables son:
var scene = null,    // The place
    camera = null,   // To see
    renderer = null, // To represent
    myCanvas = null, // To draw
    controls = null, // To Move
    
    // Geometry to move or animate (rotate)
    cube = null,
    cone = null;     

// Call all functions that allow create 3D
function start3dService() {
    initScene();        // To inicializate the project
    createGeometries();
    animate();          // To represent frame by frame (Update)...
}

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75,   // FOV (Fild of view)
                                        window.innerWidth / window.innerHeight, // ASPECT (Size of Screen)
                                        0.1,  // NEAR (Cerca)
                                        1000 ); //FAR (lejos)

    myCanvas = document.querySelector('.webgl'); 
    renderer = new THREE.WebGLRenderer({canvas: myCanvas});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

function createGeometries() {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    const geometryCone = new THREE.ConeGeometry(1, 3, 10 );
    const materialCone = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    cone = new THREE.Mesh( geometryCone, materialCone );
    scene.add( cone );

    cone.position.x = 3;
    camera.position.z = 5;
}

function animate() {
	requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

	renderer.render( scene, camera );
}


console.log(THREE);