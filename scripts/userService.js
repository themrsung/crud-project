import { addDoc, getDocs, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, storageService } from "./firebase";
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
        updatePassword(user, newPassword)
    }
}