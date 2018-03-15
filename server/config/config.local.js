'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  dialectOptions: {
    charset: 'utf8mb4'
  },
  database: 'egg_db',
  host: 'anytao.net',
  port: '3306',
  username: 'root',
  password: '',
  timezone : "+08:00"
};