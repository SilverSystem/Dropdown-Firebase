import { initializeApp } from 'firebase/app';

//import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6PjS0mRcWUdeT0N3Lhqc0eluQ4UszOoM',
  authDomain: 'dropdown-challenge.firebaseapp.com',
  projectId: 'dropdown-challenge',
  storageBucket: 'dropdown-challenge.appspot.com',
  messagingSenderId: '828283894751',
  appId: '1:828283894751:web:b00337617e891864a7226a',
  measurementId: 'G-3R54DJJN4B',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
export { db };
