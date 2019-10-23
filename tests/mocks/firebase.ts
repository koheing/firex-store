import * as firebase from 'firebase'

firebase.initializeApp({
  projectId: 'dummy',
  apiKey: 'AIza....', // Auth / General Use
  authDomain: 'YOUR_APP.firebaseapp.com', // Auth with popup/redirect
  databaseURL: 'https://YOUR_APP.firebaseio.com', // Realtime Database
  storageBucket: 'YOUR_APP.appspot.com', // Storage
  messagingSenderId: '123456789' // Cloud Messaging
})

export const firestore = firebase.firestore()
