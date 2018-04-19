'use strict';

const {
  app,
  assert
} = require('egg-mock/bootstrap');

describe('get()', () => {

  it('should insert token to database', async () => {
    const ctx = app.mockContext();
    const token = await ctx.service.token.genToken('zxcvhggghhbnm', '21338880-4971-4428-8258-9b63d4b2');
    assert(token);
  })

  it('should get exists token', async () => {
    // 创建 ctx
    const ctx = app.mockContext();
    // 通过 ctx 访问到 service.token
    const token = await ctx.service.token.fetchOne('21338880-4971-4428-8258-9b63d4b2');
    console.log(JSON.stringify(token));
    assert(token.length==1);
  });



  it('should delete token from database', async () => {
    const ctx = app.mockContext();
    const token = await ctx.service.token.deleteToken('21338880-4971-4428-8258-9b63d4b2');
    assert(token);
  })

});