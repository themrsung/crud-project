import { authService, storageService } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { onProfileLoad } from "../profileLoader.js"
import { updateMyProfileDisplayName, updateMyProfilePassword, updateMyProfileMotd, updateUserInfoToCache, updateMyProfileMBTI } from "../userService.js"
import {
    ref,
    uploadString,
    getDownloadURL,
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
  import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  import { v4 as uuidv4 } from "https://jspm.dev/uuid";

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
    $("#edit-user-motd-button-container").empty()
    $("#edit-user-motd-button-container").append(
        `
<input id="new-user-motd">
<button onclick="onMotdChanged()">완료</button>
        `
    )
}

window.startMBTIChange = async function() {
    $("#edit-user-mbti-button-container").empty()
    $("#edit-user-mbti-button-container").append(
        `
<input id="new-user-mbti">
<button onclick="onMBTIChanged()">완료</button>
        `
    )
}

window.onDisplayNameChanged = async function() {
    const ndn = stripHTMLTags($("#new-user-name").val())
    await updateMyProfileDisplayName(ndn)
    await $("#edit-user-name-button-container").empty()
    // console.log(ndn)
    document.getElementById("user-name").innerHTML = ndn
    updateUserInfoToCache()
}

window.onMotdChanged = async function() {
    const newMotd = stripHTMLTags($("#new-user-motd").val())
    await updateMyProfileMotd(newMotd)
    await $("#edit-user-motd-button-container").empty()
    document.getElementById("user-motd").innerHTML = newMotd
    updateUserInfoToCache()
}

window.onMBTIChanged = async function() {
    const newMBTI = stripHTMLTags($("#new-user-mbti").val())
    await updateMyProfileMBTI(newMBTI)
    await $("#edit-user-mbti-button-container").empty()
    document.getElementById("user-mbti").innerHTML = newMBTI
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

// window.onMotdChanged = async function() {
//     alert("개발중")
// }

export const changeProfile = async (event) => {
    event.preventDefault();
    // document.getElementById("profileBtn").disabled = true;
    const imgRef = ref(
        storageService,
        `${authService.currentUser.uid}/${uuidv4()}`
    )
  
    // const newNickname = document.getElementById("profileNickname").value
    // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
    const imgDataUrl = localStorage.getItem("imgDataUrl")
    let downloadUrl
    if (imgDataUrl) {
        const response = await uploadString(imgRef, imgDataUrl, "data_url")
        downloadUrl = await getDownloadURL(response.ref)
    }
    await updateProfile(authService.currentUser, {
        photoURL: downloadUrl ? downloadUrl : null
    })
}

window.onFileChange = event => {
    const theFile = event.target.files[0] // file 객체
    const reader = new FileReader()
    reader.readAsDataURL(theFile) // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
    reader.onloadend = (finishedEvent) => {
        // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
        const imgDataUrl = finishedEvent.currentTarget.result
        localStorage.setItem("imgDataUrl", imgDataUrl)
        document.getElementById("user-profile-image").src = imgDataUrl
    }
}