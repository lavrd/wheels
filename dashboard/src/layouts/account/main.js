import React, {Component} from 'react';
import {Header} from '.';
import api from '../../api';
import {Preloader} from '../../components';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      account: null
    };
  }

  componentDidMount() {
    api.Account.fetch()
      .then((acc) => this.setState({account: acc, pending: false}));
  }

  render() {
    if (this.state.pending) return <Preloader/>;
    return (
      <section>
        <Header account={this.state.account}/>
      </section>
    );
  }
}

export default Main;
