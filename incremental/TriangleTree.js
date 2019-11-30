class TriangleTree
{
  constructor()
  {
    this.nodes = [];
  }

  getContainingNode(pt)
  {
    for (let n of this.nodes)
    {
      let container = n.getContainingNode(pt);

      if (container !== null)
        return container;
    }

    return null;
  }

  add(tri, node)
  {
    if (node === undefined || node === null)
      this.nodes.push(new TriangleTreeNode(tri));
    else
      node.addChild(new TriangleTreeNode(tri));
  }

  leaves()
  {
    let leaves = [];
    for (let n of this.nodes)
    {
      leaves = leaves.concat(n.getLeaves());
    }

    return leaves;
  }
}

class TriangleTreeNode
{
  constructor(triangle)
  {
    this.triangle = triangle;
    this.children = [];
  }

  getTriangle()
  {
    return this.triangle;
  }

  containsPoint(pt)
  {
    return this.triangle.pointIsInside(pt);
  }

  getChildren()
  {
    return this.children;
  }

  addChild(c)
  {
    this.children.push(c);
  }

  getContainingNode(pt)
  {
    if (this.containsPoint(pt))
    {
      for (let c of this.children)
      {
        let container = c.getContainingNode(pt);

        if (container !== null)
          return container;
      }
      return this;
    }

    return null;
  }

  getLeaves()
  {
    if (this.children.length === 0)
      return [this.triangle];

    let leaves = [];
    for (let c of this.children)
      leaves = leaves.concat(c.getLeaves());

    return leaves;
  }
}
