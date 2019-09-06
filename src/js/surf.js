// global threejs variables
let container, renderer, camera, scene;
let controls, loader, timekeep;
let d_light1, d_light2;
let surface, surf_mat;
let proj_list;
let videos, vids_img, vids_cnt, vids_tex, vids_mat;
let vid_wid, vid_hei;
let vids_index, bVideosLoaded, bPlaying;

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
  bVideosLoaded = false;
  proj_list = ["inner_cadence", "peaceful_forest"];

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
  let key = String.fromCharCode( parseInt( event.keyCode ) );

  switch (key) {
    case 'p':
      if(bVideosLoaded) {
        bPlaying = !bPlaying;
        updateVideoState();
      }
      break;
    case '1':
      vids_index = 0;
      updateVideoState();
      break;
    case '2':
      vids_index = 1;
      updateVideoState();
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
  timekeep += 0.06;

  update_surface();
  if( bPlaying && videos[vids_index].readyState === videos[vids_index].HAVE_ENOUGH_DATA ){
    vids_cnt[vids_index].drawImage( videos[vids_index], 0, 0 );
    if( vids_tex[vids_index] ){
      vids_tex[vids_index].needsUpdate = true;
    }
  }

  renderer.render( scene, camera );
}

function update_surface(){
  for( let i=0; i<surface.geometry.vertices.length; i++ ){
    let x = i%81 +timekeep;
    let y = Math.floor( i/81 ) +timekeep;
    let z = Math.sin(x/5) * 10 + Math.cos(y/5) * 10;
    surface.geometry.vertices[i].z = z;
  }
  surface.geometry.computeFaceNormals();
  surface.geometry.normalsNeedUpdate = true;
  surface.geometry.verticesNeedUpdate =true;
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

  // LIGHTS!
	d_light1 = new THREE.DirectionalLight(0xc200ff, .5);
  d_light1.position.set( -1, 1, -1 );
	scene.add(d_light1);

  d_light2 = new THREE.DirectionalLight(0x15c0ff, .5);
  d_light2.position.set( 1, 1, 0 );
	scene.add(d_light2);
}



// === VIDEO
function loadVideos(){
  bPlaying = false;
  vids_index = 0;
  vid_wid = 800;
  vid_hei = 450;

  let file_ext = "";
  let file_path = "./src/vids/"

  // CHECK FOR FORMAT
  v = document.createElement( 'video' );
  if(v.canPlayType && v.canPlayType('video/webm').replace(/no/, '')) { file_ext = ".webm"; }
  else { file_ext = ".mp4"; }


  // ARRAY INIT
  videos   = [];
  vids_img = [];
  vids_cnt = [];
  vids_tex = [];
  vids_mat = [];
  
  // VIDEO FILE LOADING
  for (let i = 0; i < proj_list.length; i++) {
    let slug = proj_list[i];
    let file_name = file_path + slug + file_ext;

    videos[i] = document.createElement( 'video' );
    videos[i].src = file_name;
    videos[i].loop = true;
    videos[i].addEventListener('loadeddata', () => {
      videos[i].pause();
   
      // VIDEO IMAGE REFERENCE
      vids_img[i] = document.createElement( 'canvas' );
      vids_img[i].width  = vid_wid;
      vids_img[i].height = vid_hei;
      
      // VIDEO IMAGE CONTEXT
      vids_cnt[i] = vids_img[i].getContext( '2d' );
      vids_cnt[i].fillStyle = "#00000000";
      vids_cnt[i].fillRect( 0, 0, vid_wid, vid_hei ); 
   
      // VIDEO IMAGE TEXTURE
      vids_tex[i] = new THREE.Texture( vids_img[i] );
      vids_tex[i].minFilter = THREE.LinearFilter;
      vids_tex[i].magFilter = THREE.LinearFilter;
   
      // VIDEO MATERIAL
      vids_mat[i] = new THREE.MeshPhongMaterial({
        map: vids_tex[i],
        specular: 0xeeeeee,
        emissive: 0x000000,
        overdraw: true,
        side: THREE.DoubleSide
      });
   
      // update boolean
      bVideosLoaded = true;

     //  console.log("> video " + i + " loaded");
    } , false); 
    videos[i].load();
  }
}

function updateVideoState(){
  // check if video needs to play or not
  if(bPlaying) {
    videos[vids_index].play();
    // assign video material!
    surface.material = vids_mat[vids_index];
    d_light1.intensity = 0.25;
    d_light2.intensity = 0.25;
  }
  else {
    videos[vids_index].pause();
    // go back to original material
    surface.material = surf_mat;
    d_light1.intensity = 0.5;
    d_light2.intensity = 0.5;
  }
  // console.log("> (" + bPlaying + ") playing video " + vids_index);
}