import React from "react";
import {Link} from 'react-router-dom';

const Footer = () => (
  <footer>
    <Link to='/'>
      <h3>wheels.</h3>
    </Link>
    <h4>
      <Link to='https://github.com/spacelavr/' target='_blank' rel='noopener noreferrer'>
        spacelavr
      </Link>
      &nbsp;/&nbsp;
      <Link to='https://github.com/barmadzilla/' target='_blank' rel='noopener noreferrer'>
        barmadzilla
      </Link>
    </h4>
    <h6>MIT</h6>
  </footer>
);

export default Footer;
