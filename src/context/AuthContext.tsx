import React, { Dispatch, ReactNode, createContext, useReducer } from "react";
import firebase from 'firebase/app'

interface FetchState {
    user: firebase.User | null
}

type FetchActions = 
    | { type: 'LOGIN', payload: FetchState['user']  }
    | { type: 'LOGOUT'  }

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
        default:
            return state
    }
}

export const AuthContextProvider = ({children}: {children?: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    console.log('AuthContext state:', state)
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}