//ThreeJS main logic

'use strict';

  //threeJS
  var scene, camera, renderer, plane, hemilight, sphere;
  var controls;
  var max = 200;
  var min = -200;

$(function(){


init();
render();

});


//THREE.js regular stuff

function init() {
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
camera.position.x = 1;
scene.add(camera);


//light
// var hemiLight = new THREE.HemisphereLight(0xffffff, 0x00ff00, 8);
// hemiLight.position.set(0, 10, 0);
// scene.add(hemiLight);

// var pointLight = new THREE.PointLight(0xFFFFFF, 9);
// pointLight.position.set(0, 10, 0);

// scene.add(pointLight);

//OrbitControls
controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

//canvas experiment
var myCanvas = document.createElement('canvas');
var ctx = myCanvas.getContext('2d');
//ctx.clearRect(0,0,myCanvas.width,myCanvas.height);

ctx.font = "10px courier new";
ctx.fillStyle="rgba(255,0,0,0.95)";
var text = "Now is the Winter of Our Discontent";
//ctx.font = "courier new";
// ctx.rect(0,0,256,256);
// ctx.fillStyle="black";
// ctx.fill();
// ctx.fillStyle="pink";
ctx.fillText(text, 30, 128);

ctx.textAlign = "center";
var canText1 = new THREE.Texture(myCanvas);
canText1.needsUpdate = true;


//test plane
  var geometry = new THREE.PlaneGeometry(myCanvas.width, myCanvas.height);

//try canvas
var canMat = new THREE.MeshBasicMaterial( {map:canText1, side:THREE.DoubleSide});
canMat.transparent = true;
//canMat.transparent = true;

//test pointCloud
var random = Math.floor(Math.random()*(max - min) + min);
var vertex;
var cloudGeo = new THREE.Geometry();
for (var i = 0; i < 1300; i++) {
  var vertexX = Math.floor(Math.random()*(max - min) + min),
  vertexY = Math.floor(Math.random()*(max - min) + min),
  vertexZ = Math.floor(Math.random()*(max - min) + min),
  particle = new THREE.Vector3( vertexX, vertexY, vertexZ );
  cloudGeo.vertices.push(particle);
  // console.log(cloudGeo.vertices);
}

var cloudMat = new THREE.PointCloudMaterial( {color:0xff00ff, map:canText1, size:5, side:THREE.DoubleSide} );

var pointCloud = new THREE.PointCloud(cloudGeo, cloudMat);
//pointCloud.sortParticles = true;
pointCloud.position.set(0,0,0);
scene.add(pointCloud);


// reg. material

  var material = new THREE.MeshPhongMaterial( {
                                              color: 0xFF0080,
                                              transparent: true,
                                              opacity: 0.5 } );
  // plane = new THREE.Mesh( geometry, canMat );
  // plane.position.set(0,20,0);
  // scene.add( plane );




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
// plane.rotation.y+=0.01;
controls.update();
}




