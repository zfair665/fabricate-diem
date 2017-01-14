// This file was autogenerated by depswriter.py.
// Please do not edit.
goog.addDependency('../../../../js/button.js', ['diem.Button'], [], false);
goog.addDependency('../../../../js/cloth/anchor.js', ['diem.cloth.Anchor'], ['diem.Globals', 'diem.MeshWrapper', 'diem.cloth.ControlPoint', 'diem.events', 'diem.tools.AnchorPoint', 'diem.tools.RemoveAnchorPoint'], false);
goog.addDependency('../../../../js/cloth/control_point.js', ['diem.cloth.ControlPoint'], ['diem.events', 'diem.tools.AnchorPoint', 'diem.tools.Delete'], false);
goog.addDependency('../../../../js/cloth/edge.js', ['diem.cloth.Edge'], ['diem.Globals', 'diem.MeshWrapper', 'diem.cloth.Anchor', 'diem.cloth.ControlPoint', 'diem.events', 'diem.tools.AddAnchorPoint', 'goog.asserts'], false);
goog.addDependency('../../../../js/cloth/geometry_mapper.js', ['diem.cloth.GeometryMapper'], ['diem.cloth.QueryableQuadTree', 'goog.asserts'], false);
goog.addDependency('../../../../js/cloth/link_tracker.js', ['diem.cloth.LinkTracker'], [], false);
goog.addDependency('../../../../js/cloth/physical_piece.js', ['diem.cloth.PhysicalPiece', 'diem.cloth.PhysicalPiece.Constraint'], ['diem.MeshWrapper', 'diem.Physics', 'diem.Pin', 'diem.cloth.GeometryMapper', 'diem.cloth.LinkTracker', 'diem.events', 'diem.tools.Delete', 'diem.tools.DragPiece', 'diem.tools.MovePiece'], false);
goog.addDependency('../../../../js/cloth/queryable_quadtree.js', ['diem.cloth.QueryableQuadTree'], ['goog.structs.PriorityQueue', 'goog.structs.QuadTree'], false);
goog.addDependency('../../../../js/cloth/workboard.js', ['diem.cloth.Workboard'], ['diem.Fabric', 'diem.Globals', 'diem.MeshWrapper', 'diem.cloth.Anchor', 'diem.cloth.ControlPoint', 'diem.cloth.Edge', 'diem.cloth.PhysicalPiece', 'diem.storage.Anchor', 'diem.storage.Edge', 'diem.storage.Storage', 'diem.tools.Delete', 'diem.tools.DragPiece', 'diem.tools.FabricTool', 'diem.tools.MovePiece', 'goog.asserts', 'goog.events', 'goog.ui.HsvaPalette'], false);
goog.addDependency('../../../../js/event_handler.js', ['diem.EventHandler'], ['diem.Globals', 'diem.tools.ToolManager', 'goog.events', 'goog.events.EventType', 'goog.fx.Dragger'], false);
goog.addDependency('../../../../js/events/events.js', ['diem.events'], [], false);
goog.addDependency('../../../../js/events/intersectable.js', ['diem.events.Intersectable'], [], false);
goog.addDependency('../../../../js/fabric.js', ['diem.Fabric'], [], false);
goog.addDependency('../../../../js/globals.js', ['diem.Globals'], [], false);
goog.addDependency('../../../../js/mesh_wrapper.js', ['diem.MeshWrapper'], [], false);
goog.addDependency('../../../../js/pattern.js', ['diem.Pattern'], ['diem.cloth.Workboard'], false);
goog.addDependency('../../../../js/person.js', ['diem.Person'], ['diem.MeshWrapper', 'diem.Physics', 'diem.Pin', 'diem.events', 'diem.tools.DragPiece'], false);
goog.addDependency('../../../../js/physics.js', ['diem.Physics'], [], false);
goog.addDependency('../../../../js/pin.js', ['diem.Pin'], ['diem.MeshWrapper', 'diem.Physics', 'diem.tools.Delete', 'diem.tools.DragPiece'], false);
goog.addDependency('../../../../js/ruler.js', ['diem.Ruler'], [], false);
goog.addDependency('../../../../js/scene.js', ['diem.Scene', 'diem.Scene.addButtons', 'diem.Scene.init'], ['diem.Button', 'diem.SceneContainer'], false);
goog.addDependency('../../../../js/scene_container.js', ['diem.SceneContainer'], ['diem.EventHandler', 'diem.Globals', 'diem.Person', 'diem.Physics', 'diem.cloth.PhysicalPiece', 'diem.storage.Storage', 'diem.tools.AddAnchorPoint', 'diem.tools.AddPiece', 'diem.tools.AnchorPoint', 'diem.tools.CameraTool', 'diem.tools.Delete', 'diem.tools.DragPiece', 'diem.tools.FabricTool', 'diem.tools.MovePiece', 'diem.tools.PersonTool', 'diem.tools.RemoveAnchorPoint', 'diem.tools.ToolManager', 'diem.tools.Toolbar', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/storage/model.js', ['diem.storage.Anchor', 'diem.storage.Edge', 'diem.storage.Model', 'diem.storage.Piece'], ['goog.asserts', 'goog.crypt.Md5'], false);
goog.addDependency('../../../../js/storage/storage.js', ['diem.storage.Storage'], ['diem.storage.Model', 'goog.asserts', 'goog.crypt.Md5', 'goog.events', 'goog.net.XhrIo'], false);
goog.addDependency('../../../../js/tools/add_anchor_pt.js', ['diem.tools.AddAnchorPoint'], ['diem.Button', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/add_piece.js', ['diem.tools.AddPiece'], ['diem.Button', 'diem.Pattern', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/anchor_pt.js', ['diem.tools.AnchorPoint'], ['diem.Button', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/camera_tool.js', ['diem.tools.CameraTool'], ['diem.tools.Tool', 'goog.asserts', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/delete.js', ['diem.tools.Delete'], ['diem.Button', 'diem.tools.Tool', 'goog.asserts', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/drag_piece.js', ['diem.tools.DragPiece'], ['diem.Button', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/fabric_tool.js', ['diem.tools.FabricTool'], ['diem.Button', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/move_piece.js', ['diem.tools.MovePiece'], ['diem.Button', 'diem.tools.Tool', 'goog.asserts', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/person_tool.js', ['diem.tools.PersonTool'], ['diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/rm_anchor_pt.js', ['diem.tools.RemoveAnchorPoint'], ['diem.Button', 'diem.tools.Tool', 'goog.events.KeyCodes'], false);
goog.addDependency('../../../../js/tools/tool.js', ['diem.tools.Tool'], ['diem.events.Intersectable'], false);
goog.addDependency('../../../../js/tools/tool_manager.js', ['diem.tools.ToolManager'], ['diem.tools.Tool', 'goog.asserts', 'goog.events', 'goog.ui.KeyboardShortcutHandler'], false);
goog.addDependency('../../../../js/tools/toolbar.js', ['diem.tools.Toolbar'], [], false);
goog.addDependency('../../../../js/user.js', ['diem.User.delete'], ['goog.dom', 'goog.events', 'goog.net.XhrIo'], false);
