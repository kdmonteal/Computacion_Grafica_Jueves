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
    scene.background = new THREE.Color(0xE9E6C6); //0x043eaa
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

    // Objeto Scene
    const geometry = new THREE.PlaneGeometry( 102, 102 );
    const material = new THREE.MeshStandardMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );
    plane.rotation.x = Math.PI / 2;

    const geometryCube = new THREE.BoxGeometry( 1, 1, 1 );
    const materialCube = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometryCube, materialCube );
    scene.add( cube );
    cube.position.y = 0.5;
    cube.castShadow = true;
}
function createLight(typeLight) {
    switch(typeLight) {
        case 'AmbientLight':
            const AmbientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
            scene.add( AmbientLight );
          break;
        case 'DirectionalLight':
            // White directional light at half intensity shining from the top.
            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            scene.add( directionalLight );
          break;
        case 'PointLight':
            const PointLight = new THREE.PointLight( 0xffffff, 1, 100 );
            PointLight.position.set( 1, 2, 1 );
            scene.add( PointLight );

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper( PointLight, sphereSize );
            scene.add( pointLightHelper );
          break;
        case 'SpotLight': // pending
            const spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.position.set( 100, 1000, 100 );
            spotLight.map = new THREE.TextureLoader().load( url );

            spotLight.castShadow = true;

            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            scene.add( spotLight );
          break;
      }
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
            const geometry = new THREE.BoxGeometry(document.getElementById('widthCube').value, document.getElementById('heightCube').value, document.getElementById('depthCube').value);
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,
                                                            wireframe: false} );
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