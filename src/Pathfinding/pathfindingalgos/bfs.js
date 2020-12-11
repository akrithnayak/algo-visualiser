export const bfs = (grid, start, finish) => {
  const visitedOrder = [];
  const queue = [];
  start.isVisited = true;
  start.distance = 0;
  queue.push(start);
  var i_dir = [-1, 1, 0, 0];
  var j_dir = [0, 0, -1, 1];
  while (queue.length !== 0) {
    const currentNode = queue.shift();
    const { row, col } = currentNode;
    for (var i = 0; i < 4; i++) {
      if (
        check(i_dir[i] + row, j_dir[i] + col, grid) &&
        !grid[i_dir[i] + row][j_dir[i] + col].isVisited &&
        !grid[i_dir[i] + row][j_dir[i] + col].isWall
      ) {
        const temp_node = grid[i_dir[i] + row][j_dir[i] + col];
        temp_node.isVisited = true;
        temp_node.distance = currentNode.distance + 1;
        temp_node.previousNode = currentNode;
        queue.push(temp_node);
        visitedOrder.push(temp_node);

        if (temp_node === finish) return visitedOrder;
      }
    }
  }
  return false;
};

function check(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}
