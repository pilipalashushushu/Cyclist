function init(){
    three("three");
}

function three(Id){
    //setting
    let width = $(`#${Id}`).parent().css("width");
    let height = $(`#${Id}`).parent().css("height");
    $(Id).attr("width", width);
    $(Id).attr("height", height);
    //scene&camera
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, parseInt(width)/parseInt(height), 0.1, 1000);
    camera.position.set(10, 0, 0);

    //Light
    var spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(20, 20, 5);
    scene.add(spotLight);        

    //3D Model
    var mtlLoader = new THREE.MTLLoader().setPath('./model/');
    var objLoader = new THREE.OBJLoader().setPath('./model/');
    mtlLoader.load('./11717_bicycle_v2_L1.mtl', (materials)=>{
        materials.preload();
        console.log('pnginside');
        objLoader.setMaterials(materials);
        objLoader.load('./11717_bicycle_v2_L1.obj',function(obj){
            obj.position.set(0, -20, 0);
            obj.rotation.x = Math.PI * 1.5;
            scene.add(obj);
            animate();
        })
    });

    //background
    var textureLoader = new THREE.TextureLoader().setPath('./images/');
    textureLoader.load('./becyclist.jpg', function(jpg){
        scene.background = jpg;
    });

    //render
    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(parseInt(width), parseInt(height));
    renderer.setClearColor("#a3ddce");
    document.getElementById('three').appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 50;
    controls.maxDistance = 90;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5.0;

    $(window).resize(onWindowResize);

    function animate(){
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}


window.addEventListener('load', init, false);