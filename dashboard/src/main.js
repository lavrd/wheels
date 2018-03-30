import React, {Component, Fragment} from 'react';
import {Account, Footer, Header, Wheels, WheelList, NewWheel} from "./layouts";
import {Redirect, Route, Switch} from "react-router-dom";
import {Preloader} from './components';
import api from './api';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      isAuthenticated: false
    };
  }

  componentWillMount() {
    api.Session.auth()
      .then(() => this.setState({pending: false, isAuthenticated: true}))
      .catch(() => this.setState({pending: false, isAuthenticated: false}));
  }

  render() {
    if (this.state.pending) return <Preloader />;
    if (!this.state.isAuthenticated) return <Redirect to='/signin' />;
    return (
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={Wheels} />
          <Route exact path="/new" component={NewWheel} />
          <Route exact path="/list" component={WheelList} />
          <Route exact path="/account" component={Account} />
          <Redirect to='/404' />
        </Switch>

        <Footer />
      </Fragment>
    );
  }
}

export default Main;
