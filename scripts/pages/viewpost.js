import { getDoc, collection, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService, getParam } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { getUserDisplayName, getUserPhotoURL, updateUserInfoToCache } from "../userService.js"

// $(document).ready(function() { onViewPostLoad() })

// 페이지 로드 시 실행
export async function onViewPostLoad(postId) { 
    const docRef = doc(dbService, "posts", postId)
    // 게시글 데이터 가져오기
    const docSnap = await getDoc(docRef)

    $("#viewpost-outer").empty(); // 글 초기화
    $("#comments").empty(); // 댓글 초기화
    
    // 삭제되지 않았으면
    if (docSnap.data()["deleted"] == false){
        const isOwnPost = authService.currentUser.uid == docSnap.data()["createdBy"]
        const postCreatedBy = docSnap.data()["createdBy"]
        const content = docSnap.data()["content"].replaceAll("\n", "<br>")
        // 게시글 영역
        const post_HTML = `
<div class="post" id="${docSnap.id}">
    <div class="post-content" id="post-content">
        <h1 class="view-post-title">${docSnap.data()["title"]}</h1>
        <p class="post-created-at">${Date(docSnap.data()["createdAt"]).toString().substring(0, 15)}</p>
        <div class="post-creator-info" id="#loadUserProfile.${postCreatedBy}" onclick="checkHash(this.id);">
            <img id="post-creator-profile" class="post-creator-profile" src="../img/default-profile.png">
            <p id="post-creator-name" class="post-creator-name"></p>
        </div>
        <p class="text-content-text">${content}</p>
    </div>
    <div class="comments" id="comments"></div>
</div>`
        const post_Btn = `
    <div class="post-manage-button-box">
        <button onclick="editPost('${postId}')">글 수정</button>
        <button onclick="scratchPost('${postId}')">글 삭제</button>
    </div>
        `

        
        Promise.all([
            getUserDisplayName(postCreatedBy),
            getUserPhotoURL(postCreatedBy)
        ]).then(function(response) {
            const [userName, profileURL] = response
            document.getElementById("post-creator-profile").src = profileURL;
            document.getElementById("post-creator-name").innerHTML = userName;
            // 여기서 변수로 위에 html 수정
        })

        // console.log(post_HTML)
        $("#viewpost-outer").append(post_HTML)
        if (postCreatedBy===authService.currentUser.uid)
                {
                    $("#viewpost-outer").append(post_Btn)
                }
        if(docSnap.data()["imgUrl"] !== null)
        {
            for(let jj in docSnap.data()["imgUrl"])
            {
                document.getElementById("post-content").innerHTML += `
                <img id="posting-img${jj}" class="posting-img" src="${docSnap.data()["imgUrl"][jj]}">
                `
            }
        }       
        
        
        // 코멘트가 있으면
        if (docSnap.data()["comments"].length > 1) {
            // 1 코멘트당 이 코드 실행 (forEach)
            docSnap.data()["comments"].forEach((comment, i) => {
                const isOwnComment = authService.currentUser.uid == comment["createdBy"]
                const commCreatedBy = comment["createdBy"]
                var onClick = "loadUserProfile('" + commCreatedBy + "')"
                if (isOwnComment) {
                    onClick = "loadMyProfile()"
                }

                // console.log(comment["createdBy"])
                Promise.all([
                    getUserDisplayName(comment["createdBy"]),
                    getUserPhotoURL(comment["createdBy"])
                ]).then(function(response) {
                    const displayName = response[0]
                    const photoURL = response[1]
                    // 댓글 1개 영역
                    const comment_HTML = `
<div class="comment" id="${postId}.${i}">
    <div onclick="${onClick}") class="comment-creator-info">
        <img class="comment-creator-profile" src="${photoURL}">
        <p class="comment-creator-name"><span>${displayName}</span> - <span class="comment-date">${Date(comment["createdAt"]).toString().substring(0, 15)}</span></p>
    </div>
    <p style="display:block" class="commentBefore${i}" >${comment["content"]}</p>
    <input type="text" id="updatingComment${i}" class="commentAfter${i}" style="display:none">
                                `
                    const comment_BNT = `
    <button onclick="editComment('${postId}.${i}')" style="display:inline-block" class="commentBefore${i}" >수정</button>
    <button onclick="scratchComment('${postId}.${i}')" style="display:inline-block" class="commentBefore${i}" >삭제</button>
    <button onclick="onEditCommentCompleted('${postId}.${i}')" style="display:none" class="commentAfter${i}">완료</button>
    <button onclick="drop('${postId}.${i}')" style="display:none" class="commentAfter${i}">취소</button>
</div>
                                `
                    // 코멘트가 삭제되지 않았으면 
                    if (comment["deleted"] == false) {
                        $("#comments").append(comment_HTML)
                        if (commCreatedBy===authService.currentUser.uid)
                        {
                            $("#comments").append(comment_BNT)
                        }
                        else
                        {
                            $("#comments").append("</div>")
                        }
                    }
                })     
            })
        }
        
        // 댓글 쓰기 영역
        const write_comment_HTML = `
<div class="write-comment-area">
    <input class="write-comment-input" id="write-comment-content" placeholder="댓글을 입력해주세요...">
    <button class="write-comment-button" onclick="writeComment('${docSnap.id}')">댓글 달기</button>
</div>
        `
        $("#comments").append(write_comment_HTML)
        
    }
    else
    {
        alert("존재하지 않는 게시글 입니다");
        return checkHash("#loadNewsfeed");
    }
}

window.writeComment = async function(postId) {
    updateUserInfoToCache()
    const content = stripHTMLTags(document.getElementById("write-comment-content").value)
    
    if (content == null || content == "") {
        alert("내용을 입력해주세요.")
        return
    }

    var createdBy = "user"

    const user = authService.currentUser
    if (user != null) {
        createdBy = user.uid
    }

    const createdAt = Date.now()
    const comment = {
        createdBy: createdBy,
        createdAt: createdAt,
        content: content,
        deleted: false
    }

    const docSnap = await getDoc(doc(dbService, "posts", postId))
    // console.log(docSnap)
    var comments = docSnap.data()["comments"]

    comments.push(comment)

    await updateDoc(
        doc(dbService, "posts", postId),
        { comments: comments }
    )

    $("#viewpost-outer").empty()
    onViewPostLoad(postId)
}

