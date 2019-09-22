import * as firebase from 'firebase'

firebase.initializeApp({
  projectId: 'dummy'
})

export const firestore = firebase.firestore()
