
import { database } from "../../../../../firebase/firebase"



export default async function getUser_file_filesbyEmail(req, res) {
    const {
        query: { userFilebyEmail_byfilenames },
    } = req


    // const ref = database.collection("userFiles").get()

    // const doc = await (await ref).docs.;
    // if (!doc.exists) {
    //     console.log('No such document!');
    // } else {
    //     console.log('Document data:', doc.data());
    // }

    try {
        let query = database.collection('userFiles');
        let response = [];
        await query.get().then(querySnapshot => {
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
        let filteredResponse = response.filter(item => item.filename === userFilebyEmail_byfilenames)
        let returnArray = [];
        filteredResponse.forEach(item => returnArray.push(item.email))

        return res.status(200).send(returnArray);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
    ;





    // console.log((await ref.where('data.email', '==', "hamid3@mail.com").get()).forEach(item => console.log(item.id)))

    res.status(200).send("succcesfuly sent to :   =>  " + userFileByEmail)

};
