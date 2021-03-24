
import { database } from "../../../../../firebase/firebase"


export default async function Csvtojson(req, res) {
    const {
        query: { csvurl },
    } = req






    // delete dataset
    let query = database.collection('datasets');
    await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {

            if (doc.data().filename === deleteByFileName)
                doc.ref.delete()
        }
    });

    // delete from dataset_user
    query = database.collection('userFiles');
    await query.get().then(querySnapshot => {
        let docs = querySnapshot.docs;
        for (let doc of docs) {

            if (doc.data().filename === deleteByFileName)
                doc.ref.delete()
        }
    });


    return res.status(200).send("deleted!");






    // console.log((await ref.where('data.email', '==', "hamid3@mail.com").get()).forEach(item => console.log(item.id)))



};
