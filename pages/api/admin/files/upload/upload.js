
import { database } from "../../../../../firebase/firebase"



export default async function writeDataset(req, res) {
    if (req.method === 'POST') {
        console.log(req.body) //this returns an empty object, why??
        database.collection("datasets").doc("dt" + new Date().getTime()).set(req.body);
        res.status(200).send("succcesfuly  added :   =>  " + req.body.uploader)
    } else {
        // Handle any other HTTP method






        // console.log(allClients)
        res.status(200).send("done")
    }
};
