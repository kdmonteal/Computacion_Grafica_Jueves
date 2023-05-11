// ----------------------------
// Inicialización de Variables:
// ----------------------------
var scene = null,
  camera = null,
  renderer = null,
  controls = null,
  clock = null;

var sound1 = null,
  countPoints = null,
  modelLoad = null,
  light = null,
  figuresGeo = [];

var MovingCube = null,
  collidableMeshList = [],
  collectibleMeshList = [],
  lives = 3,
  numberToCreate = 5,
  points = 0;

var color = new THREE.Color();

var scale = 1;
var rotSpd = 0.05;
var spd = 0.05;
var input = { left: 0, right: 0, up: 0, down: 0 };

var posX = 3;
var posY = 0.5;
var posZ = 1;

var position1 = [-1,0,6],
    position2 = [11,0,6],
    position3 = [-1,0,-6],
    position4 = [11,0,-6];

var Ducks = [];
// ----------------------------
// Funciones de creación init:
// ----------------------------
function start() {
  window.onresize = onWindowResize;
  initScene();
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initScene() {
  initBasicElements(); // Scene, Camera and Render
  initSound();         // To generate 3D Audio
  createLight();       // Create light
  initWorld();
  createPlayerMove();
  createFrontera();

  createPickups();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sound1.update(camera);
  movePlayer();
  collisionAnimate();

  if(Ducks.length>0){
    Ducks[0].position.x+=0.01
    Ducks[1].position.z-=0.01;
    Ducks[2].position.z+=0.01;
    Ducks[3].position.x-=0.01;
  }
}

function initBasicElements() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
  clock = new THREE.Clock();

  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  // controls.update();

  scene.background = new THREE.Color(0x0099ff);
  scene.fog = new THREE.Fog(0xffffff, 0, 750);

  var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  renderer.setSize(window.innerWidth, window.innerHeight - 4);
  document.body.appendChild(renderer.domElement);

  camera.position.x = 3;
  camera.position.y = 0.5;
  camera.position.z = 1;
}

function initSound() {
  sound1 = new Sound(["./songs/rain.mp3"], 500, scene, {   // radio(10)
    debug: true,
    position: { x: camera.position.x, y: camera.position.y + 10, z: camera.position.z }
  });
}

function createFistModel(generalPath, pathMtl, pathObj) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setTexturePath(generalPath);
  mtlLoader.setPath(generalPath);
  mtlLoader.load(pathMtl, function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(generalPath);
    objLoader.load(pathObj, function (object) {

      modelLoad = object;
      figuresGeo.push(modelLoad);
      scene.add(object);
      object.scale.set(0.1, 0.1, 0.1);

      object.position.y = 0;
      object.position.x = 5;

    });

  });
}

function createGltfFunction(generalPath, pathGltf, position,indice, scale) {
  // Instantiate a loader
  const loader = new THREE.GLTFLoader();

  console.log("This is my Duck "+indice);
  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath(generalPath);//'/examples/js/libs/draco/'
  loader.setDRACOLoader(dracoLoader);

  // Load a glTF resource
  loader.load(
    // resource URL
    pathGltf,//'models/gltf/duck/duck.gltf',
    // called when the resource is loaded
    function (gltf) {

      Ducks[indice] = gltf.scene;
      scene.add(gltf.scene);

      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object

      gltf.scene.scale.set(scale,scale,scale);
      gltf.scene.position.set(position[0],position[1],position[2]);

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

function createLight() {
  var light2 = new THREE.AmbientLight(0xffffff);
  light2.position.set(10, 10, 10);
  scene.add(light2);
  light = new THREE.DirectionalLight(0xffffff, 0, 1000);
  scene.add(light);
}

function initWorld() {
  createFistModel("./modelos/island/", "littleisle.mtl", "littleisle.obj")
  
  var positionFather = [position1,position2,position3,position4];

  for (var i = 0; i < 4; i++) {
    createGltfFunction("./modelos/other/", "./modelos/other/Duck.gltf",positionFather[i],i,0.3);
  }

}
// ----------------------------------
// Función Para mover al jugador:
// ----------------------------------
function movePlayer() {
  if (input.right == 1) {
    camera.rotation.y -= rotSpd;
    MovingCube.rotation.y -= rotSpd;
  }
  if (input.left == 1) {
    camera.rotation.y += rotSpd;
    MovingCube.rotation.y += rotSpd;
  }

  if (input.up == 1) {
    camera.position.z -= Math.cos(camera.rotation.y) * spd;
    camera.position.x -= Math.sin(camera.rotation.y) * spd;

    MovingCube.position.z -= Math.cos(camera.rotation.y) * spd;
    MovingCube.position.x -= Math.sin(camera.rotation.y) * spd;
  }
  if (input.down == 1) {
    camera.position.z += Math.cos(camera.rotation.y) * spd;
    camera.position.x += Math.sin(camera.rotation.y) * spd;

    MovingCube.position.z += Math.cos(camera.rotation.y) * spd;
    MovingCube.position.x += Math.sin(camera.rotation.y) * spd;
  }
}

window.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 68:
      input.right = 1;
      break;
    case 65:
      input.left = 1;
      break;
    case 87:
      input.up = 1;
      break;
    case 83:
      input.down = 1;
      break;
    case 27:
      document.getElementById("blocker").style.display = 'block';
      break;
  }
});


