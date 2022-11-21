import { authService } from "../firebase.js";
import {
  signInWithEmailAndPassword, // 로그인 메서드
  GoogleAuthProvider, // 구글 로그인 메서드
  signInWithPopup, // 로그인 방법별 메서드 (구글,깃 로그인 시 필요 메소드)
  GithubAuthProvider, // 깃 로그인 메서드
  signOut, // 로그아웃 메서드
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

 

window.logIn =  function() {

    const email = document.getElementById("email");
    const password = document.getElementById("password");

     //자동로그인 체크 유무
    const autoLogIn = document.getElementById("autoLogin").checked;
    
    // 이메일 잘 기입 되었는지
    if (!email.value)
    {
        alert("이메일을 입력해주세요");
        //email.focus();
        return
    
    }
    // 비밀번호 잘 쳤는지
    else if (!password.value)
    {
        alert("비밀번호를 입력해주세요");
        //password.focus();
        return
    }
   
    
                                                                    //userCredential
    signInWithEmailAndPassword(authService, email.value, password.value).then((userInfo) => { 
    // Signed in
   
        if(userInfo)
        {
            autoLogIn ? localStorage.setItem("auto","true") : localStorage.setItem("auto","false")
            return loadNewsfeed();
        }
    
   
    })
    .catch((error) => { //파이어베이스에서 에러를 뱉은경우 <로그인 실패>

    // 에러메세지 포함 내용 = > 
    // 1. 정보가 없는 경우 : "user-not-found" , 
    // 2. 비밀번호가 잘못된 경우 : "wrong-password"
    if (error.message.includes("email")) { 
        alert("가입되지 않은 회원입니다.");
        
    } else if (error.message.includes("password")) {
        //alert("이메일 혹은 비밀번호가 잘못 되었습니다.");
        alert("비밀번호가 잘못 되었습니다.");
    }
    // 이메일,비밀번호 value 값 초기화
    email.value="";password.value="";
    //자동 로그인 체크값은 유지
    //
    return;
    });
    
}

window.googit  = (event) => {
  
    const way = event.target.value;
    const autoLogIn = document.getElementById("autoLogin").checked;
    let connection;

    way==="google" ? connection = new GoogleAuthProvider() : connection = new GithubAuthProvider()
    signInWithPopup(authService, connection).then((result) => {
      
      if(result.user)
      {
        autoLogIn ? localStorage.setItem("auto","true") : localStorage.setItem("auto","false")
        return loadNewsfeed();
      }

    }).catch((error) => {
      // Handle Errors here.
      console.log("error:", error.message);
    });

    

    // 로그인 실패 할때
    // 로그인 됐을때 + 자동로그인 체크 유무
    // -> 자동로그인, 세션 설정 ()
}


window.logOut  = () =>
{
    authService.signOut().then(function() {
        alert("로그아웃 되었습니다")
        localStorage.clear;
        loadLandingPage();
    }).catch(function(error) {
        if(error){
            // 에러 메세지 확인하기
            console.log(error.message);
        }
    })
}

