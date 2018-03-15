'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }

    // 登录
    async login() {
        const {
            username,
            password
        } = this.ctx.request.body;

        const response = await this.ctx.service.user.login(username, password);

        if (response.isSuccess()) {
            this.session.currentUser = response.getData();
        }
        this.ctx.body = response;
    }

    async add() {
        const user = this.ctx.request.body;
        const respponse = await this.ctx.service.user.add(user);
        this.ctx.body = respponse;
    }

}

module.exports = UserController;