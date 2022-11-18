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

function loadTitle() {
    $("#content").load("../pages/templates/title.html")
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