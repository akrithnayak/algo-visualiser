import { Component } from "react";

class Home extends Component {
  state = {};
  componentDidMount() {
    const body = document.getElementsByTagName("body")[0];
    console.log(body);
    body.style = "background: black";
  }
  render() {
    return (
      <div
        className="container text-center font-weight-bold font-italic"
        style={{ fontSize: "20px", marginTop: "100px", color: "turquoise" }}
      >
        <h1>Welcome to Algo-Visualiser</h1>
        <h5 style={{ marginTop: "100px" }}>Select any one:</h5>
        <div className="mt-5">
          <a href="/sorting" className="btn btn-outline-light mr-1">
            Sorting visualization
          </a>
          <a href="/pathfinding" className="btn btn-outline-light">
            Pathfinding visualization
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
