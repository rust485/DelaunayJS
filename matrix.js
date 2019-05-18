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
