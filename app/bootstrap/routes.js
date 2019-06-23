const apiRoutes = require('@routes/api');

/**
 * defines routes for application
 */
const load = (app) => {
  app.use('/api/v1/', apiRoutes);
};

module.exports = {
  load
};
