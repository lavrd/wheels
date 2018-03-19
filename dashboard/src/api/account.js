import {request} from '../utils/http';

const api_host = process.env.REACT_APP_API_HOST;

export default class Account {
  static fetch() {
    let uri = [api_host, "account"].join("/");
    return request("GET", uri, null, true);
  }
}

