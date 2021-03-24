
// var admin = require("firebase-admin");

// var serviceAccount = require("./key.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "gs://project1-73848.appspot.com"
// });


// const getFileNames = (folderName) => {
//     admin.storage().bucket().getFiles({ autoPaginate: false }).then(([files]) => {
//         const fileNames = files.map((file) => file.name);
//         return fileNames;
//     })
// }

// Since you mentioned your images are in a folder,
// we'll create a Reference to that folder:
// import { storageRef1 } from "../../../firebase/firebase"
// var storageRef = storageRef1

var filesArray = []


// // Now we get the references of these images
// storageRef.listAll().then(function (result) {
//     result.items.forEach(function (fileRef) {

//         console.log(fileRef.name)
//         // And finally display them
//     });
// }).catch(function (error) {
//     // Handle any errors
// });

// Imports the Google Cloud client library
// const { Storage } = require('@google-cloud/storage');

// // Creates a client
// // const storage = new Storage();
// // Creates a client from a Google service account key.
// const storage = new Storage({ keyFilename: "key.json" });

// /**
//  * TODO(developer): Uncomment these variables before running the sample.
//  */
// const bucketName = 'hamid';

// async function createBucket() {
//     // Creates the new bucket
//     await storage.createBucket(bucketName);
//     console.log(`Bucket ${bucketName} created.`);
// }

// createBucket().catch(console.error);



// export default async function filesApi(req, res) {


//     res.status(200).send(filesArray)

// }