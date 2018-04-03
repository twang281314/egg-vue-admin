'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const _ = require('lodash');

class UserService extends Service {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }

    /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  async checkValid(type, value) {
    if (type.trim()) {
      
    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }

    async login(username, password) {

        //检验参数
        const validResponse = await this.checkValid('username', username);
        if (validResponse.isSuccess()) return validResponse;
    
        // 检查密码是否正确
        const user = await this.ctx.model.User.findOne({
            attributes: ['id', 'username', 'email', 'mobile'],
            where: {
                username,
                password: md5(password),
            },
        });

        if (!user) return this.ServerResponse.createByErrorMsg('密码错误');

        const userInfo = user.toJSON()
        let redirectTo='';

        return this.ServerResponse.createBySuccessMsgAndData('登录成功', { ...userInfo,
            redirectTo
        });
    }

    /**
     * 新增用户
     */
    async add(user) {
        user.password = md5(user.password);
        try {
            user = await this.ctx.model.User.create(user, {
                attributes: {
                    exclude: ['password']
                },
            });
            if (!user) return this.ServerResponse.createByErrorMsg('注册失败');

            user = user.toJSON();
            _.unset(user, 'password');
      
            return this.ServerResponse.createBySuccessMsgAndData('注册成功', user);
        } catch (e) {
            console.log(e);
            return this.ServerResponse.createByErrorMsg('注册失败');
        }
    }

    async list(){
        const users = await this.ctx.model.User.findAll();
        return users;
    }
}

module.exports = UserService;