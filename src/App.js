import SortingVisualiser from "./Sorting/Sorting";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  HashRouter,
} from "react-router-dom";
import PathFindingVisualiser from "./Pathfinding/Pathfinding";
import Home from "./Home";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/sorting" exact>
          <SortingVisualiser />
        </Route>
        <Route path="/pathfinding" exact>
          <PathFindingVisualiser />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

export default App;
