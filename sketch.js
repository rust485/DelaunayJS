let nodes = [];
let i = 0;
let fps = .25;
let renderN = true;
let edges = [];

function setup()
{
	createCanvas(800, 800);
	frameRate(fps);

	let nodes = getNodeSample5();
	delaunay(nodes);

	background(000);
	nodes.forEach((n) => n.render());
	edges.forEach((e) => renderEdge(e));
}

// function mousePressed()
// {
// 	nodes.push(new MapNode(mouseX, mouseY));
// 	edges = [];
//
// 	delaunay(nodes);
// 	background(000);
// 	nodes.forEach((n) => n.render());
//
// 	edges.forEach((e) => renderEdge(e));
// }

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

function getNodeSample1()
{
	let m1 = new MapNode(10, 10);
	let m2 = new MapNode(110, 110);
	let m3 = new MapNode(10, 110);
	let m4 = new MapNode(110, 10);

	return [m1, m2, m3, m4];
}

function getNodeSample2()
{
	let m1 = new MapNode(10, 10);
	let m2 = new MapNode(110, 110);
	let m3 = new MapNode(10, 110);
	let m4 = new MapNode(110, 10);

	let m5 = new MapNode(45, 45);
	let m6 = new MapNode(75, 75);
	let m7 = new MapNode(45, 75);
	let m8 = new MapNode(75, 45);

	return [m1, m2, m3, m4, m5, m6, m7, m8];
}

function getNodeSample3()
{
	let m1 = new MapNode(10, 10);
	let m2 = new MapNode(30, 10);
	let m3 = new MapNode(100, 100);
	let m4 = new MapNode(100, 200);

	return [m1, m2, m3, m4];
}

function getNodeSample4()
{
	let m1 = new MapNode(10, 10);
	let m2 = new MapNode(100, 100);
	let m3 = new MapNode(10, 100);
	let m4 = new MapNode(100, 10);
	let m5 = new MapNode(35, 75);

	return [m1, m2, m3, m4, m5];
}

function getNodeSample5()
{
	let m1 = new MapNode(10, 10);
	let m2 = new MapNode(10, 100);
	let m3 = new MapNode(55, 55);
	let m4 = new MapNode(200, 55);

	return [m1, m2, m3, m4];
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
