import { authService } from "../firebase.js"
import { onProfileLoad } from "../profileLoader.js"

export async function onMyProfileLoad(uid) {
    const user = authService.currentUser
    if (user) {
        onProfileLoad(user)
    }
}