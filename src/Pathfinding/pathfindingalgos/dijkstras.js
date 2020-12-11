export function dijkstras(grid, startNode, finishNode) {
  const visitedOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getNodes(grid);
  while (!!unvisitedNodes.length) {
    sortedNodes(unvisitedNodes);
    const currentNode = unvisitedNodes.shift();
    if (currentNode.distance === Infinity) return visitedOrder;

    currentNode.isVisited = true;
    visitedOrder.push(currentNode);
    if (currentNode.isWall) continue;
    if (currentNode === finishNode) return visitedOrder;
    updateNeighbors(currentNode, grid);
  }
}

function getNodes(grid) {
  const nodes = [];
  for (const row of grid) for (const node of row) nodes.push(node);
  return nodes;
}

function sortedNodes(nodes) {
  nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}