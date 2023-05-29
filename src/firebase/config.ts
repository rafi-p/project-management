import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDKtg1kap20KlC_CugSQGplo55RsGEuBvA",
    authDomain: "thepmsite-a7c50.firebaseapp.com",
    projectId: "thepmsite-a7c50",
    storageBucket: "thepmsite-a7c50.appspot.com",
    messagingSenderId: "572863831667",
    appId: "1:572863831667:web:65db617097063368e65406"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export {
    projectFirestore,
    projectAuth,
    projectStorage,
    timestamp
}
