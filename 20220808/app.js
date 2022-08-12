
// 쿠키 생성 함수
// 매개변수는 (이름, 값, 유효기간)
let createCookie = function (name, value, time) {
    // date 객체를 생성해서 변수에 담고
    // Date 0객체는 생성되었을 때의 현재 날짜 및 시간을 담고 있다.
    let date = new Date();
    
    // date객체의 시간을 설정할 때 setTime()
    // time에 값이 1이면 1일 하루이다.
    // date.getTime()(반환) 현재시간에 time을 더하면 생성한 시간부터 1일이 지난 시간
    // setTime() 내가 설정하고싶은 시간(대입)
    date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);

    // document.cookie 
    // toUTCString()메서드는 UTC 표준 시간대를 사용하여 날짜를 문자열로 변환한다. Sat, 02 Oct 2022 15:50:50 GMT 이렇게 변환
    // ;path = / -> 쿠키를 사용할 도메인( /는 루트 경로) (ex. /shop 이런 식으로 shop의 쿠키만 따로 모아줄 수 있다)
    // 쿠키이름 = 쿠키 값;  expires(만료) = Sat, 02 Oct 2022 15:50:50 GMT; path=/
    document.cookie = name + "=" + value + "; expires" + date.toUTCString() + "; path = /";
};

// 쿠키 값 가져오는 함수
let getCookie = function (name) {
    // 현재 저장된 쿠키 중 name에 맞는 쿠키가 저장되어 있으면
    let value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    // 있으면 값을 내보낸다.
    // 쿠키의 값이 있는 인덱스가 2번이라서 2번 인덱스 값을 가져온다.
    // 인덱스는 ,로 구분해준다.
    // console.log("cookie " + value); // cookie ; 키키=66,;,66,
    // console.log("cookie " + value[0]); // cookie ; 키키=66
    // console.log("cookie " + value[1]); // cookie ;
    // console.log("cookie " + value[2]); // cookie 66
    return value ? value[2] : null;
};

// 쿠키 유무 확인 함수
// key는 여기서 쿠키의 키 이다.(쿠키는 키와 값으로 이루어져있음)
let isActiveCookie = function (key) {
    // 값이 있는 지 없는지 빈문자열이 아니면 값이 있는 것
    // null이 아니면 true, null이면 false
    return getCookie(key) != null ? true : false;
};

// 쿠키 제거 함수
let isDeleteCookie = function (key) {
    // 쿠키 제거 기능은 없기에 만료일을 제일 예전 날짜를 넣어줘서 자동으로 삭제 되게 만든다.
    document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;";
};


// 로그인 사용자의 프로필 정보
// 로그인 유무
// 보안을 위해서 localStorage가 아닌 sessionStorage를 사용한다.

// 세션에 key, value 저장(추가) setItem() 매개변수 키, 값
sessionStorage.setItem("myItem", "저장할 데이터"); // 저장

// 세션에 저장한 아이템을 가져오는 것 getItem() 매개변수 키, 값
sessionStorage.getItem("my item");

// 세션이 몇개 들어있는지 길이 구하는 법
sessionStorage.length; // 1

// 세션의 키 값을 인덱스로 가져오기 key()함수로
sessionStorage.key(0); // myItem

sessionStorage.clear(); // 전체 삭제

sessionstorage.removeItem("삭제하고 싶은 데이터의 키"); // 한개의 인자를 받는다.