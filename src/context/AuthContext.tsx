import React, { Dispatch, ReactNode, createContext, useEffect, useReducer } from "react";
import firebase from 'firebase/app'
import { projectAuth } from "../firebase/config";

interface FetchState {
    user: firebase.User | null,
    authIsReady: boolean
}

type FetchActions = 
    | { type: 'LOGIN', payload: FetchState['user']  }
    | { type: 'LOGOUT'  }
    | { type: 'AUTH_IS_READY', payload: FetchState['user']   }

export const AuthContext = createContext<{state: FetchState | null, dispatch:Dispatch<FetchActions>}>(
    {
        state: null, 
        dispatch: () => null
    }
)


export const authReducer = (state: FetchState, action: FetchActions) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload}
        case 'LOGOUT':
            return {...state, user: null}
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true}
        default:
            return state
    }
}

export const AuthContextProvider = ({children}: {children?: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsub()
        })
    },[])

    console.log('AuthContext state:', state)
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}