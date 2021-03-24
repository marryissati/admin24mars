
import { configSftp, cwd } from './utils/config';

let Client = require('ssh2-sftp-client');
let sftp = new Client();


export default async (req, res) => {


    if (req.method === 'POST') {


        let filename = req.body.filename



        // Process a POST request


        sftp.connect(configSftp)
            .then(() => {



                const remote = `/home/ginf2022/melissati/akhi/${filename}`



                sftp.delete(remote)
                    .then(() => {

                        console.log("deleted!")

                        sftp.end()
                            .then(() => {

                                // finish processing 

                                res.status(200).send("deleted");


                            }
                            ).catch(e => console.error({ erorEnd: e }))


                    }
                    ).catch(e => console.error({ erorPut: e }))





            })
            .catch(e => console.error({ e }))

    } else {
        // Handle any other HTTP method
        res.status(404).send("bad request")
    }
}


