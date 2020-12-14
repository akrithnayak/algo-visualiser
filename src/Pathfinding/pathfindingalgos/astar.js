export const aStar = (grid, start, finish) => {
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
  nodeHeuristics[start.row][start.col].f = 0;
  nodeHeuristics[start.row][start.col].g = 0;
  nodeHeuristics[start.row][start.col].h = 0;

  const visitedOrder = [];
  const queue = [];
  queue.push([0, [start.row, start.col]]);
  var i_dir = [-1, 1, 0, 0];
  var j_dir = [0, 0, -1, 1];

  start.distance = 0;

  visitedOrder.push(start);
  while (!!queue.length) {
    sortQueue(queue);
    const nodeDetail = queue.shift();
    const currentNode = grid[nodeDetail[1][0]][nodeDetail[1][1]];
    const { row, col } = currentNode;
    currentNode.isVisited = true;
    visitedOrder.push(currentNode);
    for (i = 0; i < 4; i++) {
      if (
        check(i_dir[i] + row, j_dir[i] + col, grid) &&
        !grid[i_dir[i] + row][j_dir[i] + col].isVisited &&
        !grid[i_dir[i] + row][j_dir[i] + col].isWall
      ) {
        const temp_node = grid[i_dir[i] + row][j_dir[i] + col];
        temp_node.distance = currentNode.distance + 1;
        temp_node.previousNode = currentNode;
        if (temp_node === finish) {
          temp_node.isVisited = true;
          visitedOrder.push(temp_node);
          return visitedOrder;
        }
        const gNew = temp_node.distance;
        const hNew = calculateManhattan(i_dir[i] + row, j_dir[i] + col, finish);
        const fNew = gNew + hNew;
        const nodeTempHeuristics =
          nodeHeuristics[i_dir[i] + row][j_dir[i] + col];
        if (nodeTempHeuristics.f === Infinity || nodeTempHeuristics.f > fNew) {
          queue.push([fNew, [i_dir[i] + row, j_dir[i] + col]]);
          nodeTempHeuristics.f = fNew;
          nodeTempHeuristics.g = gNew;
          nodeTempHeuristics.h = hNew;
        }
      }
    }
  }
  return visitedOrder;
};

function calculateManhattan(row, col, finish) {
  return Math.abs(row - finish.row) + Math.abs(col - finish.col);
}

function sortQueue(nodes) {
  nodes.sort((nodeA, nodeB) => nodeA[0] - nodeB[0]);
}

function check(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}
