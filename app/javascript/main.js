//ThreeJS main logic

'use strict';

  //threeJS
  var scene, camera, renderer, plane, pivot, skyBox;
  var controls, mouseX, mouseY;
  var mouseDown = false;

$(function(){


init();
render();

});


//THREE.js regular stuff

function init() {

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
camera.position.z = -1000;
scene.add(camera);



//OrbitControls
controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;


renderer = new THREE.WebGLRenderer( {antialias: true, alpha:true} );
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById("three").appendChild(renderer.domElement);
renderer.setClearColor(0x000000);
}



//window resize
window.addEventListener('resize', function () {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
});


//skybox

  // var imagePrefix = "./images/";
  // var directions  = ["skybox1", "skybox2", "skytop", "skybottom", "skybox3", "skybox4"];
  // var imageSuffix = ".png";
  // var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );

  // var materialArray = [];
  // for (var i = 0; i < 6; i++)
  //   materialArray.push( new THREE.MeshBasicMaterial({
  //     map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
  //     side: THREE.DoubleSide
  //   }));
  // var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
  // skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
  // // console.log(materialArray);
  // scene.add(skyBox);




//don't confuse shmancy auto-move with OrbitControls
 $(document).mousedown(function(){mouseDown = true; console.log("mouseDown")});
 $(document).mouseup(function(){mouseDown = false; console.log("mouseUp")});

$(document).keydown(function(e) {
   console.log(e);

  switch(e.keyCode) {
    case 40: //down
      e.preventDefault();
      camera.translateZ( + 50 );
      break;
    case 38: //up
      e.preventDefault();
      camera.translateZ( - 50 );
      break;
    case 65: //left
      camera.rotation.y = 90 * Math.PI / 180;
    break;
    case 68: //right
      camera.rotation.x += 20*Math.PI/180;
      break;
    case 27: //esc

    location.reload();
      break;

  }
  /* Act on the event */
});

function render() {
var time = Date.now() * 0.0005;
requestAnimationFrame(render);


//rotate camera
// camera.position.x = Math.cos(time) * 1000;
// camera.position.y = Math.sin(time) * 1000;
// camera.position.z = Math.cos(time) * 1000;
// console.log(camera.position.x);
camera.lookAt(scene.position);


//organic rotation
for (var i = 0; i < scene.children.length; i ++) {

    var object = scene.children[i];

    object.rotation.y = time / 10;
    object.rotation.x = time / 10;
    object.rotation.z = time / 10;

  }
//update OrbitControls only if mouse clicked
// if (mouseDown) {
  controls.update();
// }

renderer.render(scene, camera);


}





