import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import Storage, {STORAGE_SESSION} from '../utils/storage';
import api from '../api';
import {Placeholder, Preloader} from '../components';

class SignUpP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      login: '',
      password: '',
      pending: true,
      error: null
    };
  }

  componentWillMount() {
    api.Session.auth()
      .then(() => this.setState({pending: false, isAuthenticated: true}))
      .catch(() => this.setState({pending: false, isAuthenticated: false}));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    api.Session.singup({username: this.state.login, password: this.state.password})
      .then((token) => {
        Storage.set(STORAGE_SESSION, token);
        this.props.history.push('/');
      })
      .catch((error) => this.setState({error: error.message}));
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
  };

  handleGoToSignInPage = (e) => {
    e.preventDefault();
    this.props.history.push('/signin');
  };

  render() {
    if (this.state.pending) return <Preloader/>;
    if (this.state.isAuthenticated) return <Redirect to='/'/>;
    return (
      <section className='hero'>
        <form
          className='d-flex flex-column card'
          onSubmit={this.handleSubmit}
        >
          {
            !this.state.error ? '' :
              <Placeholder text={this.state.error} status={'danger'}/>
          }

          <div className='d-flex flex-column'>
            <input
              placeholder='login'
              value={this.state.login}
              type='text'
              name='login'
              onChange={this.handleChange}
            />
          </div>

          <div className='d-flex flex-column mt-2'>
            <input
              placeholder='password'
              value={this.state.password}
              type='password'
              name='password'
              onChange={this.handleChange}
            />
          </div>

          <div className='d-flex flex-column'>
            <button
              className='btn-primary p-3 mt-3'
              disabled={!this.state.login || !this.state.password}
              type='submit'
            >
              signup
            </button>

            <button
              onClick={this.handleGoToSignInPage}
              className='btn-primary p-3 mt-2'
            >
              signin
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(SignUpP);
