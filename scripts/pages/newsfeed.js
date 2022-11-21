import { getDocs, collection, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"

export async function onNewsfeedLoad() {
    const querySnapshot = await getDocs(
        query(
            collection(dbService, "posts"),
            where("deleted", "==", false)
            // ,orderBy("createdAt")
        )
    )
    querySnapshot.forEach((doc) => {
        const post_HTML = `
<div class="post" id="${doc.id}" onclick="loadViewPost(this.id)">
    <div class="post-content">
        <h1>${doc.data()["title"]}</h1>
        <p><pre>${doc.data()["content"]}</pre></p>
    </div>
    <div class="comments">
        <div class="comment">
            <p><span>작성자</span> - <span>작성일자</span></p>
            <p>내용</p>
        </div>
        <div class="comment">
            <p><span>작성자</span> - <span>작성일자</span></p>
            <p>내용</p>
        </div>
        <div class="comment">
            <p><span>작성자</span> - <span>작성일자</span></p>
            <p>내용</p>
        </div>
    </div>
</div>
    `
        console.log(post_HTML)
        $("#news-feed").append(post_HTML)
    })
}