import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import UserApp from "./UserApp"
import DisplayLibraries from "./DisplayLibraries"
import { useEffect } from "react"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={DisplayLibraries} />
        <Route path="/display" component={DisplayLibraries}/>
        <Route exact path="/login" component={UserApp} />
        <Route exact path="/register" component={UserApp} />
        <Route exact path="/reset" component={UserApp} />
        <Route path="/dashboard" component={UserApp} />
      </Switch>
    </Router>
  )
}

export default App