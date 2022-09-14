// AWS EC2 배포하기

// 1. EC2 ubuntu 로 인스턴스
// AWS 페이지에 로그인하고 서비스 탭 옆에 EC2 검색
// 클라우드의 가상 서버가 뜬다
// 위에 오른쪽 상단 아이디 옆에 리전(지역)은 최대한 가깝게 설정
// 한국 안될때 일본 씀
// 인스턴스 클릭 해서 인스턴스 창으로 이동
// 인스턴스 시작 버튼 클릭
// 인스턴스 중지가 잠시 꺼두는거 인스턴스 종료가 아예 삭제

// 프리티어 사용 가능 여부 확인
// 인스턴스 이름 써줌(아무렇게 써도 됨)
// 사용할 Qickstart 는 Ubuntu 사용

// 키페어는 생성해서 잘 보관해야 하고
// 이동시에 저장매체에 담아서 옮기는게 보안에 좋다(카톡이나 뭐 이런대로 보내면 안됨)
// 연결 방법 vs 코드에서 아니면 터미널에서
// ssh -i "myKey.pem" ubuntu@ec2-3-35-47-97.ap-northeast-2.compute.amazonaws.com

// Ubuntu mysql 인스턴스에 설치하자

// mysql 설치 명령어
// Ubuntu 서버를 업데이트하고 그리고 mysql-server 설치
// sudo apt-get update
// sudo apt-get install mysql-server

// EC2 Ubuntu mysql 접속
// sudo mysql -u root -p
// 비밀번호 입력창이 뜨면 그냥 엔터

// 데이터 베이스 세팅
// 1. 사용할 데이터베이스 하나 만들어주자
// create database 여기에이름;

// 확인해 보자
// show databases;

// 이 데이터베이스를 사용해야 하니까 유저를 만들어서 사용하자
// 접속할때 유저 정보가 있어야 접속이 가능하니까
// 사용할 유저 생성
// create user 'admin'@'%' identified by 'admin1234';

// 만든 유저에게 데이터 베이스 권한을 주자
// grant all on 데이터베이스 이름.(이름뒤에점\)* to '유저이름'@'%';
// grant all on mydb.* to 'admin'@'%';

// 권한이 주어졌는지 확인
// show grants for '여기에 유저 이름'%';
// show grants for 'admin';

// 외부에서 접속 해보자

// 인스턴스 페이지로 돌아와서
// 밑에 보안 탭을 클릭하고
// 보안그룹 클릭

// 트래픽에 네트워크 간에 이동 방향을 말하는 것

// 인바운드 규칙 : 네트워크에 들어오는 정보
// 클라이언트에서 서버로 향하는것

// 아웃바운드 규칙 : 네트워크에서 나가는 정보
// 클라이언트에서 요청을 하고 서버에서 클라이언트로 다시 보내주는 것

// 보안 규칙 추가에 인바운드, 아웃바운드
// http, https, mysql 모두 추기
// 대상 모두 00000

// 보안그룹 규칙설정을 끝냈으면 우리가 EC2에 설치한 MYSQL 접속 허용 설정을 해주자

// sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf;
// 이 파일에서 수정할 부분은 bind-address 의 127.0.0.1 이부분을 0.0.0.0 이렇게 모두로 설정해주면 된다.

// 수정 모드는 i
// :wq! = 저장 후 종료
// :q! = 종료
// :w! = 강제 저장

// mysql 서버 재실행
// sudo service mysql restart

// 로컬에 워크벤치 켜고

// connection 을 추가하는데
// connection 옵션은  hostnaem 에 인스턴스 퍼블릭 IPv4 DNS 주소를 입력

// port 는 3306 번을 적는다.
// username 은 접속할 유저 이름 우리가 권한 줬던 애
// password 는 store in valut 버튼을 눌러서 mysql 비밀 번호

// 프로젝트 EC2 Ubuntu에 설치하기
// 본인이 올릴 프로젝트를 깃허브에 올리고
// config.js 잘 확인하고 데이터 베이스 이름과 비밀번호 유저이름을
// EC2 Ubuntu 에 설치한 mysql 의 접속 옵션과 동일하게 바꿔준다.
// 인스턴스에 git init 하고
// git remote add origin 깃 저장소  주소
// git remote add origin https://github.com/nataya1116/22lim_node.git
// pull 받아서 파일 갱신

// nodejs 를 설치합니다.

// sudo apt-get update
// sudo apt-get install -y build-essential
// sudo apt-get install curl
// 원하는 노드 버전을 적어주면 된다.
// curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash --

// nodejs 설치합니다
// sudo apt-get install -y nodejs

// node 버전 확인 node -v
// npm 버전 확인 npm -v

// EC2 포트 포워딩
// 뒤에 포트번호 안보이게 접속
// http 80, https 443포트

// touch .env (파일 만들기)
// vi .env (파일 안에 값 넣기)

// 명령어 (포트 번호 바꾸는)
// sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 4000;
// dport 80, --to-port 4000 = 80포트로 접속하면 4000 포트로 재매핑

// 포트포워딩을 확인하는 명령어
// sudo iptables -t nat -L --line-numbers

// 포트포워딩 삭제
// sudo iptables -t nat -D PREROUTING 삭제할 포트번호

// pm2 설치 명령어 npm i pm2

// packjson.json에 start 부분을 pm2 start app.js로 변경

// pm2 설치 서버가 종료되어도 노드 서버 실행

// npx pm2 monit : 상태 불러오기. (list, logs, custom metrics, metadata 등이 나옴)

// npx pm2 logs : 모든 로그 불러오기.

// npx pm2 logs --error : 에러 로그 불러오기.

// npx pm2 list : 리스트(npm start 하면 나왔던 표) 불러오기.

// npx pm2 kill : pm2 종료

// npx pm2 start app.js : app.js 실행

// npx pm2 reload all : 서버 재시작
