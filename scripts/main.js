import { authService, dbService, getParam } from "./firebase.js"
// import {logIn,logOut,googleLogIn,gitLogIn} from "./pages/login.js";
//import * as loginFunc from "./pages/login.js";
import "./script.js"

$(document).ready(function() {
    
    if (getParam("goToRegister") == "true") {
        loadRegister()
    }
    else if (getParam("goToLogin") == "true") {
        loadLogin()
    }
    else if (getParam("goToLostAccount") == "true") {
        loadLostAccount()
    }
    else {
        loadNewsfeed()
    }
})

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
// window.logIn = logIn;
//logIn,googleLogIn,gitLogIn