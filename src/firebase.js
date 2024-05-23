import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBZnFJQJlCQEFdvmFLI0gkSCHHiH1lUAWo",
  authDomain: "node-file-uploader.firebaseapp.com",
  databaseURL: "https://node-file-uploader-default-rtdb.firebaseio.com",
  projectId: "node-file-uploader",
  storageBucket: "node-file-uploader.appspot.com",
  messagingSenderId: "345185058962",
  appId: "1:345185058962:web:8629baa36820a3c410a64b",
  measurementId: "G-GSV81VWQE1"
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export default firebaseApp;
export { database };