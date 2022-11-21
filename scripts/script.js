import { onViewPostLoad } from "./pages/viewpost.js"
import { onNewsfeedLoad } from "./pages/newsfeed.js"

window.loadNewsfeed = async function() {
    await $("#content").load("../pages/templates/newsfeed.html")
    onNewsfeedLoad()
}

export async function loadNewsfeed() {
    await $("#content").load("../pages/templates/newsfeed.html")
    onNewsfeedLoad()
}

window.loadEditPost = async function(postId) {
    console.log(postId)
    await $("#content").load("../pages/templates/editpost.html")
    await $("#post-content").append(`
<div class="edit-post-box">
    <h1>글 수정</h1>
    <input type="text" id="edit-post-title" placeholder="글 제목">
    <input type="text" id="edit-post-content" placeholder="글 내용">
    <button id="edit-post-button" onclick="editPost('${postId}')">작성하기</button>
</div>
`   )
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
    if(localStorage.getItem("auto")==="true") 
    {
        window.location.replace("../index.html");
        loadNewsfeed(); 

    } 
    else
    {
        window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=true");
    }
    
    //window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=true")
}

window.lostAccountFromLandingPage = function() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToLostAccount=true")
}


// 개발자용
window.skipLogin = function() {
    window.location.replace("../index.html?assumeLoggedIn=true")
}
