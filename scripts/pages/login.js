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
    {
        
        if(true) // 자동 로그인 체크가 되어있다면 
        {

        }

    }
    else //로그인 실패
    {
        // 이메일,비밀번호 value 값 초기화
        email.value="";password.value="";
        //자동 로그인 체크값은 유지
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

export const session  = () =>
{

}

export const logOut  = () =>
{

}