window.addEventListener('keyup', function (e) {
  switch (e.keyCode) {
    case 68:
      input.right = 0;
      break;
    case 65:
      input.left = 0;
      break;
    case 87:
      input.up = 0;
      break;
    case 83:
      input.down = 0;
      break;
  }
});
// ----------------------------------
// Funciones llamadas desde el index:
// ----------------------------------
function go2Play() {
  document.getElementById('blocker').style.display = 'none';
  document.getElementById('cointainerOthers').style.display = 'block';
  playAudio(x);
  initialiseTimer();
}

function initialiseTimer() {
  var sec = 0;
  function pad(val) { return val > 9 ? val : "0" + val; }

  setInterval(function () {
    document.getElementById("seconds").innerHTML = String(pad(++sec % 60));
    document.getElementById("minutes").innerHTML = String(pad(parseInt(sec / 60, 10)));
  }, 1000);
}

// ----------------------------------
// Funciones llamadas desde el index:
// ----------------------------------
function createPlayerMove() {
  var cubeGeometry = new THREE.CubeGeometry(1, 1, 1, 1, 1, 1);
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.0 });
  MovingCube = new THREE.Mesh(cubeGeometry, wireMaterial);
  MovingCube.position.set(camera.position.x, camera.position.y, camera.position.z);
  scene.add(MovingCube);
}

function createFrontera() {
  var cubeGeometry = new THREE.CubeGeometry(12, 5, 12, 1, 1, 1);
  var wireMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff,
                                                   wireframe: true, 
                                                   transparent: false, 
                                                   opacity: 0.0 });
  worldWalls = new THREE.Mesh(cubeGeometry, wireMaterial);
  worldWalls.position.set(5, 0, 0);
  scene.add(worldWalls);
  collidableMeshList.push(worldWalls);
}

function createPickups() {
  for (let index = 0; index < 5; index++) {
    const geometry = new THREE.BoxGeometry( 0.5,0.5,0.5 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x6600ff} ); 
    
    const pickup = new THREE.Mesh( geometry, material ); 
    scene.add( pickup );

    var posx = Math.floor(Math.random() * 10);
    var posz = Math.floor(Math.random() * 7);

    pickup.position.set(posx,0.3,posz);
    pickup.name = "toCollect"+index;
    pickup.id = "toCollect"+index;


    collectibleMeshList.push(pickup);
    console.log("crear pickup "+ pickup.name);
  }
}

function collisionAnimate() {

  var originPoint = MovingCube.position.clone();

  for (var vertexIndex = 0; vertexIndex < MovingCube.geometry.vertices.length; vertexIndex++) {
    var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
    var globalVertex = localVertex.applyMatrix4(MovingCube.matrix);
    var directionVector = globalVertex.sub(MovingCube.position);

    var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
    var collisionResults = ray.intersectObjects(collectibleMeshList);
    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {

      console.log('toco, '+ JSON.stringify(collisionResults[0].object.name));
      document.getElementById("lives").innerHTML = lives;//'toco, '+ JSON.stringify(collisionResults[0].object.name);//points;
      //camera.position.set(posX, posY, posZ);
      //MovingCube.position.set(posX, posY, posZ);
      //lives --;

      points++;
      document.getElementById("points").innerHTML = points;

      removeElement(JSON.stringify(collisionResults[0].object.name));
      if (lives == 0) {
        document.getElementById("lost").style.display = "block";
        document.getElementById("cointainerOthers").style.display = "none";
        pauseAudio(x);
        playAudio(y);
      }
    } else {
      document.getElementById("lives").innerHTML = lives; // 'no toco';  
    }
  }
}

function removeElement(nameElement) {

    for(w=0;w<collectibleMeshList.length;w++){
      nameToCompare = '"'+collectibleMeshList[w].name+'"';

      if(nameToCompare == nameElement){
          collectibleMeshList[0].visible = false;
          collectibleMeshList.shift(); // elimina el indice deseado

          playAudio(z);
      }
  }
}