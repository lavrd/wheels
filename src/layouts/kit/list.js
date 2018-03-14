import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Storage, {STORAGE_WHEELS} from '../../utils/storage';
import {Preloader} from '../../components';

class KitList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      wheels: []
    };
  }

  componentDidMount() {
    this.setState({wheels: Storage.get(STORAGE_WHEELS) || [], pending: false});
  }

  handleClear = () => {
    Storage.remove(STORAGE_WHEELS);
    this.setState({wheels: []});
  };

  handleRemove = (id) => {
    const {wheels} = this.state;
    wheels.splice(id, 1);
    this.setState({wheels: wheels});
    Storage.splice(STORAGE_WHEELS, id);
  };

  render() {
    if (this.state.pending) return <Preloader/>;
    const {wheels} = this.state;

    return (
      <section className='hero'>
        <Link to='/kit/new'>
          <button className='btn-primary'>new</button>
        </Link>

        <h1>kit list</h1>

        <div className='d-flex flex-column'>
          {
            !!wheels.length ? Object.keys(wheels).map((id, index) => {
              const wheel = wheels[id];
              return (
                <div
                  className='d-flex'
                  key={index}
                >
                  <div>#{index + 1}</div>
                  <div>{wheel.name}</div>
                  <div>{wheel.description}</div>
                  <div>{wheel.price}</div>
                  <button
                    onClick={() => this.handleRemove(id)}
                    className='btn-danger'
                  >
                    remove
                  </button>
                </div>
              );
            }) : <div>wheel list is empty</div>
          }
        </div>

        <button
          onClick={this.handleClear}
          className='btn-danger'
          disabled={!wheels.length}
        >
          clear
        </button>
      </section>
    );
  }
}

export default KitList;
