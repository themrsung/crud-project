import { getDocs, collection, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService } from "./firebase.js"
import { renderPostToProfile } from "./pages/newsfeed.js"
import { getUserDisplayName, getUserEmail, getUserMBTI, getUserMotd, getUserPhotoURL } from "./userService.js"

export async function onProfileLoad(user) {
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false),
            where("createdBy", "==", user.uid),
            orderBy("createdAt")
        )
    )

    var isFirst = true

    querySnapshot.forEach((doc) => {
        renderPostToProfile(doc, isFirst)
        isFirst = false
    })

    Promise.all([
        getUserDisplayName(user.uid,),
        getUserMotd(user.uid),
        getUserMBTI(user.uid)
    ]).then(function(response) {
        const [displayName, motd, mbti] = response
        renderProfileInfo(
            displayName,
            user.email,
            user.photoURL,
            motd,
            mbti,
            true
        )
    })
    
}

export async function onProfileLoadUID(uid) {
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false),
            where("createdBy", "==", uid),
            orderBy("createdAt")
        )
    )

    var isFirst = true

    querySnapshot.forEach((doc) => {
        renderPostToProfile(doc, isFirst)
        isFirst = false
    })

    Promise.all([
        getUserDisplayName(uid),
        getUserEmail(uid),
        getUserPhotoURL(uid),
        getUserMotd(uid),
        getUserMBTI(uid)
    ]).then(function(response) {
        const [displayName, email, photoURL, motd, mbti] = response
        renderProfileInfo(
            displayName,
            email,
            photoURL,
            motd,
            mbti
        )
        window.location.hash = "loadUserProfile."+uid
    })

    // }
    // renderProfileInfo(
    //     getUserDisplayName(uid),
    //     getUserEmail(uid),
    //     getUserPhotoURL(uid),
    //     getUserMotd(uid)
    // )
}

// function renderProfileInfo(user) {    
//     document.getElementById("user-name").innerHTML = user.displayName
//     document.getElementById("user-email").innerHTML = user.email
//     document.getElementById("user-profile-image").src = user.photoURL
//     document.getElementById("user-motd").innerHTML = user.motd
// }

function renderProfileInfo(displayName, email, photoURL, motd, mbti, renderEmail = false) {
    // console.log("aaaa", displayName)
    document.getElementById("user-name").innerHTML = displayName || "이름"
    document.getElementById("user-email").innerHTML = email || "이메일"
    if (renderEmail) {
        document.getElementById("user-profile-image").src = photoURL || "../img/default-profile.png"
    }
    document.getElementById("user-motd").innerHTML = motd || "상태메시지"
    document.getElementById("user-mbti").innerHTML = mbti || "MBTI"
}

window.profileImageSetTest = function() {
    authService.currentUser.photoURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/PEO_M4_Carbine_RAS_M68_CCO.png/450px-PEO_M4_Carbine_RAS_M68_CCO.png"
}