/**
 * This is the main file for the project, accepting user input and executing
 * accordingly.
 */

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const NODE_R = 10;

const triangulator = new IncrementalDelaunay([]);

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

  let points = getNodeSample1();

  calculate(points);
	render();
}

/**
 * On mouse pressed hook
 * @method mousePressed
 */
function mousePressed()
{
	// create a new node at the current mouse position
	let p = new Vector(mouseX, mouseY);

  let points = graph.getPoints();
  points.push(p);
  calculate(points);
	render();
}

function calculate(points)
{
  triangulator.setPoints(points);
  let triangles = triangulator.calculateDelaunay();
  graph = Graph.fromTriangles(triangles);
  render();
}

function render()
{
	background(000);
	graph.render(NODE_R);
}

function draw() {}
