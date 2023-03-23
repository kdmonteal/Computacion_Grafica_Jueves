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
    createMaterials();
    window.addEventListener('resize', onWindowResize, false);
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xE9E6C6); //0x043eaa
    camera = new THREE.PerspectiveCamera(75,   // FOV (Fild of view)
        window.innerWidth / window.innerHeight, // ASPECT (Size of Screen)
        0.1,  // NEAR (Cerca)
        1000); //FAR (lejos)

    myCanvas = document.querySelector('.webgl');
    renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // To make Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(2, 4, 2);
    controls.update();

    // Create Grid
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size,
        divisions,
        0x000,      // Color Cruz 
        0xffffff); // Color de las cuadriculas
    scene.add(gridHelper);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Objeto Scene
    // const geometry = new THREE.PlaneGeometry(102, 102);
    // const material = new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    // const plane = new THREE.Mesh(geometry, material);
    // scene.add(plane);
    // plane.rotation.x = Math.PI / 2;

    // Object Material: Standard
    const geometryCube = new THREE.BoxGeometry(1, 1, 1);
    const materialCube = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometryCube, materialCube);
    // scene.add( cube );
    // cube.position.y = 0.5;

    // Object Material: xxx
    const geometryCube2 = new THREE.BoxGeometry(1, 1, 1);
    const materialCube2 = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
        specular: 0xffffff
    });
    const cube2 = new THREE.Mesh(geometryCube2, materialCube2);
    // scene.add( cube2 );
    // cube2.position.y = 0.5;
    // cube2.position.x = -2;
}


