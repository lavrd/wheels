import {Storage, STORAGE_SESSION} from './storage';

const request = (method, url, body, auth) => {
  let headers = {};
  if (!!body) {
    headers["Content-Type"] = "application/json";
  }
  if (auth) {
    const session = Storage.get(STORAGE_SESSION);
    headers['Authorization'] = `Bearer ${session && session.token}`;
  }

  let opts = {};
  opts.method = method;
  opts.headers = headers;
  if (!!body) {
    opts.body = JSON.stringify(body);
  }

  return fetch(url, opts)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json().then((res) => {
          return res;
        }).catch(() => {
          return response;
        });
      }
      return response.json().then((e) => {
        throw e;
      });
    });
};

export {request};
