import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Audio from './Audio'
import Home from "../routeComponents/Home";
import AuthRouter from "../routeComponents/auth/AuthRouter";
import Profile from "../components/Profile"
import { AuthContextComponent } from "../contexts/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={AuthRouter} />
          <Route path="/profile/:id" component={Profile} />
          <Route path="/audio" component={Audio} />
        </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
