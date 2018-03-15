'use strict'

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/login', controller.api.user.login);
  router.post('/api/user/add', controller.api.user.add);
}