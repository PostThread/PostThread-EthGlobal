// src/context/state.js
import { createContext, useContext } from 'react';
import { getFieldIndex } from '../helpers/helpers';
import { user_abi } from '../constants/user_abi';
import { useMoralis, useMoralisQuery } from 'react-moralis';

const AppContext = createContext();

export function AppWrapper({ children }) {

    const { account } = useMoralis()
    const queryUsersEvent = useMoralisQuery("UsersEvent")
    const fetchedUsersEvent = JSON.parse(JSON.stringify(queryUsersEvent.data, ["user", "sender", "block_number"]))
    const userEvents = fetchedUsersEvent.filter(user => (user["sender"] === account))
    const haveUser = userEvents.length > 0 ? true : false
    const latestUserEvent = haveUser ? getLatestEvent(userEvents) : "none"
    const logged_user = haveUser ? latestUserEvent["user"] : "none"
    const logged_username = haveUser ? logged_user[getFieldIndex(user_abi, "userEvent", "username")] : "No User"
    const logged_userId = haveUser ? logged_user[getFieldIndex(user_abi, "userEvent", "userId")] : 0

    function getLatestEvent(userEvents) {
        let max = { "user": 0, "sender": "", "block_number": 0 }
        userEvents.forEach(event => {
            if (event["block_number"] > max["block_number"]) max = event
        });

        return max
    }

    let sharedState = { logged_userId, logged_username, logged_user }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}