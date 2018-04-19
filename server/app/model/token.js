'use strict';
const moment = require('moment');
module.exports = app => {
    const {
        STRING,
        DATE,
        BIGINT,
        BOOLEAN
    } = app.Sequelize;
    const Token = app.model.define('sys_user_token', {
        user_id: {
            type: BIGINT(11),
            primaryKey: true
        },
        token: {
            type: STRING(100),
            unique: true
        },
        expire_time: DATE,
        update_time: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(),
            get() {
              return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        valid: BOOLEAN,
    },{
        'tableName': 'sys_user_token',
        'createdAt': false,
        'updatedAt': false
    });
    return Token;
};