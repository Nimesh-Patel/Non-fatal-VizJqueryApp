'use strict';

const proxy = require('../../proxy/config.js');

let configs = {
    knex_Development: {
            configName: 'knex_Development',
            client: 'mssql',
            port: proxy.selectedProxy.SERVER_PORT,
            connection: {
                host: '10.25.44.41',
                user: 'userID',
                password: 'Vizstudio12',
                database: 'DB_Name',
            }
        }
};

const selectedConfig = configs.knex_Development;

module.exports = { selectedConfig };
