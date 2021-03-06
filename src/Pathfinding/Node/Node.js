import React, { Component } from "react";
import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onMouseLeave,
      row,
    } = this.props;
    const extraClass = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div
        className={`node ${extraClass}`}
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
        onMouseLeave={() => onMouseLeave(row, col)}
      ></div>
    );
  }
}

export default Node;
