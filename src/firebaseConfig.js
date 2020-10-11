import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCbzG-iX-k7g1_DhXYMu6lxPiwvC2VxMoU',
  authDomain: 'sutvueproject.firebaseapp.com',
  databaseURL: 'https://sutvueproject.firebaseio.com',
  projectId: 'sutvueproject',
  storageBucket: 'sutvueproject.appspot.com',
  messagingSenderId: '4878877516',
  appId: '1:4878877516:web:f152372be6b5376e8d85e9',
  measurementId: 'G-56731PWQ0X'
}
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)
firebase.analytics();
