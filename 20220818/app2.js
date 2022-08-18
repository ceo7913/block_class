// swquelize 사용
// 설치 명령어
// npm i sequelize
// 폴더명만 쓰면 안에 있는 js는 자동으로 따라옴
const { sequelize, User } = require("./model");
const { sync } = require("./model/users");
// 연산자 사용을 위해 가져온다.
const { Op } = require("sequelize");

// 처음에 연결할 때 테이블들의 값을 초기화 할것인지
// true 면 기존 테이블들을 초기화 하고 false면 초기화 하지 않는다.
sequelize
  .sync({ force: false }) // 값을 초기화 하고 싶을때 true
  .then(() => {
    console.log("연결 되었습니다.");
  })
  .catch((err) => {
    console.log(err);
  });

// INSERT INTO 테이블 벨류 (?,?,?)

// create 함수로 컬럼을 js 에서 직접 기입할 수 있다.
// 생성 쿼리문 create
// User.create({
//     name : '안녕2', // 이름은 중복 불가
//     age : 23,
//     meg : 'fas4f6as4f6as',
// });

// 조회 쿼리문
// select * from users

// attributes : 원하는 컬럼만 가져온다
// where : 검색 조건 설정
// order : 생성 순서 정렬 DESC, ASC(내림차순, 오름차순) order : [['age','DESC]]
// limit : 조회할 갯수
// offset : 스킵할 갯수
// DESC, ASC 이거는 자주 사용한다.
// Op.gt (greater than, 초과),
// Op.gte (greater than or equal to, 이상),
// Op.lt (less than, 미만),
// Op.lte (less than or equal to, 이하),
// Op.ne (not equal, 같지 않음),
// Op.or (or, 또는),
// Op.in (in, 배열 요소 중 하나),
// Op.notIn (not in, 배열 요소와 모두 다름) 등이 있다.

async function select() {
  // findOne 은 구성은 같고 하나만 가져온다는게 다름 하나만 가져오기 때문에
  // where 을 꼭 써줘야함
  const user = await User.findAll({
    where: {
      age: { [Op.gt]: 23 },
      [Op.or] : [{ age:{ [Op.gte]:23 }},{name : "안녕2"}],
    },
    order: [["age", "ASC"]],
    limit: 1, // 몇개 까지 가져올지
  });
  const temp = user.map((i) => i.dataValues);
  console.log(temp);
}

// select()

// 수정 쿼리문
// User.update(
//   {
//     // meg 내용을 바꿔준다.
//     meg: "수정할 내용", // 첫번째 매개변수로 사용
//   },
//   // 아이디가 1번인 애를 찾아서
//   { where: { id: 1 } }
// );


// 삭제 쿼리문
User.destroy({
    where : { id : 1},
});

// 관계 쿼리문 join