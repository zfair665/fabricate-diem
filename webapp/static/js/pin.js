/* global THREE, Ammo */
goog.provide('diem.Pin');

goog.require('diem.MeshWrapper');
goog.require('diem.Physics');
goog.require('diem.tools.Delete');
goog.require('diem.tools.DragPiece');

/**
 * @param {Ammo.btRigidBody} rigidBody The fixed point representing the mouse.
 * @param {diem.cloth.PhysicalPiece} piece
 * @extends {diem.MeshWrapper}
 * @constructor
 */
diem.Pin = function(rigidBody, piece) {
  goog.base(this);
  this.index_ = 0;
  this.rigidBody_ = rigidBody;
  this.piece_ = piece;

  var geometry = new THREE.CircleGeometry(.2, 8);
  var material = new THREE.MeshBasicMaterial({color : 0x000000});
  this.mesh_ = new THREE.Mesh(geometry, material);
  var position = this.rigidBody_.getWorldTransform().getOrigin();
  this.mesh_.position.set(position.x(), position.y(), position.z());
  this.mesh_.name = "pin" + diem.Pin.PINS++;
};

goog.inherits(diem.Pin, diem.MeshWrapper);

diem.Pin.PINS = 0;

/**
 * @override
 */
diem.Pin.prototype.getIntersectables = function() {
  return [
    diem.tools.Delete.createIntersectable(diem.events.CLICKABLE, this),
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this)
  ];
};

/**
 * @param {number} index The vertex's index that the pin is through
 */
diem.Pin.prototype.appendAnchor = function(index) {
  this.index_ = index;
  var disableCollisionBetweenLinkedBodies = false;
  var influence = 1;
  this.piece_.getObject().userData.physicsBody.appendAnchor(
    this.index_,
    this.rigidBody_,
    disableCollisionBetweenLinkedBodies,
    influence);
};

/**
 * @returns {number}
 */
diem.Pin.prototype.index = function() {
  return this.index_;
};

/**
 * @returns {Ammo.btRigidBody}
 */
diem.Pin.prototype.rigidBody = function() {
  return this.rigidBody_;
};

/**
 * @returns {Array}
 */
diem.Pin.prototype.drag3dStart = function() {
  return [];
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.Pin.prototype.drag3d = function() {
  var mousePos = new THREE.Vector3().copy(diem.Globals.mouse);
  this.rigidBody_.getWorldTransform().setOrigin(
    new Ammo.btVector3(mousePos.x, mousePos.y, 0));
  this.mesh_.position = mousePos;
  return [];
};

/**
 * @returns {Array}
 */
diem.Pin.prototype.drag3dEnd = function() {
  return [];
};

/**
 * Remove this pin.
 */
diem.Pin.prototype.delete = function() {
  diem.Physics.get().getWorld().removeRigidBody(this.rigidBody_);
  this.mesh_.parent.remove(this.mesh_);
  this.rigidBody_ = null;
  this.piece_.removePin(this);
};
