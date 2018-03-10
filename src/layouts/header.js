import React from "react";
import {Link} from 'react-router-dom';

const Header = () => (
  <header className='d-flex justify-space-between'>
    <menu className='d-flex justify-space-between'>
      <div><Link to='/'>wheels.</Link></div>
      <div><Link to='/kit/list'>wheel list</Link></div>
    </menu>
    <h3>Change wheels of car like a boss.</h3>
  </header>
);

export default Header;
