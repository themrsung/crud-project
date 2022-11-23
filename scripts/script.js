import { onViewPostLoad } from "./pages/viewpost.js"
import { onNewsfeedLoad } from "./pages/newsfeed.js"
import { app, authService, dbService } from "./firebase.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import { getDoc, collection, doc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

import { onMyProfileLoad } from "./pages/myprofile.js"
import { onProfileLoad, onProfileLoadUID } from "./profileLoader.js"




window.loadNewsfeed = async function() {
    
    window.location.hash = "loadNewsfeed"
    whereYouGet();
    await $("#content").load("../pages/templates/newsfeed.html")
    onNewsfeedLoad()
    
}

export async function loadNewsfeed() {
    window.location.hash = "loadNewsfeed"
    await $("#content").load("../pages/templates/newsfeed.html")
    onNewsfeedLoad()
    
}

window.loadNewsfeedFromTitleClick = async function() {
    await $("#content").load("../pages/templates/newsfeed.html")
    await onNewsfeedLoad()
    
    const user = authService.currentUser
    if (!user) {
        loadLandingPage()
    }
}

window.loadEditPost = async function(postId) {
    // await $("#content").load("../pages/templates/editpost.html")
    const editPostHTML = await fetch("../pages/templates/editpost.html").then(function(data) {
        return data.text()
    })
    
    document.getElementById("content").innerHTML = editPostHTML       


    const editButton = `<button id="edit-post-button" class="edit-post-button" onclick="onEditPostCompleted('${postId}')">수정 완료</button>`
    $("#edit-post-box").append(editButton)
    // console.log($("#edit-post-box"))

    // var check = false
    // for (let i = 0; i < 100000000; i++) {
    //     if (check) {
    //         check = false
    //     }
    //     else {
    //         check = true
    //     }
    // }

    const post = await getDoc(doc(dbService, "posts", postId))
    console.log(post)
    document.getElementById("edit-post-title").value = post.data()["title"]
    document.getElementById("edit-post-content").value = post.data()["content"]

}

window.loadLogin = function() {
    window.location.hash = "loadLogin"
    $("#content").load("../pages/templates/login.html")
}

window.loadLostAccount = function() {
    window.location.hash = "loadLostAccount"
    $("#content").load("../pages/templates/lostaccount.html")
}

window.loadMyProfile = async function() {
    window.location.hash = "loadMyProfile"
    // $("#content").load("../pages/templates/myprofile.html")

    const myProfileHTML = await fetch("../pages/templates/myprofile.html").then(function(data) {
        return data.text()
    })
    
    document.getElementById("content").innerHTML = myProfileHTML 

    onMyProfileLoad()
}

window.loadRegister = async function() {
    window.location.hash = "loadRegister"
    await $("#content").load("../pages/templates/register.html")
}

export function loadRegister() {
    window.location.hash = "loadRegister"
    $("#content").load("../pages/templates/register.html")
}

// 유저 프로필 불러오기
// UID로 유저 찾기 안됨
window.loadUserProfile = async function(userId) {
    window.location.hash = "loadUserProfile"
    // await $("#content").load("../pages/templates/userprofile.html")

    const userProfileHTML = await fetch("../pages/templates/userprofile.html").then(function(data) {
        return data.text()
    })
    
    document.getElementById("content").innerHTML = userProfileHTML 


    await onProfileLoadUID(userId)

}

window.loadViewPost = function(postId) {
    $("#content").load("../pages/templates/viewpost.html")
    onViewPostLoad(postId)
}

window.loadWritePost = function() {
    window.location.hash = "loadWritePost"
    $("#content").load("../pages/templates/writepost.html")
}

window.hideDevButtons = function() {
    document.getElementById("devbuttons").style.display = "none"
}

window.loadLandingPage = function() {
   window.location.replace("../pages/landing.html")
}


window.registerFromLandingPage = function() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToRegister=true&where=register")
}

window.loginFromLandingPage = function() {

    let cookie = document.cookie.match("auto=true");

    if(cookie) 
    {
        //window.history.pushState({ 'page_id': 1, 'user_id': 5 }, "title", "/index.html");
        window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=false#Newsfeed");
        
    } 
    else
    {
        //window.history.pushState({ 'page_id': 1, 'user_id': 5 }, "title", "/index.html");
        window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=true#loadLogin");
        
    }
    
   
}

window.lostAccountFromLandingPage = function() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToLostAccount=true#lostAccount")
}


// 개발자용
window.skipLogin = function() {
    window.location.replace("../index.html?assumeLoggedIn=true")
}

window.onpopstate = function(event) {
	console.log(`${JSON.stringify(event.state)} | ${location.origin} | ${location.pathname}`);
}

function whereYouGet() {
	var state = {page_id : window.location.hash, data : 'test'};
    var url = location.origin + window.location.hash;
    history.pushState(state, null, url);
}