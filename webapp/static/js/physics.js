/* global Ammo, THREE */
goog.provide('diem.Physics');

/**
 * @private
 */
diem.Physics = function() {
  this.clock = new THREE.Clock();
  this.collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
  this.dispatcher = new Ammo.btCollisionDispatcher(this.collisionConfiguration);
  this.broadphase = new Ammo.btDbvtBroadphase();
  this.solver = new Ammo.btSequentialImpulseConstraintSolver();
  this.softBodySolver = new Ammo.btDefaultSoftBodySolver();
  this.physicsWorld = new Ammo.btSoftRigidDynamicsWorld(
    this.dispatcher, this.broadphase, this.solver, this.collisionConfiguration,
    this.softBodySolver);
  this.physicsWorld.setGravity( new Ammo.btVector3(0, diem.Physics.GRAVITY, 0));
  this.physicsWorld.getWorldInfo().set_m_gravity(
    new Ammo.btVector3( 0, diem.Physics.GRAVITY, 0));
};

diem.Physics.GRAVITY = -9.8;
diem.Physics.INSTANCE = null;

/**
 * @returns {diem.Physics}
 */
diem.Physics.get = function() {
  if (diem.Physics.INSTANCE == null) {
    diem.Physics.INSTANCE = new diem.Physics();
  }
  return diem.Physics.INSTANCE;
};

/**
 * Updates world by one timestep.
 */
diem.Physics.prototype.update = function() {
  var delta = this.clock.getDelta();
  this.physicsWorld.stepSimulation(delta);
};

/**
 * @returns {Ammo.btSoftRigidDynamicsWorld}
 */
diem.Physics.prototype.getWorld = function() {
  return this.physicsWorld;
};

/**
 * Adds the mouse as a "rigid body" so the fabric can be attached to it.
 * @returns {Ammo.btRigidBody}
 */
diem.Physics.prototype.addMouseBody = function() {
  var mouseShape = new Ammo.btSphereShape(.1);
  var transform = new Ammo.btTransform();
  transform.setOrigin(new Ammo.btVector3(
    diem.Globals.mouse.x, diem.Globals.mouse.y, 0));
  transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
  var mouseMotionState = new Ammo.btDefaultMotionState(transform);
  var inertia = new Ammo.btVector3(0, 0, 0);
  var mouseBodyInfo = new Ammo.btRigidBodyConstructionInfo(
    0,  // mass
    mouseMotionState,
    mouseShape,
    inertia);
  var mouseRigidBody = new Ammo.btRigidBody(mouseBodyInfo);
  diem.Physics.get().getWorld().addRigidBody(mouseRigidBody);
  return mouseRigidBody;
};
