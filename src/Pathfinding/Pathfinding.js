import React, { Component } from "react";
import { Button, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import Node from "./Node/Node";
import "./Pathfinding.css";
import "./Node/Node.css";
import { dijkstras } from "./pathfindingalgos/dijkstras";
import { bfs } from "./pathfindingalgos/bfs";
import { dfs } from "./pathfindingalgos/dfs";
import { recursiveDivision } from "./mazealgos/recursiveDivision";

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 45;
var ANIMATION_SPEED_MS = 15;
var timeouts = [];
var foundPath = [];
var visitedOrder = [];

export default class PathFindingVisualiser extends Component {
  state = {
    nodes: [],
    mouseIsPressed: false,
    startChanged: false,
    finishChanged: false,
    isBusy: false,
    prevNode: null,
  };

  componentDidMount() {
    this.setState({ nodes: generateNodes() });
  }

  handleMouseDown(row, col) {
    if (this.state.isBusy) return;
    var newNodes;
    if (
      this.state.nodes[row][col].isFinish ||
      this.state.nodes[row][col].isStart
    ) {
      if (this.state.nodes[row][col].isFinish) {
        this.setState({ finishChanged: true });
      } else {
        this.setState({ startChanged: true });
      }
      newNodes = resetEnds(this.state.nodes, row, col);
    } else newNodes = getNewNodesWithWallToggled(this.state.nodes, row, col);
    this.setState({ nodes: newNodes, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed || this.state.isBusy) return;
    if (this.state.startChanged || this.state.finishChanged) {
      this.setState({
        prevNode: this.state.nodes[row][col],
      });
      const newNodes = getNewNodesWithNewEnds(
        this.state.nodes,
        row,
        col,
        this.state.startChanged,
        this.state.finishChanged
      );
      this.setState({ nodes: newNodes });
      return;
    }
    const newNodes = getNewNodesWithWallToggled(
      this.state.nodes,
      row,
      col,
      this.state.startChanged,
      this.state.finishChanged
    );
    this.setState({ nodes: newNodes });
  }

  handleMouseLeave(row, col) {
    if (this.state.isBusy) return;
    if (this.state.startChanged || this.state.finishChanged) {
      const newNodes = resetEnds(this.state.nodes, row, col);
      if (this.state.prevNode) newNodes[row][col] = this.state.prevNode;
      this.setState({ nodes: newNodes, prevNode: null });
      return;
    }
  }

  handleMouseUp(row, col) {
    if (this.state.isBusy) return;
    this.setState({ mouseIsPressed: false });
    if (this.state.startChanged || this.state.finishChanged) {
      const newNodes = getNewNodesWithNewEnds(
        this.state.nodes,
        row,
        col,
        this.state.startChanged,
        this.state.finishChanged
      );
      this.setState({
        nodes: newNodes,
        startChanged: false,
        finishChanged: false,
      });
    }
  }

  getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  animateVisiting(visitedOrder, shortestPath) {
    for (let i = 0; i <= visitedOrder.length; i++) {
      if (i === visitedOrder.length) {
        timeouts.push(
          setTimeout(() => {
            this.animateShortestPath(shortestPath);
          }, i * ANIMATION_SPEED_MS)
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
          }, i * ANIMATION_SPEED_MS)
        );
        continue;
      }
      timeouts.push(
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }, i * ANIMATION_SPEED_MS)
      );
    }
  }

  animateWalls(wallsVisitedOrder, nodes) {
    for (var i = 0; i < wallsVisitedOrder.length; i++) {
      const node = wallsVisitedOrder[i];
      if (i === wallsVisitedOrder.length - 1) {
        timeouts.push(
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-wall";
            this.setState({ nodes });
          }, i * ANIMATION_SPEED_MS)
        );
        continue;
      }
      if (node.isFinish || node.isStart) {
        node.isWall = false;
        continue;
      }

      timeouts.push(
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
        }, i * ANIMATION_SPEED_MS)
      );
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      if (node.isStart) {
        timeouts.push(
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-start nodes-bg";
          }, i * ANIMATION_SPEED_MS)
        );
        continue;
      }
      if (node.isFinish) {
        timeouts.push(
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-finish nodes-bg";
          }, i * ANIMATION_SPEED_MS)
        );
        continue;
      }
      timeouts.push(
        setTimeout(() => {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }, i * ANIMATION_SPEED_MS)
      );
    }
    this.setState({ isBusy: false });
  }

  resetPath() {
    for (var i = 0; i < this.state.nodes.length; i++) {
      for (var j = 0; j < this.state.nodes[i].length; j++) {
        const node = this.state.nodes[i][j];
        node.isVisited = false;
        node.distance = Infinity;
        node.previousNode = null;
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
          continue;
        }
        if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
          continue;
        }
        if (node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-wall";
          continue;
        }
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
  }

  recursiveDiv(orientation) {
    this.reset();
    const wallsOrder = recursiveDivision(
      this.state.nodes,
      0,
      0,
      20,
      55,
      orientation
    );
    this.animateWalls(wallsOrder, this.state.nodes);
  }

  dijkstras() {
    this.resetPath();
    this.setState({ isBusy: true });
    const start = this.state.nodes[START_NODE_ROW][START_NODE_COL];
    const finish = this.state.nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    visitedOrder = dijkstras(this.state.nodes, start, finish);
    foundPath = this.getNodesInShortestPathOrder(finish);
    this.animateVisiting(visitedOrder, foundPath);
  }

  bfs() {
    this.resetPath();
    this.setState({ isBusy: true });
    const start = this.state.nodes[START_NODE_ROW][START_NODE_COL];
    const finish = this.state.nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    visitedOrder = bfs(this.state.nodes, start, finish);
    foundPath = this.getNodesInShortestPathOrder(finish);
    this.animateVisiting(visitedOrder, foundPath);
  }

  dfs() {
    this.resetPath();
    this.setState({ isBusy: true });
    const start = this.state.nodes[START_NODE_ROW][START_NODE_COL];
    const finish = this.state.nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    visitedOrder = dfs(this.state.nodes, start, finish);
    foundPath = this.getNodesInShortestPathOrder(finish);
    this.animateVisiting(visitedOrder, foundPath);
  }

  start = () => {
    var value = document.getElementById("pathfinding").value;
    switch (value) {
      case "1":
        this.dijkstras();
        break;
      case "2":
        this.bfs();
        break;
      case "3":
        this.dfs();
        break;
      case "4":
        this.selectionSort();
        break;
      case "5":
        this.heapSort();
        break;
      case "6":
        this.bubbleSort();
        break;
      default:
        break;
    }
  };

  createMaze() {
    var value = document.getElementById("mazes").value;
    switch (value) {
      case "1":
        this.recursiveDiv();
        break;
      case "2":
        this.recursiveDiv(1);
        break;
      case "3":
        this.recursiveDiv(0);
        break;
      case "4":
        this.selectionSort();
        break;
      case "5":
        this.heapSort();
        break;
      case "6":
        this.bubbleSort();
        break;
      default:
        break;
    }
  }

  clearTimeout_() {
    for (var i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);
    timeouts = [];
    this.setState({ isBusy: false });
  }

  reset() {
    this.clearTimeout_();
    for (var i = 0; i < this.state.nodes.length; i++) {
      for (var j = 0; j < this.state.nodes[i].length; j++) {
        const node = this.state.nodes[i][j];
        if (node.isStart || node.isFinish) {
          continue;
        }
        if (node.isWall) node.isWall = false;
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
    this.setState({ nodes: generateNodes(), isBusy: false });
  }

  calculateComplexity = (e) => {
    var value = e.target.value;
    var tc = document.getElementById("tc");
    var sc = document.getElementById("sc");
    switch (value) {
      case "1":
        tc.innerHTML = "O(V²)";
        sc.innerHTML = "O(V)";
        break;
      case "2":
        tc.innerHTML = "O(nlogn)";
        sc.innerHTML = "O(logn)";
        break;
      case "3":
        tc.innerHTML = "O(V²)";
        sc.innerHTML = "O(1)";
        break;
      case "4":
        tc.innerHTML = "O(n²)";
        sc.innerHTML = "O(1)";
        break;
      case "5":
        tc.innerHTML = "O(nlogn)";
        sc.innerHTML = "O(1)";
        break;
      case "6":
        tc.innerHTML = "O(n²)";
        sc.innerHTML = "O(1)";
        break;
      default:
        break;
    }
  };

  changeSortingSpeed = (e) => {
    ANIMATION_SPEED_MS = 105 - Number(e.target.value);
  };

  render() {
    const { mouseIsPressed } = this.state;
    const nodes = this.state.nodes.map((row, rowIdx) => {
      return (
        <div key={rowIdx} style={{ lineHeight: 0 }}>
          {row.map((node, nodeIdx) => {
            const { row, col, isFinish, isStart, isWall } = node;
            return (
              <Node
                key={nodeIdx}
                col={col}
                isFinish={isFinish}
                isStart={isStart}
                isWall={isWall}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                onMouseUp={() => this.handleMouseUp(row, col)}
                onMouseLeave={() => this.handleMouseLeave(row, col)}
                row={row}
              />
            );
          })}
        </div>
      );
    });
    return (
      <div id="path">
        <Navbar dark expand="md" className="bg-dark">
          <div className="container">
            <NavbarBrand className="mr-auto">
              <Link to="/">Algo-visualiser</Link>
            </NavbarBrand>
            <Nav navbar className="row">
              <NavItem className="mr-3">
                <select
                  id="pathfinding"
                  className="btn btn-light border btn-block"
                  onChange={(e) => this.calculateComplexity(e)}
                >
                  <option value="0">Algorithms</option>
                  <option value="1">Dijktras's Algorithm</option>
                  <option value="2">BFS</option>
                  <option value="3">DFS</option>
                  <option value="4">Krushkal's Algorithm</option>
                  <option value="5">HeapSort</option>
                  <option value="6">BubbleSort</option>
                </select>

                <select
                  id="mazes"
                  className="btn btn-light border btn-block"
                  onChange={(e) => this.createMaze(e)}
                >
                  <option value="0">Mazes &amp; Patterns</option>
                  <option value="1">Recursive Division</option>
                  <option value="2">Recursive Division (vertical skew)</option>
                  <option value="3">
                    Recursive Division (horizontal skew)
                  </option>
                  <option value="4">Basic Random Maze</option>
                  <option value="5">Simple Stair Pattern</option>
                </select>
              </NavItem>
              <NavItem className="mr-5 text-white" style={{ width: "30px" }}>
                <label htmlFor="tc">Time</label>
                <label
                  type="text"
                  className="form-control-range bg-dark"
                  id="tc"
                >
                  --
                </label>
              </NavItem>
              <NavItem className="mr-5 text-white" style={{ width: "30px" }}>
                <label htmlFor="sc">Space</label>
                <label
                  type="text"
                  className="form-control-range bg-dark"
                  id="sc"
                >
                  --
                </label>
              </NavItem>
              <NavItem className="mr-5 text-white">
                <label htmlFor="speed">Speed</label>
                <input
                  type="range"
                  className="form-control-range"
                  id="speed"
                  min="5"
                  max="100"
                  defaultValue="90"
                  onChange={(e) => this.changeSortingSpeed(e)}
                />
              </NavItem>
              <NavItem className="mr-4">
                <Button
                  className="bg-success btn-block"
                  onClick={() => this.start()}
                  id="start"
                >
                  Start
                </Button>
                <Button
                  className="btn-block"
                  onClick={() => this.clearTimeout_()}
                >
                  Stop
                </Button>
              </NavItem>
              <NavItem>
                <Button
                  className="bg-danger btn-block"
                  onClick={() => this.reset()}
                >
                  Clear Board
                </Button>
                <Button
                  className="bg-warning btn-block"
                  onClick={() => this.resetPath()}
                >
                  Clear path
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <div id="grid">{nodes}</div>;
      </div>
    );
  }
}

function generateNodes() {
  const nodes = [];
  for (var row = 0; row < 20; row++) {
    const currentRow = [];
    for (var col = 0; col < 55; col++) {
      currentRow.push(createNode(row, col));
    }
    nodes.push(currentRow);
  }
  return nodes;
}

function createNode(row, col) {
  return {
    col,
    row,
    isVisited: false,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    distance: Infinity,
    previousNode: null,
  };
}

function getNewNodesWithWallToggled(nodes, row, col) {
  const newNodes = nodes.slice();
  const node = newNodes[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newNodes[row][col] = newNode;
  return newNodes;
}

function resetEnds(nodes, row, col) {
  const newNodes = nodes.slice();
  const node = newNodes[row][col];
  var newNode = {};
  if (node.isStart) {
    newNode = {
      ...node,
      isStart: false,
    };
  } else {
    newNode = {
      ...node,
      isFinish: false,
    };
  }

  newNodes[row][col] = newNode;
  return newNodes;
}

function getNewNodesWithNewEnds(
  nodes,
  row,
  col,
  isStartChanged,
  isFinishChanged
) {
  const newNodes = nodes.slice();
  const node = newNodes[row][col];
  var newNode = {};
  if (isStartChanged) {
    START_NODE_ROW = row;
    START_NODE_COL = col;
    newNode = {
      ...node,
      isStart: true,
      isWall: false,
    };
  } else if (isFinishChanged) {
    FINISH_NODE_ROW = row;
    FINISH_NODE_COL = col;
    newNode = {
      ...node,
      isFinish: true,
      isWall: false,
    };
  }

  newNodes[row][col] = newNode;
  return newNodes;
}
