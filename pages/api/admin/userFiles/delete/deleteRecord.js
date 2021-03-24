
import { database } from "../../../../../firebase/firebase"



export default async function deletefilenameemailFromDataset(req, res) {
    if (req.method === 'POST') {

        console.log(req.body.email)
        console.log(req.body.filename)

        // delete from dataset_user
        let query;
        query = database.collection('userFiles');
        await query.get().
            then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {

                    if (doc.data().email === req.body.email && doc.data().filename === req.body.filename)
                        doc.ref.delete()
                }
                res.status(200).send("succcesfuly sent to :   =>  " + req.body.email)

            })
    }
    else {
        req.status(200).send("nothing done")
    }

}


