import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UserApp from "./UserApp"
import Test from "./Test"
import DisplayLibraries from "./DisplayLibraries"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <DisplayLibraries />
        </Route>
        <Route exact path="/login" component={UserApp} />
        <Route exact path="/register" component={UserApp} />
        <Route exact path="/reset" component={UserApp} />
        <Route path="/dashboard" component={UserApp} />
      </Switch>
    </Router>
  )
}

export default App