class Triangle
{
  constructor(a, b, c)
  {
    this.points = [a, b, c];
  }

  getPoints()
  {
    return this.points;
  }

  pointIsInside(point)
  {
    let p1 = this.points[0];
    let p2 = this.points[1];
    let p3 = this.points[2];

    let d1 = Geometry.sign(point, p1, p2) > 0;
    let d2 = Geometry.sign(point, p2, p3) > 0;
    let d3 = Geometry.sign(point, p3, p1) > 0;

    return (d1 === d2) && (d2 === d3);
  }
}
