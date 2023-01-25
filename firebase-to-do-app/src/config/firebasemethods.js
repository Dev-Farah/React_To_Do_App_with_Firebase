import app from "./firebaseconfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut
} from "firebase/auth";
import { getDatabase, ref, set, onValue, child, push, update } from "firebase/database";

const auth = getAuth(app);
const database = getDatabase(app);

let signUpUser = (obj) => {
  let { userName, contact, email, password } = obj;

  // === this promise will return on Signup page. ===
  return new Promise((resolve, reject) => {
    // === this "then" will give the status of Authentication. ===
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // user successfully registerd in authentication
        const user = userCredential.user;
        const reference = ref(database, `users/${user.uid}`);
        set(reference, obj)
          // === this "then" will give the status of database function
          .then(() => {
            // this "resolve" is our custom message which will show in signup page "then"
            // resolve("User Created Successfully and sent to database");
            resolve(obj);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let loginUser = (obj) => {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        const reference = ref(database, `users/${user.uid}`);
        onValue(reference, (e) => {
          let status = e.exists();
          // console.log(status);
          if (status) {
            resolve(e.val());
          } else {
            reject("Data Not Found");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        reject(errorMessage);
      });
  });
};


let userSignOut = () => {
  signOut(auth).catch((error) => { alert(error.message)})
}

// let toDos = (obj) => {
  
//   let { toDo, time, uid, username } = obj;
//   function writeNewPost(uid, username, toDo, time) {
//     const db = getDatabase();
  
//     const user = obj;
//     const refrence = ref(database, `users/${user.uid}`);
//     set(refrence, obj)

//   }
// }

export { signUpUser, loginUser, userSignOut
  // , toDos
 };