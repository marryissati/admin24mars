// this api will go to the database , dataset  document ,then return    all files belongin to a user

import { database } from "../../../../../firebase/firebase";



export default async (req, res) => {





    const {
        query: { emailOfuser },
    } = req




    try {
        let queryUFDataset = database.collection('userFiles');

        let response = [];
        await queryUFDataset.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {
                    id: doc.id,
                    email: doc.data().email,
                    filename: doc.data().filename
                };
                response.push(selectedItem);
            }
        });
        let filteredResponse = response.filter(item => item.email === emailOfuser)
        let allFilenames = [];
        filteredResponse.forEach(item => allFilenames.push(item.filename))

        // till now we have the array containg the filenaes belong to a user, let s search for their info in dataset
        let queryDtDataset = database.collection('datasets');

        let ResponseNew = []
        await queryDtDataset.get().then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                const selectedItem = {

                    title: doc.data().filename,
                    size: doc.data().size,
                    uploadTime: doc.data().uploadTime
                };
                ResponseNew.push(selectedItem);
            }
        });
        let returnArray = ResponseNew.filter(item => allFilenames.includes(item.title))
        return res.status(200).send(returnArray);



    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    ;






}


