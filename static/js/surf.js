// global threejs variables
let container, renderer, camera, scene;
let controls, loader, timekeep;
let surface, wire;

window.addEventListener('load', init);

function init(){
	container = document.querySelector('#sketch');
	let wid = window.innerWidth;
	let hei = window.innerHeight;

	// THREE INITIALIZATION
	renderer = new THREE.WebGLRenderer({ });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(wid, hei);
	container.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x4e3166 );

	camera = new THREE.PerspectiveCamera(52, wid/hei, 0.1, 5000);
	camera.position.set( -200, 190, 500);
  camera.rotation.set( -.82, -.23, -.23);

	window.addEventListener('resize', onWindowResize, true );

  timekeep = 0;
	createEnvironment();
	animate();
}


// EVENTS
function onWindowResize(){
  let wid = window.innerWidth;
  let hei = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(wid, hei);
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
}


// ANIMATION
function animate() {
  renderer.setAnimationLoop( render );
}
function render(){
  timekeep += 0.03;
  update_surface();
  renderer.render( scene, camera );
}

function update_surface(){
  for( let i=0; i<surface.geometry.vertices.length; i++ ){
    let x = i%81 +timekeep;
    let y = Math.floor( i/81 ) +timekeep;
    let z = Math.sin(x/5) * 20 + Math.cos(y/5) * 20;
    surface.geometry.vertices[i].z = z;
    wire.geometry.vertices[i].z = z;
  }
  surface.geometry.computeFaceNormals();
  surface.geometry.normalsNeedUpdate = true;
  surface.geometry.verticesNeedUpdate =true;

  wire.geometry.normalsNeedUpdate = true;
  wire.geometry.verticesNeedUpdate =true;

  // for( let i=0; i<wire.geometry.vertices.length; i++ ){
  //   let x = i%81 +timekeep;
  //   let y = Math.floor( i/81 ) +timekeep;
  //   // let z = Math.sin( (x+y)/5 ) * 25 + Math.cos( (x+y)/5 ) * 25;
  //   let z = Math.sin(x/5) * 20 + Math.cos(y/5) * 20;
  //   wire.geometry.vertices[i].z = z;
  // }
  // // wire.geometry.computeFaceNormals();
  // wire.geometry.normalsNeedUpdate = true;
  // wire.geometry.verticesNeedUpdate =true;
}


// ENVIRONMENT
function createEnvironment(){
  // SURFACE
  let surf_geo = new THREE.PlaneGeometry(1200, 1200, 80, 80);
  let surf_mat = new THREE.MeshPhongMaterial({
    color: 0x4e3166,
    flatShading: true,
    specular: 0xeeeeee,
    emissive: 0x4e3166,
    side: THREE.DoubleSide
  });
  surface = new THREE.Mesh(surf_geo, surf_mat);
  surface.rotation.x = Math.PI/2;
	surface.position.set(0, -20, 0);
  scene.add(surface);

  // WIRE SURFACE
  let wire_geo = new THREE.PlaneGeometry(1200, 1200, 80, 80);
  let wire_mat = new THREE.MeshBasicMaterial({
    color: 0x888888,
    wireframe: true,
    side: THREE.DoubleSide
  });
  wire = new THREE.Mesh(wire_geo, wire_mat);
  wire.rotation.x = Math.PI/2;
  wire.position.set(0, -20, 0);
  scene.add(wire);

  // LIGHTS!
	let d_light1 = new THREE.DirectionalLight(0xc200ff, .5);
  d_light1.position.set( 0, 1, -1 );
	scene.add(d_light1);

  let d_light2 = new THREE.DirectionalLight(0x15c0ff, .5);
  d_light2.position.set( 1, 1, 0 );
	scene.add(d_light2);
}
