import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDuXVlufTz6oTg7wdUHycuhRiubC3hfHTw",
    authDomain: "pdf-parser-4fb89.firebaseapp.com",
    projectId: "pdf-parser-4fb89",
    storageBucket: "pdf-parser-4fb89.appspot.com",
    messagingSenderId: "588425539518",
    appId: "1:588425539518:web:2b8a060834bc7fc4bc53ef",
    measurementId: "G-BTKFC18R3Y",
    databaseURL: "https://pdf-parser-4fb89-default-rtdb.firebaseio.com/"
  };

  // function listAll(folder) {
  //   const storageRef = firebase.storage().ref();
  //   // [START storage_list_all]
  //   // Create a reference under which you want to list
  //   var listRef = storageRef.child(folder);
  //   // Find all the prefixes and items.
  //   listRef.listAll()
  //     .then((res) => {
  //       res.prefixes.forEach((folderRef) => {
  //         // All the prefixes under listRef.
  //         // You may call listAll() recursively on them.
  //       });
  //       res.items.forEach((itemRef) => {
  //         // All the items under listRef.
  //         // console.log(itemRef);
  //       });
  //     }).catch((error) => {
  //       // Uh-oh, an error occurred!
  //     });
  //   // [END storage_list_all]
  // }

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  const storage = firebase.storage();

  export  {
    storage, database, firebase as default
  };