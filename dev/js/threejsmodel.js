function init(){
    let camera;
    three("three");
    //ctrl-btn
    let ctrl = `
        <div style="position: absolute;right: 30px;bottom: 30px;">
            <div class="threeInOut"><i class="fa fa-minus-circle" aria-hidden="true"></i></div>
            <div class="threeInOut"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
        </div>
    `;
    $('#three').append(ctrl);
    $('.threeInOut').css({
        display: "inline-block",
        width: "50px",
        height: "50px",
        borderRadius: '50%',
        textAlign: 'center',
        fontSize: '50px',
        lineHeight: '50px',
        cursor: 'pointer',
        color: 'white',
    }).hover(function(){
        $(this).css('color', 'green');
    },function(){
        $(this).css('color', 'white');
    });
}

function three(Id){
    //setting
    let width = $(`#${Id}`).parent().css("width");
    let height = $(`#${Id}`).parent().css("height");
    $(Id).attr("width", width);
    $(Id).attr("height", height);
    //scene&camera
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, parseInt(width)/parseInt(height), 100, 1000);
    camera.position.set(100, 0, 0);

    //Light
    var spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(180, 60, 100);
    scene.add(spotLight);    
    var spotLightBack = new THREE.SpotLight(0xffffff, 1);
    spotLightBack.position.set(-120, -20, 100);
    scene.add(spotLightBack);           

    //3D Model

    var objLoader = new THREE.OBJLoader().setPath('./model/');

    function loadMulti(target, col, mat = THREE.MeshPhongMaterial){
        objLoader.load(target,function(obj){
            var material = new mat({color: col});
            obj.children.forEach(function(child){
                child.material = material;
            });
            obj.position.set(-80, -120, 30);
            obj.rotation.x = Math.PI * 1.5;
            obj.rotation.z = Math.PI * 0.5;
            obj.scale.set(0.4, 0.4, 0.4);
            scene.add(obj);
            animate();
        })        
    }

    loadMulti('./body.obj', '#dde4ea');
    loadMulti('./chair.obj', '#505256');
    loadMulti('./chairSet.obj', '#323134');
    loadMulti('./foot.obj', '#63676c');
    loadMulti('./front.obj', '#373c41');
    loadMulti('./hand.obj', '#24282d');
    loadMulti('./line.obj', 'black');
    loadMulti('./rubber.obj', 'black');
    loadMulti('./tireIn.obj', '#3c3f40');
    loadMulti('./tireOut.obj', '#38383a');
    loadMulti('./tooth.obj', '#bfbfbc');
    loadMulti('./toothcenter.obj', '#07070b');

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
    // controls.maxDistance = 50;
    controls.minDistance = 200;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 5.0;

    $(window).resize(onWindowResize);

    function animate(){
        requestAnimationFrame(animate);
        controls.update();
        if( $('.threeInOut:first-child') ){
            $('.threeInOut:first-child').off('click').on('click', function(){
                // console.log(camera.fov);
                console.log(camera.zoom);
                camera.zoom = (camera.zoom * 10 - 1) / 10;
                camera.updateProjectionMatrix();
                // console.log(camera.fov);
            });
        }
        if( $('.threeInOut:last-child') ){
            $('.threeInOut:last-child').off('click').on('click', function(){
                // console.log(camera.fov);
                console.log(camera.zoom);
                camera.zoom = (camera.zoom * 10 + 1) / 10;
                camera.updateProjectionMatrix();
                // console.log(camera.fov);
            });
        }
        renderer.render(scene, camera);
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}


window.addEventListener('load', init, false);