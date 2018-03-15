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

    async login(username, password) {

        // 检查密码是否正确
        const user = await this.ctx.model.User.findOne({
            attributes: ['id', 'username', 'email', 'phone'],
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
}

module.exports = UserService;