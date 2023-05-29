// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, Auth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAM7k4azxYLM1tYi9YdG03wwlh58MiZ1wc",
//     authDomain: "authentication-6ce81.firebaseapp.com",
//     projectId: "authentication-6ce81",
//     storageBucket: "authentication-6ce81.appspot.com",
//     messagingSenderId: "857593115534",
//     appId: "1:857593115534:web:1d5c70b0a35d92c9f12adf",
//     measurementId: "G-QQ891DZTYM"
// };
const firebaseConfig= {
    apiKey:process.env.REACT_APP_API_KEY ,
    authDomain:process.env.REACT_APP_AUTHDOMAIN ,
    projectId:process.env.REACT_APP_PROJECTID ,
    storageBucket:process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID ,
    appId:process.env.REACT_APP_ID ,
    measurementId:process.env.REACT_APP_MEASUREMENTID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth: Auth = getAuth(app);