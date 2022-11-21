import { authService } from "../firebase.js";
import {
  createUserWithEmailAndPassword, // 회원가입 메서드
  signInWithEmailAndPassword, // 로그인 메서드
//   GoogleAuthProvider, // 구글 로그인 메서드
//   signInWithPopup, // 로그인 방법별 메서드 (구글,깃 로그인 시 필요 메소드)
//   GithubAuthProvider, // 깃 로그인 메서드
//   signOut, // 로그아웃 메서드
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

window.regLoadLandingPage = function() {
  window.location.replace("../pages/landing.html")
}