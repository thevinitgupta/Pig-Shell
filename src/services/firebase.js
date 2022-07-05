import {initializeApp} from "firebase/app"
import { getAuth ,createUserWithEmailAndPassword, 
     signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey ,
    authDomain: "pigshellpix.firebaseapp.com",
    projectId: process.env.REACT_APP_projectId,
    storageBucket: "pigshellpix.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: "G-QH72FWKWZC"
};


const createAccount = async(email, password) =>{
    try {
        const credentials = await createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        this.user = credentials.user;
        console.log(this.user);
    }
    catch(error){
        console.error(error)
    }
}

const loginUser = async(email, password) => {
    const auth = getAuth();
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        return userCred;
    }
    catch(error) {
        console.log("login error")
        return null;
    };
    
}

const logoutUser = async ()=>{
    // const auth = getAuth();
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




const firebaseMethods = {
    signup : createAccount,
    login : loginUser,
    logout : logoutUser,
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth;


export {auth}

export default firebaseMethods;