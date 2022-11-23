import { addDoc, getDoc, setDoc, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, storageService } from "./firebase.js";
import { updateProfile, updatePassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// File 만들어서 넣어주면 될 걸?
export async function updateMyProfilePicture(newPhotoFile) {
    const storageRef = ref(storageService, "photos")
    await uploadBytes(storageRef, newPhotoFile).then(snapshot => {
        console.log(snapshot)
    })

    if (user) {
        updateProfile(user, {
            photoURL: newPhotoURL
        })
    }
}

export async function updateMyProfileDisplayName(newDisplayName) {
    const user = authService.currentUser
    if (user) {
        updateProfile(user, {
            displayName: newDisplayName
        })
    }
}

export async function updateMyProfilePassword(newPassword) {
    const user = authService.currentUser
    if (user) {
        updatePassword(user, newPassword).then(() => {
            // Success
            return "success"
        }).catch(error=> {
            return error
        })
    }
}

export async function updateUserInfoToCache() {
    // console.log("user info updated")
    const user = authService.currentUser
    // var motd = document.getElementById("user-motd").innerHTML || null
    if (user) {
        // if (motd == null) {
        //     motd = (await getDoc(
        //         doc(dbService, "userData", user.uid)
        //     )).data()["motd"]
        // }
        // dbService.collection("userData").doc(user.uid).set({
        //     displayName: user.displayName,
        //     email: user.email,
        //     photoURL: user.photoURL
        // })
        // console.log(user.displayName, user.email, user.photoURL)
        setDoc(
            doc(dbService, "userData", user.uid),
            {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
        )
    }
}

export async function getUserDisplayName(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    return user.data()["displayName"]
}

export async function getUserEmail(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    return user.data()["email"]
}

export async function getUserPhotoURL(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    return user.data()["photoURL"]
}

export async function getUserMotd(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    return user.data()["motd"]
}