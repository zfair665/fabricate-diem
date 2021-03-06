/* global THREE, assertTrue */
goog.require('diem.cloth.PhysicalPiece');
goog.require('diem.cloth.PhysicalPiece.Constraint');
goog.require('diem.cloth.Workboard');

goog.require('goog.testing.jsunit');

var EPSILON = .001;

/**
 * @param {THREE.Vector3} vec3
 * @returns {string}
 */
var prettyPrint = function(vec3) {
  return "(" + vec3.x + "," + vec3.y + "," + vec3.z + ")";
};

/**
 * @param {string} msg
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 */
var assertBasicallyEquals = function(msg, a, b) {
  var diff = a.distanceTo(b);
  assertTrue(msg + " is " + diff + " apart", a.distanceTo(b) < EPSILON);
};

var testSatisfyAtRest = function() {
  var start = new THREE.Vector3(0, 0, 0);
  var end = new THREE.Vector3(10, 10, 0);
  var constraint = new diem.cloth.PhysicalPiece.Constraint(start, end);
  constraint.satisfy();
  assertTrue(start.equals(new THREE.Vector3(0, 0, 0)));
  assertTrue(end.equals(new THREE.Vector3(10, 10, 0)));
};

var testSatisfyLoose = function() {
  var start = new THREE.Vector3(0, 0, 0);
  var end = new THREE.Vector3(0, 12, 0);
  var constraint = new diem.cloth.PhysicalPiece.Constraint(start, end);
  end.set(0, 10, 0);
  constraint.satisfy();
  assertBasicallyEquals(prettyPrint(start), start, new THREE.Vector3(0, -1, 0));
  assertBasicallyEquals(prettyPrint(end), end, new THREE.Vector3(0, 11, 0));
};

var testCtor = function() {
  // . . . .
  // . ._. .
  // . ._. .
  // . . . .
  var workboard = new diem.cloth.Workboard(3, 3);
  var workboardMesh = workboard.getObject();
  assertEquals(48, workboardMesh.geometry.vertices.length);
  var piece = new diem.cloth.PhysicalPiece(workboardMesh);
  var mesh = piece.getObject();
  var geometry = mesh.geometry;
  assertEquals(4, geometry.vertices.length);
  assertEquals(2, geometry.faces.length);
};
