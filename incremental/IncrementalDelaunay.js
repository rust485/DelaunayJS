class IncrementalDelaunay extends IDelaunay
{
  constructor(points)
  {
    this.points = points;
  }

  calculateDelaunay()
  {
    if (this.points === null || this.points.length === 0)
      return [];

    let triTree = new TriangleTree();

    let starter = new Triangle(10000, 10000, 10000);

    triTree.add(starter);

    for (let p in this.points)
    {
      let n = triTree.getContainingNode(p);
      let tp = n.getTriangle().getPoints();

      let t1 = new Triangle(tp[0], tp[1], p);
      let t2 = new Triangle(tp[1], tp[2], p);
      let t3 = new Triangle(tp[2], tp[0], p);

      triTree.add(t1, n);
      triTree.add(t2, n);
      triTree.add(t3, n);
    }

    return triTree.leaves();
  }
}
