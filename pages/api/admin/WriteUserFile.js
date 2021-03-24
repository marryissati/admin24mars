
import { database } from "../../../firebase/firebase"



export default async function writeUserData(req, res) {
    if (req.method === 'POST') {

        console.log(req.body) //this returns an empty object, why??
        database.collection("userFiles").doc("uf2" + new Date().getTime()).set(req.body);
        res.status(200).send("succcesfuly sent to :   =>  " + req.body.email)
    } else {
        // Handle any other HTTP method






        // console.log(allClients)
        res.status(200).send("done")
    }
};
