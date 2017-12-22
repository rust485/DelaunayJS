WIDTH = 10;
HEIGHT = 10;

class MapNode
{
	constructor(x, y)
	{
		this.position = new Vector(x, y);
		this.neighbors = [];
		this.id = Math.random();
	}

	distance(n)
	{
		return this.position.distance(n.position);
	}

	inNeighbor(n)
	{
		for (let i = 0; i < this.neighbors.length; i++)
		{
			if (this.neighbors[i] === n)
				return true;
		}

		return false;
	}

	addNeighbor(n)
	{
		this.neighbors = this.neighbors.filter((node) => node != n);
		this.neighbors.push(n);
	}

	addNeighbors(arr)
	{
		let self = this;
		arr.forEach((n) => self.neighbors.push(n));
	}

	removeNeighbor(n)
	{
		this.neighbors = this.neighbors.filter((neighbor) => neighbor != n);
	}

	equals(n)
	{
		return this.position.x === n.position.x && this.position.y === n.position.y;
	}

	render()
	{
		fill(1000);
		ellipse(this.position.x, this.position.y, WIDTH, HEIGHT);
	}
}

class Edge
{
	constructor(a, b)
	{
		this.a = a;
		this.b = b;
	}

	equals(e)
	{
		return this.a === e.a && this.b === e.b || this.a === e.b && this.b === e.a;
	}

	render()
	{
		fill(1000);
		line(a.position.x, a.position.y, b.position.x, b.position.y);
	}
}

function genSubMat(matrix, ignoreCol)
{
	let r = [];
	for (let i = 0; i < matrix.length - 1; i++)
	{
		r.push([]);
		for (let j = 0; j < matrix[0].length; j++)
		{
			if (j != ignoreCol)
				r[i].push(matrix[i + 1][j]);
		}
	}

	return r;
}

function determinantSqMat(matrix)
{
	if (matrix.length != matrix[0].length) return false;

	if (matrix.length === 2) return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];

	let det = 0;
	for (let i = 0; i < matrix.length; i++)
	{
		let r = genSubMat(matrix, i);
		let tmp = matrix[0][i] * determinantSqMat(r);
		if (i % 2 == 0)
			det += tmp;
		else
			det -= tmp;
	}

	return -det;
}

// if d is in the circle formed by points a, b, and c, return > 0
// d is on circle, return 0
// d is outside of circle, return < 0
function inCircle(a, b, c, d)
{

	let list = [a, b, c];

	let pivot = {
		position: new Vector((a.position.x + b.position.x + c.position.x) / 3, (a.position.y + b.position.y + c.position.y) / 3)
	}

	let horiz = {
		position: new Vector((a.position.x + b.position.x + c.position.x) / 3, (a.position.y + b.position.y + c.position.y) / 3 + 1)
	}

	sortSmallestAngle(horiz, pivot, list, false);

	let arr = [list[0], list[1], list[2], d];
	let mat = [
		[],
		[],
		[],
		[]
	];

	for (let i = 0; i < arr.length; i++)
	{
		mat[i][0] = arr[i].position.x;
		mat[i][1] = arr[i].position.y;
		mat[i][2] = arr[i].position.x * arr[i].position.x + arr[i].position.y * arr[i].position.y;
		mat[i][3] = 1;
	}
	return determinantSqMat(mat);
}

// returns true if point c is left or right of line created by a b
function isLeft(from, to, c)
{
	return 0 > (c.position.x - from.position.x) * (to.position.y - from.position.y) -
		(c.position.y - from.position.y) * (to.position.x - from.position.x);
}

function lowestRight(m, n)
{
	return (m.position.y - n.position.y != 0) ? m.position.y - n.position.y : n.position.x - m.position.x;
}

function lowestLeft(m, n)
{
	return (m.position.y - n.position.y != 0) ? m.position.y - n.position.y : m.position.x - n.positionx;
}

function getBase(leftNodes, rightNodes)
{
	let l = 0;
	let r = 0;
	let changed = true;

	leftNodes.sort((m, n) => lowestRight(m, n));
	rightNodes.sort((m, n) => lowestLeft(m, n));


	while (changed)
	{
		changed = false;
		let i = l + 1;
		while (i < leftNodes.length)
		{
			if (!isLeft(leftNodes[l], rightNodes[r], leftNodes[i]))
				l = i;
			i++
		}

		i = r + 1;
		while (i < rightNodes.length)
		{
			if (isLeft(rightNodes[r], leftNodes[l], rightNodes[i]))
			{
				r = i;
				changed = true;
			}
			i++;
		}
	}
	if (l != 0) console.log(l);
	if (r != 0) console.log(r);

	return {
		left: leftNodes[l],
		right: rightNodes[r]
	};
}

