import { database } from "../../../../../firebase/firebase"
import { getDecryptedSecret } from "../../../../../utils/encryption/decryptit";
import { encToken, enc_DOMAIN } from "../../../../../utils/encryption/service-account.enc"


var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
    domain: getDecryptedSecret(enc_DOMAIN),
    token: getDecryptedSecret(encToken),

});



export default async function deleteuserbymail(req, res) {
    const {
        query: { deleteUserByEmail },
    } = req

    var allClients = await management.getUsers();
    var client = allClients.find(client => client.email === deleteUserByEmail)


    if (!client) return res.status(200).send(0)

    var clientId = client.user_id
    console.log(deleteUserByEmail)



    management.deleteUser({ id: clientId }).
        then(async data => {
            // delete from dataset_user
            database.collection('userFiles').
                get().then(querySnapshot => {
                    let docs = querySnapshot.docs;
                    for (let doc of docs) {

                        if (doc.data().email === deleteUserByEmail)
                            doc.ref.delete()
                    }
                }).catch(e => console.error("error in db : \n", e))
                ;






        })
        .catch(e =>
            res.status(200).send(0)
        )




    // which means that we delete the user, we delete the associated db
    return res.status(200).send(1)






    // console.log((await ref.where('data.email', '==', "hamid3@mail.com").get()).forEach(item => console.log(item.id)))



};
