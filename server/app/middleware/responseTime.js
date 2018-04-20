/*
 * @Author: anytao 
 * @Date: 2018-04-20 14:45:50 
 * @Last Modified by:   anytao 
 * @Last Modified time: 2018-04-20 14:45:50 
 */

module.exports = responseTime;

/**
 * Add X-Response-Time header field.
 *
 * @return {Function}
 * @api public
 */

function responseTime() {
  return function responseTime(ctx, next){
    var start = Date.now();
    return next().then(function () {
      var delta = Math.ceil(Date.now() - start);
      ctx.set('X-Response-Time', delta + 'ms');
    });
  }
}