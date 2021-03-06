goog.provide('diem.tools.CameraTool');

goog.require('diem.tools.Tool');
goog.require('goog.asserts');
goog.require('goog.events.KeyCodes');

/**
 * @param {diem.MeshWrapper} camera
 * @param {Array.<goog.events.KeyCodes>} dir
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.CameraTool = function(camera, dir) {
  goog.base(this);
  this.name_ = diem.tools.CameraTool.NAME + dir;
  this.camera_ = camera;
  this.dir_ = dir;
};

goog.inherits(diem.tools.CameraTool, diem.tools.Tool);

diem.tools.CameraTool.NAME = 'CAMERA';

/**
 * @param {diem.tools.Tool} activeTool Ignored.
 * @param {diem.storage.Piece} [opt_piece]
 * @override
 */
diem.tools.CameraTool.prototype.onSelect = function() {
  var modified = this.dir_.length == 2;
  switch (this.dir_[0]) {
  case goog.events.KeyCodes.LEFT:
    goog.asserts.assert(!modified);
    this.camera_.position.setX(this.camera_.position.x - 1);
    break;
  case goog.events.KeyCodes.RIGHT:
    goog.asserts.assert(!modified);
    this.camera_.position.setX(this.camera_.position.x + 1);
    break;
  case goog.events.KeyCodes.UP:
    if (modified) {
      this.camera_.position.setZ(this.camera_.position.z - 1);
    } else {
      this.camera_.position.setY(this.camera_.position.y + 1);
    }
    break;
  case goog.events.KeyCodes.DOWN:
    if (modified) {
      this.camera_.position.setZ(this.camera_.position.z + 1);
    } else {
      this.camera_.position.setY(this.camera_.position.y - 1);
    }
    break;
  }
  return [];
};

/**
 * @override
 */
diem.tools.CameraTool.prototype.getKeys = function() {
  return this.dir_;
};

/**
 * @override
 */
diem.tools.CameraTool.prototype.stateful = function() {
  return false;
};

/**
 * @param {THREE.Camera} [camera]
 * @param {number} [opt_x]
 * @param {number} [opt_y]
 * @param {number} [opt_z]
 */
diem.tools.CameraTool.setCameraPosition = function(
  camera, opt_x, opt_y, opt_z) {
  if (opt_x == undefined) {
    opt_x = 0;
    opt_y = 10;
    opt_z = 10;
  }
  camera.position.set(opt_x, opt_y, opt_z);
};
