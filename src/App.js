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
        <Route exact path="/login">
          <UserApp />
        </Route>
      </Switch>
    </Router>
  )
}

export default App