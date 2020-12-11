import SortingVisualiser from "./Sorting/Sorting";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import PathFindingVisualiser from "./Pathfinding/Pathfinding";
import Home from "./Home";

function App() {
  console.log(process.env.REACT_APP_PUBLIC_URL);
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
