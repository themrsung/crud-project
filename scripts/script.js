import { onViewPostLoad } from "./pages/viewpost.js"
import { onNewsfeedLoad } from "./pages/newsfeed.js"
import { authService } from "./firebase.js"

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

}

window.loadLogin = function() {
    $("#content").load("../pages/templates/login.html")
}

window.loadLostAccount = function() {
    $("#content").load("../pages/templates/lostaccount.html")
}

window.loadMyProfile = function() {
    $("#content").load("../pages/templates/myprofile.html")
}

window.loadRegister = async function() {
    await $("#content").load("../pages/templates/register.html")
}

export function loadRegister() {
    $("#content").load("../pages/templates/register.html")
}

window.loadUserProfile = function() {
    $("#content").load("../pages/templates/userprofile.html")
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

    let cookie = document.cookie.split("=");

    

    if(cookie[1]==="true") 
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
