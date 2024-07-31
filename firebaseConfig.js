// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD7M9JvVFlY30IDPDIgs2Xwhn6KPmfliY8",
  authDomain: "desliza-d9507.firebaseapp.com",
  projectId: "desliza-d9507",
  storageBucket: "desliza-d9507.appspot.com",
  messagingSenderId: "1054622905028",
  appId: "1:1054622905028:web:04c72e0c9d37bdfd614f91",
  measurementId: "G-WV8WL4L0CP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

