import {request} from '../utils/http';

const api_host = process.env.REACT_APP_API_HOST;

export default class Session {
  static singup(body) {
    let uri = [api_host, "signup"].join("/");
    return request("POST", uri, body, false);
  }

  static login(body) {
    let uri = [api_host, "login"].join("/");
    return request("POST", uri, body, false);
  }
}
