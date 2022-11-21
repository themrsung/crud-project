import { authService } from "../firebase.js";
import {
  createUserWithEmailAndPassword, // 회원가입 메서드
  signInWithEmailAndPassword, // 로그인 메서드
//   GoogleAuthProvider, // 구글 로그인 메서드
//   signInWithPopup, // 로그인 방법별 메서드 (구글,깃 로그인 시 필요 메소드)
//   GithubAuthProvider, // 깃 로그인 메서드
//   signOut, // 로그아웃 메서드
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

document.getElementById('signUpButton').addEventListener('click', (event) => {
  event.preventDefault()
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
  console.log(email, password)
  .catch((error) => {
      console.log('error')
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
  });
})

window.regLoadLandingPage = function() {
    window.location.replace("../pages/landing.html")
  }