import React from 'react'
import * as THREE from 'three'

export default class Background extends React.Component {
  static defaultProps = {
    cameraPositionX: -200,
    cameraPositionY: 190,
    cameraPositionZ: 500
  }

  constructor(props) {
    super(props)

    this.sketchElement = null

    this.renderer = null
    this.camera = null
    this.scene = null
    this.timekeep = null
    this.surface = null
    this.wire = null
    this.mouse = null
  }


  // === INIT =========================
  componentDidMount() {
    const container = this.sketchElement;
  	let wid = window.innerWidth;
  	let hei = window.innerHeight;

  	// THREE INITIALIZATION
  	this.renderer = new THREE.WebGLRenderer({ });
  	this.renderer.setPixelRatio(window.devicePixelRatio);
  	this.renderer.setSize(wid, hei);
  	container.appendChild(this.renderer.domElement);

  	this.scene = new THREE.Scene();
  	this.scene.background = new THREE.Color( 0x4e3166 );

  	this.camera = new THREE.PerspectiveCamera(52, wid/hei, 0.1, 5000);
  	this.camera.position.set(
      this.props.cameraPositionX,
      this.props.cameraPositionY,
      this.props.cameraPositionZ
    );
    this.camera.rotation.set( -.82, -.23, -.23);

    this.mouse = new THREE.Vector2();

  	window.addEventListener('resize', this.onResize);
  	window.addEventListener('mousemove', this.onMouseMove);

    this.timekeep = 0;
  	this.createEnvironment();
  	this.animate();
  }


  // === REACT ========================
  componentDidUpdate(prevProps) {
    if (
      prevProps.cameraPositionX !== this.props.cameraPositionX  ||
      prevProps.cameraPositionY !== this.props.cameraPositionY  ||
      prevProps.cameraPositionZ !== this.props.cameraPositionZ
    ) {
      this.camera.position.set(
        this.props.cameraPositionX,
        this.props.cameraPositionY,
        this.props.cameraPositionZ
      );
      this.camera.updateProjectionMatrix();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    // here we need to clean up our THREE.js objects
    while (this.scene.children.length > 0) {
      const object = this.scene.children[0];
      if (object.material) {
        object.material.dispose();
      }
      if (object.geometry) {
        object.geometry.dispose();
      }
      this.scene.remove(object);
    }
  }

  render() {
    return (
      <div
        id="sketch"
        ref={el => this.sketchElement = el}
      />
    )
  }

  // === EVENT HANDLERS ===============
  onResize = () => {
    let wid = window.innerWidth;
    let hei = window.innerHeight;

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(wid, hei);
    this.camera.aspect = wid/hei;
    this.camera.updateProjectionMatrix();
  }

  onMouseMove = (event) => {
    this.mouse.x =  (event.clientX / window.innerWidth)  *2. -1.;
    this.mouse.y = -(event.clientY / window.innerHeight) *2. +1.;
  }


  // === THREE ========================
  createEnvironment = () => {
    // SURFACE
    let surf_geo = new THREE.PlaneGeometry(1200, 1200, 80, 80);
    let surf_mat = new THREE.MeshPhongMaterial({
      color: 0x4e3166,
      flatShading: true,
      specular: 0xeeeeee,
      emissive: 0x4e3166,
      side: THREE.DoubleSide
    });
    this.surface = new THREE.Mesh(surf_geo, surf_mat);
    this.surface.rotation.x = Math.PI/2;
  	this.surface.position.set(0, -20, 0);
    this.scene.add(this.surface);

    // WIRE SURFACE
    let wire_geo = new THREE.PlaneGeometry(1200, 1200, 80, 80);
    let wire_mat = new THREE.MeshBasicMaterial({
      color: 0x888888,
      wireframe: true,
      side: THREE.DoubleSide
    });
    this.wire = new THREE.Mesh(wire_geo, wire_mat);
    this.wire.rotation.x = Math.PI/2;
    this.wire.position.set(0, -20, 0);
    this.scene.add(this.wire);

    // LIGHTS!
  	let d_light1 = new THREE.DirectionalLight(0xc200ff, .5);
    d_light1.position.set( 0, 1, -1 );
  	this.scene.add(d_light1);

    let d_light2 = new THREE.DirectionalLight(0x15c0ff, .5);
    d_light2.position.set( 1, 1, 0 );
  	this.scene.add(d_light2);
  }

  
  // === LOOP =========================
  animate = () => {
    this.renderer.setAnimationLoop(this.renderTHREE);
  }

  renderTHREE = () => {
    this.timekeep += 0.03;
    this.updateSurface();
    this.renderer.render(this.scene, this.camera);
  }

  updateSurface = () => {
    for( let i=0; i < this.surface.geometry.vertices.length; i++ ){
      let x = i%81 + this.timekeep;
      let y = Math.floor( i/81 ) + this.timekeep;
      let z = Math.sin(x/5) * 20 + Math.cos(y/5) * 20;
      this.surface.geometry.vertices[i].z = z;
      // this.wire.geometry.vertices[i].z = z;

      let xw = x - this.mouse.x *81./8.;
      let yw = y - this.mouse.y *81./8.;
      let zw = Math.sin(xw/5) * 20 + Math.cos(yw/5) * 20;
      this.wire.geometry.vertices[i].z = zw;
    }
    this.surface.geometry.computeFaceNormals();
    this.surface.geometry.normalsNeedUpdate = true;
    this.surface.geometry.verticesNeedUpdate = true;

    this.wire.geometry.normalsNeedUpdate = true;
    this.wire.geometry.verticesNeedUpdate =true;
  }
}
