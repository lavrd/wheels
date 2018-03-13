import React, {Component} from "react";
import Storage from '../../utils/storage';

class KitNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      wheel: null,
      preview: null
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.disabled()) return;
    Storage.append('wheels', this.state);
  };

  upload = (file, name) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({[name]: reader.result});
    };
    reader.readAsDataURL(file);
  };

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    if (!!target.files) {
      const file = target.files[0];
      this.upload(file, name);
      return;
    }
    const value = target.value;
    this.setState({[name]: value});
  };

  disabled = () => {
    return !this.state.name;
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
            placeholder='wheel name'
            onChange={this.handleChange}
          />
          <input
            name='description'
            value={this.state.description}
            placeholder='wheel description'
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
