import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


//  window.resetBtn = function() {
//     loadNewsfeed()
//     resetBtn()
//  }

window.resetBtn = ()=>{

    let email = document.querySelector("#resetEmail")

    const auth = getAuth();
    sendPasswordResetEmail(auth, email.value)
    .then(() => {
        alert('메일로 Password 메세지를 보냈습니다.\n(이메일이 안 왔다면 spam함을 확인해보세요!)')
        $("#content").load("../pages/templates/login.html")
        // Password reset email sent!
        // ..
    })
    .catch((error) => {
        alert('가입되지 않은 이메일입니다.')
        $("#content").load("../pages/templates/lostaccount.html")
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    })

    

}

// window.resetBtn = function() {
    
// }