import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import {Preloader} from '../components';
import Storage, {STORAGE_SESSION} from '../utils/storage';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      pending: true,
      login: '',
      password: '',
      error: null
    };
  }

  componentDidMount() {
    this.setState({isAuthenticated: !!Storage.get(STORAGE_SESSION), pending: false});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.login === 'valera' && this.state.password === 'valera') {
      Storage.clear();
      Storage.set(STORAGE_SESSION, 'default');
      this.props.history.push('/kit');
    } else {
      this.setState({error: 'incorrect login or password'});
    }
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]: value});
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
          <div className='d-flex flex-column'>
            <input
              placeholder='login'
              value={this.state.login}
              type='text'
              name='login'
              onChange={this.handleChange}
            />
            <label className='text-danger'>{this.state.error}</label>
          </div>

          <div className='d-flex flex-column'>
            <input
              placeholder='password'
              value={this.state.password}
              type='password'
              name='password'
              onChange={this.handleChange}
            />
            <label className='text-danger'>{this.state.error}</label>
          </div>
          <button
            className='btn-primary p-3 mt-3'
            disabled={!this.state.login || !this.state.password}
            type='submit'
          >
            login
          </button>
        </form>
      </section>
    );
  }
}

export default withRouter(SignIn);
