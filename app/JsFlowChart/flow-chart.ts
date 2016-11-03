import { Component, OnInit, NgModule } from '@angular/core';
import { ElementRef } from '@angular/core';
import { TableLayout } from './tablelayout';
import * as go from 'gojs';


let SizeOfAll: number[] = [];

  // These parameters need to be set before defining the templates.
  let MINLENGTH = 200;  // this controls the minimum length of any swimlane 
  let MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane
var myDiagram: go.Diagram;
var myMargin: go.Margin;


@Component({
  moduleId: module.id,
  selector: 'flow-chart',
  templateUrl: 'flow-chart.html',
  styleUrls: [ 'flow-chart.css' ], 


})


  // some shared functions
export class FlowChartComponent implements OnInit {

 
  

 
 
  ngOnInit(){
function nodeStyle() {
      return [
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center,
          mouseEnter: function (e: any, obj: any) { showPorts(obj.part, true); },
          mouseLeave: function (e: any, obj: any) { showPorts(obj.part, false); }
        }
      ];
    }
    function makePort(name: any, spot: any, output: any, input: any) {
      // the port is basically just a small circle that has a white stroke when it is made visible
      return make(go.Shape, "Circle",
               {
                  fill: "transparent",
                  stroke: null,  // this is changed to "white" in the showPorts function
                  desiredSize: new go.Size(8, 8),
                  alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                  portId: name,  // declare this object to be a "port"
                  fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                  fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                  cursor: "pointer"  // show a different cursor to indicate potential link point
               });
    }

  
    const make = go.GraphObject.make;
    
  myDiagram =
      make(go.Diagram, "myDiagramDiv",
        {
          allowDrop: true, 
          // start everything in the middle of the viewport
          initialContentAlignment: go.Spot.Center,
          // use a custom ResizingTool (along with a custom ResizeAdornment on each Group)
          resizingTool: new LaneResizingTool(),
          // use a simple layout that ignores links to stack the top-level Pool Groups next to each other
          layout: make(PoolLayout),
          // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)
          mouseDragOver: function(e: any) {
            if (!e.diagram.selection.all(function(n: any) { return n instanceof go.Group; })) {
              e.diagram.currentCursor = 'not-allowed';
            }
          },
          mouseDrop: function(e: any) {
            if (!e.diagram.selection.all(function(n: any) { return n instanceof go.Group; })) {
              e.diagram.currentTool.doCancel();
            }
          },
          // a clipboard copied node is pasted into the original node's group (i.e. lane).
          "commandHandler.copiesGroupKey": true,
          // automatically re-layout the swim lanes after dragging the selection
          "SelectionMoved": relayoutDiagram,  // this DiagramEvent listener is
          "SelectionCopied": relayoutDiagram, // defined above
          "animationManager.isEnabled": false,
          // enable undo & redo
          "undoManager.isEnabled": true
        });

    // this is a Part.dragComputation function for limiting where a Node may be dragged
   myDiagram.groupTemplateMap.add("MainPool",
   make(go.Group, "Auto",
   new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        { // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: make(PoolLayout, { spacing: new go.Size(0, 0) }) // no space between lanes
        },
        /* make(go.Shape, "Rectangle",
          { fill: "white", portId: "", cursor: "pointer", fromLinkable: true, toLinkable: true }),*/
          make(go.TextBlock, { margin: 0 },
          new go.Binding("text", "text")),
          { dragComputation: stayInGroup }
          ));


   

        var lightText = 'whitesmoke';

