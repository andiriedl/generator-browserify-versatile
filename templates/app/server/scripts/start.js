import _ from 'lodash';
import http from 'http';

import setupFactory from './setup';
import appFactory from './app';

export default function(appOptions = {}) {
  const defaultOptions = setupFactory();
  const options = _.defaultsDeep({}, appOptions, defaultOptions.app);
  const app = appFactory(options);
  return new Promise(function(resolve, reject) {
    const server = http.createServer(app);
    server.listen(options.port, function() {
      console.log(`Express server listening on port ${options.port}`);
      resolve(server);
    });
  });
};
