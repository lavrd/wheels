const methods = require('http').METHODS;

const wrapAsync = fn => (...args) => fn(...args).catch(args[2]);

const asyncRouter = (app) => {
  methods.forEach(m => {
    let original = app[m.toLowerCase()];
    app[m.toLowerCase()] = (...args) => {
      const wrappedArgs = args.map(arg => {
        if (typeof arg === 'function') {
          return wrapAsync(arg);
        }
        return arg;
      });
      return original.call(app, ...wrappedArgs);
    };
  });
  return app;
};

module.exports = asyncRouter;
