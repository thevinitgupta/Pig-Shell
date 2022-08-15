import {initializeApp} from "firebase/app"
import { getAuth ,createUserWithEmailAndPassword, 
     signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey ,
    authDomain: "pigshellpix.firebaseapp.com",
    projectId: process.env.REACT_APP_projectId,
    storageBucket: "pigshellpix.appspot.com",
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: "G-QH72FWKWZC"
};


const createAccount = async(name, email, password) =>{
    const auth = getAuth();
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password)
        // console.log(credentials)
        const updatedUser = await updateProfile(credentials.user, {displayName : name})
        await createDocument(credentials.user.uid);
        return {
            code : 200,
            user : credentials.user
        }
    }
    catch(error){
        console.log(error)
        return {
            code : 500,
            user : null
        };
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

const createDocument = async(uid) => {
    await setDoc(doc(db, 'UserData', `${uid}`), {
        urls : []
    });
}

const uploadImage = async (uid,file) =>{
    // 'file' comes from the Blob or File API
    const storageRef = ref(storage, `images/${file.name}`);

    const data = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    await addImageUrl(uid, downloadUrl);
    return data;
}

const addImageUrl = async (uid,imgUrl) =>{
    if(uid===undefined || !uid) return;
    let urls = await fetchDocuments(uid);
    // console.log(urls);
    urls.push(imgUrl);
    await setDoc(doc(db, 'UserData', `${uid}`), {
        urls : urls
    });
}

const fetchDocuments = async (uid) => {
    console.log(uid)
    const docRef = doc(db, "UserData", `${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        return data.urls;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return [];
      }
}

const getImages = async (uid)=>{
    
}

const getUrl = async (image) =>{
    console.log(image)
    const imgRef = ref(storage, `${image.path_}`);
    const url = await getDownloadURL(imgRef);
    console.log(url);
    return "";    
}



const firebaseMethods = {
    signup : createAccount,
    login : loginUser,
    logout : logoutUser,
    upload : uploadImage,
    getImages : fetchDocuments
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth;
const storage = getStorage(firebaseApp, "gs://pigshellpix.appspot.com");
// const storageRef = ref(storage);


export {auth}

export default firebaseMethods;