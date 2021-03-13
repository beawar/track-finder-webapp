import {BrowserRouter, Route, Switch} from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        { routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} exact>
                <Component />
            </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