    myDiagram.nodeTemplateMap.add("",  // the default category
      make(go.Node, "Spot", nodeStyle(),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        make(go.Panel, "Auto",
          make(go.Shape, "Rectangle",
            { fill: "#00A9C9", stroke: null },
            new go.Binding( "fill", "color"),
            new go.Binding("figure", "figure")),
          make(go.TextBlock,
            {
              font: "bold 11pt Helvetica, Arial, sans-serif",
              stroke: lightText,
              margin: 8,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        ),
        // four named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
      ));

    function groupStyle() {  // common settings for both Lane and Pool Groups
      return [
        {
          layerName: "Background",  // all pools and lanes are always behind all nodes and links
          background: "transparent",  // can grab anywhere in bounds
          movable: true, // allows users to re-order by dragging
          copyable: false,  // can't copy lanes or pools
          avoidable: false,  // don't impede AvoidsNodes routed Links
            mouseDragEnter: function(e: any, grp: any, prev: any) { highlightGroup(e, grp, true); },
          mouseDragLeave: function(e: any, grp: any, next: any) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          // when the selection is dropped into a Group, add the selected Parts into that Group;
          // if it fails, cancel the tool, rolling back any changes
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true, 
        
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
      ];
    }

    // hide links between lanes when either lane is collapsed
    function updateCrossLaneLinks(group: any) {
      group.findExternalLinksConnected().each(function(l: any) {
        l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
      });
    }

    // each Group is a "swimlane" with a header on the left and a resizable lane on the right
    myDiagram.groupTemplate =
      make(go.Group, "Horizontal", groupStyle(),
        {
               background: "transparent",
          ungroupable: true,
          // highlight when dragging into the Group
          mouseDragEnter: function(e: any, grp: any, prev: any) { highlightGroup(e, grp, true); },
          mouseDragLeave: function(e: any, grp: any, next: any) { highlightGroup(e, grp, false); },
          computesBoundsAfterDrag: true,
          // when the selection is dropped into a Group, add the selected Parts into that Group;
          // if it fails, cancel the tool, rolling back any changes
          mouseDrop: finishDrop,
          handlesDragDropForMembers: true, 

          selectionObjectName: "SHAPE",  // selecting a lane causes the body of the lane to be highlit, not the label
          resizable: true, resizeObjectName: "SHAPE",  // the custom resizeAdornmentTemplate only permits two kinds of resizing
          layout: make(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
                    {
                      isInitial: false,  // don't even do initial layout
                      isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
                      direction: 0,
                      columnSpacing: 10,
                      layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
                    }),  // needed to prevent recomputing Group.placeholder bounds too soon
          computesBoundsIncludingLinks: false,  // to reduce occurrences of links going briefly outside the lane
          computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
            // don't need to define handlers on member Nodes and Links
         
          subGraphExpandedChanged: function(grp: any) {
            let shp = grp.resizeObject;
            if (grp.diagram.undoManager.isUndoingRedoing) return;
            if (grp.isSubGraphExpanded) {
              shp.height = grp._savedBreadth;
              var Size = shp.height;
              
            } else {
              grp._savedBreadth = shp.height;
              shp.height = NaN;
              var Size = grp._savedBreadth;
            }
            updateCrossLaneLinks(grp);
             
            
          }
        },
        new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
        // the lane header consisting of a Shape and a TextBlock
        // end Horizontal Panel
        make(go.Panel, "Auto",  // the lane consisting of a background Shape and a Placeholder representing the subgraph
          make(go.Shape, "Rectangle",  // this is the resized object
           
            { name: "SHAPE", fill: "white" },
            new go.Binding("fill", "color"),
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
          make(go.Placeholder,
            { padding: 12, alignment: go.Spot.TopLeft }),
          make(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
            { name: "LABEL",
              font: "bold 13pt sans-serif", editable: true,
              angle: 0, alignment: go.Spot.TopLeft, margin: new go.Margin(2, 0, 0, 4) },
            new go.Binding("visible", "isSubGraphExpanded", function(e) { return !e; }).ofObject(),
            new go.Binding("text", "text").makeTwoWay())
        )  // end Auto Panel
    );  // end Group

    // define a custom resize adornment that has two resize handles if the group is expanded
    myDiagram.groupTemplate.resizeAdornmentTemplate =
      make(go.Adornment, "Spot",
        make(go.Placeholder),
        make(go.Shape,  // for changing the length of a lane
          {
            alignment: go.Spot.Right,
            desiredSize: new go.Size(7, 50),
            fill: "lightblue", stroke: "dodgerblue",
            cursor: "col-resize"
          },
          new go.Binding("visible", "", function(ad) { return ad.adornedPart.isSubGraphExpanded; }).ofObject()),
        make(go.Shape,  // for changing the breadth of a lane
          {
            alignment: go.Spot.Bottom,
            desiredSize: new go.Size(50, 7),
            fill: "lightblue", stroke: "dodgerblue",
            cursor: "row-resize"
          },
          new go.Binding("visible", "", function(ad) { return ad.adornedPart.isSubGraphExpanded; }).ofObject())
      );



    myDiagram.groupTemplateMap.add("Pool",
      make(go.Group, "Auto", groupStyle(),
        { 
          movable: false,
          // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: make(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        make(go.Shape,
          { fill: "white" },
          new go.Binding("fill", "color")),
        make(go.Panel, "Table",
          { defaultRowSeparatorStroke: "black" },
          make(go.Panel, "Horizontal",
            {  row: 0, angle: 0 },
            make(go.TextBlock,
              { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(0,0,0,0) },
              new go.Binding("text").makeTwoWay())
          ),
          make(go.Placeholder,
            {   row: 1 })
        )
      ));
   
   myDiagram.groupTemplateMap.add("Blank",
     make(go.Group, "Auto", groupStyle(),
        { 
          movable: false,
          // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: make(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        make(go.Shape,
          { fill: "white" },
          new go.Binding("fill", "color")),
        make(go.Panel, "Table",
          { defaultRowSeparatorStroke: "black" },
          make(go.Panel, "Horizontal",
            {  row: 0, angle: 0 },
          ),
          make(go.Placeholder,
            {   row: 1 })
        )
      )); 
   
             myDiagram.groupTemplateMap.add("PoolVert2",
      make(go.Group, "Auto", groupStyle(),
        {movable: false,
           // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: make(PoolLayoutVertical, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        make(go.Shape,
          { fill: "white" },
          new go.Binding("fill", "color")),
        make(go.Panel, "Table",
          { defaultRowSeparatorStroke: "black" },
          make(go.Panel, "Horizontal",
            { row: 0, column: 0, angle: 0 },
            make(go.TextBlock,
            {angle: 270},
            
              { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(0, 0, 0, 0) },
              new go.Binding("text").makeTwoWay())
          ),
          make(go.Placeholder,
            { column: 1 } ))
      ));
          myDiagram.groupTemplateMap.add("PoolVert",
      make(go.Group, "Auto", groupStyle(),
        { // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: make(PoolLayoutVertical, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        make(go.Shape,
          { fill: "white" },
          new go.Binding("fill", "color")),
        make(go.Panel, "Table",
          { defaultRowSeparatorStroke: "black" },
          make(go.Panel, "Horizontal",
            { row: 0, angle: 0 },
            make(go.TextBlock,
            {angle: 0},
              { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(0, 0, 0, 0) },
              new go.Binding("text").makeTwoWay())
          ),
          make(go.Placeholder,
            { row: 1 })
        )
      ));

 
    myDiagram.linkTemplate =
      make(go.Link,
        { routing: go.Link.AvoidsNodes, corner: 5 },
        { relinkableFrom: true, relinkableTo: true },
        make(go.Shape),
        make(go.Shape, { toArrow: "Standard" })
      );

    // define some sample graphs in some of the lanes
    myDiagram.model = new go.GraphLinksModel(
    [ // node data
{key:"main", /*text:"mainpool",*/ isGroup:true, category: "MainPool"},
{key: "HCA", text:"HCA", isGroup: true, category: "PoolVert2", group:'main'},
{key: "Group12", text:"Group2", isGroup: true, category: "PoolVert2", group:'main'},
{key: "Group3",text:"Group3", isGroup: true, category: "PoolVert2", group:'main'},
// Column one
//cell one
{key: "Group2", text:"group3", isGroup: true, category: "Pool", group:"HCA"},
{key: "lane11", text: 'testing', isGroup: true, group:"Group2"},
//end cell one
//cell two
{key: "INGroup2", text: "hello", isGroup: true, category: "Blank", group: "Group12"},
{key: "lane12", text: "testing2", isGroup: true, group:"INGroup2"},
//end cell two
//cell three
{key: "3", text:"unknown", isGroup: true, category: "Blank", group: "Group3"},
{key: "lane13", text:'testing', isGroup: true, group: "3"},
//end column one
//column 2
//cell one
{key: "Group33", text:"Group221", isGroup: true, category: "Pool", group:"HCA"},
{key: "lane21", text:'testing', isGroup: true, group: "Group33"},
//end cell one
//cell two
{key: "Group332", text: "hello", isGroup: true, category: "Blank", group: "Group12"},
{key: "lane22", text: "testing", isGroup: true, group:"Group332"},
//end cell two
//cell three
{key: "32", text:"unknown", isGroup: true, category: "Blank", group: "Group3"},
{key: "lane23", text:'testing', isGroup: true, group: "32"},
//end cell three
//end column 2

{key: "node1", group: "lane11" },
{key: "node2", group: "lane11" },
{key: "node3", group: "lane11" },
{key: "node4", group: "lane11" },
{key: "node5", group: "lane11" },


{key: "node6", group: "lane12" },
{key: "node7", group: "lane12" },
{key: "node8", group: "lane12" },
{key: "node9", group: "lane12" },
{key: "node10", group: "lane12" },


{key: "node11", group: "lane13" },
{key: "node12", group: "lane13" },
{key: "node13", group: "lane13" },
{key: "node14", group: "lane13" },
{key: "node15", group: "lane13" },


{key: "node16", group: "lane21", text: "???", figure: "Diamond"},
{key: "node17", group: "lane21" },
{key: "node18", group: "lane21" },
{key: "node19", group: "lane21" },
{key: "node20", group: "lane21" },

{key: "node21", group: "lane22" },
{key: "node22", group: "lane22" },
{key: "node23", group: "lane22" },
{key: "node24", group: "lane22" },
{key: "node25", group: "lane22" },

//{key: "node26", group: "lane23" },
//{key: "node27", group: "lane23" },
//{key: "node28", group: "lane23" },
//{key: "node29", group: "lane23" },
//{key: "node30", group: "lane23" },
    ],
    [
{ from: "node1", to: "node2"},
{ from: "node1", to: "node3"},
{ from: "node2", to: "node4"},
{ from: "node3", to: "node5"},

{ from: "node6", to: "node7"},
{ from: "node6", to: "node8"},
{ from: "node7", to: "node9"},
{ from: "node8", to: "node10"},

{ from: "node11", to: "node12"},
{ from: "node11", to: "node13"},
{ from: "node12", to: "node14"},
{ from: "node13", to: "node15"},

{ from: "node16", to: "node17"},
{ from: "node16", to: "node18"},
{ from: "node17", to: "node19"},
{ from: "node18", to: "node20"},

{ from: "node21", to: "node22"},
{ from: "node21", to: "node23"},
{ from: "node22", to: "node24"},
{ from: "node23", to: "node25"},


    ])
    // force all lanes' layouts to be performed
  
    relayoutLanes();
  console.log(resizeAllLanes(12));
  
      make(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
        {
          "animationManager.duration": 800, // slightly longer than default (600ms) animation
          nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            { text: "Step" },
            { text: "???", figure: "Diamond" },
            { text: "start", figure: "Circle" , color: "green"},
          ])
        });

  

  function resizeAllLanes(testing:any){
   var Lanesizes = new Array();
relayoutLanes();
     var sum = 200;
     var ok = 0
     
    myDiagram.nodes.each(function(lane){
if (!(lane instanceof go.Group)) return;
      if (lane.category === "Pool") return;
      if (lane.category === "PoolVert2") return;
      if (lane.category === "Pool2") return;
      if (lane.category === "Blank") return;
      if (lane.category === "MainPool") return;
   
     let hsz = lane.resizeObject.width
     ok = hsz;
     if(hsz > sum){
     sum = hsz;
     }
     
  })
  
     myDiagram.nodes.each(function(lane){
if (!(lane instanceof go.Group)) return;
      if (lane.category === "Pool") return;
      if (lane.category === "PoolVert2") return;
      if (lane.category === "Pool2") return;
      if (lane.category === "Blank") return;
      if (lane.category === "MainPool") return;
      var shape = lane.resizeObject
      shape.height = 150;
      shape.width = 400;
  relayoutLanes();
  
  })
  
  return ok;
   }
load();
save();

  } 
 

} 

