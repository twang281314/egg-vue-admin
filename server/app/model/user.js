'use strict';
var moment = require('moment');
module.exports = app => {
    const {
        INTEGER,
        STRING,
        DATE,
        UUID,
        UUIDV4
    } = app.Sequelize;

    const UserModel = app.model.define('user', {
        id: {
            type: UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
            // autoIncrement: true,
        },
        username: {
            type: STRING(50),
            allowNull: false,
            unique: true,
        },
        realname: {
            type: STRING(50),
            allowNull: false,
            unique: false,
        },
        password: {
            type: STRING(50),
            allowNull: false,
        },
        email: {
            type: STRING(50),
            allowNull: true,
        },
        mobile: {
            type: STRING(20),
            allowNull: true,
        },
        createTime: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(),
            get() {
                return moment(this.getDataValue('createTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updateTime: {
            type: DATE,
            allowNull: false,
            defaultValue: new Date(),
            get() {
                return moment(this.getDataValue('updateTime')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        status: {
            type: INTEGER,
            allowNull: false,
            default: 0
        },
        desc: {
            type: STRING(250),
            allowNull: true
        },
    }, {
        timestamps: false,
        tableName: 'user',
    });

    UserModel.beforeBulkUpdate(user => {
        user.attributes.updateTime = new Date();
        return user;
    });

    // UserModel.beforeCreate((user) => {
    //   console.log(user)
    //   return user
    // })

    return UserModel;
};