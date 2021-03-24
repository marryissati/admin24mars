// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebaseApp from "firebase";
import "firebase/storage";



let firebase;
if (!firebaseApp.apps.length) {
  firebase = firebaseApp.initializeApp({
    apiKey: "AIzaSyAqJqn-q2__dxwWQTzsu2_e7UXIqKpPEtU",
    authDomain: "project1-73848.firebaseapp.com",
    projectId: "project1-73848",
    storageBucket: "project1-73848.appspot.com",
    messagingSenderId: "540239767288",
    appId: "1:540239767288:web:a4425120ad557546c4bd0d",
    measurementId: "G-GXGMFXZEZ6",
  });
} else {
  firebase = firebaseApp.app(); // if already initialized, use that one
}

export const database = firebase.firestore();
const storage = firebase.storage();

export const storageRef = storage.ref("files");

export const auth = firebase.auth()




