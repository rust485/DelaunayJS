/**
 * This is the main file for the project, accepting user input and executing
 * accordingly.
 */

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const NODE_R = 10;

// the graph to be operated on
let graph = new Graph();

let fps = .25;

/**
 * Initialize the canvas and start the algorithm
 * @method setup
 */
function setup()
{
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	frameRate(fps);

	graph.addNodes([]);

	delaunay(graph);

	render();
}

/**
 * On mouse pressed hook
 * @method mousePressed
 */
function mousePressed()
{
	// create a new node at the current mouse position
	graph.addNode(new Node(mouseX, mouseY));
	delaunay(graph);
	render();
}

function render()
{
	console.log("rendering");
	background(000);
	graph.render(NODE_R);
	console.log(graph.getNodes());
}

function draw() {}
