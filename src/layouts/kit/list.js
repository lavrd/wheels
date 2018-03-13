import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Storage from '../../utils/storage';

class KitList extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    Storage.get();
  }

  render() {
    return (
      <section className='hero'>
        <Link to='/kit/new'>
          <button className='btn-primary'>new</button>
        </Link>
        <h1>kit list</h1>
      </section>
    );
  }
}

export default KitList;
