import { Component, OnInit, ViewChild } from '@angular/core';
import * as go from 'gojs';


@Component({
    moduleId: module.id,
    selector: 'flow-chart',
    templateUrl: 'flow-chart.component.html'
})
export class FlowChartComponent implements OnInit {
    myDiagram: go.Diagram;
    @ViewChild('myDiagramDiv') div: any;
    constructor() { }

    ngOnInit() {
        // create a make type from go namespace and assign it to MAKE
        const MAKE = go.GraphObject.make;

        // get the div in the HTML file
        const diagramDiv = this.div.nativeElement;

        // instatiate MAKE with Diagram type and the diagramDiv
        this.myDiagram = MAKE(go.Diagram, diagramDiv, {
            initialContentAlignment: go.Spot.Center,  // center the content
            "undoManager.isEnabled": true  // enable undo & redo
        });

        // define a simple Node template
        this.myDiagram.nodeTemplate =
            MAKE(go.Node, "Auto",  // the Shape will go around the TextBlock
                MAKE(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
                    // Shape.fill is bound to Node.data.color
                    new go.Binding("fill", "color")),
                MAKE(go.TextBlock,
                    { margin: 8 },  // some room around the text
                    // TextBlock.text is bound to Node.data.key
                    new go.Binding("text", "key"))
            );

        // but use the default Link template, by not setting Diagram.linkTemplate

        // create the model data that will be represented by Nodes and Links
        this.myDiagram.model = new go.GraphLinksModel(
            [
                { key: "Alpha", color: "lightblue" },
                { key: "Beta", color: "orange" },
                { key: "Gamma", color: "lightgreen" },
                { key: "Delta", color: "pink" }
            ],
            [
                { from: "Alpha", to: "Beta" },
                { from: "Alpha", to: "Gamma" },
                { from: "Beta", to: "Beta" },
                { from: "Gamma", to: "Delta" },
                { from: "Delta", to: "Alpha" }
            ]);
    }
}