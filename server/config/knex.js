'use strict';

const proxy = require('../../proxy/config.js');

let configs = {
    knex_Development: {
            configName: 'knex_Development',
            client: 'mssql',
            port: proxy.selectedProxy.SERVER_PORT,
            connection: {
                host: '10.25.44.41',
                user: 'CDC_RW',
                password: 'Vizstudio12',
                database: 'CDC',
            }
        }
};

const selectedConfig = configs.knex_Development;

module.exports = { selectedConfig };