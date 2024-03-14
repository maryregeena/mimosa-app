import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getDatabase, ref, get, set, update, child, serverTimestamp, onValue } from "firebase/database"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3TXhgvGFyZhK_vC02hd3SyC_okFVLYF4",
    authDomain: "mimosa-auth-app.firebaseapp.com",
    databaseURL: "https://mimosa-auth-app-default-rtdb.firebaseio.com",
    projectId: "mimosa-auth-app",
    storageBucket: "mimosa-auth-app.appspot.com",
    messagingSenderId: "326060697847",
    appId: "1:326060697847:web:e08558660e3be358248bf2",
    measurementId: "G-CVSCJTKVFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
const db = getDatabase(app);

export const signInWithGoogle = () => {
    console.log(serverTimestamp());
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
         let user = result.user;
         const id = user.email.split("@")[0].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
        sessionStorage.setItem("name", result.user.displayName);
        sessionStorage.setItem("email", id);
        sessionStorage.setItem("profilePic", result.user.photoURL);
        writeUserData(user,id);
        window.location = "index.html";
    }).catch((error) => {
        console.log(error);
    })
       


}

export const logOut = () => {
    const db = getDatabase();
    auth.signOut().then( () =>{
        const id = sessionStorage.getItem("email");
        update(ref(db, "users/" + id), {
            logoutTime: serverTimestamp()
        });
        sessionStorage.clear();
        window.location = "index.html";
    }).catch(function (error) {
        // An error happened.
    });
}

const writeUserData=(user,id) =>{
    const db = getDatabase();
    const userRef=ref(db, 'users/'+id);
    // onValue(userRef, (snapshot) => {
     get(child(ref(db), 'users/' + id)).then((snapshot) => {
         console.log(snapshot);
             if (snapshot.exists()) {
                 // Code for handling the push
                 update(ref(db,"users/" + id), {
                     dateUpdated: serverTimestamp(),
                     loginTime: serverTimestamp(),
                     logoutTime: ""
                 });
             } else {
                set(ref(db, 'users/' + id), {
                    id: user.uid,
                    fullName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    providerId: "google.com",
                    dateAdded: serverTimestamp(),
                    dateUpdated: "",
                    loginTime: serverTimestamp(),
                    logoutTime: ""
                });             
            }
         }).catch((error) => {
             console.error(error);
           });
    
}