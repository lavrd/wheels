import React, {Component} from "react";
import {KitNewC} from '../../components';
import api from '../../api';

class KitNewP extends Component {

  constructor(props) {
    super(props);
    const {state} = props.location;
    const name = !!state ? state.name : '';
    const description = !!state ? state.description : '';
    const model = !!state ? state.model : '';
    const preview = !!state ? state.preview : '';
    const price = !!state ? state.price : '';
    const id = !!state ? state._id : '';
    this.state = {
      data: {
        id: id,
        name: name,
        description: description,
        model: model,
        preview: preview,
        price: price
      },
      isUpdated: !!props.location.state
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.disabled()) return;
    const data = this.state.data;
    data.name = data.name.trim();
    data.description = data.description.trim();
    if (this.state.isUpdated)
      api.Wheels.update(data)
        .then(() => this.handleSuccess());
    else
      api.Wheels.new(data)
        .then(() => this.handleSuccess());
  };

  handleSuccess = () => {
    this.props.history.push('/list');
  };

  handleChange = (e) => {
    const {target} = e;
    const {name} = target;
    if (!!target.files) {
      const reader = new FileReader();
      const file = target.files[0];
      reader.onloadend = () => {
        this.setState({data: {...this.state.data, [name]: reader.result}});
      };
      reader.readAsDataURL(file);
    } else {
      const value = target.value;
      this.setState({data: {...this.state.data, [name]: value}});
    }
  };

  disabled = () => {
    const {data} = this.state;
    return !data.name || !data.price || !data.model || !data.preview;
  };

  render() {
    return (
      <section className='hero'>
        <KitNewC
          data={this.state.data}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          disabled={this.disabled()}
          isUpdate={this.state.isUpdated}
        />
      </section>
    );
  }
}

export default KitNewP;
