import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Storage from '../utils/storage';

class Header extends Component {

  handleLogout = () => {
    Storage.clear();
    this.props.history.push('/signin');
  };

  render() {
    return (
      <header className='d-flex justify-space-between'>
        <div className='d-flex justify-space-between'>
          <div><Link to='/'>kit</Link></div>
          <div><Link to='/list'>list</Link></div>
          <div><Link to='/new'>new</Link></div>
        </div>

        <div className='d-flex justify-space-between'>
          <Link to='/account'>
            <button className='btn-danger'>account</button>
          </Link>

          <button
            className='btn-primary'
            onClick={this.handleLogout}
          >
            exit
          </button>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
