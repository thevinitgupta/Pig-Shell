import {initializeApp} from "firebase/app"
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword, 
    setPersistence, signInWithEmailAndPassword, signOut , browserSessionPersistence} from "firebase/auth";

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
    user = null;
    constructor(){
        this.connection = initializeApp(firebaseConfig);
        this.firebaseAuth = getAuth();
        this.user = this.firebaseAuth.currentUser;
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
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
        try{
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            this.user = userCred.user;
            console.log(this.user)
        }
        catch(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("login error")
        };
        
    }

    async logoutUser(){
        const auth = getAuth();
        try{
            signOut().then(()=>{
                this.user = null;
                console.log("Signed Out Successfully")
            })
        }
        catch(error) {
            console.log("Error Logging Out");
            console.log(error)
        }
    }


    getUser(){
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            return user
          });
    }

}




export default FirebaseService;