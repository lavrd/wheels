import React, {Component} from "react";
import Storage, {STORAGE_WHEELS} from '../../utils/storage';
import {defaultWheels} from "../../utils/config";
import {KitNewC} from '../../components';

class KitNewP extends Component {

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
    if (!data.model.includes('/models/')) data.model = `/models/${data.model}`;
    if (!data.preview.includes('/img/')) data.preview = `/img/${data.preview}`;
    const {state} = this.props.location;
    if (!!state) Storage.updateArr(STORAGE_WHEELS, state.id, data);
    else Storage.append(STORAGE_WHEELS, data);
    this.props.history.push('/kit/list');
  };

  handleChange = (e) => {
    const {target} = e;
    const {name} = target;
    let value;
    if (!!target.files) value = target.files[0].name;
    else value = target.value;
    this.setState({[name]: value});
  };

  disabled = () => {
    return !this.state.name || !this.state.price || !this.state.model;
  };

  render() {
    return (
      <section className='hero'>
        <KitNewC
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          disabled={this.disabled()}
          isUpdate={!!this.props.location.state}
          handleDefault={this.handleDefault}
        />
      </section>
    );
  }
}

export default KitNewP;
