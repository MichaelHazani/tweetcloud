//ThreeJS main logic

'use strict';

  //threeJS
  var scene, camera, renderer, cube, hemilight, sphere;
  var controls;

$(function(){


init();
render();

});


//THREE.js regular stuff

function init() {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
scene.add(camera);
camera.position.z = 50;

//light
var hemiLight = new THREE.HemisphereLight(0xffffff, 0x00ff00, 8);
hemiLight.position.set(0, 10, 0);
scene.add(hemiLight);

var pointLight = new THREE.PointLight(0xFFFFFF, 9);
pointLight.position.set(0, 10, 0);

scene.add(pointLight);

//OrbitControls
controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

//canvas experiment
var myCanvas = document.getElementById("myCanvas");
var ctx = document.getElementById('myCanvas').getContext('2d');
ctx.fillStyle="rgb(200,200,0)";
var text = "Now is the Winter of Our Discontent";
//ctx.font = "courier new";
ctx.fillText(text, 30, 128);
ctx.font = "80px courier new";
ctx.textAlign = "center";
var canText1 = new THREE.Texture(myCanvas);
canText1.needsUpdate = true;

//test cube
  var geometry = new THREE.BoxGeometry( 10, 10, 10 );
//try canvas
var canMat = new THREE.MeshBasicMaterial( {map:canText1, side:THREE.DoubleSide});
//canMat.transparent = true;


// reg. material

  var material = new THREE.MeshPhongMaterial( {
                                              color: 0xFF0080,
                                              transparent: true,
                                              opacity: 0.5 } );
  cube = new THREE.Mesh( geometry, canMat );
  cube.position.set(0,20,0);
  scene.add( cube );




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


function render() {

requestAnimationFrame(render);
renderer.render(scene, camera);
cube.rotation.y+=0.01;
controls.update();
}




