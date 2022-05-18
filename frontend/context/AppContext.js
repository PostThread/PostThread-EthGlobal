// src/context/state.js
import { createContext, useContext } from 'react';
import { getFieldIndex } from '../helpers/helpers';
import { user_abi } from '../constants/user_abi';
import { useMoralis, useMoralisQuery } from 'react-moralis';

const AppContext = createContext();

export function AppWrapper({ children }) {

    const { account } = useMoralis()
    const queryUsers = useMoralisQuery("Users")
    const fetchedUsers = JSON.parse(JSON.stringify(queryUsers.data, ["user", "sender"]))
    const logged_userToShow = fetchedUsers.filter(user => (user["sender"] === account))
    const logged_haveUser = logged_userToShow.length > 0 ? true : false
    const logged_username = logged_haveUser ? logged_userToShow[0]["user"][getFieldIndex(user_abi, "userMinted", "username")] : "No user"
    const logged_userId = logged_haveUser ? logged_userToShow[0]["user"][getFieldIndex(user_abi, "userMinted", "userId")] : "-1"
    let sharedState = { logged_userId, logged_username }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}