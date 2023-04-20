/*  Author(A): Carlos Rivera
    Date of creation: 30-03-2023
    Last modification: 30-03-2023 */

// Principales variables son:
var scene = null,    // The place
    camera = null,   // To see
    renderer = null, // To represent
    myCanvas = null, // To draw
    controls = null; // To Move

var dados = [],
    rotate = false,
    jugador = 'red',
    posPlayers = [{ x: 17.298156763549287, y: 17.59827012753881, z: 0.10151787289657402},  // Red
                  { x: -17.03050250551709, y: 16.04258871995021, z: -0.6035724405441485},  // Yellow
                  { x: -0.024321219262030, y: 15.91870264199188, z: 18.7967995615866},     // Blue
                  { x: -0.066898867944208, y: 17.59827012753881, z: -17.234319602002646}]; // Green

// Call all functions that allow create 3D
function start3dService() {
    initScene();        // To inicializate the project
    createDashboard();
    animate();          // To represent frame by frame (Update)...
    window.addEventListener('resize', onWindowResize, false);

    createGLTF();
    createLight('DirectionalLight');

    // niña guerrera
    createObjMtl('../models/OBJMTL/Guerrero/', 'chr_knight', 10, 0, -10, 3);

    // dado
    createObjMtl('../models/OBJMTL/Dado/', 'dice', -2, 2, 0, 1, 0);
    createObjMtl('../models/OBJMTL/Dado/', 'dice', 2, 2, 0, 1, 1);

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
    renderer.setSize(window.innerWidth - 20, window.innerHeight - 50);//window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // To make Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    if(jugador=='red')
        camera.position.set(posPlayers[0].x,posPlayers[0].y,posPlayers[0].z);
    else if (jugador=='blue')
        camera.position.set(posPlayers[2].x,posPlayers[2].y,posPlayers[2].z);

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

function createDashboard() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const loader = new THREE.TextureLoader();


    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: loader.load('../img/textura_parchis.jpg'),
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = (Math.PI / 180 * 90)*-1;
    scene.add(plane);
}

function createObjMtl(routeFolder, nameArchive, posx, posy, posz, scale, number) {
    const loader = new THREE.OBJLoader();
    const mtlLoader = new THREE.MTLLoader();

    mtlLoader.setTexturePath(routeFolder);
    mtlLoader.setPath(routeFolder);
    mtlLoader.load(nameArchive + '.mtl', function (materials) {

        materials.preload();

        loader.setMaterials(materials);
        loader.setPath(routeFolder);
        loader.load(nameArchive + '.obj', function (object) {
            dados[number] = object;
            scene.add(object);
            object.scale.set(scale, scale, scale);
            object.position.set(posx, posy, posz);
        });
    });
}

function createGLTF() {
    const loader = new THREE.GLTFLoader();

    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath('../models/GLTF/pato/');
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
        // resource URL
        '../models/gltf/pato/duck.gltf',
        // called when the resource is loaded
        function (gltf) {

            scene.add(gltf.scene);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

            (gltf.scene).position.set(-10, 0, -10);
            (gltf.scene).scale.set(3, 3, 3);
        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );
}
function createLight(typeLight) {
    switch (typeLight) {
        case 'AmbientLight':
            const AmbientLight = new THREE.AmbientLight(0x404040, 3); // soft white light
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
    
    if(rotate==true){
        dados[0].rotation.x -= SPEED * 2;
        dados[0].rotation.y -= SPEED;
        dados[0].rotation.z -= SPEED * 3;

        dados[1].rotation.x -= SPEED * 1;
        dados[1].rotation.y -= SPEED;
        dados[1].rotation.z -= SPEED * 2;
    }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function playSounds(whatSound) {
    switch (whatSound) {
        case 'rain':
            document.getElementById("myBackgroundSound").play();
            break;

        case 'background':
            //document.getElementById("myBackgroundSound").play();
            break;
    }


}

var SPEED = 0.03;
function throwDices(caseMovement) {

    switch (caseMovement) {
        case 'rotate':
            rotate = true;
        break;
    
        case 'stop':
            rotate = false;
        break;
    }
}

function go2Play() {
    document.getElementById('blocker').style.display = 'none';
    playSounds('rain');
    setInterval(setTime, 1000);
}

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;


function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}