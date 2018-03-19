import React from "react";
import {Link} from 'react-router-dom';

const P404 = () => (
  <section className='hero'>
    <Link to='/'>
      <h1>Page not found</h1>

      <h1 style={{textAlign: 'center'}}>404</h1>
    </Link>
  </section>
);

export default P404;
