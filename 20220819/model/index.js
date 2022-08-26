// index.js 가 model 안에 model js 파일들들 모아서 사용하는곳이라고 생각하면 된다.
// 다 모은 다음에 빈객채에 넣어서 사용하는 식

const Sql = require("sequelize");
// config.js 에서 module.exports = config; 내보내기를 하고
// require('../config/config') 로 가져오면 내보낸 객체가 받아 진다.
// config.js 에서 보내고 index.js 로 받는다

// const {config,config2} = require('../config/config') 여러개 내보낼때
const config = require("../config/config");
const User = require("./users");
const Post = require("./posts");

console.log(config);

// 시퀄라이즈 객체 생성 이 옵션을 적용한 객체를 만들어 놓는다
const sequelize = new Sql(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

// 빈객체를 만드는 이유 = 여기다 키값을 넣어서 계속 exports 에 넣으려고
const db = {};
// 그 빈객체에 sequelize 키값으로 시퀄라이즈 객체 만든것을 넣어준다.
db.sequelize = sequelize;
// User 도 내보내서 사용할 예정이라 키값에 추가해 주고
db.User = User;
db.Post = Post;

// 이 구문이 없으면 테이블이 생성되지 않는다.
User.init(sequelize); // 실행
Post.init(sequelize);

// 관계형 맺어주는 함수 사용
User.associate(db)
// 관계형 맺어주는 함수 사용
Post.associate(db)

// 보내고 싶은 값을 다 넣은 객체를 내보낸것
module.exports = db;
