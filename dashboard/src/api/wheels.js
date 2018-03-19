import {request} from '../utils/http';

const api_host = process.env.REACT_APP_API_HOST;

export default class Session {
  static new(body) {
    let uri = [api_host, 'wheels'].join('/');
    return request('POST', uri, body, true);
  }

  static update(body) {
    let uri = [api_host, 'wheels'].join('/');
    return request('PUT', uri, body, true);
  }

  static list() {
    let uri = [api_host, 'wheels'].join('/');
    return request('GET', uri, null, true);
  }

  static remove(name, all = '') {
    let uri = [api_host, `wheels?all=${all}`].join('/');
    return request('DELETE', uri, {name}, true);
  }
}

// todo create -> new
