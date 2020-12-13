export function animateVisiting(visitedOrder, shortestPath, timeouts, speed) {
  for (let i = 0; i < visitedOrder.length; i++) {
    const node = visitedOrder[i];
    if (node.isFinish || node.isStart) continue;
    if (node.isWall) {
      timeouts.push(
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall node-visited";
        }, i * speed)
      );
      continue;
    }
    timeouts.push(
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, i * speed)
    );
  }
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
