import { getDocs, collection, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"
import { getUserDisplayName, updateUserInfoToCache } from "../userService.js"

// 메인 페이지 로드 시
export async function onNewsfeedLoad() {
    // 유저 정보 캐시
    updateUserInfoToCache()
    // 포스트 목록 가져오기
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false),
            // where("createdAt", ">=", 0),
            orderBy("createdAt")
            // ,orderBy("createdAt")
        )
    )

    var isFirst = true
    querySnapshot.forEach((doc) => {
        // 포스트 1개당 실행
        renderPost(doc, isFirst)
        isFirst = false
    })

}

export function renderPostToProfile(doc, isFirst = false) {
    renderPost(doc, isFirst)
}

function renderPost(doc, isFirst = false) {
    // 비동기로 캐싱된 유저 데이터 가져오기
    Promise.all([
        getUserDisplayName(doc.data()["createdBy"])
    ]).then(function(response) {
        // 가져오기 성공!
        const [displayName] = response
        // 기본 이미지로 설정
        var thumbnailURL = "../../img/default-profile.png"
        if (doc.data()["imgUrl"].length > 0) {
            // 글에 첨부파일이 있을 경우 이미지 URL 가져오기
            thumbnailURL = doc.data()["imgUrl"][0]
        }
        // 게시글 템플릿
        const post_HTML = `
    <div class="post post-newsfeed" id="${doc.id}" onclick="checkHash('loadViewPost.'+this.id)">
        <div class="post-thumbnail-container">
            <img class="post-thumbnail" src="${thumbnailURL}">
        </div>
        <div class="post-content post-content-newsfeed" id="test">
            <h1 class="post-title">${doc.data()["title"].substring(0, 100)}</h1>
            <p class="post-author-name">by ${displayName}</p>
            <p class="post-content-text">${doc.data()["content"].replaceAll("\n", "<br>").substring(0, 100)}</p>
        </div>
    </div>
        `
        // 첫 게시글이 아닌 경우
        if (!isFirst) {
            // 가로선 긋기
            renderPostDivider()
        }
        // 게시글 표시하기
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

// const target = document.querySelector("#test");
// const option = {
//     root: null,
//     rootMargin: "0px 0px 0px 0px",
//     thredhold: 0,
// }

// const observer = new IntersectionObserver(callback, option);
// observer.observe(target);