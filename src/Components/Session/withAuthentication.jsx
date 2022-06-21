import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthUserContext from "../../context/sessions"
import {FirebaseContext} from "../../Components/Firebase";

const Authentication = (Component) => 
    function WithAuthentication(props) {
        const [authUser, setAuthUser] = useState(null);

        const firebase = useContext(FirebaseContext);

        const getCurrentUser = useCallback(() => {
            firebase.getUser().then((user) => {
                setAuthUser(user);
            }).catch((error) =>{
                // console.error("Auth User : ",error)
                setAuthUser(null);
            });
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