
import { configSftp, cwd, localPathDownloads } from '../utils/config';


import fs from "fs"
let Client = require('ssh2-sftp-client');
let sftp = new Client();


export default async (req, res) => {





    const {
        query: { filename },
    } = req









    sftp.connect(configSftp)
        .then(() => {



            const remote = `/home/ginf2022/melissati/akhi/${filename}`

            let dst = fs.createWriteStream(`${localPathDownloads}/${filename}`);



            sftp.get(remote, dst)
                .then(() => {

                    console.log("downloaded!")

                    sftp.end()
                        .then(() => {

                            // finish processing 
                            const fileToBeSent = fs.readFileSync(`${localPathDownloads}/${filename}`)
                            res.status(200).send(fileToBeSent);
                            // empty the directory
                            const fsExtra = require('fs-extra')
                            fsExtra.emptyDirSync(`${localPathDownloads}`)

                        }
                        ).catch(e => console.error({ erorEnd: e }))


                }
                ).catch(e => console.error({ erorPut: e }))





        })
        .catch(e => console.error({ e }))


}


