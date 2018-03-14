import React, {Component} from 'react';
import {Footer, Header, KitListP, KitNewP, KitP} from "./layouts";
import {Redirect, Route, Switch} from "react-router-dom";
import {Preloader} from './components';
import Storage, {STORAGE_SESSION} from './utils/storage';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      pending: true
    };
  }

  componentDidMount() {
    this.setState({isAuthenticated: !!Storage.get(STORAGE_SESSION), pending: false});
  }

  render() {
    if (this.state.pending) return <Preloader/>;
    if (!this.state.isAuthenticated) return <Redirect to='/signin'/>;
    return (
      <section>
        <Header/>

        <Switch>
          <Route exact path="/kit" component={KitP}/>
          <Route exact path="/kit/new" component={KitNewP}/>
          <Route exact path="/kit/list" component={KitListP}/>
          <Redirect to='/404'/>
        </Switch>

        <Footer/>
      </section>
    );
  }
}

export default Main;
