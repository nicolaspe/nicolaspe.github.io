// global threejs variables
let container, renderer, camera, scene;
let controls, loader, timekeep;
let surface, wire;
let surf_mat, video_mat;
let videos, vid_img, vid_imgCntx, vid_tex, vid_mat;
let bVideosLoaded, bPlaying, bWires;

window.addEventListener('load', init);

// === INITIALIZATION
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
  camera.position.set( -20, 120, 220 );
  camera.up = new THREE.Vector3( 0, 1, 0 );
  camera.lookAt( new THREE.Vector3(0, -100, 0) );

	window.addEventListener('resize', onWindowResize, true );
  window.addEventListener('keypress', onKeyPress, true );

  timekeep = 0;
  bWires = true;
  bVideosLoaded = false;
  createEnvironment();
  loadVideos();

	animate();
}


// === EVENTS
function onWindowResize(){
  let wid = window.innerWidth;
  let hei = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(wid, hei);
	camera.aspect = wid/hei;
  camera.updateProjectionMatrix();
}
function onKeyPress( event ) {
  let key = parseInt( event.keyCode );

  switch (key) {
    case 49: // 1
      if(bVideosLoaded) {
        bWires = !bWires;
        bPlaying = !bPlaying;
        updateVideoState();
      }
      break;
    default:
      break;
  }
}


// === ANIMATION
function animate() {
  renderer.setAnimationLoop( render );
}
function render(){
  timekeep += 0.03;

  update_surface();
  if( bPlaying && videos.readyState === videos.HAVE_ENOUGH_DATA ){
    vid_imgCntx.drawImage( videos, 0, 0 );
    if( vid_tex ){ vid_tex.needsUpdate = true; }
  }

  renderer.render( scene, camera );
}

function update_surface(){
  for( let i=0; i<surface.geometry.vertices.length; i++ ){
    let x = i%81 +timekeep;
    let y = Math.floor( i/81 ) +timekeep;
    let z = Math.sin(x/5) * 10 + Math.cos(y/5) * 10;
    surface.geometry.vertices[i].z = z;
    if(bWires) { wire.geometry.vertices[i].z = z; }
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



// === ENVIRONMENT
function createEnvironment(){
  let surf_wid = 800; let surf_hei = 450;
  let surf_divX = 80; let surf_divY = 45;
  // SURFACE
  let surf_geo = new THREE.PlaneGeometry(surf_wid, surf_hei, surf_divX, surf_divY);
  surf_mat = new THREE.MeshPhongMaterial({
    color: 0x4e3166,
    flatShading: true,
    specular: 0xeeeeee,
    emissive: 0x4e3166,
    side: THREE.DoubleSide
  });
  surface = new THREE.Mesh(surf_geo, surf_mat);
  surface.rotation.x = Math.PI * 3/2;
  // surface.rotation.y = Math.PI;
	surface.position.set(0, -20, 0);
  scene.add(surface);

  // WIRE SURFACE
  let wire_geo = new THREE.PlaneGeometry(surf_wid, surf_hei, surf_divX, surf_divY);
  let wire_mat = new THREE.MeshBasicMaterial({
    color: 0x888888,
    wireframe: true,
    side: THREE.DoubleSide
  });
  wire = new THREE.Mesh(wire_geo, wire_mat);
  wire.rotation.x = Math.PI * 3/2;
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



// === VIDEO
function loadVideos(){
  bPlaying = false;
  
  // VIDEO FILE LOADING
  videos = document.createElement( 'video' );
  videos.src = "./src/vids/innercad_01.mp4";
  videos.loop = true;
  videos.addEventListener('loadeddata', () => {
    videos.pause();

    // VIDEO IMAGE REFERENCE
    vid_img = document.createElement( 'canvas' );
    vid_img.width  = 800;
    vid_img.height = 450;

    // VIDEO IMAGE CONTEXT
    vid_imgCntx = vid_img.getContext( '2d' );
    vid_imgCntx.fillStyle = "#00000000";
    vid_imgCntx.fillRect( 0, 0, vid_img.width, vid_img.height ); 

    // VIDEO IMAGE TEXTURE
    vid_tex = new THREE.Texture( vid_img );
    vid_tex.minFilter = THREE.LinearFilter;
    vid_tex.magFilter = THREE.LinearFilter;

    // VIDEO MATERIAL
    vid_mat = new THREE.MeshLambertMaterial({
      map: vid_tex,
      overdraw: true,
      side: THREE.DoubleSide
    });

    // update boolean
    bVideosLoaded = true;
  } , false); 
  videos.load();
}

function updateVideoState(){
  // check if video needs to play or not
  if(bPlaying) {
    videos.play();
    // assign video material!
    surface.material = vid_mat;
    // and hide the wireframe
    wire.visible = false;
  }
  else {
    videos.pause();
    // go back to original material
    surface.material = surf_mat;
    wire.visible = true;
  }
}