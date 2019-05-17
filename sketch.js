let nodes = [];
let i = 0;
let fps = .25;
let renderN = true;
let edges = [];

/**
 * Initialize the canvas and start the algorithm
 * @method setup
 */
function setup()
{
	createCanvas(800, 800);
	frameRate(fps);

	let nodes = getNodeSample7();
	delaunay(nodes);

	background(000);
	nodes.forEach((n) => n.render());
	edges.forEach((e) => renderEdge(e));
}

/**
 * On mouse pressed hook
 * @method mousePressed
 */
function mousePressed()
{
	// create a new node at the current mouse position
	nodes.push(new MapNode(mouseX, mouseY));

	// recalculate delaunay
	edges = delaunay(nodes);
	background(000);


	nodes.forEach((n) => n.render());
	edges.forEach((e) => renderEdge(e));
}

function draw()
{}

function renderEdges()
{
	background(000);
	nodes.forEach((n) => n.render());
	edges.forEach((e) => renderEdge(e));
}

function renderNeighbors()
{
	background(000);
	nodes.forEach((n) => n.render());
	nodes.forEach((n) =>
	{
		n.neighbors.forEach((neighbor) =>
		{
			let e = [n, neighbor];
			renderEdge(e);
		})
	});
}

function getRandomNodes()
{
	let arr = [];
	let amtNodes = Math.floor((Math.random() * (100 - 1))) + 1;

	for (i = 0; i < amtNodes; i++)
	{
		let x = Math.random() * (789 - 9) + 9;
		let y = Math.random() * (789 - 9) + 9;
		let m = new MapNode(x, y);
		arr.push(m);
	}

	return arr;
}

function renderEdge(edge)
{
	stroke(1000);
	line(edge[0].position.x, edge[0].position.y, edge[1].position.x, edge[1].position.y);
}

function addEdge(n1, n2)
{
	let smaller = (n1.id < n2.id) ? n1 : n2;
	let larger = (n1.id > n2.id) ? n1 : n2;
	let exists = false;
	for (let j = 0; j < edges.length; j++)
	{
		let edge = edges[j];
		if (edge[0].id === smaller.id && edge[1].id === larger.id)
		{
			exists = true;
			break;
		}
	}

	if (!exists)
		edges.push([smaller, larger]);

	renderEdges();
}

function removeEdge(n1, n2)
{
	let smaller = (n1.id < n2.id) ? n1 : n2;
	let larger = (n1.id > n2.id) ? n1 : n2;


	let before = edges.length;
	edges = edges.filter((e) => !(e[0].id === smaller.id && e[1].id === larger.id));
	let after = edges.length;
	if (before === after)
	{
		for (let j = 0; j < edges.length; j++)
		{
			let e = edges[j];
			if (e[0].id === n1.id && e[1].id === n2.id || e[0].id === n2.id && e[1] === n1.id)
				console.log("missed");
		}
	}
}
