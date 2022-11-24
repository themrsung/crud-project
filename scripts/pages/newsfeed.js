import { getDocs, collection, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"
import { getUserDisplayName, updateUserInfoToCache } from "../userService.js"

export async function onNewsfeedLoad() {
    updateUserInfoToCache()
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false),
            // where("createdAt", ">=", 0),
            orderBy("createdAt")
            // ,orderBy("createdAt")
        )
    )

    // // 시간순 정렬
    // querySnapshot.reverse()
    var isFirst = true
    querySnapshot.forEach((doc) => {
        renderPost(doc, isFirst)
        isFirst = false
    })

}

export function renderPostToProfile(doc, isFirst = false) {
    renderPost(doc, isFirst)
}

function renderPost(doc, isFirst = false) {
    Promise.all([
        getUserDisplayName(doc.data()["createdBy"])
    ]).then(function(response) {
        const [displayName] = response
        var thumbnailURL = "../../img/default-profile.png"
        if (doc.data()["img"].length > 0) {
            thumbnailURL = doc.data()["img"][0]
        }
        const post_HTML = `
    <div class="post post-newsfeed" id="${doc.id}" onclick="checkHash('loadViewPost.'+this.id)">
        <div class="post-thumbnail-container">
            <img class="post-thumbnail" src="${thumbnailURL}">
        </div>
        <div class="post-content post-content-newsfeed">
            <h1 class="post-title">${doc.data()["title"].substring(0, 100)}</h1>
            <p class="post-author-name">by ${displayName}</p>
            <p class="post-content-text">${doc.data()["content"].replaceAll("\n", "<br>").substring(0, 100)}</p>
        </div>
    </div>
        `
        if (!isFirst) {
            renderPostDivider()
        }
        $("#news-feed").prepend(post_HTML)
        
    })
    

//     if (doc.data()["comments"] != null) {
//         doc.data()["comments"].forEach((comment, i) => {
//             const comment_HTML = `
// <div class="comment" id="${i}">
//     <p><span>${comment["user"]}</span> - <span>${comment["createdAt"]}</span></p>
//     <p>${comment["content"]}</p>
// </div>
//             `
//             if (comment["deleted"] == false) {
//                 $("#comments").append(comment_HTML)
//             }
//         })
//     }
}

function renderPostDivider() {
    const divider_HTML = `
    <hr class="newsfeed-divider">
    `
    $("#news-feed").prepend(divider_HTML)
}

window.newWritePost = function() {
    $("#content").load("../pages/templates/writepost.html")
}