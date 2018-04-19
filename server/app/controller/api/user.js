'use strict';

const Controller = require('egg').Controller;

const Parameter = require('parameter');
const jwt = require('jsonwebtoken');
const Check = new Parameter();

class UserController extends Controller {

    constructor(ctx) {
        super(ctx);
        this.session = ctx.session;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }

    // 登录
    async login() {
        const token = jwt.sign({
            foo: 'bar'
        }, 'shhhhh');
        const ctx = this.ctx;
        const createRule = {
            username: {
                type: 'string',
                required: true,
                allowEmpty: false,
                max: 20,
            },
            password: {
                type: 'string',
                required: true,
                allowEmpty: false,
                max: 20,
                min: 6,
            },
        };
        let errors = [];
        try {
            errors = ctx.validate(createRule, this.ctx.request.body);
        } catch (error) {
            errors = error.errors;
        }

        if (errors) {
            this.ctx.body = this.ServerResponse.createByErrorMsg(errors[0].field + ' ' + errors[0].code + ' ' + errors[0].message);
            return;
        }

        const {
            username,
            password,
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

    async list() {
        const users = await this.ctx.service.user.list();
        this.ctx.body = this.ServerResponse.createBySuccessMsgAndData('获取成功', users);
    }

}

module.exports = UserController;