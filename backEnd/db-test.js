import { database } from "../firebase/firebase";

database
  .collection("users")
  .set({
    first: "Ada",
    last: "Lovelace",
    born: 1815,
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
