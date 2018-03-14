import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import Storage, {STORAGE_WHEELS} from '../../utils/storage';
import {KitListC, Preceholder, Preloader} from '../../components';

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

  handleUpdate = (id) => {
    this.props.history.push('/kit/new', {...this.state.wheels[id], id: id});
  };

  render() {
    if (this.state.pending) return <Preloader/>;
    const {wheels} = this.state;
    return (
      <section className='hero'>
        <div className='d-flex'>
          {
            !!wheels.length ? Object.keys(wheels).map((id, index) => {
              return (
                <KitListC
                  id={id}
                  handleUpdate={this.handleUpdate}
                  wheel={wheels[id]}
                  handleRemove={this.handleRemove}
                />
              );
            }) : <Preceholder text={'you don`t have models'} status={'danger'}/>
          }
        </div>

        <div
          className='d-flex mt-3'
        >
          <Link to='/kit/new'>
            <button className='btn-primary'>new</button>
          </Link>
          <button
            onClick={this.handleClear}
            className='btn-danger'
            disabled={!wheels.length}
          >
            clear
          </button>
        </div>
      </section>
    );
  }
}

export default withRouter(KitList);
