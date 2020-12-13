export const aStart = (grid, start, finish) => {
  const heuristic = () => ({
    f: Infinity,
    g: Infinity,
    h: Infinity,
  });
  const nodeHeuristics = [];
  const ROW = grid.length;
  const COL = grid[0].length;

  for (var i = 0; i < ROW; i++) {
    const row = [];
    for (var j = 0; j < COL; j++) {
      row.push(heuristic());
    }
    nodeHeuristics.push(row);
  }
};

function calculateManhattan(row, col, finish) {
  return Math.abs(row - finish.row) + Math.abs(col - finish.col);
}
