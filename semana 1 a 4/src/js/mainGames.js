/*  Author(A): Carlos Rivera
    Date of creation: 30-03-2023
    Last modification: 30-03-2023 */

// Principales variables son:
var scene = null,    // The place
    camera = null,   // To see
    renderer = null, // To represent
    myCanvas = null, // To draw
    controls = null; // To Move


// Call all functions that allow create 3D
function start3dService() {
    initScene();        // To inicializate the project
    createDashboard();
    animate();          // To represent frame by frame (Update)...
    window.addEventListener('resize', onWindowResize, false);
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000); //0x043eaa
    camera = new THREE.PerspectiveCamera(75,   // FOV (Fild of view)
        window.innerWidth / window.innerHeight, // ASPECT (Size of Screen)
        0.1,  // NEAR (Cerca)
        1000); //FAR (lejos)

    myCanvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
    renderer.setSize(window.innerWidth-20, window.innerHeight-50);//window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // To make Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(6, 13, 6);

    controls.update();

    // Create Grid
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size,
        divisions,
        0x000,      // Color Cruz 
        0xffffff); // Color de las cuadriculas
      /* scene.add(gridHelper); */

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    createLight('AmbientLight');
}

function createDashboard(){
 const geometry = new THREE.PlaneGeometry( 30, 30 );
 const loader = new THREE.TextureLoader();
 

 const material = new THREE.MeshBasicMaterial( {color: 0xffffff,
    map: loader.load('../img/textura_parchis.jpg'),
    side: THREE.DoubleSide} );
 const plane = new THREE.Mesh( geometry, material );
 plane.rotation.x= Math.PI/2;
 scene.add( plane );
}

function createLight(typeLight) {
    switch (typeLight) {
        case 'AmbientLight':    
            const AmbientLight = new THREE.AmbientLight(0x404040,3); // soft white light
            scene.add(AmbientLight);
            break;
        case 'DirectionalLight':
            // White directional light at half intensity shining from the top.
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            scene.add(directionalLight);
            break;
        case 'PointLight':
            const PointLight = new THREE.PointLight(0xffffff, 1, 100);
            PointLight.position.set(1, 2, 1);
            scene.add(PointLight);

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper(PointLight, sphereSize);
            scene.add(pointLightHelper);
            break;
        case 'SpotLight': // pending
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(100, 1000, 100);
            spotLight.map = new THREE.TextureLoader().load(url);

            spotLight.castShadow = true;

            spotLight.shadow.mapSize.width = 1024;
            spotLight.shadow.mapSize.height = 1024;

            spotLight.shadow.camera.near = 500;
            spotLight.shadow.camera.far = 4000;
            spotLight.shadow.camera.fov = 30;

            scene.add(spotLight);
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
