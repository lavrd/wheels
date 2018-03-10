import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Preloader} from '../components';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      pending: true
    };
  }

  componentDidMount() {
    this.setState({isAuthenticated: !!localStorage.getItem('token'), pending: false});
  }

  render() {
    if (this.state.pending) return <Preloader/>;
    if (this.state.isAuthenticated) return <Redirect to='/'/>;
    return (
      <section className='hero'>
        <Link to='/'><h1>landing</h1></Link>
      </section>
    );
  }
}

export default SignIn;