// returns the angle between 2 vectors, if cw is true, then return clockwise angle between,
// else return the ccw angle between. b is the "hinge" point
function angleBetween(a, b, c, cw)
{
	let from = new Vector(a.position.x - b.position.x, a.position.y - b.position.y);
	let to = new Vector(c.position.x - b.position.x, c.position.y - b.position.y);

	let angle = to.angleBetween(from) * 180 / Math.PI;

	if (angle < 0) angle += 360;

	return (cw) ? angle : 360 - angle;
}

function sortSmallestAngle(a, b, list, cw)
{
	list.sort((m, n) =>
	{
		let from = new Vector(a.position.x - b.position.x, a.position.y - b.position.y);
		let to1 = new Vector(m.position.x - b.position.x, m.position.y - b.position.y);
		let to2 = new Vector(n.position.x - b.position.x, n.position.y - b.position.y);

		let angle1 = to1.angleBetween(from) * 180 / Math.PI;
		if (angle1 < 0) angle1 += 360;

		let angle2 = to2.angleBetween(from) * 180 / Math.PI;
		if (angle2 < 0) angle2 += 360;

		if (cw)
			return angle1 - angle2;
		else
		{
			angle1 = 360 - angle1;
			angle2 = 360 - angle2;
			return angle1 - angle2;
		}
	});
}

// a is in list, b is in the other list
function getPotential(a, b, list, cw)
{
	sortSmallestAngle(b, a, list, cw);
	for (let i = 0; i < list.length - 1; i++)
	{
		let angle = angleBetween(b, a, list[i], cw);
		if (angle > 180) return false;
		else if (inCircle(a, b, list[i], list[i + 1]) <= 0)
			return list[i];
		else
		{
			a.removeNeighbor(list[i]);
			list[i].removeNeighbor(a);
			removeEdge(a, list[i]);
		}
	}

	let potential = list[list.length - 1];
	if (potential)
	{
		let angle = angleBetween(b, a, potential, cw);
		if (angle > 180) return false;
		return potential;
	}
	return false;
}

function merge(leftNodes, rightNodes, leftBase, rightBase, edges)
{
	leftBase.addNeighbor(rightBase);
	rightBase.addNeighbor(leftBase);

	addEdge(leftBase, rightBase);

	let newLeft = leftNodes.filter((n) => !n.equals(leftBase));
	let newRight = rightNodes.filter((n) => !n.equals(rightBase));

	let potentialLeft = getPotential(leftBase, rightBase, newLeft, false);
	let potentialRight = getPotential(rightBase, leftBase, newRight, true);

	if (!potentialLeft && !potentialRight) return;
	else if (potentialLeft && !potentialRight)
		merge(newLeft, newRight, potentialLeft, rightBase, edges);
	else if (potentialRight && !potentialLeft)
		merge(newLeft, newRight, leftBase, potentialRight, edges);
	else if (inCircle(leftBase, rightBase, potentialLeft, potentialRight) <= 0)
		merge(newLeft, newRight, potentialLeft, rightBase, edges);
	else if (inCircle(leftBase, rightBase, potentialRight, potentialLeft) <= 0)
		merge(newLeft, newRight, leftBase, potentialRight, edges);
}

// divide and conquer algorithm
function delaunay(nodes)
{
	let edges = [];
	if (nodes.length <= 3)
	{
		for (let i = 0; i < nodes.length; i++)
		{
			for (let j = i + 1; j < nodes.length; j++)
			{
				if (i != j)
				{
					nodes[i].addNeighbor(nodes[j]);
					edges.push(new Edge(nodes[i], nodes[j]));
				}
			}
		}
		return edges;
	}
	else
	{
		nodes.sort((a, b) => (a.position.x - b.position.x != 0) ? a.position.x - b.position.x : a.position.y - b.position.y);

		let leftNodes;
		let rightNodes;

		if (nodes.length === 4)
		{
			leftNodes = nodes.slice(0, 3);
			rightNodes = nodes.slice(3, 4);
		}
		else
		{
			leftNodes = nodes.slice(0, Math.floor(nodes.length / 2));
			rightNodes = nodes.slice(Math.floor(nodes.length / 2), nodes.length);
		}

		let lEdges = delaunay(leftNodes);
		let rEdges = delaunay(rightNodes);
		let bases = getBases(leftNodes, rightNodes);

		merge(leftNodes, rightNodes, bases.left, bases.right, edges);

		return nodes;
	}
}
