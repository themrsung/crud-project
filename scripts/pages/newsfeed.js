import { getDocs, collection, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { dbService } from "../firebase.js"
import { getUserDisplayName, updateUserInfoToCache } from "../userService.js"


// 메인 페이지 로드 시
export async function onNewsfeedLoad(scrolling = 0) {
    // 유저 정보 캐시
    window.count=0;
    updateUserInfoToCache()
    // 포스트 목록 가져오기
    
    
    const querySnapshot = await getDocs(
        query(
            
            collection(dbService, "posts"),
            where("deleted", "==", false),
            // where("createdAt", ">=", 0),
            orderBy("createdAt","desc"),
            //limit(5)
           
            
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

async function renderPost(doc, isFirst = false) {
    // 비동기로 캐싱된 유저 데이터 가져오기
    
    Promise.all([
        getUserDisplayName(doc.data()["createdBy"])
    ]).then(function(response) {
        // 가져오기 성공!
        const [displayName] = response
        // 기본 이미지로 설정
        var thumbnailURL = "../../img/default-profile.png"
        if (doc.data()["imgUrl"] != null) {
            if (doc.data()["imgUrl"].length > 0) {
                // 글에 첨부파일이 있을 경우 이미지 URL 가져오기
                thumbnailURL = doc.data()["imgUrl"][0]
            }
        }

        let post_HTML = "";
        if(window.count >= 5)
        {
            post_HTML = `
            <hr class="newsfeed-divider" id="newsfeed-divider" style ="display:none;">
            <div class="post post-newsfeed" id="${doc.id}" onclick="checkHash('loadViewPost.'+this.id)"  style ="display:none;">
                <div class="post-thumbnail-container">
                    <img class="post-thumbnail" src="${thumbnailURL}">
                </div>
                <div class="post-content post-content-newsfeed" id="test">
                    <h1 class="post-title">${doc.data()["title"].substring(0, 100)}</h1>
                    <p class="post-author-name">by ${displayName} at <span class="newsfeed-post-created-at">${Date(doc.data()["createdAt"]).toString().substring(0, 15)}</span></p>
                    <p class="post-content-text">${doc.data()["content"].replaceAll("\n", "<br>").substring(0, 100)}</p>
                </div>
            </div>
                `;

        }
        else
        {
            post_HTML = `
    <div class="post post-newsfeed" id="${doc.id}" onclick="checkHash('loadViewPost.'+this.id)">
        <div class="post-thumbnail-container">
            <img class="post-thumbnail" src="${thumbnailURL}">
        </div>
        <div class="post-content post-content-newsfeed" id="test">
            <h1 class="post-title">${doc.data()["title"].substring(0, 100)}</h1>
            <p class="post-author-name">by ${displayName} at <span class="newsfeed-post-created-at">${Date(doc.data()["createdAt"]).toString().substring(0, 15)}</span></p>
            <p class="post-content-text">${doc.data()["content"].replaceAll("\n", "<br>").substring(0, 100)}</p>
        </div>
    </div>
    
        ` ;
            if (!isFirst) {
                // 가로선 긋기
                renderPostDivider();
            }
        window.count++;
         
        }
      

        // 첫 게시글이 아닌 경우
        // if (!isFirst) {
        //     // 가로선 긋기
        //     renderPostDivider();
        // }
        // 게시글 표시하기
        //$("#news-feed").prepend(post_HTML)
        document.getElementById("news-feed").innerHTML += post_HTML;
        post_HTML = "";
        
    
        
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
    <hr class="newsfeed-divider" id="newsfeed-divider">
    `
    //$("#news-feed").prepend(divider_HTML)
    document.getElementById("news-feed").innerHTML += divider_HTML;
}

window.newWritePost = function() {
    $("#content").load("../pages/templates/writepost.html")
}


try{ // 랜딩페이지에서 오류남 
    document.getElementById("wrap-inner").onscroll = function(event){

        
        let aim = document.getElementById("wrap-inner").scrollTop;

        

        //if(postDiv[length-1].style.display !== "flex"){ // 게시글을 다 안보여준 경우
        setTimeout(function(){
            if(document.getElementById("wrap-inner").scrollHeight <= Math.round(document.getElementById("wrap-inner").scrollTop + document.getElementById("wrap-inner").offsetHeight))
            {
            
            // setTimeout(function(){
                    infinityScroll();
            //  }, 1500)
                
            }
            
        }, 1500)
        document.getElementById("wrap-inner").scrollTo({ left: 100, top: aim, behavior: "smooth" });
        
        
    }
}catch(e)
{
    console.log("")
}


// const observer = new IntersectionObserver(callback, option);
// observer.observe(target);

window.infinityScroll = function()
{
    let blockCount = 0;
    const postDiv = document.getElementsByClassName("post post-newsfeed");
    const hrDiv = document.getElementsByClassName("newsfeed-divider")
    const length = document.getElementsByClassName("post post-newsfeed").length;
    //setTimeout(function(){
        for(let i = window.count ; i < length ; i++)
        {
            blockCount++;
            postDiv[i].style.display="flex";
            hrDiv[i-1].style.display="block";
            if(length-1 === i) 
            {
                document.getElementById("news-feed").innerHTML += `
                <div style="text-align:center"><p>마지막 글입니다</p></div>
                `
                
            }
            if(blockCount===5) break;
        }
        window.count += 5;
        //window.scrollCounting += 1;
        
}

