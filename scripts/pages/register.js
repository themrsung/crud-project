import { authService, dbService } from "../firebase.js";
import { loadNewsfeed, loadRegister } from "../script.js"


window.registerComplete = function() {
    loadNewsfeed()
    onRegisterButtonClicked()
}

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js ";
//     document.getElementById('signUpButton').addEventListener('click', (event) => {
//     event.preventDefault()
//     console.log(1)
//     const email = document.getElementById('signUpEmail').value
//     const password = document.getElementById('signUpPassword').value
//     const auth = getAuth();
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         console.log(userCredential)
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         console.log('error')
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });
// }

function onRegisterButtonClicked() {
    // Add a new document in collection "cities"
    // const db = firebase.firestore();
    // var regContent = {
    //     name : $('#signUpName').val()
    // }
    // db.collection('test').add(regContent)

    // addDoc(collection(dbService, "test"), {
    //      name : $('#signUpName'),
        
    //  })


    // await setDoc(doc(db, "test"), {
    //     name: $('#signUpName'),

    //   });
    
    const email = document.getElementById('signUpEmail').value
    const password = document.getElementById('signUpPassword').value

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log(userCredential)
        // Signed in 
        alert('가입완료!');
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        alert('이메일과 비밀번호를 정확히 입력하세요!');
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        loadRegister()
    });

    
}


// window.regLoadLandingPage = function() {
//   window.location.replace("../pages/landing.html")
// }