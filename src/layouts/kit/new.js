import React, {Component} from "react";
import Storage, {STORAGE_WHEELS} from '../../utils/storage';

class KitNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      wheel: null,
      preview: null,
      price: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.disabled()) return;
    const data = this.state;
    data.name = data.name.trim();
    data.description = data.description.trim();
    Storage.append(STORAGE_WHEELS, data);
    this.clearFields();
  };

  clearFields = () => {
    this.setState({name: '', description: '', price: '', wheel: null, preview: null});
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value;
    if (!!target.files) value = target.files[0].name;
    else value = target.value;
    this.setState({[name]: value});
  };

  disabled = () => {
    return !this.state.name || !this.state.price;
  };

  render() {
    return (
      <section>
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
            name='wheel'
            type='file'
            onChange={this.handleChange}
          />
          <input
            name='preview'
            type='file'
            onChange={this.handleChange}
          />
          <button
            type='submit'
            className='btn-primary'
            disabled={this.disabled()}
          >
            add
          </button>
        </form>
      </section>
    );
  }
}

export default KitNew;
