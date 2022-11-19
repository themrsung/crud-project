import { authService } from "../firebase.js";
import {
  //createUserWithEmailAndPassword, // 회원가입 메서드
  signInWithEmailAndPassword, // 로그인 메서드
  GoogleAuthProvider, // 구글 로그인 메서드
  signInWithPopup, // 로그인 방법별 메서드 (구글,깃 로그인 시 필요 메소드)
  GithubAuthProvider, // 깃 로그인 메서드
  signOut, // 로그아웃 메서드

} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";



export const logIn  = () => {

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
   
    
    if(true) // 로그인 성공
    {                                                                           //userCredential
        signInWithEmailAndPassword(authService, email.value, password.value).then((userInfo) => { 
        // Signed in
        const user = userInfo.user;
        
        if(autoLogIn) // 자동 로그인 체크가 되어있다면 
        {
            //authService.Persistence : 파이어베이스에서 관리하는 영속성 객체(프로그램이 꺼져도 계속 유지 할 수 있게 도와주는 객체) 
            auth.setPersistence(authService.Persistence.SESSION).then((res) => {
            dispatch( // 
                setUser({
                  user_name: user.displayName,
                  id: user.id,
                  //user_profile: "",
                  uid: user.uid,
                })
            ).catch((error) => { //파이어베이스에서 에러를 뱉은경우

                // 에러가 떨어지는 경우를 확인해봐야할듯
                console.log(error.message);
                
            });
        });
        }
        loadNewsfeed(); // 뉴스피드 고고싱
      })
      .catch((error) => { //파이어베이스에서 에러를 뱉은경우 <로그인 실패>

        // 에러메세지 포함 내용 = > 
        // 1. 정보가 없는 경우 : "user-not-found" , 
        // 2. 비밀번호가 잘못된 경우 : "wrong-password"
        if (error.message.includes("user-not-found")) { 
          alert("가입되지 않은 회원입니다.");
          return;
        } else if (error.message.includes("wrong-password")) {
          alert("비밀번호가 잘못 되었습니다.");
        }
        // 이메일,비밀번호 value 값 초기화
        email.value="";password.value="";
        //자동 로그인 체크값은 유지
      });
        

    }
    
}

export const googleLogIn  = () => {
  

    // 로그인 실패 할때
    // 로그인 됐을때 + 자동로그인 체크 유무
    // -> 자동로그인, 세션 설정 ()
}

export const gitLogIn  = () =>
{
    
    

    // 로그인 실패 할때
    // 로그인 됐을때 + 자동로그인 체크 유무
    // -> 자동로그인, 세션 설정 ()
}

// export const session  = () =>
// {

// }

export const logOut  = () =>
{
    authService.signOut().then(function() {
        alert("로그아웃 되었습니다")
        loadLandingPage();
    }).catch(function(error) {
        if(error){
            // 에러 메세지 확인하기
            console.log(error.message);
        }
    })
}

