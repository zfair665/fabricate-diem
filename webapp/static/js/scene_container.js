
/* global THREE, requestAnimationFrame */
goog.provide('diem.SceneContainer');

goog.require('diem.EventHandler');
goog.require('diem.Globals');
goog.require('diem.Pattern');
goog.require('diem.Person');
goog.require('diem.Ruler');

// TODO: more dynamic.
var WIDTH = 800;
var HEIGHT = 600;

/**
 * @constructor
 */
diem.SceneContainer = function() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 50);

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setClearColor(0xf0f0f0);
  this.renderer.setSize(WIDTH, HEIGHT);
  document.getElementById(diem.Globals.WEBGL_DIV_ID).appendChild(
    this.renderer.domElement);

  this.camera.position.z = 20;
  this.camera.position.y = 10;
  this.camera.lookAt(new THREE.Vector3(0, 10, 0));

  this.eventHandler_ = new diem.EventHandler(this.camera, this.scene);

  this.initLights_();
  var person = new diem.Person(
    this.scene,
    goog.bind(this.eventHandler_.handleIntersectables, this.eventHandler_));

  var xm = new THREE.LineBasicMaterial({color : 0xff0000});
  var xg = new THREE.Geometry();
  xg.vertices.push(new THREE.Vector3(-10, 0, 0), new THREE.Vector3(10, 0, 0));
  var xAxis = new THREE.Line(xg, xm);

  var ym = new THREE.LineBasicMaterial({color : 0x00ff00});
  var yg = new THREE.Geometry();
  yg.vertices.push(new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, 10, 0));
  var yAxis = new THREE.Line(yg, ym);

  var zm = new THREE.LineBasicMaterial({color : 0x0000ff});
  var zg = new THREE.Geometry();
  zg.vertices.push(new THREE.Vector3(0, 0, -10), new THREE.Vector3(0, 0, 10));
  var zAxis = new THREE.Line(zg, zm);

  this.scene.add(xAxis);
  this.scene.add(yAxis);
  this.scene.add(zAxis);
};

/**
 * @private
 */
diem.SceneContainer.prototype.initLights_ = function() {
  var ambient = new THREE.AmbientLight(0x101030);
  this.scene.add(ambient);
  var directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0,0,30);
  this.scene.add(directionalLight);
};

/**
 * @param {Date} now
 */
diem.SceneContainer.prototype.render = function(now) {
  if (diem.Globals.mouse == null) {
    // Before closure is loaded.
    diem.Globals.mouse = new THREE.Vector3();
  }

  requestAnimationFrame(render);
  this.renderer.render(this.scene, this.camera);
};
