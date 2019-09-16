// global threejs variables
let container, renderer, camera, scene;
let controls, loader, timekeep;
let d_light1, d_light2;
let surface, surf_mat;
let proj_data, proj_slugs;
let videos, vids_img, vids_cnt, vids_tex, vids_mat;
let vid_wid, vid_hei;
let curr_vid, bVideosLoaded, bPlaying;

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
  curr_vid = "";
  // proj_slugs = ["inner_cadence", "peaceful_forest"];

  createEnvironment();
  loadProjects();
  // loadVideos();

	animate();
}



// === LOAD PROJECT DATA
function loadProjects(){
  proj_slugs = [];

  let list = document.createElement( 'ul' );

  $.getJSON("./src/content.json", function(json){
    proj_data = json;

    proj_data["portfolio"].forEach(proj => {
      if(proj["display"] != 0){
        // get project names and slugs
        let p_name = proj["name"];
        let p_slug = proj["slug"];

        // create the list
        let item_elem = document.createElement( 'li' );
        // create link
        let item_link = document.createElement( 'a' );
        item_link.textContent = p_name;
        item_link.id = p_slug;
        item_link.href = "/portfolio/" + p_slug + "/";
        item_link.onmouseover = projectOnHover; 
        item_link.onmouseout  = projectOnLeave;
        // console.log("\t> project: " + p_name + " - " + p_slug);
        // console.log("\t> link: " + item_link.href);
        // append link and element
        item_elem.appendChild( item_link );
        list.appendChild( item_elem );

        // add data to the list
        proj_slugs.push( p_slug );
      }
    });

    // add list to site
    document.querySelector('#project_list').appendChild( list );
    
    // add videos 
    loadVideos();
	});
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

  // switch (key) {
  //   case 'p':
  //     if(bVideosLoaded) {
  //       bPlaying = !bPlaying;
  //       updateVideoState();
  //     }
  //     break;
  //   case '1':
  //     curr_vid = proj_slugs[0];
  //     updateVideoState();
  //     break;
  //   case '2':
  //     curr_vid = proj_slugs[1];
  //     updateVideoState();
  //     break;
  //   default:
  //     break;
  // }
}
function projectOnHover( event ){
  if( proj_slugs.indexOf(event.target.id) >= 0 ){ 
    curr_vid = event.target.id;
    bPlaying = true;
    updateVideoState();
  }
}
function projectOnLeave(){
  bPlaying = false;
  updateVideoState();
}


// === ANIMATION
function animate() {
  renderer.setAnimationLoop( render );
}
function render(){
  timekeep += 0.06;

  update_surface();
  if( bPlaying && videos[curr_vid].readyState === videos[curr_vid].HAVE_ENOUGH_DATA ){
    vids_cnt[curr_vid].drawImage( videos[curr_vid], 0, 0 );
    if( vids_tex[curr_vid] ){
      vids_tex[curr_vid].needsUpdate = true;
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
  curr_vid = proj_slugs[0];
  vid_wid = 800;
  vid_hei = 450;

  let file_ext = "";
  let file_path = "./portfolio/"

  // CHECK FOR FORMAT
  v = document.createElement( 'video' );
  if(v.canPlayType && v.canPlayType('video/webm').replace(/no/, '')) { file_ext = ".webm"; }
  else if (v.canPlayType && v.canPlayType('video/mp4').replace(/no/, '')) { file_ext = ".mp4"; }
  else { file_ext = ".webm"; }


  // ARRAY INIT
  videos   = [];
  vids_img = [];
  vids_cnt = [];
  vids_tex = [];
  vids_mat = [];
  
  // VIDEO FILE LOADING
  for (let i = 0; i < proj_slugs.length; i++) {
    let slug = proj_slugs[i];
    let file_name = file_path + slug + "/preview" + file_ext;

    videos[slug] = document.createElement( 'video' );
    videos[slug].src = file_name;
    videos[slug].loop = true;
    videos[slug].addEventListener('loadeddata', () => {
      videos[slug].pause();
   
      // VIDEO IMAGE REFERENCE
      vids_img[slug] = document.createElement( 'canvas' );
      vids_img[slug].width  = vid_wid;
      vids_img[slug].height = vid_hei;
      
      // VIDEO IMAGE CONTEXT
      vids_cnt[slug] = vids_img[slug].getContext( '2d' );
      vids_cnt[slug].fillStyle = "#00000000";
      vids_cnt[slug].fillRect( 0, 0, vid_wid, vid_hei ); 
   
      // VIDEO IMAGE TEXTURE
      vids_tex[slug] = new THREE.Texture( vids_img[slug] );
      vids_tex[slug].minFilter = THREE.LinearFilter;
      vids_tex[slug].magFilter = THREE.LinearFilter;
   
      // VIDEO MATERIAL
      vids_mat[slug] = new THREE.MeshPhongMaterial({
        map: vids_tex[slug],
        specular: 0xeeeeee,
        emissive: 0x000000,
        overdraw: true,
        side: THREE.DoubleSide
      });
   
      // update boolean
      bVideosLoaded = true;

     //  console.log("> video " + i + " loaded");
    } , false);
    videos[slug].addEventListener('error', (err) => {
      console.log("ERROR, couldn't load video : " + slug);
      // in case of error, keep default material
      vids_mat[slug] = surf_mat;
    }, false);

    videos[slug].load();
  }
}
function updateVideoState(){
  // check if video needs to play or not
  if( bPlaying ) {
    videos[curr_vid].play();
    // assign video material!
    surface.material = vids_mat[curr_vid];
    d_light1.intensity = 0.25;
    d_light2.intensity = 0.25;
  }
  else {
    videos[curr_vid].pause();
    // go back to original material
    surface.material = surf_mat;
    d_light1.intensity = 0.5;
    d_light2.intensity = 0.5;
  }
}