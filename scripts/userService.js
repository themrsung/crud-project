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

export async function updateMyProfileMotd(newMotd) {
    const user = authService.currentUser
    if (user) {
        const docSnap = await getDoc(
            doc(dbService,"userData", user.uid)
        )
        
        const newName = user.displayName
        const newEmail = user.email
        const newPhotoURL = user.photoURL
        var newMBTI = null
        try {
            if (docSnap.exists()) {
                newMBTI = docSnap.data()["mbti"]
            }
        }
        catch {}

        
        await setDoc(
            doc(dbService, "userData", user.uid), {
                displayName: newName,
                email: newEmail,
                photoURL: newPhotoURL,
                motd: newMotd,
                mbti: newMBTI
            }
        )
    }
}

export async function updateMyProfileMBTI(newMBTI) {
    const user = authService.currentUser
    if (user) {
        const docSnap = await getDoc(
            doc(dbService,"userData", user.uid)
        )
        const newName = user.displayName
        const newEmail = user.email
        const newPhotoURL = user.photoURL
        var newMotd = null
        try {
            if (docSnap.exists()) {
                newMotd = docSnap.data()["motd"]
            }
        }
        catch {}

        await setDoc(
            doc(dbService, "userData", user.uid), {
                displayName: newName,
                email: newEmail,
                photoURL: newPhotoURL,
                motd: newMotd,
                mbti: newMBTI
            }
        )
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

        const docSnap = await getDoc(
            doc(dbService, "userData", user.uid)
        )
        
        const displayName = user.displayName
        const email = user.email
        const photoURL = user.photoURL
        var motd = null
        var mbti = null

        try {
            motd = docSnap.data()["motd"]
        }
        catch {}

        try {
            mbti = docSnap.data()["mbti"]
        }
        catch{}

        setDoc(
            doc(dbService, "userData", user.uid),
            {
                displayName: displayName,
                email: email,
                photoURL: photoURL,
                motd: motd,
                mbti: mbti
            }
        )
        
    }
}

export async function getUserDisplayName(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    if (user.exists()) {
        return user.data()["displayName"]
    }
    else {
        return "(displayname)"
    }
}

export async function getUserEmail(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    if (user.exists()) {
        return user.data()["email"]
    }
    else {
        return "(email)"
    }
}

export async function getUserPhotoURL(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    if (user.exists()) {
        return user.data()["photoURL"]
    }
    else {
        return "#"
    }
}

export async function getUserMotd(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    if (user.exists()) {
        return user.data()["motd"]
    }
    else {
        return "(motd)"
    }
}

export async function getUserMBTI(uid) {
    const user = await getDoc(
        doc(dbService, "userData", uid)
    )
    if (user.exists()) {
        return user.data()["mbti"]
    }
    else {
        return "(mbti)"
    }
}