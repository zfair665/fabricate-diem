/* global assertTrue, fail */
goog.require('diem.MeshWrapper');
goog.require('diem.events.Clickable');
goog.require('diem.events.Draggable');

goog.require('goog.testing.jsunit');

var testWrongType = function() {
  try {
    var thing = {};
    fail(diem.events.Clickable.register(thing));
  } catch (expected) {
    // Fallthrough
  }
};

var testClickable = function() {
  var thing = new diem.MeshWrapper();
  diem.events.Clickable.register(thing);
  assertTrue(diem.events.Clickable.isClickable(thing));
};

var testDraggable = function() {
  var thing = new diem.MeshWrapper();
  diem.events.Draggable.register(thing);
  assertTrue(diem.events.Draggable.isDraggable(thing));
};
