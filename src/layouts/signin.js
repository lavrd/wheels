import React, {Component} from 'react';
import {Link, Redirect, withRouter} from "react-router-dom";
import {Preloader} from '../components';

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
    this.setState({isAuthenticated: !!localStorage.getItem('token'), pending: false});
  }

  handleLogin = (e) => {
    e.preventDefault();
    if (this.state.login === 'admin' && this.state.password === 'admin') {
      localStorage.setItem('token', 'token');
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
        <form onSubmit={this.handleLogin}>
          <input
            placeholder='login'
            value={this.state.login}
            type='text'
            name='login'
            onChange={this.handleChange}
          />
          <input
            placeholder='password'
            value={this.state.password}
            type='password'
            name='password'
            onChange={this.handleChange}
          />
          <label>{this.state.error}</label>
          <button
            disabled={!this.state.login || !this.state.password}
            type='submit'
          >
            login
          </button>
          <Link to='/'><h1>landing</h1></Link>
        </form>
      </section>
    );
  }
}

export default withRouter(SignIn);
