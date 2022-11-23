import { authService } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { onProfileLoad } from "../profileLoader.js"
import { updateMyProfileDisplayName, updateMyProfilePassword, updateUserInfoToCache } from "../userService.js"

export async function onMyProfileLoad() {
    const user = authService.currentUser
    if (user) {
        onProfileLoad(user)
    }
}

window.startDisplayNameChange = async function() {
    $("#edit-user-name-button-container").empty()
    $("#edit-user-name-button-container").append(
        `
<input id="new-user-name">
<button onclick="onDisplayNameChanged()">완료</button>
        `
    )
}

window.startPasswordChange = async function() {
    $("#edit-user-password-button-container").empty()
    $("#edit-user-password-button-container").append(
        `
<input id="new-user-password" type="password">
<button onclick="onPasswordChanged()">완료</button>
        `
    )
}

window.startMotdChange = async function() {
    $("#edit-user-name-button-container").empty()
    $("#edit-user-name-button-container").append(
        `
<input id="new-user-motd">
<button onclick="onMotdChanged()">완료</button>
        `
    )
}

window.onDisplayNameChanged = async function() {
    const ndn = stripHTMLTags($("#new-user-name").val())
    await updateMyProfileDisplayName(ndn)
    await $("#edit-user-name-button-container").empty()
    console.log(ndn)
    document.getElementById("user-name").innerHTML = ndn
    updateUserInfoToCache()
}

window.onPasswordChanged = async function() {
    const newPass = stripHTMLTags($("#new-user-password").val())
    const newPassRaw = $("#new-user-password").val()
    if (newPass != newPassRaw) {
        alert("<, >는 사용할 수 없는 기호입니다.")
        return
    }
    else {
        // console.log(newPass)
        const msg = updateMyProfilePassword(newPass)
        // if (msg == "success") {
        if (true) {
            await $("#edit-user-password-button-container").empty()
            updateUserInfoToCache()
        }
        // else {
        //     alert(msg)
        // }
    }
}

window.onMotdChanged = async function() {
    alert("개발중")
}