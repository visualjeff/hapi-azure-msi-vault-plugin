const KeyVault = require('azure-keyvault');
const MSRestAzure = require('ms-rest-azure');

exports.plugin = {
    pkg: require('../package.json'),
    register: async (server, options) => {
        try {
            const creds = await MSRestAzure.loginWithAppServiceMSI({
                resource: 'https://vault.azure.net'
            });
        
            const keyVaultClient = new KeyVault.KeyVaultClient(creds);

            server.app.vault = async (secretName, version=undefined) => {    
                const secretUri = KeyVault.createSecretIdentifier(options.kvUri, secretName, version);
                const myVersion = secretUri.version ? secretUri.version : '';
                const secretBundle = await keyVaultClient.getSecret(secretUri.vault,secretUri.name, myVersion, {});      
                return secretBundle.value;
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};
