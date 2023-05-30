import { useEffect, useState } from "react"
import { projectAuth, projectFirestore } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export  function useLogin() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    
    const login = async (email: string, password: string) => {
        setError(null)
        setIsPending(true)

        // sign the user in
        try {
            
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            
            // update online status
            const uid = res?.user?.uid
            await projectFirestore.collection('users').doc(uid).update({online: true})

            // dispatch login action
            dispatch({type:'LOGIN', payload: res.user})

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

    return {error, isPending, login}
}
