import Mock from 'mockjs'

import loginAPI from './login.js';
import userAPI  from './user.js';


// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/api\/user\/info\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/api\/user\/list\.*/, 'get', userAPI.getUserList)

export default Mock