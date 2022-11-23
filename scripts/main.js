import { authService, dbService, getParam } from "./firebase.js"
// import {logIn,logOut,googleLogIn,gitLogIn} from "./pages/login.js";
//import * as loginFunc from "./pages/login.js";
import "./script.js"
import { onViewPostLoad } from "./pages/viewpost.js"

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
    else
    {
        // 링크 받은 유저의 로그인 유무 확인
        authService.onAuthStateChanged((user) => {
            if (!user) { // 로그인 안되어있으면 + 로그아웃 된 상태
                loadLandingPage()
            }
        })
        const where = window.location.hash;

        if(where.match("loadNewsfeed.")){
            const postNum = where.split(".");
            loadViewPost(postNum[1])
        }
        else if(where.match("loadLogin")){
            
            loadLogin()
        }
        else if(where.match("loadUserProfile.")){
            const postNum = where.split(".");
            loadUserProfile(postNum[1]);
        }
        else
        {
            loadNewsfeed()
        }
        
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