'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521088945166_6453';

  // add your config here
  config.middleware = ['responseTime'];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: 'http://127.0.0.1:8081',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    // allowHeaders :'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With'
  };
  
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    dialectOptions: {
      charset: 'utf8mb4',
    },
    database: 'egg_db',
    host: '',
    port: '3306',
    username: 'root',
    password: '',
    timezone: '+08:00',
  }
  return config;
};
