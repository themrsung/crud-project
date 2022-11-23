import { authService } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { onProfileLoad } from "../profileLoader.js"
import { updateMyProfileDisplayName, updateMyProfilePassword } from "../userService.js"

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
    $("user-name").val(ndn)
}

window.onPasswordChanged = async function() {
    const newPass = stripHTMLTags($("#new-user-pass").val())
    const newPassRaw = $("#new-user-pass".val())
    if (newPass != newPassRaw) {
        alert("<, >는 사용할 수 없는 기호입니다.")
        return
    }
    else {
        const msg = updateMyProfilePassword(newPass)
        if (msg == "success") {
            await $("#edit-user-password-button-container").empty()
        }
        else {
            alert(msg)
        }
    }
}

window.onMotdChanged = async function() {
    alert("개발중")
}