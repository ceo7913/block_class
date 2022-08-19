const dot = require("dotenv").config();

// 데이터 베이스 접속에 필요한 설정값 객체
const config = {
  dev: {
    username: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "test",
    host: "127.0.0.1", // 여기에 만약 우리가 AWS RDS 를 쓰거나 지원 데이터 베이스 등등
    // 사용한다면 이곳에 주소를 넣어주면 된다.
    dialect: "mysql",
  },
};

// return 만드는법
// module.exports = {config,config2}; // 이렇게 여러개를 내보내고 싶으면 객체로 묶으면 됨
module.exports = config;
