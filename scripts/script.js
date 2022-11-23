import { onViewPostLoad } from "./pages/viewpost.js"
import { onNewsfeedLoad } from "./pages/newsfeed.js"
import { app, authService, dbService } from "./firebase.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import { getDoc, collection, doc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"

import { onMyProfileLoad } from "./pages/myprofile.js"
import { onProfileLoad } from "./profileLoader.js"

window.loadNewsfeed = async function() {
    await $("#content").load("../pages/templates/newsfeed.html")
    onNewsfeedLoad()
}

export async function loadNewsfeed() {
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
    $("#content").load("../pages/templates/login.html")
}

window.loadLostAccount = function() {
    $("#content").load("../pages/templates/lostaccount.html")
}

window.loadMyProfile = async function() {
    // $("#content").load("../pages/templates/myprofile.html")

    const myProfileHTML = await fetch("../pages/templates/myprofile.html").then(function(data) {
        return data.text()
    })
    
    document.getElementById("content").innerHTML = myProfileHTML 

    onMyProfileLoad()
}

export async function loadMyProfile() {
    const myProfileHTML = await fetch("../pages/templates/myprofile.html").then(function(data) {
        return data.text()
    })
    
    document.getElementById("content").innerHTML = myProfileHTML 

    onMyProfileLoad()
}

window.loadRegister = async function() {
    await $("#content").load("../pages/templates/register.html")
}

export function loadRegister() {
    $("#content").load("../pages/templates/register.html")
}

// 유저 프로필 불러오기
// UID로 유저 찾기 안됨
window.loadUserProfile = async function(userId) {
    // await $("#content").load("../pages/templates/userprofile.html")

    const userProfileHTML = await fetch("../pages/templates/userprofile.html").then(function(data) {
        return data.text()
    })
    
    document.getElementById("content").innerHTML = userProfileHTML 

    const user = await authService.getUser(userId)
    if (user) {
        await onProfileLoad(user)
    }
}

window.loadViewPost = function(postId) {
    $("#content").load("../pages/templates/viewpost.html")
    onViewPostLoad(postId)
}

window.loadWritePost = function() {
    $("#content").load("../pages/templates/writepost.html")
}

window.hideDevButtons = function() {
    document.getElementById("devbuttons").style.display = "none"
}

window.loadLandingPage = function() {
   window.location.replace("../pages/landing.html")
}


window.registerFromLandingPage = function() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToRegister=true")
}

window.loginFromLandingPage = function() {

    let cookie = document.cookie.match("auto=true");

    
    if(cookie) 
    {
        window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=false");
    } 
    else
    {
        window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=true");
    }
    
   
}

window.lostAccountFromLandingPage = function() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToLostAccount=true")
}


// 개발자용
window.skipLogin = function() {
    window.location.replace("../index.html?assumeLoggedIn=true")
}
