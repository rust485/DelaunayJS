class IncrementalDelaunay extends IDelaunay
{
  constructor(points)
  {
    super(points);
    this.points = points;
  }

  calculateDelaunay()
  {
    if (this.points === undefined || this.points.length === 0)
      return [];

    let triTree = new TriangleTree();

    let s1 = new Vector(-10000, -10000);
    let s2 = new Vector(10000, -10000);
    let s3 = new Vector(0,10000);
    let starter = new Triangle(s1, s2, s3);

    triTree.add(starter);

    for (let p of this.points)
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

    return triTree.leaves().filter(t => !t.contains(s1) && !t.contains(s2) && !t.contains(s3));
  }

  setPoints(points)
  {
    this.points = points;
  }
}
