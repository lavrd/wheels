import React from "react";
import {Link} from 'react-router-dom';

const KitNew = () => (
  <section className='hero'>
    <h1>new kit form</h1>
    <Link to='/kit/list'><h1>kit list</h1></Link>
  </section>
);

export default KitNew;
