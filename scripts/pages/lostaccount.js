import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


 window.resetBtn = function() {
    loadNewsfeed()
    resetBtn()
 }

function resetBtn(){

    let email = document.querySelector("#resetEmail")

    const auth = getAuth();
    sendPasswordResetEmail(auth, email.value)
    .then(() => {
        console.log("Reset Password!")
        alert('이메일로 비밀번경 메세지를 보냈습니다.')
        // Password reset email sent!
        // ..
    })
    .catch((error) => {
        alert('실패했습니다')
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    })


}