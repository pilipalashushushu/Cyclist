function init(){
    let camera;
    setting = {
        rotateY: 0.1,
        rotateZ: 0.1,
        rotateYLength: 0,
        rotateZLength: 0,
    };
    three("three");
    //ctrl-btn
    let ctrl = `
        <div style="position: absolute;left: 50px;bottom: 30px;">
            <span class="fa fa-angle-double-up updown" aria-hidden="true" style="display: block;width: 300px;text-align:center;color: white;font-size: 30px;text-shadow: 0 0 2px #222;cursor:pointer;"></span>
            <div>
                <div class="threeInOut"><i class="fa fa-repeat" aria-hidden="true"></i></div>
                <div class="threeInOut"><i class="fa fa-search-minus" aria-hidden="true"></i></div>
                <span id="zoomStyle" style="margin: 0 auto;text-align: center;display: inline-block;font-size: 30px;width: 100px;padding-bottom: 3px;vertical-align: middle;color: white;text-shadow: 0 0 3px #222;cursor:pointer;">100%</span>
                <div class="threeInOut"><i class="fa fa-search-plus" aria-hidden="true"></i></div>
                <div class="threeInOut"><i class="fa fa-undo" aria-hidden="true"></i></div>            
            </div>
            <span class="fa fa-angle-double-down updown" aria-hidden="true"></span>
        </div>
    `;
    $('#three').append(ctrl);
    $('.threeInOut').css({
        display: "inline-block",
        width: "50px",
        height: "50px",
        borderRadius: '50%',
        'vertical-align': 'middle',
        fontSize: '50px',
        lineHeight: '50px',
        cursor: 'pointer',
        color: 'white',
        textShadow: '0 0 2px #222',
    }).hover(function(){
        $(this).css('color', 'green');
    },function(){
        $(this).css('color', 'white');
    });
    $('.updown').css({
        display: 'block',
        width: '300px',
        'text-align': 'center',
        color: 'white',
        'font-size': '30px',
        'text-shadow': '0 0 2px #222',
        cursor: 'pointer',
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
    camera.position.set(0, 0, -300);

    //RGBELoader
    new THREE.RGBELoader()
        .setDataType( THREE.UnsignedByteType )
        .setPath( './images/' )
        .load('glacier.hdr', function(texture){
            // console.log( 'texture' );
            var options = {
                minFilter: texture.minFilter,
                magFilter: texture.magFilter
            };
            scene.background = new THREE.WebGLRenderTargetCube(1024, 1024, options).fromEquirectangularTexture(renderer, texture);
        });


    //Light
    var spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(130, 350, 0);
    scene.add(spotLight);    
    var spotLightBack = new THREE.SpotLight(0xffffff, .3);
    spotLightBack.position.set(-120, 300, 0);
    scene.add(spotLightBack);           

    //3D Model

    var objLoader = new THREE.OBJLoader().setPath('./model/');
    var a;
    function loadMulti(target, col, mat = THREE.MeshPhongMaterial){
        objLoader.load(target,function(obj){
            var material = new mat({color: col});
            obj.children.forEach(function(child){
                child.material = material;
            });
            // obj.position.set(-80, -120, 30);
            obj.position.set(50, -120, 0);
            obj.rotation.x = Math.PI * 1.5;
            obj.rotation.z = Math.PI;
            a = obj;
            // obj.rotation.z = Math.PI * 1.5;
            obj.scale.set(0.4, 0.4, 0.4);
            // scene.add(obj);
            group.add(obj);
            scene.add(group);
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

    //group

    var group = new THREE.Object3D();

    //background
    // var textureLoader = new THREE.TextureLoader().setPath('./images/');
    // textureLoader.load('./becyclist.jpg', function(jpg){
    //     scene.background = jpg;
    // });

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
        //zoom
        if( $('.threeInOut:nth-child(2)') ){
            $('.threeInOut:nth-child(2)').off('click').on('click', function(){
                // console.log(camera.fov);
                // console.log(camera.zoom);
                camera.zoom = (camera.zoom * 10 - 1) / 10;
                camera.updateProjectionMatrix();
                $('#zoomStyle').text( `${Math.floor( camera.zoom * 100 )}%` );
                // console.log(camera.fov);
            });
        }
        if( $('.threeInOut:nth-child(4)') ){
            $('.threeInOut:nth-child(4)').off('click').on('click', function(){
                // console.log(camera.fov);
                // console.log(camera.zoom);
                camera.zoom = (camera.zoom * 10 + 1) / 10;
                camera.updateProjectionMatrix();
                $('#zoomStyle').text( `${Math.floor( camera.zoom * 100 )}%` );
                // console.log(camera.fov);
            });
        }

        //rotate vertical
        if( $('.threeInOut:nth-child(1)') ){
            $('.threeInOut:nth-child(1)').off('click').on('click', function(){
                // console.log(group.rotation.y);
                // group.rotation.y += 0.1;
                setting.rotateYLength += 0.1;
                controls.rotateLeft( setting.rotateY );
                // console.log( setting.rotateY );
                // console.log( setting.rotateYLength );
                camera.updateProjectionMatrix();
            });
        }
        if( $('.threeInOut:nth-child(5)') ){
            $('.threeInOut:nth-child(5)').off('click').on('click', function(){
                // console.log(group.rotation.y);
                // group.rotation.y -= 0.1;
                setting.rotateYLength -= 0.1;
                // console.log( setting.rotateY );
                // console.log( setting.rotateYLength );
                controls.rotateLeft( -setting.rotateY );
                camera.updateProjectionMatrix();
            });
        }

        //rotate middle
        if( $('.updown:nth-child(1)') ){
            $('.updown:nth-child(1)').off('click').on('click', function(){
                // console.log(group.rotation.y);
                // group.rotation.z -= 0.1;
                setting.rotateZLength += 0.1;
                controls.rotateUp( setting.rotateZ );
                camera.updateProjectionMatrix();
            });
        }
        if( $('.updown:nth-child(3)') ){
            $('.updown:nth-child(3)').off('click').on('click', function(){
                // console.log(group.rotation.y);
                // group.rotation.z += 0.1;
                setting.rotateZLength -= 0.1;
                controls.rotateUp( -setting.rotateZ );
                camera.updateProjectionMatrix();
            });
        }

        //reset
        $('#zoomStyle').off('click').on('click', function(){
            camera.zoom = 1;
            $('#zoomStyle').text( `100%` );
            // group.rotation.y = 0;
            // group.rotation.z = 0;
            controls.rotateLeft( -setting.rotateYLength );
            setting.rotateYLength = 0;
            controls.rotateUp( -setting.rotateZLength );
            setting.rotateZLength = 0;
            camera.updateProjectionMatrix();
        });

        renderer.render(scene, camera);
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}


window.addEventListener('load', init, false);