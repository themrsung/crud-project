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

export function renderPostToProfile(doc) {
    renderPost(doc)
}

function renderPost(doc, isFirst = false) {
    Promise.all([
        getUserDisplayName(doc.data()["createdBy"])
    ]).then(function(response) {
        const [displayName] = response
        const post_HTML = `
    <div class="post" id="${doc.id}" onclick="loadViewPost(this.id)">
        <div class="post-content">
            <h1 class="post-title">${doc.data()["title"]}</h1>
            <p class="post-author-name">by ${displayName}</p>
            <p><pre class="post-content-pre">${doc.data()["content"]}</pre></p>
        </div>
        <div class="comments" id="comments"></div>
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