   function save(): any {
 var inputvalue = (<HTMLInputElement>document.getElementById("mySavedModel")).value
 inputvalue = myDiagram.model.toJson();
    myDiagram.isModified = false;
  }
  function load(): any {
  myDiagram.model = go.Model.fromJson((<HTMLInputElement>document.getElementById("mySavedModel")).value);
    myDiagram.delayInitialization(relayoutDiagram);
  }

  // this may be called to force the lanes to be laid out again

  function relayoutLanes() {
    myDiagram.nodes.each(function(lane) {
      if (!(lane instanceof go.Group)) return;
      if (lane.category === "Pool") return;
      if (lane.category === "PoolVert") return;
      if (lane.category === "Pool2") return;
      if (lane.category === "Blank") return;
      lane.layout.isValidLayout = false;
      
          // force it to be invalid
    });
    myDiagram.layoutDiagram
    }
        function stayInGroup(part: any, pt: any, gridpt: any) {
      // don't constrain top-level nodes
      let grp = part.containingGroup;
      if (grp === null) return pt;
      // try to stay within the background Shape of the Group
      let back = grp.resizeObject;
      if (back === null) return pt;
      // allow dragging a Node out of a Group if the Shift key is down
      if (part.diagram.lastInput.shift) return pt;
      let p1 = back.getDocumentPoint(go.Spot.TopLeft);
      let p2 = back.getDocumentPoint(go.Spot.BottomRight);
      let b = part.actualBounds;
      let loc = part.location;
      // find the padding inside the group's placeholder that is around the member parts
      let m = grp.placeholder.padding;
      // now limit the location appropriately
      let x = Math.max(p1.x + m.left, Math.min(pt.x, p2.x - m.right - b.width - 1)) + (loc.x-b.x);
      let y = Math.max(p1.y + m.top, Math.min(pt.y, p2.y - m.bottom - b.height - 1)) + (loc.y-b.y);
      return new go.Point(x, y);
    }
  
 

  // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
  function relayoutDiagram() {
    myDiagram.layout.invalidateLayout();
    myDiagram.findTopLevelGroups().each(function(g) { if (g.category === "Pool" && g.category === "PoolVert" && g.category === "Blank") g.layout.invalidateLayout(); });
    myDiagram.layoutDiagram();
  }

  // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
  function computeMinPoolSize(pool: any) {
    // assert(pool instanceof go.Group && pool.category === "Pool");
    let len = MINLENGTH;
    pool.memberParts.each(function(lane: any) {
      // pools ought to only contain lanes, not plain Nodes
      if (!(lane instanceof go.Group)) return;
      let holder = lane.placeholder;
      if (holder !== null) {
        let sz = holder.actualBounds;
        len = Math.max(len, sz.width);
      }
    });
    return new go.Size(len, NaN);
  }

  // compute the minimum size for a particular Lane Group
  function computeLaneSize(lane: any) {
    // assert(lane instanceof go.Group && lane.category !== "Pool");
    let sz = computeMinLaneSize(lane);
    if (lane.isSubGraphExpanded) {
      let holder = lane.placeholder;
      if (holder !== null) {
        let hsz = holder.actualBounds;
        sz.height = Math.max(sz.height, hsz.height);
      }
    }
    // minimum breadth needs to be big enough to hold the header
    let hdr = lane.findObject("HEADER");
    if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
    return sz;
  }

