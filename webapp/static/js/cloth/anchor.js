/* global THREE */

goog.provide('diem.cloth.Anchor');

goog.require('diem.Fabric');
goog.require('diem.cloth.ControlPoint');

diem.cloth.Anchor = function(corner) {
  var color = diem.Fabric.getRandomColor();
  var geometry = new THREE.BoxGeometry(
    diem.cloth.Anchor.ANCHOR_SIZE,
    diem.cloth.Anchor.ANCHOR_SIZE,
    0);
  var material = new THREE.MeshBasicMaterial({color : color});
  this.box_ = new THREE.Mesh(geometry, material);
  this.box_.position.copy(corner);

  this.cwCp_ = new diem.cloth.ControlPoint(this.box_);
  this.ccwCp_ = new diem.cloth.ControlPoint(this.box_);
};

diem.cloth.Anchor.ANCHOR_SIZE = .30;

diem.cloth.Anchor.prototype.getObject = function() {
  return this.box_;
};

diem.cloth.Anchor.prototype.getMeshes = function() {
  return this.cwCp_.getMeshes()
    .concat(this.ccwCp_.getMeshes())
    .concat(this.box_);
};

diem.cloth.Anchor.prototype.getClockwiseCp = function() {
  return this.cwCp_;
};

diem.cloth.Anchor.prototype.getCounterClockwiseCp = function() {
  return this.ccwCp_;
};

diem.cloth.Anchor.onClick = function() {};

diem.cloth.Anchor.prototype.onClick = function() {
  goog.bind(diem.cloth.Anchor.onClick, this).call();
};

// Bound to onClick, takes an Anchor instance as this.
diem.cloth.Anchor.removeAnchorPoint = function() {
  // Find curve.
  var curves = this.box_.parent.shape.curves;
  for (var i = 0; i < curves.length; ++i) {
    if (curves[i].v3 != this.box_.position) {
      continue;
    }
    var firstCurve = curves[i];
    var secondCurve = curves[(i + 1) % curves.length];
    // Splice the curves together.
    curves.splice(i, 2, new THREE.CubicBezierCurve(
      firstCurve.v0,
      firstCurve.v1,
      secondCurve.v2,
      secondCurve.v3));

    // Dirty parent before removing its children.
    this.dirtyParent_();
    this.box_.parent.remove(this.cwCp_.getObject());
    this.box_.parent.remove(this.cwCp_.getLine());
    this.box_.parent.remove(this.ccwCp_.getObject());
    this.box_.parent.remove(this.ccwCp_.getLine());
    this.box_.parent.remove(this.box_);
    return;
  }
};

diem.cloth.Anchor.prototype.onDragStart = function() {
  if (this.controlPointsAtOrigin_()) {
    this.dragAllCp_ = true;
  } else {
    this.dragAllCp_ = false;
  }
};

diem.cloth.Anchor.prototype.onDrag = function() {
  if (this.dragAllCp_) {
    // When the anchor points and control points are in the same position,
    // dragging moves both control points.
    this.cwCp_.onDragImpl_();
    this.ccwCp_.onDragImpl_(-1);
  } else {
    this.box_.position.copy(diem.Globals.mouse).sub(this.box_.parent.position);
    this.cwCp_.updateLine();
    this.ccwCp_.updateLine();
  }
  this.dirtyParent_();
};

diem.cloth.Anchor.prototype.dirtyParent_ = function() {
  diem.cloth.ControlPoint.updateActions(this.box_.parent.shape);
  this.box_.parent.geometry = this.box_.parent.shape.makeGeometry();
};

diem.cloth.Anchor.prototype.controlPointsAtOrigin_ = function() {
  return this.box_.position.equals(this.cwCp_.getObject().position)
    && this.box_.position.equals(this.ccwCp_.getObject().position);
};
