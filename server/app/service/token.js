/*
 * @Author: anytao
 * @Date: 2018-04-18 10:52:11
 * @Last Modified by: anytao
 * @Last Modified time: 2018-04-19 17:34:14
 */

const Service = require('egg').Service;
const moment = require('moment');

class TokenService extends Service {
    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }

    async fetchOne(userId) {
        const token = await this.ctx.model.Token.findAll({
            where:{
                user_id:userId
            }
        });
        return token;
    }

    async genToken(token, userId) {
        const expire_time = new Date(moment().add(1, 'days'));
        const result = await this.ctx.model.Token.create({
            expire_time,
            token,
            user_id: userId,
            valid: true
        });
        return result;
    }
    async deleteToken(userId) {
        const result = await this.ctx.model.Token.destroy({
            where: {
                user_id: userId
            }
        });
        return result;
    }
}

module.exports = TokenService;