//ThreeJS main logic

'use strict';

  //threeJS
  var scene, camera, renderer, plane, pivot;
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

//event listeners and mouse/touch reaction, courtesy of:
//http://codepen.io/seanseansean/pen/EaBZEY?editors=001
// document.addEventListener('mousemove', onDocumentMouseMove, false);
// document.addEventListener('touchstart', onDocumentTouchStart, false);
// document.addEventListener('touchmove', onDocumentTouchMove, false);
// var  windowHalfX = window.innerWidth / 2;
// var  windowHalfY = window.innerHeight / 2;
// function onDocumentMouseMove(e) {
//   if (!mouseDown) {
//   mouseX = e.clientX - windowHalfX;
//   mouseY = e.clientY - windowHalfY;
// }
// }

// function onDocumentTouchStart(e) {

//   if (e.touches.length === 1) {

//     e.preventDefault();
//     mouseX = e.touches[0].pageX - windowHalfX;
//     mouseY = e.touches[0].pageY - windowHalfY;
//   }
// }

// function onDocumentTouchMove(e) {

//   if (e.touches.length === 1) {

//     e.preventDefault();
//     mouseX = e.touches[ 0 ].pageX - windowHalfX;
//     mouseY = e.touches[ 0 ].pageY - windowHalfY;
//   }
// }

//don't confuse shmancy auto-move with OrbitControls
 $(document).mousedown(function(){mouseDown = true; console.log("mouseDown")});
 $(document).mouseup(function(){mouseDown = false; console.log("mouseUp")});

$(document).keydown(function(e) {
   console.log(e);

  switch(e.keyCode) {
    case 83: //down
      camera.translateZ( + 50 );
      break;
    case 87: //up
      camera.translateZ( - 50 );
      break;
    case 65: //left
      camera.rotate.y = 90 * Math.PI / 180;
    break;
    case 68: //right
      camera.rotation.x += 20*Math.PI/180;
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
  }
//update OrbitControls only if mouse clicked
// if (mouseDown) {
  controls.update();
// }

renderer.render(scene, camera);


}





