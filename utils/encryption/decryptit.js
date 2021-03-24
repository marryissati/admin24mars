
import { secret } from './service-account.enc';

import crypto from 'crypto';





export const getDecryptedSecret = (key) => {
    const algorithm = 'aes-128-cbc';
    const decipher = crypto.createDecipheriv(
        algorithm,

        secret,
        secret

    );


    let decrypted = decipher.update(key, 'base64', 'utf8');



    decrypted += decipher.final('utf8');



    return (decrypted.toString());
};




