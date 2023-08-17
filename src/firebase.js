import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage'
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyDqa0iN3toQ38GF3q8MmtfFC6aKhvPnx_o",
  authDomain: "reactjs-5423b.firebaseapp.com",
  projectId: "reactjs-5423b",
  storageBucket: "reactjs-5423b.appspot.com",
  messagingSenderId: "925643269159",
  appId: "1:925643269159:web:1a36204e956fae87b85a02",
  measurementId: "G-V1K3VVVL3V"
};
firebase.initializeApp(firebaseConfig);

export const dataref = firebase.database()
export const storage = firebase.storage()
export default firebase;