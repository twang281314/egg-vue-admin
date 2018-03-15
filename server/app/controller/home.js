'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const posts = await this.ctx.service.post.list();
    this.ctx.body = posts;
  }
}

module.exports = HomeController;