  // determine the minimum size of a Lane Group, even if collapsed
  function computeMinLaneSize(lane: any) {
    if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
    return new go.Size(MINLENGTH, MINBREADTH);
  }

function isLengthening() {
    return (this.handle.alignment === go.Spot.Right);
}
  // define a custom ResizingTool to limit how far one can shrink a lane Group
class LaneResizingTool extends go.ResizingTool {

    constructor() {
        super();
    }

    resize(newr: go.Rect) {
        var lane = this.adornedObject.part;
        if (isLengthening()) {  // changing the length of all of the lanes
            lane.containingGroup.memberParts.each(function (lane: go.Group) {
                if (!(lane instanceof go.Group)) return;
                var shape = lane.resizeObject;
                if (shape !== null) {  // set its desiredSize length, but leave each breadth alone
                    shape.width = newr.width;
                 
                }
            });
        } else {  // changing the breadth of a single lane
            go.ResizingTool.prototype.resize.call(this, newr);
        }
        relayoutDiagram();  // now that the lane has changed size, layout the pool again
    }

    computeMinSize(): go.Size {
        var lane: go.Part = this.adornedObject.part;
        
        // assert(lane instanceof go.Group && lane.category !== "Pool");
        var msz = computeMinLaneSize(lane);  // get the absolute minimum size
        if (isLengthening()) {  // compute the minimum length of all lanes
            var sz: go.Size = computeMinPoolSize(lane.containingGroup);
            msz.width = Math.max(msz.width, sz.width);
        } else {  // find the minimum size of this single lane
            var sz: go.Size = computeLaneSize(lane);
            msz.width = Math.max(msz.width, sz.width);
            msz.height = Math.max(msz.height, sz.height);
        }
        return msz;
    }
}
  // end LaneResizingTool class
      
       
  // define a custom grid layout that makes sure the length of each lane is the same
  // and that each lane is broad enough to hold its subgraph
 
