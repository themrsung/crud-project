import { getDocs, collection, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"

export async function onNewsfeedLoad() {
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

    querySnapshot.forEach((doc) => {
        renderPost(doc)
    })

}

export function renderPostToProfile(doc) {
    renderPost(doc)
}

function renderPost(doc) {
    const post_HTML = `
<div class="post" id="${doc.id}" onclick="loadViewPost(this.id)">
    <div class="post-content">
        <h1>${doc.data()["title"]}</h1>
        <p><pre class="post-content-pre">${doc.data()["content"]}</pre></p>
    </div>
    <div class="comments" id="comments"></div>
</div>
    `
    $("#news-feed").prepend(post_HTML)

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


window.newWritePost = function() {
    $("#content").load("../pages/templates/writepost.html")
}