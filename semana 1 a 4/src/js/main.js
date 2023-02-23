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
    cone = null,
    cylinder = null;     

// Call all functions that allow create 3D
function start3dService() {
    initScene();        // To inicializate the project
    //createGeometries();
    animate();          // To represent frame by frame (Update)...
    window.addEventListener( 'resize', onWindowResize, false );
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x043eaa);
    camera = new THREE.PerspectiveCamera( 75,   // FOV (Fild of view)
                                        window.innerWidth / window.innerHeight, // ASPECT (Size of Screen)
                                        0.1,  // NEAR (Cerca)
                                        1000 ); //FAR (lejos)

    myCanvas = document.querySelector('.webgl'); 
    renderer = new THREE.WebGLRenderer({canvas: myCanvas});
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // To make Controls
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.set(2,4,2);
    controls.update();

    // Create Grid
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, 
                                             divisions, 
                                             0x000,      // Color Cruz 
                                             0xffffff ); // Color de las cuadriculas
    scene.add( gridHelper );

    // Axes Helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
}

function createGeometries(geometries) {

    switch(geometries) {
        case 'Cylinder':
            const geometryCylinder = new THREE.CylinderGeometry( 1, 1, 3, 10 );
            const materialCylinder = new THREE.MeshBasicMaterial( {color: 0xf0f0ff,
                                                            wireframe: true} );
            cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );
            scene.add( cylinder );
          break;
        case 'Cube':
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,
                                                            wireframe: true} );
            cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
          break;
        case 'Cone':
            const geometryCone = new THREE.ConeGeometry(1, 3, 10 );
            const materialCone = new THREE.MeshBasicMaterial( {color: 0xffff00,
                                                            wireframe: true} );
            cone = new THREE.Mesh( geometryCone, materialCone );
            scene.add( cone );
          break;
      }
}

function animate() {
	requestAnimationFrame( animate );
    controls.update();

    /*cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;*/
    
	renderer.render( scene, camera );
}

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function openForm(nameForm) {
    document.getElementById(nameForm).style.display = "block";
}

function closeForm(nameForm) {
    document.getElementById(nameForm).style.display = "none";
}

console.log(THREE);