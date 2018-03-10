import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';

class Header extends Component {

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/signin');
  };

  render() {
    return (
      <header className='d-flex justify-space-between'>
        <div className='d-flex justify-space-between'>
          <div><Link to='/'>wheels.</Link></div>
          <div><Link to='/kit/list'>wheel list</Link></div>
        </div>

        <button
          className='btn-primary'
          onClick={this.handleLogout}
        >
          exit
        </button>
      </header>
    );
  }
}

export default withRouter(Header);
