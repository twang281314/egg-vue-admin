
const methodMap = {

  /** 管理登陆接口 **/
  AdminLogin: {url: '/api/passport/login', method: 'post'},
  /** 用户登陆解锁 **/
  AdminUnlock: {url: '/api/passport/unlock', method: 'post'},
  /** 后台用户列表 **/
  UserList: {url: '/api/user/list', method: 'get'},
  /** 添加后台用户 **/
  AdminAddUser: {url: '/api/user/add', method: 'post'},
  /** 编辑后台用户 **/
  AdminEditUser: {url: '/api/user/edit', method: 'post'},
  /** 重置后台用户密码 **/
  RestPassword: {url: '/api/user/rest_password', method: 'post'},

};
export default methodMap;
