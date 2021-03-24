import { configSftp, cwd } from './utils/config';

const Client = require('ssh2-sftp-client');
const sftp = new Client();

let content = [];

export default async (req, res) => {
    sftp.connect(configSftp)
        .then(async () => {

            // get actuall dir , then list its files 
            // cwd = await sftp.cwd()

            content = await sftp.list(`${cwd}/akhi`);


            sftp.end()
                .then(e => {
                    // final  promise resolution

                    res.status(200).send({ cwd: cwd, content: content })
                })


        })

        .catch(e => console.error({ e }))



}