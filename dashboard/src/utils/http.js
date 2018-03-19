import Storage, {STORAGE_SESSION} from './storage';

export const request = (method, url, body, auth) => {
  let headers = {};
  headers["Content-Type"] = "application/json";
  let opts = {};
  opts.method = method;
  if (auth) {
    headers['Authorization'] = `Bearer ${Storage.get(STORAGE_SESSION).token}`;
  }
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
