import { authService } from "./firebase.js"




// 로그인 안 된 유저 랜딩으로 보내는 코드

// const assumeLoggedIn = getParam("assumeLoggedIn")
// console.log(assumeLoggedIn)

if (getParam("assumeLoggedIn") != "true") {
    $(document).ready(function() {
        authService.onAuthStateChanged((user) => {
            if (!user) { // 로그인 안되어있으면 + 로그아웃 된 상태
                loadLandingPage()
            }
            // else if (랜딩페이지 보기 설정된 유저일 경우) {
            //     loadLandingPage()   
            // }
        })
    })
}

