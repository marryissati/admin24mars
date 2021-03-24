import { getDecryptedSecret } from '../../../utils/encryption/decryptit';
import { enc_DOMAIN, encToken } from '../../../utils/encryption/service-account.enc';

var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
    domain: getDecryptedSecret(enc_DOMAIN),
    token: getDecryptedSecret(encToken),

});




export default async function getAllUsers(req, res) {
    var allClients = await management.getUsers();

    // console.log(allClients)
    res.status(200).send(allClients)
};
