export const dfs = (grid, start, finish) => {
  const visitedOrder = [];
  start.distance = 0;
  const compare = { found: false };
  dfsHelper(grid, start, finish, visitedOrder, compare);
  return visitedOrder;
};

function dfsHelper(grid, currentNode, finish, visitedOrder, compare) {
  const { row, col } = currentNode;
  currentNode.isVisited = true;
  var i_dir = [-1, 1, 0, 0];
  var j_dir = [0, 0, -1, 1];
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
      visitedOrder.push(temp_node);
      if (temp_node === finish) {
        compare.found = true;
        return true;
      }
      dfsHelper(grid, temp_node, finish, visitedOrder, compare);
      if (compare.found) return true;
    }
  }
  return false;
}

function check(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;
}
