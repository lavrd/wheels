import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';
import {Placeholder, Preloader, WheelCard} from '../../components';
import api from '../../api';

class WheelList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pending: true,
      wheels: [],
      error: ''
    };
  }

  componentDidMount() {
    api.Wheels.list()
      .then((wheels) => this.setState({wheels: wheels || [], pending: false}))
      .catch((error) => this.setState({pending: false, error: error.message}));
  }

  handleClear = () => {
    api.Wheels.remove('', true)
      .then(() => this.setState({wheels: []}))
      .catch(error => this.setState({error: error.message}));
  };

  handleRemove = (id) => {
    const {wheels} = this.state;
    api.Wheels.remove(wheels[id].name)
      .then(() => {
        wheels.splice(id, 1);
        this.setState({wheels: wheels});
      })
      .catch(error => this.setState({error: error.message}));
  };

  handleUpdate = (id) => {
    this.props.history.push('/new', {...this.state.wheels[id]});
  };

  render() {
    if (this.state.pending) return <Preloader />;
    const {wheels} = this.state;
    return (
      <section className='hero'>
        {
          !this.state.error ? '' : <Placeholder text={this.state.error} status={'danger'} />
        }

        <div className='d-flex'>
          {
            !!wheels.length ? Object.keys(wheels).map((id, index) => (
              <WheelCard
                key={index}
                id={id}
                handleUpdate={this.handleUpdate}
                wheel={wheels[id]}
                handleRemove={this.handleRemove}
              />
            )) : <Placeholder text={'you don`t have models'} status={'danger'} />
          }
        </div>

        <div
          className='d-flex mt-3'
        >
          <Link to='/new'>
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

export default withRouter(WheelList);
