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
        return credentials.user;
    }
    catch(error){
        console.error(error)
    }
}

const loginUser = async(email, password) => {
    const auth = getAuth();
    try{
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        return {
            code : 200,
            user : userCred.user
        }
    }
    catch(error) {
        return {
            code : 500,
            user : null
        };
    };
    
}

const logoutUser = async ()=>{
    const auth = getAuth();
    try{
        const resp = await signOut(auth);
        console.log("Signed Out Successfully")
        return 200;
    }
    catch(error) {
        console.log("Error Logging Out");
        console.log(error)
        return 500;
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