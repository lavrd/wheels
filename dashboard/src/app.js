import React from 'react';
import {P404, SignIn, SignUp} from "./layouts";
import {Route, Switch} from "react-router-dom";
import Main from "./main";

const App = () => (
  <Switch>
    <Route exact path='/signin' component={SignIn} />
    <Route exact path='/signup' component={SignUp} />
    <Route exact path='/404' component={P404} />
    <Route path='/' component={Main} />
  </Switch>
);

export default App;
