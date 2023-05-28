import React, { Dispatch, ReactNode, createContext, useReducer } from "react";

const initialState = {
    user: null
}

type ACTIONTYPE = 
    | { type: '' }

export const AuthContext = createContext<
    {
        state: typeof initialState, 
        dispatch: Dispatch<ACTIONTYPE>
    }
>(
    {
        state: initialState, 
        dispatch: () => null
    }
)


export const authReducer = (state: typeof initialState, action: ACTIONTYPE) => {
    switch (action.type) {
        
        default:
            return state
    }
}

export const AuthContextProvider = ({children}: {children?: ReactNode}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}