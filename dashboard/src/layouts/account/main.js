import React, {Component} from 'react';
import {Header} from '.';
import {withRouter} from 'react-router-dom';
import api from '../../api';
import {Preloader} from '../../components';
import {Storage} from '../../utils';

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
      .then((acc) => this.setState({account: acc, pending: false}))
      .catch(() => this.setState({pending: false, account: {username: 'error'}}));
  }

  handleDelete = () => {
    api.Account.delete()
      .then(() => {
        Storage.clear();
        this.props.history.push('/signup');
      });
  };

  render() {
    if (this.state.pending) return <Preloader />;
    return (
      <section
        className='d-flex flex-column align-items-center'
      >
        <Header account={this.state.account} />

        <button
          onClick={this.handleDelete}
          className='btn-danger'
        >
          delete
        </button>
      </section>
    );
  }
}

export default withRouter(Main);
