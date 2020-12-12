function createNode(row, col, st_row, st_col, fin_row, fin_col) {
  return {
    col,
    row,
    isVisited: false,
    isStart: row === st_row && col === st_col,
    isFinish: row === fin_row && col === fin_col,
    isWall: false,
    distance: Infinity,
    previousNode: null,
  };
}

export function generateNodes(st_row, st_col, fin_row, fin_col) {
  const nodes = [];
  for (var row = 0; row < 20; row++) {
    const currentRow = [];
    for (var col = 0; col < 55; col++) {
      currentRow.push(createNode(row, col, st_row, st_col, fin_row, fin_col));
    }
    nodes.push(currentRow);
  }
  return nodes;
}

export function getNewNodesWithWallToggled(nodes, row, col) {
  const newNodes = nodes.slice();
  const node = newNodes[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newNodes[row][col] = newNode;
  return newNodes;
}

export function resetEnds(nodes, row, col) {
  const newNodes = nodes.slice();
  const node = newNodes[row][col];
  var newNode = { ...node };
  if (node.isStart) {
    newNode.isStart = false;
  }
  if (node.isFinish) {
    newNode.isFinish = false;
  }

  newNodes[row][col] = newNode;
  return newNodes;
}

export function getNewNodesWithNewEnds(
  nodes,
  row,
  col,
  isStartChanged,
  isFinishChanged
) {
  const newNodes = nodes.slice();
  const node = newNodes[row][col];
  var newNode = { ...node };
  if (isStartChanged) {
    newNode = {
      ...node,
      isStart: true,
      isWall: false,
    };
  }
  if (isFinishChanged) {
    newNode = {
      ...node,
      isFinish: true,
      isWall: false,
    };
  }

  newNodes[row][col] = newNode;
  return newNodes;
}
