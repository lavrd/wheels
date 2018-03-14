import React from "react";
import {Link} from 'react-router-dom';

const Landing = () => (
  <section className='hero'>
    <h1>Wheels</h1>
    <h3>Change wheels of car like a boss</h3>
    <Link to='/kit'>
      <button className='btn-primary'>start</button>
    </Link>
  </section>
);

export default Landing;
