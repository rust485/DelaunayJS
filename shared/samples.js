const MAX_NODES = 100;
const MIN_NODES = 1;


function getNodeSample1()
{
	/* a square*/
	let p1 = new Vector(10, 10);
	let p2 = new Vector(110, 110);
	let p3 = new Vector(10, 110);
	let p4 = new Vector(110, 10);

	return [p1, p2, p3, p4];
}

function getNodeSample2()
{
	/* a square inside a square*/
	let n1 = new Vector(10, 10);
	let n2 = new Vector(110, 110);
	let n3 = new Vector(10, 110);
	let n4 = new Vector(110, 10);

	let n5 = new Vector(45, 45);
	let m6 = new Vector(75, 75);
	let m7 = new Vector(45, 75);
	let m8 = new Vector(75, 45);

	return [n1, n2, n3, n4, n5, m6, m7, m8];
}

function getNodeSample3()
{
	/*a horizontal line, above and left of a vertical line */
	let n1 = new Vector(10, 10);
	let n2 = new Vector(30, 10);
	let n3 = new Vector(100, 100);
	let n4 = new Vector(100, 200);

	return [n1, n2, n3, n4];
}

function getNodeSample4()
{
	/* a square with a dot inside (not centered)*/
	let n1 = new Vector(10, 10);
	let n2 = new Vector(100, 100);
	let n3 = new Vector(10, 100);
	let n4 = new Vector(100, 10);
	let n5 = new Vector(35, 75);

	return [n1, n2, n3, n4, n5];
}

function getNodeSample5()
{
	/*sideways, disjointed T*/
	let n1 = new Vector(10, 10);
	let n2 = new Vector(10, 100);
	let n3 = new Vector(55, 55);
	let n4 = new Vector(200, 55);

	return [n1, n2, n3, n4];
}

function getNodeSample6()
{
	/*rotated trapezoid*/
	let n1 = new Vector(20, 20);
	let n2 = new Vector(100, 25);
	let n3 = new Vector(80, 15);
	let n4 = new Vector(200, 100);

	return [n1, n2, n3, n4];
}

function getNodeSample7()
{
	/*triangle with a small, vertical line in the center*/
	let n1 = new Vector(50, 100);
	let n2 = new Vector(150, 100);
	let n3 = new Vector(100, 80);
	let n4 = new Vector(100, 50);
	let n5 = new Vector(100, 20);

	return [n1, n2, n3, n4, n5];
}

function getRandomNodes(nodeR = 10, canvasWidth = 800, canvasHeight = 800)
{
	let arr = [];
	let amtNodes = Math.floor((Math.random() * (MAX_NODES - 1))) + MIN_NODES;

	for (i = 0; i < amtNodes; i++)
	{
		let x = Math.random() * (canvasWidth  - nodeR * 2) + nodeR;
		let y = Math.random() * (canvasHeight - nodeR * 2) + nodeR;
		let n = new Vector(x, y);
		arr.push(n);
	}

	return arr;
}
