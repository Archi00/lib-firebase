import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UserApp from "./UserApp"
import Test from "./Test"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Test />
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