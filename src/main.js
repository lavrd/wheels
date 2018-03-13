import React, {Component} from 'react';
import {Footer, Header, Kit, KitList, KitNew} from "./layouts";
import {Redirect, Route, Switch} from "react-router-dom";
import {Preloader} from './components';
import Storage from './utils/storage';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      pending: true
    };
  }

  componentDidMount() {
    this.setState({isAuthenticated: !!Storage.get('token'), pending: false});
  }

  render() {
    if (this.state.pending) return <Preloader/>;
    if (!this.state.isAuthenticated) return <Redirect to='/signin'/>;
    return (
      <section>
        <Header/>

        <Switch>
          <Route exact path="/kit" component={Kit}/>
          <Route exact path="/kit/new" component={KitNew}/>
          <Route exact path="/kit/list" component={KitList}/>
          <Redirect to='/404'/>
        </Switch>

        <Footer/>
      </section>
    );
  }
}

export default Main;
