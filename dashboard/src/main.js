import React, {Component} from 'react';
import {Account, Footer, Header, KitListP, KitNewP, KitP} from "./layouts";
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
      <section>
        <Header />

        <Switch>
          <Route exact path="/" component={KitP} />
          <Route exact path="/new" component={KitNewP} />
          <Route exact path="/list" component={KitListP} />
          <Route exact path="/account" component={Account} />
          <Redirect to='/404' />
        </Switch>

        <Footer />
      </section>
    );
  }
}

export default Main;