   function showPorts(node: any, show: any) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function(port: any) {
        port.stroke = (show ? "white" : null);
      });
  }

 class PoolLayout extends go.GridLayout {
    
    constructor() {
        super();

        this.cellSize = new go.Size(1, 1);
        this.wrappingWidth = Infinity;
        this.isRealtime = false;  // don't continuously layout while dragging
        this.alignment = go.GridLayout.Position;
        // This sorts based on the location of each Group.
        // This is useful when Groups can be moved up and down in order to change their order.
       this.wrappingColumn = 1;

        this.comparer = function (a: any, b: any) {
            var ay = a.location.y;
            var by = b.location.y;
            if (isNaN(ay) || isNaN(by)) return 0;
            if (ay < by) return -1;
            if (ay > by) return 1;
            return 0;
              

        }
         }

      
      

    doLayout(coll: any): void {
        var diagram = this.diagram;
        if (diagram === null) return;
        diagram.startTransaction('PoolLayout');
        var pool = this.group;
        if (pool !== null && pool.category === 'Pool' || pool !== null && pool.category === 'Blank') {
            // make sure all of the Group Shapes are big enough
            var minsize = computeMinPoolSize(pool);
            pool.memberParts.each(function (lane: any) {
                if (!(lane instanceof go.Group)) return;
                if (lane.category !== 'Pool' || lane.category !== "Blank") {
                    var shape = lane.resizeObject;
                    if (shape !== null) {  // change the desiredSize to be big enough in both directions
                        var sz = computeLaneSize(lane);
                        shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                        shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                        var cell = lane.resizeCellSize;
                        if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) {
                            shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                        }
                        if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) {
                            shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                        }
                    }
                }
            });
        }
        // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
        go.GridLayout.prototype.doLayout.call(this, coll);
        diagram.commitTransaction('PoolLayout');
    };
 }
 class PoolLayoutVertical extends go.GridLayout {
    
    constructor() {
        super();

        this.cellSize = new go.Size(1, 1);
        this.wrappingWidth = Infinity;
        this.isRealtime = false;  // don't continuously layout while dragging
        this.alignment = go.GridLayout.Position;
        // This sorts based on the location of each Group.
        // This is useful when Groups can be moved up and down in order to change their order.
       this.wrappingColumn = Infinity;

        this.comparer = function (a: any, b: any) {
            var ax = a.location.x;
            var bx = b.location.x;
            if (isNaN(ax) || isNaN(bx)) return 0;
            if (ax < bx) return -1;
            if (ax > bx) return 1;
            return 0;
              

        }
         }

      
      

    doLayout(coll: any): void {
        var diagram = this.diagram;
        if (diagram === null) return;
        diagram.startTransaction('PoolLayoutVertical');
        var poolVert = this.group;
        if (poolVert !== null && poolVert.category === 'PoolVert') {
            // make sure all of the Group Shapes are big enough
            var minsize = computeMinPoolSize(poolVert);
            poolVert.memberParts.each(function (lane: any) {
                if (!(lane instanceof go.Group)) return;
                if (lane.category !== 'PoolVert') {
                    var shape = lane.resizeObject;
                    if (shape !== null) {  // change the desiredSize to be big enough in both directions
                        var sz = computeLaneSize(lane);
                        shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                        shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                        var cell = lane.resizeCellSize;
                        if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) {
                            shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                        }
                        if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) {
                            shape.height = Math.ceil(shape.height / cell.height) * cell.height;
                        }
                    }
                }
            });
        }
        // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
        go.GridLayout.prototype.doLayout.call(this, coll);
        diagram.commitTransaction('PoolLayoutVertical');
    };
 }
function finishDrop(e: any, grp: any) {
      var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
      if (!ok) e.diagram.currentTool.doCancel();
    }

       function highlightGroup(e: any, grp: any, show: any) {
      if (!grp) return;
      e.handled = true;
      if (show) {
        // cannot depend on the grp.diagram.selection in the case of external drag-and-drops;
        // instead depend on the DraggingTool.draggedParts or .copiedParts
        var tool = grp.diagram.toolManager.draggingTool;
        var map = tool.draggedParts || tool.copiedParts;  // this is a Map
        // now we can check to see if the Group will accept membership of the dragged Parts
        if (grp.canAddMembers(map.toKeySet())) {
          grp.isHighlighted = true;
          return;
        }
      }
      grp.isHighlighted = false;
    } 



 
  // save a model to and load a model from JSON text, displayed below the Diagram
 
  // Show the diagram's model in JSON format