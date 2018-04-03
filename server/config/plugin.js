'use strict';

// had enabled by egg
// exports.static = true;

/**
 * 添加egg-sequelize插件配置 
 */
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.validate = {
    enable: true,
    package: 'egg-validate',
};