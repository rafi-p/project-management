import { useEffect, useState } from "react";
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export  function useSignup() {
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email: string, password: string, displayName: string, thumbnail: File) => {
        setError(null)
        setIsPending(true)

        try {
            // signup user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res) {
                throw new Error('Could not complete signup')
            }

            // upload user thumbnail
            const uploadPath = `thumbnals/${res.user?.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

            // add display name to user
            await res.user?.updateProfile({
                displayName,
                photoURL: imgUrl
            })

            // dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})

            // create a user document
            await projectFirestore.collection('users').doc(res.user?.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl
            })


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

    return {error, isPending, signup}
}
