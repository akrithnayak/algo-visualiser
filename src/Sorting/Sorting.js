import React, { Component } from "react";
import "./sorting.css";
import { Navbar, NavbarBrand, Button, Nav, NavItem } from "reactstrap";
import { bubbleSort } from "./sortingalgos/bubbleSort";
import { heapSort } from "./sortingalgos/heapSort";
import { insertionSort } from "./sortingalgos/insertionSort";
import { mergeSort } from "./sortingalgos/mergeSort";
import { quickSort } from "./sortingalgos/quickSort";
import { reverseSort } from "./sortingalgos/reverseSort";
import { selectionSort } from "./sortingalgos/selectionSort";

const ArrayBar = ({ array, pixel }) => {
  const bars = array.map((value, idx) => {
    return (
      <div
        className="array-bar"
        key={idx}
        style={{
          height: `${value}px`,
          backgroundColor: "white",
          width: `${pixel.width}px`,
          marginRight: `${pixel.mr}px`,
        }}
      ></div>
    );
  });
  return bars;
};

var ANIMATION_SPEED_MS = 5;
var ARRAY_LEN = 80;
var timeouts = [];

class SortingVisualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      pixel: {
        width: 0,
        mr: 0,
      },
      array: [],
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (this.container && this.container.offsetWidth) {
        console.log(this.container.offsetWidth);
        this.setState({
          pixel: {
            width: (this.container.offsetWidth / ARRAY_LEN) * 0.5,
            mr: (this.container.offsetWidth / ARRAY_LEN) * 0.5,
          },
        });
      }
    });
    this.setState({
      pixel: {
        width: (this.container.offsetWidth / ARRAY_LEN) * 0.5,
        mr: (this.container.offsetWidth / ARRAY_LEN) * 0.5,
      },
    });
    this.resetArray();
  }

  toggle = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  reverseSort() {
    const animations = reverseSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      if (animations[i].length === 3) {
        const [pivot, barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        arraybars[pivot].style.backgroundColor = "white";
        timeouts.push(
          setTimeout(() => {
            var tempHeight = barOne.style.height;
            barOne.style.height = barTwo.style.height;
            barTwo.style.height = tempHeight;
          }, 1)
        );
      } else {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        timeouts.push(
          setTimeout(() => {
            var tempHeight = barOne.style.height;
            barOne.style.height = barTwo.style.height;
            barTwo.style.height = tempHeight;
          }, 1)
        );
      }
    }
  }

  mergeSort = () => {
    const animations = mergeSort(this.state.array);
    console.log(animations);
    for (var i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      if (i % 3 !== 2) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        const color = i % 3 === 0 ? "blue" : "white";

        timeouts.push(
          setTimeout(() => {
            barOne.style.backgroundColor = color;
            barTwo.style.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS)
        );
      } else {
        const [barIdx, barheight] = animations[i];
        timeouts.push(
          setTimeout(() => {
            arraybars[barIdx].style.height = `${barheight}px`;
          }, i * ANIMATION_SPEED_MS)
        );
      }
    }
  };

  quickSort = () => {
    const animations = quickSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      if (animations[i].length === 4) {
        const [dec, pivot, barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        if (dec === 1) {
          timeouts.push(
            setTimeout(() => {
              arraybars[pivot].style.backgroundColor = "red";
              barOne.style.backgroundColor = "blue";
              barTwo.style.backgroundColor = "blue";
            }, i * ANIMATION_SPEED_MS)
          );
        } else {
          timeouts.push(
            setTimeout(() => {
              var tempHeight = barOne.style.height;
              barOne.style.height = barTwo.style.height;
              barTwo.style.height = tempHeight;
              barOne.style.backgroundColor = "white";
              barTwo.style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        }
      } else {
        const [dec, barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        if (dec === 1) {
          timeouts.push(
            setTimeout(() => {
              barOne.style.backgroundColor = "blue";
              barTwo.style.backgroundColor = "blue";
            }, i * ANIMATION_SPEED_MS)
          );
        } else {
          timeouts.push(
            setTimeout(() => {
              var tempHeight = barOne.style.height;
              barOne.style.height = barTwo.style.height;
              barTwo.style.height = tempHeight;
              barOne.style.backgroundColor = "white";
              barTwo.style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        }
      }
    }
  };

  bubbleSort() {
    const animations = bubbleSort(this.state.array);
    console.log(this.state.array);
    for (var i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      const [dec, barOneIdx, barTwoIdx] = animations[i];
      const barOne = arraybars[barOneIdx];
      const barTwo = arraybars[barTwoIdx];
      if (dec === 1) {
        timeouts.push(
          setTimeout(() => {
            barOne.style.backgroundColor = "blue";
            barTwo.style.backgroundColor = "blue";
          }, i * ANIMATION_SPEED_MS)
        );
      } else {
        timeouts.push(
          setTimeout(() => {
            var tempHeight = barOne.style.height;
            barOne.style.height = barTwo.style.height;
            barTwo.style.height = tempHeight;
            barOne.style.backgroundColor = "white";
            barTwo.style.backgroundColor = "white";
          }, i * ANIMATION_SPEED_MS)
        );
      }
    }
  }

  insertionSort() {
    const animations = insertionSort(this.state.array);
    for (var i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      const [dec, barOneIdx, barTwoIdx_hei] = animations[i];
      if (dec === 0) {
        timeouts.push(
          setTimeout(() => {
            arraybars[barOneIdx].style.backgroundColor = "red";
          }, i * ANIMATION_SPEED_MS)
        );
      } else if (dec === 1) {
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx_hei];
        timeouts.push(
          setTimeout(() => {
            barOne.style.backgroundColor = "blue";
            barTwo.style.backgroundColor = "blue";
          }, i * ANIMATION_SPEED_MS)
        );
      } else if (dec === 3) {
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx_hei];
        timeouts.push(
          setTimeout(() => {
            barOne.style.backgroundColor = "white";
            barTwo.style.backgroundColor = "red";
          }, i * ANIMATION_SPEED_MS)
        );
      } else if (dec === 2) {
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx_hei];
        timeouts.push(
          setTimeout(() => {
            barTwo.style.height = barOne.style.height;
            barOne.style.backgroundColor = "white";
            barTwo.style.backgroundColor = "white";
          }, i * ANIMATION_SPEED_MS)
        );
      } else {
        const barOne = arraybars[barOneIdx];
        timeouts.push(
          setTimeout(() => {
            barOne.style.height = `${barTwoIdx_hei}px`;
            barOne.style.backgroundColor = "white";
          }, i * ANIMATION_SPEED_MS)
        );
      }
    }
  }

  selectionSort() {
    const animations = selectionSort(this.state.array);
    for (var i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      if (animations[i].length === 2) {
        const [dec, idx] = animations[i];
        if (dec === 1) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "red";
            }, i * ANIMATION_SPEED_MS)
          );
        } else if (dec === 2) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "blue";
            }, i * ANIMATION_SPEED_MS)
          );
        } else if (dec === 3) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        } else if (dec === 4) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        } else if (dec === 5) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "yellow";
            }, i * ANIMATION_SPEED_MS)
          );
        }
      } else {
        const [dec, barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        if (dec === 1) {
          timeouts.push(
            setTimeout(() => {
              barOne.style.backgroundColor = "blue";
              barTwo.style.backgroundColor = "blue";
            }, i * ANIMATION_SPEED_MS)
          );
        } else {
          timeouts.push(
            setTimeout(() => {
              var tempHeight = barOne.style.height;
              barOne.style.height = barTwo.style.height;
              barTwo.style.height = tempHeight;
              barOne.style.backgroundColor = "white";
              barTwo.style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        }
      }
    }
  }

  heapSort() {
    const animations = heapSort(this.state.array);
    for (var i = 0; i < animations.length; i++) {
      const arraybars = document.getElementsByClassName("array-bar");
      if (animations[i].length === 2) {
        const [dec, idx] = animations[i];
        if (dec === 0) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        } else if (dec === 1) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "yellow";
            }, i * ANIMATION_SPEED_MS)
          );
        } else if (dec === 2) {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "blue";
            }, i * ANIMATION_SPEED_MS)
          );
        } else {
          timeouts.push(
            setTimeout(() => {
              arraybars[idx].style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        }
      } else {
        const [dec, barOneIdx, barTwoIdx] = animations[i];
        const barOne = arraybars[barOneIdx];
        const barTwo = arraybars[barTwoIdx];
        if (dec === 1) {
          timeouts.push(
            setTimeout(() => {
              barOne.style.backgroundColor = "blue";
              barTwo.style.backgroundColor = "blue";
            }, i * ANIMATION_SPEED_MS)
          );
        } else {
          timeouts.push(
            setTimeout(() => {
              var tempHeight = barOne.style.height;
              barOne.style.height = barTwo.style.height;
              barTwo.style.height = tempHeight;
              barOne.style.backgroundColor = "white";
              barTwo.style.backgroundColor = "white";
            }, i * ANIMATION_SPEED_MS)
          );
        }
      }
    }
  }

  clearTimeout_() {
    for (var i = 0; i < timeouts.length; i++) clearTimeout(timeouts[i]);
    timeouts = [];
    const arraybars = document.getElementsByClassName("array-bar");

    for (var j = 0; j < arraybars.length; j++)
      arraybars[j].style.backgroundColor = "white";
  }

  resetArray() {
    this.clearTimeout_();
    const array = [];
    for (var i = 0; i < ARRAY_LEN; i++) array.push(randomNumber(5, 500));
    this.setState({ array });
  }

  changeArrayLength = (e) => {
    ARRAY_LEN = parseInt(e.target.value);
    this.setState({
      pixel: {
        width: (this.container.offsetWidth / ARRAY_LEN) * 0.5,
        mr: (this.container.offsetWidth / ARRAY_LEN) * 0.5,
      },
    });
    this.resetArray();
  };

  changeSortingSpeed = (e) => {
    ANIMATION_SPEED_MS = 403 - Number(e.target.value);
  };

  calculateComplexity = (e) => {
    var value = e.target.value;
    var tc = document.getElementById("tc");
    var sc = document.getElementById("sc");
    switch (value) {
      case "1":
        tc.innerHTML = "O(nlogn)";
        sc.innerHTML = "O(n)";
        break;
      case "2":
        tc.innerHTML = "O(nlogn)";
        sc.innerHTML = "O(logn)";
        break;
      case "3":
        tc.innerHTML = "O(n²)";
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

  sort = () => {
    var value = document.getElementById("sort").value;
    switch (value) {
      case "1":
        this.mergeSort();
        break;
      case "2":
        this.quickSort();
        break;
      case "3":
        this.insertionSort();
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

  render() {
    return (
      <div>
        <Navbar dark expand="md" className="bg-dark">
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">
              Algo-visualiser
            </NavbarBrand>
            <Nav navbar className="row">
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
                <label htmlFor="speed">Sorting speed</label>
                <input
                  type="range"
                  className="form-control-range"
                  id="speed"
                  min="3"
                  max="400"
                  defaultValue="360"
                  onChange={(e) => this.changeSortingSpeed(e)}
                />
              </NavItem>
              <NavItem className="mr-5 text-white">
                <label htmlFor="size">Array size</label>
                <input
                  type="range"
                  className="form-control-range"
                  id="size"
                  min="10"
                  max="100"
                  defaultValue="80"
                  onChange={(e) => this.changeArrayLength(e)}
                />
              </NavItem>
              <NavItem className="mr-4">
                <Button
                  className="bg-primary btn-block"
                  onClick={() => this.sort()}
                >
                  Sort
                </Button>
                <Button
                  className="bg-warning btn-block"
                  onClick={() => this.reverseSort()}
                >
                  Reverse
                </Button>
              </NavItem>
              <NavItem className="mr-2">
                <select
                  id="sort"
                  className="btn btn-light border border-warning"
                  onChange={(e) => this.calculateComplexity(e)}
                >
                  <option value="0">Sorting Algorithm</option>
                  <option value="1">MergeSort</option>
                  <option value="2">QuickSort</option>
                  <option value="3">InsertionSort</option>
                  <option value="4">SelectionSort</option>
                  <option value="5">HeapSort</option>
                  <option value="6">BubbleSort</option>
                </select>
              </NavItem>
              <NavItem>
                <Button className="bg-danger" onClick={() => this.resetArray()}>
                  Reset
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <div
          ref={(el) => (this.container = el)}
          className="container"
          id="array-bar"
        >
          <ArrayBar array={this.state.array} pixel={this.state.pixel} />
        </div>
      </div>
    );
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualiser;
