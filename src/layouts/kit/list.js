import React from "react";
import {Link} from 'react-router-dom';

const KitList = () => (
  <section className='hero'>
    <Link to='/kit/new'><h1>new</h1></Link>
    <h1>kit list</h1>
  </section>
);

export default KitList;
