import {request} from '../utils/http';

const api_host = process.env.REACT_APP_API_HOST;

export default class Account {
  static fetch() {
    const uri = [api_host, 'acc'].join('/');
    return request('GET', uri, null, true);
  }

  static delete() {
    const uri = [api_host, 'acc'].join('/');
    return request('DELETE', uri, null, true);
  }
}
