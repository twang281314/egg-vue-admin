const Mock = require('mockjs');

const list = [];
const count = 50;
for (let i = 0; i < count; i++) {

}

let usersListData = Mock.mock({
  'data|25': [{
    id: '@id',
    username: '@name',
    realname: '@last',
    phone: /^1[34578]\d{9}$/,
    'age|11-99': 1,
    address: '@county(true)',
    isMale: '@boolean',
    email: '@email',
    createTime: '@datetime',
    updateTime: '@datetime',
    lastLoginIp: '@ip',
    'loginCount|11-99': 1,
    avatar() {
      return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.realname.substr(0, 1))
    },
  }, ],
})

function getUserList(config) {
  let result = {
    code: 200,
    data: null,
    msg: '获取成功',
    time: new Date()
  }

  result.data = usersListData.data;
  return result;
}

module.exports = {
  getUserList: getUserList()
}