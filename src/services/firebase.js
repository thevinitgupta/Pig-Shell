import {initializeApp} from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey ,
    authDomain: "pigshellpix.firebaseapp.com",
    projectId: process.env.REACT_APP_projectId,
    storageBucket: "pigshellpix.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: "G-QH72FWKWZC"
};

class FirebaseService {
    constructor(){
        this.connection = initializeApp(firebaseConfig);
        this.firebaseAuth = getAuth();
        this.user = {};
    }
    async createAccount(email, password){
        try {
            const credentials = await createUserWithEmailAndPassword(this.firebaseAuth, email, password)
            this.user = credentials.user;
            console.log(this.user);
        }
        catch(error){
            console.error(error)
        }
    }
    async loginUser(email, password){
        try {
            const credentials = await signInWithEmailAndPassword(this.firebaseAuth, email, password)
            this.user = credentials.user;
        }
        catch(error){
            console.error(error)
        }
    }

    getAuth(){
        return getAuth();
    }

    getUser(){
        const auth = getAuth();
        return auth.currentUser;
    }

}




export default FirebaseService;