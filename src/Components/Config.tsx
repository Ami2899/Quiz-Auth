import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyClhFG7Wdi2eYqCj-_jSTBjmhz7AD_Z0FM",
  authDomain: "my-first-project-a292b.firebaseapp.com",
  projectId: "my-first-project-a292b",
  storageBucket: "my-first-project-a292b.appspot.com",
  messagingSenderId: "461657570234",
  appId: "1:461657570234:web:807a5cb2e581c667f3bb83",
  measurementId: "G-C6T5N4QGE5"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
