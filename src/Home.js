import { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};

  render() {
    return (
      <div
        className="container text-center font-weight-bold font-italic"
        style={{ fontSize: "20px", marginTop: "100px", color: "black" }}
      >
        <h1>Welcome to Algo-Visualiser</h1>
        <h5 style={{ marginTop: "100px" }}>Select any one:</h5>
        <div className="mt-5">
          <Link to="/sorting" className="btn btn-outline-dark mr-1">
            Sorting visualization
          </Link>
          <Link to="/pathfinding" className="btn btn-outline-dark">
            Pathfinding visualization
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
