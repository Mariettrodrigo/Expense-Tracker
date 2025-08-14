import React, { createContext, useState } from "react";
//import { Children } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); //change this to null later

    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //function to clear user data (eg: on logout)
    const clearUser = () => {
        setUser(null);
    };

    return(
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;