import db from '@/js/firebase/firebase_init.js'
import { doc, getDoc } from 'firebase/firestore/lite'
import store from '@/store/index'

async function getAuthToken (db) {
  const docRef = doc(db, 'users', 'spotify', 'spotifyAuth', 'authTokens')
  const docSnap = await getDoc(docRef)
  console.log(docSnap.data())
  return docSnap.data().accessToken
}

export default getAuthToken(db).then(token => {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  store.commit('setAccessToken', token)
  store.commit('setHeaders', headers)

  return headers
})