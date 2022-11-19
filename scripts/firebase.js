// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYcKPQMIlczBgdij3vkjfx-E5LE8s_Il8",
    authDomain: "infinity-81338.firebaseapp.com",
    projectId: "infinity-81338",
    storageBucket: "infinity-81338.appspot.com",
    messagingSenderId: "1018635074378",
    appId: "1:1018635074378:web:900e1364cf941a8cb75fb3",
    measurementId: "G-X9XBCDXL5R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);


// 게시글 데이터 관리
// collection(dbService, "posts")

// doc {
//     postId: "글ID (고유번호)",
//     title: "제목",
//     content: "내용",
//     createdAt: "생성시간",
//     createdBy: "유저ID",
// }

// 유저 데이터 관리
// collections(dbService, "users")

// doc {
//     userId: "유저ID (고유번호)",
//     email: "이메일",
//     name: "이름",
//     password: "비밀번호",
//     motd: "상태메시지"
// }


export function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1)
    var sval = ""

    params = params.split("&")
    for (var i = 0; i < params.length; i++) {
        var temp = params[i].split("=")
        if ([temp[0]] == sname) { sval = temp[1] }
    }

    return sval
}