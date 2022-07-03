import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthUserContext from "../../context/sessions"
import FirebaseService, {FirebaseContext} from "../../Components/Firebase";

const Authentication = (Component) => 
    function WithAuthentication(props) {
        const [authUser, setAuthUser] = useState(null);

        const firebase = useContext(FirebaseContext);
        const firebaseService = new FirebaseService();

        const getCurrentUser = useCallback(() => {
            const currUser = firebaseService.getUser();
            console.log(currUser)
            return currUser;
        }, [firebase]);

        useEffect(() =>{
            getCurrentUser();
        },[getCurrentUser]);

        return (
            <AuthUserContext.Provider value={{authUser, getCurrentUser}}>
                <Component {...props} />
            </AuthUserContext.Provider>
        );
    };

export default Authentication;