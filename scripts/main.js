import { authService, dbService } from "./firebase.js"
import {logIn,logOut,googleLogIn,gitLogIn} from "./pages/login.js";
//import * as loginFunc from "./pages/login.js";
import "./script.js"

import {
    doc,
    addDoc,
    collection
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

// document.addEventListener("DOMContentLoaded", function() {
//     authService.onAuthStateChanged((user) => {
//         handleLocation()
//         const hash = window.location.hash

//         if (user) { // 로그인 ok
//             loadNewsfeed()
//         }
//         else { // 로그인 안되어있으면 + 로그아웃 된 상태
//             loadLandingPage()
//         }
//     })
// })

// addDoc(doc(dbService, "postsTest", "1234"))


// 이렇게 추가하는 겁니다

// addDoc(collection(dbService, "postsTest"), {
//     title: "test",
//     content: "test content"
// })
// alert("added")


// window.onToggle = onToggle;
// window.handleAuth = handleAuth;
// window.goToProfile = goToProfile;
// window.socialLogin = socialLogin;
// window.logout = logout;
// window.onFileChange = onFileChange;
// window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;
 window.logIn = logIn;
//logIn,googleLogIn,gitLogIn