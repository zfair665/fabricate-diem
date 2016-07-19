/* global THREE */

goog.provide('diem.cloth.Anchor');

goog.require('diem.Fabric');
goog.require('diem.Globals');
goog.require('diem.MeshWrapper');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.events.Clickable');
goog.require('diem.events.Draggable');

/**
 * @constructor
 * @param {THREE.Vector3} corner the position of this anchor point in world
 *     coordinates. It will be adjusted to relative coordinates when addToParent
 *     is called.
 */
diem.cloth.Anchor = function(corner) {
  goog.base(this);
  diem.events.Clickable.register(this);
  diem.events.Draggable.register(this);

  var color = diem.Fabric.getRandomColor();
  var geometry = new THREE.BoxGeometry(
    diem.cloth.Anchor.ANCHOR_SIZE,
    diem.cloth.Anchor.ANCHOR_SIZE,
    0);
  var material = new THREE.MeshBasicMaterial({color : color});
  this.mesh_ = new THREE.Mesh(geometry, material);
  this.mesh_.position.copy(corner);

  this.cwCp_ = new diem.cloth.ControlPoint(this.mesh_);
  this.ccwCp_ = new diem.cloth.ControlPoint(this.mesh_);
};

goog.inherits(diem.cloth.Anchor, diem.MeshWrapper);

diem.cloth.Anchor.ANCHOR_SIZE = .30;

/**
 * @override
 */
diem.cloth.Anchor.prototype.addToParent = function(parent) {
  // The anchor points/cps should be adjusted relative to the parent,
  // but the lines use the anchor points'/cps' position, so they don't
  // need to be readjusted.
  diem.Globals.worldToParent(this.cwCp_.getObject(), parent);
  diem.Globals.worldToParent(this.ccwCp_.getObject(), parent);

  var meshes = this.cwCp_.getMeshes().concat(this.ccwCp_.getMeshes());
  for (var i = 0; i < meshes.length; ++i) {
    parent.add(meshes[i]);
  }

  diem.Globals.worldToParent(this.mesh_, parent);
  parent.add(this.mesh_);
};

/**
 * @override
 */
diem.cloth.Anchor.prototype.addToEventHandler = function(handler) {
  handler.register(this);
  handler.register(this.cwCp_);
  handler.register(this.ccwCp_);
};

/**
 * Returns the mesh for the anchor point.
 * @returns {THREE.Mesh}
 */
diem.cloth.Anchor.prototype.getObject = function() {
  return this.mesh_;
};

/**
 * Returns the "next" diem.cloth.ControlPoint.
 * @returns {diem.cloth.ControlPoint}
 */
diem.cloth.Anchor.prototype.getClockwiseCp = function() {
  return this.cwCp_;
};

/**
 * Returns the "previous" diem.cloth.ControlPoint.
 * @returns {diem.cloth.ControlPoint}
 */
diem.cloth.Anchor.prototype.getCounterClockwiseCp = function() {
  return this.ccwCp_;
};

/**
 * Bound to various instances of diem.cloth.Anchor by tools.
 */
diem.cloth.Anchor.onClick = function() {};

/**
 * Called when a click happens after a tool has bound this to onClick.
 */
diem.cloth.Anchor.prototype.onClick = function() {
  goog.bind(diem.cloth.Anchor.onClick, this).call();
};

/**
 * Bound to onClick, takes an Anchor instance as this.
 * @this {diem.cloth.Anchor}
 */
diem.cloth.Anchor.removeAnchorPoint = function() {
  // Find curve.
  var edges = this.mesh_.parent.shape.edges_;
  for (var i = 0; i < edges.length; ++i) {
    if (edges[i].getBezierCurve().v3 != this.mesh_.position) {
      continue;
    }
    var firstCurve = edges[i];
    var secondCurve = edges[(i + 1) % edges.length];
    // Create a new curve from the first curve's start point to the second
    // curve's end point.
    firstCurve.replaceEndAnchor(secondCurve.getEndAnchor());
    edges.splice(i, 1);

    // Dirty parent before removing its children.
    this.mesh_.parent.remove(this.cwCp_.getObject());
    this.mesh_.parent.remove(this.cwCp_.getLine());
    this.mesh_.parent.remove(this.ccwCp_.getObject());
    this.mesh_.parent.remove(this.ccwCp_.getLine());
    this.mesh_.parent.remove(this.mesh_);
    return;
  }
};

/**
 * Determines if the drag should mirror the control points or move the anchor
 * point.
 */
diem.cloth.Anchor.prototype.onDragStart = function() {
  this.dragAllCp_ = this.controlPointsAtOrigin_();
};

/**
 * Actually performs the drag.
 */
diem.cloth.Anchor.prototype.onDrag = function() {
  if (this.dragAllCp_) {
    // When the anchor points and control points are in the same position,
    // dragging moves both control points.
    this.cwCp_.onDragImpl();
    this.ccwCp_.onDragImpl(-1);
  } else {
    this.mesh_.position.copy(diem.Globals.mouse).sub(this.mesh_.parent.position);
    this.cwCp_.updateLine();
    this.ccwCp_.updateLine();
  }
};

/**
 * Resets the control points' drag behavior, depending on the drag result.
 */
diem.cloth.Anchor.prototype.onDragEnd = function() {
  var freeCps = !this.controlPointsAtOrigin_();
  this.cwCp_.setIndependentlyDraggable(freeCps);
  this.ccwCp_.setIndependentlyDraggable(freeCps);
};

/**
 * @private
 * @returns {boolean}
 */
diem.cloth.Anchor.prototype.controlPointsAtOrigin_ = function() {
  return this.mesh_.position.equals(this.cwCp_.getObject().position)
    && this.mesh_.position.equals(this.ccwCp_.getObject().position);
};
