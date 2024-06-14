import { initializeApp } from "firebase/app";
import {getFirestore,collection,doc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const db =  getFirestore()
export const auth = getAuth()

// Collection refrences (optional)
export const dbDrafts = collection(db,'drafts')
export const dbCustomers = collection(db,'customers')
export const dbOrders = collection(db,'orders')
export const dbTransactions = collection(db,'transactions')
export const storage = getStorage(app)

// Doc ref (super-optional)

export const getDocRef = (collectionName,docId)=>doc(db,collectionName,docId)