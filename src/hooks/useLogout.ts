import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export  function useLogout() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch, state} = useAuthContext()
    
    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the user out
        try {
            // update online status
            const uid = state?.user?.uid
            await projectFirestore.collection('users').doc(uid).update({online: false})

            await projectAuth.signOut()

            // dispatch logout action
            dispatch({type:'LOGOUT'})

            setIsPending(false)
            setError(null)
        } catch (err) {
            let message = 'Unknown Error'
            if(err instanceof Error) message = err.message
            console.log(message)
            setError(message)
            setIsPending(false)
        }
    }
    return {error, isPending, logout}
}
