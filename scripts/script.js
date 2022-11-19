function loadNewsfeed() {
    $("#content").load("../pages/templates/newsfeed.html")
}

function loadLogin() {
    $("#content").load("../pages/templates/login.html")
}

function loadLostAccount() {
    $("#content").load("../pages/templates/lostaccount.html")
}

function loadMyProfile() {
    $("#content").load("../pages/templates/myprofile.html")
}

function loadRegister() {
    $("#content").load("../pages/templates/register.html")
}

function loadUserProfile() {
    $("#content").load("../pages/templates/userprofile.html")
}

function loadViewPost() {
    $("#content").load("../pages/templates/viewpost.html")
}

function loadWritePost() {
    $("#content").load("../pages/templates/writepost.html")
}

function hideDevButtons() {
    document.getElementById("devbuttons").style.display = "none"
}

function loadLandingPage() {
    window.location.replace("../pages/landing.html")
}


function registerFromLandingPage() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToRegister=true")
    

}

function loginFromLandingPage() {
    window.location.replace("../index.html?assumeLoggedIn=true&goToLogin=true")

}


// 개발자용
function skipLogin() {
    window.location.replace("../index.html?assumeLoggedIn=true")
}