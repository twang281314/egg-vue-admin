
const util  = require('../libs/util');
const Mock = require('mockjs');

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports =  {
  loginByUsername: config => {
    const {
      username
    } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    let result = {
      code: 200,
      data: null,
      msg: '获取成功',
      time: new Date()
    }
    const {
      token
    } = util.param2Obj(config.url)
    if (userMap[token]) {
      result.data = userMap[token];
      return result;
    } else {
      return false
    }
  },
  logout: () => 'success'
}