function createMaterials() {

    /* 
    TIPOS DE MATERIALES:

    1. MeshBasicMaterial 
    2. MeshNormalMaterial 
    3. MeshLambertMaterial 
    4. MeshPhongMaterial 
    5. MeshStandardmaterial
    6. MeshDepthMaterial
    7. LineBasicMaterial 
    8. LineDashedMaterial 
    9. PointsMaterial 
    10. SpriteMaterial
    11. BoxTexture
    */

    // 1.) Esfera MeshBasicMaterial 
    const geometrySphere1 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere1 = new THREE.MeshBasicMaterial({ color: 0x0000FF });
    const sphere1 = new THREE.Mesh(geometrySphere1, materialSphere1);
    scene.add(sphere1);
    sphere1.position.y = 1.5;
    sphere1.position.z = 4;
    sphere1.position.x = -3.9;

    // 2.) Esfera MeshNormalMaterial
    const geometrySphere2 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere2 = new THREE.MeshNormalMaterial();
    const sphere2 = new THREE.Mesh(geometrySphere2, materialSphere2);
    scene.add(sphere2);
    sphere2.position.x = 4.5;
    sphere2.position.y = 1.5;
    sphere2.position.z = 4.5;



    // 3.) Esfera MeshLamberMaterial
    const geometrySphere3 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere3 = new THREE.MeshLambertMaterial({
        color: 0x800080,
        specular: 0xffffff
    });
    const sphere3 = new THREE.Mesh(geometrySphere3, materialSphere3);
    scene.add(sphere3);
    sphere3.position.y = 1.3;
    sphere3.position.x = -4;
    sphere3.position.z = -4;

    // 4.) Esfera MeshPhongMaterial 
    const geometrySphere4 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere4 = new THREE.MeshPhongMaterial({
        color: 0x9f56a5,
        specular: 0xffffff
    });
    const sphere4 = new THREE.Mesh(geometrySphere4, materialSphere4);
    scene.add(sphere4);
    sphere4.position.y = 1.3;
    sphere4.position.x = -4;
    sphere4.position.z = 0;

    // 5.) MeshStandardMaterial

    const geometrySphere5 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere5 = new THREE.MeshStandardMaterial({
        color: 0x9f56a5,
        specular: 0xffffff
    });
    const sphere5 = new THREE.Mesh(geometrySphere5, materialSphere5
    );
    scene.add(sphere5);
    sphere5.position.y = 1.5;
    sphere5.position.z = 4.5;

    // 6.) MeshDepthMaterial

    const geometrySphere6 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere6 = new THREE.MeshDepthMaterial({
        color: 0x9f56a5,
        specular: 0xffffff
    });
    sphere6 = new THREE.Mesh(geometrySphere6, materialSphere6);
    scene.add(sphere6);
    sphere6.position.y = 1.5;
    sphere6.position.x = 4.5;
    sphere6.position.z = -4.5;



    // 7.) Esfera LineBasicMaterial
    var geometrySphere7 = new THREE.SphereGeometry(1.5, 32, 32);
    var materialSphere7 = new THREE.LineBasicMaterial({ color: 0xff0000 });
    var sphere7 = new THREE.LineSegments(new THREE.WireframeGeometry(geometrySphere7), materialSphere7);
    scene.add(sphere7);
    sphere7.position.x = -4.8;
    sphere7.position.y = 4.5;


    //8.) Esfera LineDashedMaterial

    const geometrySphere8 = new THREE.SphereGeometry(1.5, 32, 32);
    const materialSphere8 = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 1, gapSize: 1 });
    const sphere8 = new THREE.LineSegments(new THREE.EdgesGeometry(geometrySphere8), materialSphere8);
    scene.add(sphere8);
    sphere8.position.y = 4.5;
    sphere8.position.x = -4.5;
    sphere8.position.z = -4;



    // 9.) Esfera PointsMaterial 

    var geometrySphere9 = new THREE.SphereGeometry(1.5, 32, 32);
    var materialSphere9 = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff });
    var sphere9 = new THREE.Points(geometrySphere9, materialSphere9);
    scene.add(sphere9);
    sphere9.position.y = 4.5;
    sphere9.position.z = 4;
    sphere9.position.x = -4.5;



    //10.) Esfera SpriteMaterial 

    const textureLoader = new THREE.TextureLoader();
    const spriteMaterial = new THREE.SpriteMaterial({ map: textureLoader.load('https://threejs.org/examples/textures/sprite.png'), color: 0xffffff });
    const geometry9 = new THREE.SphereGeometry(1.3, 32, 32);
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(4, 4, 4);
    sprite.position.set(0, 0, 0);
    sprite.geometry8 = geometry9;
    sprite.material = spriteMaterial;
    scene.add(sprite);
    sprite.position.y = 1.5;
    sprite.position.x = 0;
    sprite.position.z = -4.5;


    //11.) Box Texture
    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff,
                                                    map: textureLoader.load('./src/img/uv_test_bw_1024.png')} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    cube.position.y = 1.5;

    //12.) Box Texture By Face
    const geometryFace = new THREE.BoxGeometry( 2, 2, 2 );

    const materialTexture=[];
    materialTexture.push( new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            side: THREE.BackSide, 
                                                            map: new THREE.TextureLoader().load('./src/img/face1.jpg')}));
    materialTexture.push( new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            side: THREE.BackSide, 
                                                            map: new THREE.TextureLoader().load('./src/img/face2.png')}));
    materialTexture.push( new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            side: THREE.BackSide, 
                                                            map: new THREE.TextureLoader().load('./src/img/face3.jpg')}));
    materialTexture.push( new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            side: THREE.BackSide, 
                                                            map: new THREE.TextureLoader().load('./src/img/face4.jpg')}));
    materialTexture.push( new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            side: THREE.BackSide, 
                                                            map: new THREE.TextureLoader().load('./src/img/face5.png')}));
    materialTexture.push( new THREE.MeshStandardMaterial({color: 0xffffff,
                                                            side: THREE.BackSide, 
                                                            map: new THREE.TextureLoader().load('./src/img/face6.jpg')}));
         

    const cubeFace = new THREE.Mesh( geometryFace, materialTexture );
    scene.add( cubeFace );
    cubeFace.position.y = 1.5;
    cubeFace.position.x = 5;


    /*
    Blending Mode
    THREE.NoBlending
    THREE.NormalBlending
    THREE.AdditiveBlending
    THREE.SubtractiveBlending
    THREE.MultiplyBlending
    THREE.CustomBlending
    */
}
function createLight(typeLight) {
    switch (typeLight) {
        case 'AmbientLight':
            const AmbientLight = new THREE.AmbientLight(0x404040); // soft white light
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
function createGeometries(geometries) {

    switch (geometries) {
        case 'Cylinder':
            const geometryCylinder = new THREE.CylinderGeometry(1, 1, 3, 10);
            const materialCylinder = new THREE.MeshBasicMaterial({
                color: 0xf0f0ff,
                wireframe: true
            });
            cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
            scene.add(cylinder);
            break;
        case 'Cube':

            var isWireframe = document.getElementById('isWireframe').checked;

            var myNewWireframe = document.getElementById('myWireframe').value;
            var boolWire = false;

            if (myNewWireframe == 'True') {
                boolWire = true;
            } else {
                boolWire = false;
            }

            const geometry = new THREE.BoxGeometry(document.getElementById('widthCube').value, document.getElementById('heightCube').value, document.getElementById('depthCube').value);
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: boolWire
            });
            cube = new THREE.Mesh(geometry, material);
            scene.add(cube);


            break;
        case 'Cone':
            const geometryCone = new THREE.ConeGeometry(1, 3, 10);
            const materialCone = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true
            });
            cone = new THREE.Mesh(geometryCone, materialCone);
            scene.add(cone);
            break;
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    /*cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;

    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;*/

    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function openForm(nameForm) {
    document.getElementById(nameForm).style.display = "block";
}

function closeForm(nameForm) {
    document.getElementById(nameForm).style.display = "none";
}

console.log(THREE);