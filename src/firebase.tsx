import { initializeApp } from "firebase/app";
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig= {
    apiKey:process.env.REACT_APP_API_KEY ,
    authDomain:process.env.REACT_APP_AUTHDOMAIN ,
    projectId:process.env.REACT_APP_PROJECTID ,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID ,
    appId:process.env.REACT_APP_ID ,
    measurementId:process.env.REACT_APP_MEASUREMENTID 
};

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);