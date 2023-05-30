import { useEffect, useRef, useState } from 'react'
import { projectFirestore } from '../firebase/config'
import firebase from 'firebase/app'

// for types in dynamic ref
function collectionRef(collection: string): firebase.firestore.Query<firebase.firestore.DocumentData> {
    return projectFirestore.collection(collection)
}

export const useCollection = (
        collection: string, 
        _query?: {
            fieldPath: string, 
            opStr: "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "not-in" | "array-contains-any", 
            value: string
        }, 
        _orderBy?: {
            fieldPath: string, 
            direction: "asc" | "desc"}
    ) => {
    const [documents, setDocuments] = useState<firebase.firestore.DocumentData[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    // if not use ref --> inifinite loop in useEffect
    // _query is an array and is different on every function call
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = collectionRef(collection)

        if(query) {
            ref = ref.where(query.fieldPath, query.opStr, query.value)
        }
        if(orderBy) {
            ref = ref.orderBy(orderBy.fieldPath, orderBy.direction)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results: firebase.firestore.DocumentData[] = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
            })
            
            // update states`
            setDocuments(results)
            setError(null)
        }, err => {
            console.log(err)
            setError('could not fetch the data')
        })

        // unsubscribe on unmount
        return () => unsubscribe()
    }, [collection, query, orderBy])

    return { documents, error }
}