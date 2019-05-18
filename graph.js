/**
 * Represents a graph of nodes connected by edges,
 * the nodes have positions
 */

/**
 * Nodes in the graph, storing their on screen position and
 * their neighbors
 */
class Node
{
  constructor(x, y)
  {
    this.position = new Vector(x, y);
    this.neighbors = {};
    this.id = Math.random();
  }

  /**
   * Calculate the distance between this node and a given node
   * @method distanceFrom
   * @param  {Node}       n other node
   * @return {Number}       euclidean distance between this node and n
   */
  distanceFrom(n)
  {
    return this.position.distance(n.position);
  }

  /**
   * Checks if n is a neighbor of
   * @method isNeighbor
   * @param  {Node}      n the other node to check
   * @return {Boolean}     true if the other node is a neighbor, false otherwise
   */
  isNeighbor(n)
  {
    for (let i = 0; i < this.neighbors.length; i++)
    {
      if (this.neighbors[i] === n)
        return true;
    }

    return false;
  }

  /**
   * Add a single neighbor to the neighbors list.
   * If the neighbor is already in this nodes neighbors,
   * do nothing.
   * @method addNeighbor
   * @param  {Node}    n new neighbor
   * @return {Node[]}       this nodes list of neighbors after the operation
   */
  addNeighbor(n)
  {
    if (this.neighbors[n.id] !== undefined)
      this.neighbors[n.id] = n;
    return this.neighbors;
  }

  /**
   * For each node in arr, add the node to this nodes neighbors list
   * If the neighbor is already in this nodes neighbors,
   * do nothing.
   * @method addNeighbor
   * @param  {Node[]}    arr array of nodes to add
   * @return {Node[]}       this nodes list of neighbors after the operation
   */
  addNeighbors(arr)
  {
    for (let i = 0; i < arr.length; i++)
      this.addNeighbor(arr[i]);

    return this.neighbors;
  }

  /**
   * Remove a node from this nodes neighbors list
   * @method removeNeighbor
   * @param  {Node}       n the node to remove
   * @return {Node[]}       this nodes list of neighbors after the operation
   */
  removeNeighbor(n)
  {
    delete this.neighbors[n.id];
    return this.neighbors;
  }

  /**
   * Check if this node is the same node as another node
   * @method equals
   * @param  {[type]} n [description]
   * @return {[type]}   [description]
   */
  equals(n)
  {
    return this.id === n.id;
  }

  /**
   * Return a positive number if this node is greater than n, negative otherwise.
   * 0 if they are equal. First compares by x, then by y if xs are equivalent.
   * @method compareTo
   * @param  {Node}     n node to compare to
   * @return {Number}     if this node is greater than n, return > 0
   *                      if this node is less than n, return < 0
   *                      if this node is equal to n, return 0
   */
  compareTo(n)
  {
    if (this.x !== n.x)
      return this.x - n.x;
    return this.y - n.y;
  }

  /**
   * Render this node in its x and y position
   * @method render
   * @param {Number}  r the radius of the node to render
   */
  render(r)
  {
    fill(1000);
    ellipse(this.position.x, this.position.y, r, r);
  }
}

/**
 * Edges in the graph, represent a connection between 2 nodes
 */
class Edge
{
  constructor(n1, n2)
  {
    this.n1 = n1;
    this.n2 = n2;
  }

  /**
   * Return true if either of the nodes in this edge are equal to n
   * @method contains
   * @param  {Node}    n node to check for
   * @return {Boolean}   true if either of the 2 nodes are equal to n, false otherwise
   */
  contains(n)
  {
    return (this.n1.equals(n) || this.n2.equals(n));
  }

  /**
   * Render this edge as a line between its two contained nodes
   * @method render
   */
  render()
  {
    stroke(1000);
    line(this.n1.position.x, this.n1.position.y,
      this.n2.position.x, this.n2.position.y);
  }

  equals(e)
  {
    return (this.n1.id === e.n1.id || this.n1.id === e.n2.id) &&
      (this.n2.id === e.n1.id || this.n2.id === e.n2.id);
  }
}

/**
 * The graph, containing nodes and edges connecting the nodes
 */
class Graph
{
  constructor()
  {
    this.edges = [];
    this.nodes = {};
  }

  /**
   * Add node n to this graph's list of nodes
   * @method addNode
   * @param  {Node}     n the new node to add to this graph
   * @return {Node[]}     the list of nodes held by this graph after the insertion
   *                      represented by a dictionary
   */
  addNode(n)
  {
    this.nodes[n.id] = n;
    return this.nodes;
  }

  /**
   * Add multiple nodes to this graph
   * @method addNodes
   * @param  {Node[]} arr the array of nodes to be added to this graph
   * @return {Node[]}     list of nodes contained in this graph after the insertion
   *                      of the nodes in arr
   */
  addNodes(arr)
  {
    for (let i = 0; i < arr.length; i++)
      this.addNode(arr[i]);

    return this.nodes;
  }

  /**
   * Remove node n from this graph's list of nodes
   * @method removeNode
   * @param  {Node}   n the node to remove
   * @return {Node[]}   the list of nodes held by this graph after the removal
   *                    represented by a dictionary
   */
  removeNode(n)
  {
    delete this.nodes[n.id];

    // ensures that no references to the node are left over
    // after removing the node from the graph
    this.edges = this.edges.filter(e => !e.contains(n));
    for (let i = 0; i < this.nodes.length; i++)
      this.nodes[i].removeNeighbor(n);

    return this.nodes;
  }

  /**
   * Add a new edge to this graph
   * @method addEdge
   * @param  {Node} n1 first node
   * @param  {Node} n2 second node
   * @return {Edge[]} the list of edges in this graph
   */
  addEdge(n1, n2)
  {
    n1.addNeighbor(n2);
    n2.addNeighbor(n1);

    // ensure that both n1 and n2 are already in the graph
    // if not, add to the graph
    if (!this.containsNode(n1))
      this.addNode(n1);

    if (!this.containsNode(n2))
      this.addNode(n2);

    this.edges.push(new Edge(n1, n2));

    return this.edges;
  }

  /**
   * Removes an edge from the list of edges
   * @method removeEdge
   * @param  {Edge}   edge edge to remove
   * @return {Edge[]}      list of all edges in this graph after the removal
   */
  removeEdge(edge)
  {
    this.edges = this.edges.filter(e => !e.equals(edge));
    return this.edges;
  }

  /**
   * Check if a node is in this graph
   * @method containsNode
   * @param  {Node}     node the node to check
   * @return {Boolean}       true if it is contained, false otherwise
   */
  containsNode(node)
  {
    return this.nodes[node.id] !== undefined;
  }

  /**
   * Renders this graphs nodes and edges
   * @method render
   */
  render(r)
  {
    for (let i = 0; i < this.nodes.length; i++)
      this.nodes[i].render(r);

    for (let i = 0; i < this.edges.length; i++)
      this.edges[i].render();
  }

  /**
   * Reset edges and nodes to empty
   * @method clear
   */
  clear()
  {
    this.clearEdges();
    this.clearNodes();
  }

  /**
   * Reset edges to empty arry
   * @method clearEdges
   */
  clearEdges()
  {
    this.edges = [];
  }

  /**
   * Reset nodes to empty dict
   * @method clearNodes
   */
  clearNodes()
  {
    this.nodes = {};
  }
}
