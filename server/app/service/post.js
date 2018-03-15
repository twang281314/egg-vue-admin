'use strict';

const Service = require('egg').Service;

class PostService extends Service {

    async list() {
        const posts = await this.ctx.model.User.findAll();
        return posts;
    }
}

module.exports = PostService;