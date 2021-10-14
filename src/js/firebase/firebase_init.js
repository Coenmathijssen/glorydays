import firebaseAuth from './firebase_auth'
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore/lite'

const firebaseApp = initializeApp(firebaseAuth)
const db = getFirestore(firebaseApp)

console.log(firebaseApp, db)

export default db