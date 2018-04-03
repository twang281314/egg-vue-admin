'use strict'

module.exports = app => {
  const checkLogin = app.middleware.checkLogin({});
  const { router, controller } = app;
  router.post('/api/user/login', controller.api.user.login);
  router.post('/api/user/add', checkLogin,controller.api.user.add);
  router.get('/api/user/list', checkLogin,controller.api.user.list);
}