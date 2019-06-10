
## About hapi-azure-msi-vault-plugin

Tested successfully against Azure with Hapi v18.

[![Build Status](https://travis-ci.org/visualjeff/hapi-azure-msi-vault-plugin.png)](https://travis-ci.org/visualjeff/hapi-azure-msi-plugin)

## Install:
```
npm install hapi-azure-msi-vault-plugin --save
```

## Prerequistes:

Setup an Azure Vault:

[https://azure.microsoft.com/en-us/resources/samples/key-vault-node-getting-started/](https://azure.microsoft.com/en-us/resources/samples/key-vault-node-getting-started/)


## Usage:

```js
'use strict';

const Hapi = require('@hapi/hapi');

const server = new Hapi.Server({
    host: '0.0.0.0',
    port: process.env.PORT || 1337
});

const startup = async () => {
    await server.register([ 
        {
            plugin: require('./vaultPlugin'),
            options: {
               kvUri: 'https://<<YOUR VAULT HERE>>.vault.azure.net/'
            }
        }
    ]);
    await server.start();
};

startup().catch((err) => {
    throw err;
});

console.log(`${new Date()}: server running at ${server.info.uri}`);
```

## How to fetch a secret:
```js
server.app.vault('myAppSecret', 'myAppSecretVersion').then(secret => {
    console.log('secret: ', secret)
});
```
