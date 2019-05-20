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

}

function merge(leftNodes, rightNodes, leftBase, rightBase, edges)
{

}

function ccw(a, b, c)
{
	const mat = [
		[a.getX(), a.getY(), 1],
		[b.getX(), b.getY(), 1],
		[c.getX(), c.getY(), 1]
	];

	return determinantSqMat(mat) > 0;
}

// divide and conquer algorithm
function delaunay(graph)
{
	const nodes = graph.getNodes();

	nodes.sort(Node.lexicographicalComparator);

	delaunayRec(graph, nodes);
}

function leftOf(node, edge)
{

}

function rightOf(node, edge)
{

}

function valid()
{

}

function delaunayRec(graph, nodes)
{
	if (nodes.length < 2)
		return [];
	if (nodes.length === 2)
	{
		const a = new Edge(nodes[0], nodes[1]);
		graph.addEdge(a);
		return [a, a.reversed()];
	}

	if (nodes.length === 3)
	{
		const a = new Edge(nodes[0], nodes[1]);
		graph.addEdge(a);
		const b = new Edge(nodes[1], nodes[2]);
		graph.addEdge(b);
		// TODO: splice?

		if (ccw(nodes[0], nodes[1], nodes[2]))
		{
			const c = Edge.connect(b, a);
			graph.addEdge(c);
			return [a, b.reversed()];
		}

		if (ccw(nodes[0], nodes[2], nodes[1]))
		{
			const c = Edge.connect(b, a);
			graph.addEdge(c);
			return [c.reversed(), c];
		}

		return [a, b.reversed()];
	}

	const split = Math.floor(nodes.length / 2);

	// left = [ldo, ldi]
	const left = delaunayRec(graph, nodes.slice(0, split))
	// right = [rdi, rdo]
	const right = delaunayRec(graph, nodes.slice(split, nodes.length));

	while (true)
	{
		if (leftOf(right[0].first(), left[1]))
			ldi = ldi.lnext; // what?
		else if (rightOf(left[1].first(), right[0]))
			rdi = rdi.rprev; // again wut?
		else
			break;
	}

	const basel = Edge.connect(right[0].reversed(), left[1]);
	if (left[1].first() === left[0].first())
		left[0].set(basel.reversed());
	if (right[0].first() === right[1].first())
		right[1].set(basel);

	while (true)
	{
		const lcand = basel.reversed().onext // what
		if (valid(lcand)) // TODO: valid
		{
			// TODO: inCircle
			while (inCircle(basel.second(), basel.first(), lcand.second(), lcand.Onext.second()))
			{
				const t = lcand.Onext;
				graph.removeEdge(lcand);
				lcand = t;
			}
		}

		const rcand = basel.Oprev;
		if (valid(rcand))
		{
			while (inCircle(basel.second(), basel.first(), lcand.second(), lcand.Onext.second()))
			{
				const t = rcand.Oprev;
				graph.removeEdge(rcand);
				rcand = t;
			}
		}

		if (!valid(lcand) && !valid(rcand))
			break;

		if (!valid(lcand) || (valid(rcand) &&
			inCircle(lcand.second(), lcand.first(), rcand.first(), rcand.second())))
				basel = Edge.connect(rcand, basel.reversed());

		else
			basel = Edge.connect(basel.reversed(), lcand.reversed());
	}

	return [left[0], right[1]];
}
