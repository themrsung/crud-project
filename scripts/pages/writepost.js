import { addDoc, getDocs, collection, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { authService, dbService } from "../firebase.js"
import { stripHTMLTags } from "../htmlSecurity.js"
import { updateUserInfoToCache } from "../userService.js"

window.writePost = function() {

    updateUserInfoToCache()

    const title = stripHTMLTags(document.getElementById("write-post-title").value) || null
    const content = stripHTMLTags(document.getElementById("write-post-content").value) || null

    var createdBy = "user"

    const user = authService.currentUser
    if (user != null) {
        createdBy = user.uid
    }


    const createdAt = Date.now() || null
    const deleted = false
    const comments = [
        {
            createdBy: "user",
            createdAt: 0,
            content: "placeholder",
            deleted: true
        }
    ]

    addDoc(collection(dbService, "posts"), {
        title: title,
        content: content,
        createdBy: createdBy,
        createdAt: createdAt,
        comments: comments,
        deleted: deleted
    })
}

// document.querySelector("#write-post-button").addEventListener("click", writePost)
window.fileControl = (event) => {
    const theFile = event.target.files[0]; // file 객체
    const reader = new FileReader();
    reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
    reader.onloadend = (finishedEvent) => {
      // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      document.getElementById("profileView").src = imgDataUrl;
    };
  };
