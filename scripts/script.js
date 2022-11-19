import { onViewPostLoad } from "./pages/viewpost.js"

window.loadNewsfeed = function() {
    $("#content").load("../pages/templates/newsfeed.html")
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

window.loadRegister = function() {
    $("#content").load("../pages/templates/register.html")
}

window.loadUserProfile = function() {
    $("#content").load("../pages/templates/userprofile.html")
}

window.loadViewPost = function(postId = "6Xrupp27DH1ZdeVDb3Ek") {
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
    window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=true")
}


// 개발자용
window.skipLogin = function() {
    window.location.replace("../index.html?assumeLoggedIn=true")
}