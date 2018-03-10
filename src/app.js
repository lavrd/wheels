import React from 'react';
import {Landing, P404, SignIn} from "./layouts";
import {Route, Switch} from "react-router-dom";
import Main from "./main";

const App = () => (
  <Switch>
    <Route exact path='/signin' component={SignIn}/>
    <Route exact path='/' component={Landing}/>
    <Route path='/kit' component={Main}/>
    <Route exact path='/404' component={P404}/>
    <Route component={P404}/>
  </Switch>
);

export default App;
