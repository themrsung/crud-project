import { authService } from "../firebase.js";
import { loadNewsfeed } from "../script.js"

window.registerComplete = function() {
    loadNewsfeed()
    onRegisterButtonClicked()
}

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js ";
    document.getElementById('signUpButton').addEventListener('click', (event) => {
    event.preventDefault()
    console.log(1)
    const email = document.getElementById('signUpEmail').value
    const password = document.getElementById('signUpPassword').value
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        console.log('error')
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}


// window.regLoadLandingPage = function() {
//   window.location.replace("../pages/landing.html")
// }