export function animateVisiting(visitedOrder, shortestPath, timeouts, speed) {
  for (let i = 0; i <= visitedOrder.length; i++) {
    if (i === visitedOrder.length) {
      timeouts.push(
        setTimeout(() => {
          animateShortestPath(shortestPath, timeouts, speed);
        }, i * speed)
      );
      return;
    }
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

function animateShortestPath(nodesInShortestPathOrder, timeouts, speed) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    if (node.isStart) {
      timeouts.push(
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start nodes-bg";
        }, i * speed)
      );
      continue;
    }
    if (node.isFinish) {
      timeouts.push(
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish nodes-bg";
        }, i * speed)
      );
      continue;
    }
    timeouts.push(
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, i * speed)
    );
  }
  // this.setState({ isBusy: false });
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
