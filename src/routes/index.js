import v1Routes from './v1';

const route = (app) => {
  app.use('/', v1Routes);
};

export default route;