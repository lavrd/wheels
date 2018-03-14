import React, {Component} from "react";
import Storage, {STORAGE_WHEELS} from '../../utils/storage';
import {defaultWheels} from "../../utils/config";

class KitNew extends Component {

  constructor(props) {
    super(props);
    const {state} = props.location;
    const name = !!state ? state.name : '';
    const description = !!state ? state.description : '';
    const model = !!state ? state.model : null;
    const preview = !!state ? state.preview : null;
    const price = !!state ? state.price : '';
    this.state = {
      name: name,
      description: description,
      model: model,
      preview: preview,
      price: price
    };
  }

  handleDefault = (e) => {
    e.preventDefault();
    Storage.set(STORAGE_WHEELS, defaultWheels);
    this.props.history.push('/kit/list');
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.disabled()) return;
    const data = this.state;
    data.name = data.name.trim();
    data.description = data.description.trim();
    const {state} = this.props.location;
    if (!!state) Storage.updateArr(STORAGE_WHEELS, state.id, data);
    else Storage.append(STORAGE_WHEELS, data);
    this.props.history.push('/kit/list');
  };

  handleChange = (e) => {
    const {target} = e;
    const {name} = target;
    let value;
    if (!!target.files) value = `/models/${target.files[0].name}`;
    else value = target.value;
    this.setState({[name]: value});
  };

  disabled = () => {
    return !this.state.name || !this.state.price || !this.state.model;
  };

  render() {
    return (
      <section className='hero'>
        <form
          className='d-flex flex-column align-items-center'
          onSubmit={this.handleSubmit}
        >
          <input
            name='name'
            value={this.state.name}
            placeholder='name'
            onChange={this.handleChange}
          />
          <input
            name='description'
            value={this.state.description}
            placeholder='description'
            onChange={this.handleChange}
          />
          <input
            name='price'
            type='number'
            value={this.state.price}
            placeholder='price'
            onChange={this.handleChange}
          />
          <input
            name='model'
            type='file'
            onChange={this.handleChange}
          />
          <input
            name='preview'
            type='file'
            onChange={this.handleChange}
          />
          <div className='d-flex mt-3'>
            <button
              type='submit'
              className='btn-primary'
              disabled={this.disabled()}
            >
              add
            </button>
            <button
              className='btn-primary'
              onClick={this.handleDefault}
            >
              default
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default KitNew;
