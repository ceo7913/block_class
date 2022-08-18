const { extend } = require("lodash");
const Sequelize = require("sequelize");
// sequelize 모듈을 확장한 user 클래스를 만든다.
class User extends Sequelize.Model {
  // init 함수에서 테이블을 설정해준다.
  static init(sequelize) {
    // super.init 함수의 첫번째 매개변수는 테이블 컬럼에 대한 설정
    // 두 번째는 테이블 자체의 설정
    return super.init(
      {
        name: {
          type: Sequelize.STRING(50),
          // NULL 이면 안된다.
          allowNull: false,
          unique: true,
          // 고유키
          // 값이 중복되지 않고
          // 중복되면 안되는 값들을 쓸 떄 사용합니다.
          // 반드시 입력할 필요는 없다.

          // primarykey
          // 기본키
          // 값이 중복되지 않고
          // 반드시 입력해야하는값
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        meg: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      // 여기 부터가 테이블에 대한 설정
      {
        // sequelize : init 함수의 매개변수를 연결 시켜 주는 옵션
        sequelize,
        // timestamps : true 로 하면 createAt 과 updatedAt 이 컬럼들을 추가해주고
        // 생성 시간과 수정시간을 자동으로 입력해준다.
        timestamps: true,
        // underscored : 시쿼라이즈는 테이블명과 컬럼명을 카멜표기법으로 표시해주는데
        // 스네이크 표기법으로 바꿔주는 옵션( aaaAa -> aaa_aa ) 으로 바꿔줌
        underscored: false,
        // modelName : 모델의 이름을 설정할 수 있다.
        modelName: "User",
        // tableName : 실제로 데이터 베이스에 등록되는 이름, 보통 모델의 소문자로 바꾸고
        // 복수형으로 만들어 준다.  ex) users
        tableName: "users",
        // paranoid : true 로 설정하면 deletedAt 이라는 컬럼도 추가된다.
        // 삭제하면 컬럼이 지워 지는것이 아니라 삭제한 시간이 표기 된다.
        // 검색했을때도 찾지는 않는다. 
        // 삭제 했을때 값을 남겨 줘야 할때 복원 시켜야 할 값일 때 
        paranoid: false,
        // charset, collate : 각각 utf-8, utf_general_ci 이렇게 설정해줘야 한글
        // 입력을 할 수 있다.
        // 이모티콘도 사용하려면 utf8md4, utf8md4_general_ci 입력 해줘야 한다.
        charset : 'utf8',
        collate : 'utf8_general_ci',
      }
    );
}
// associate 함수에서 다른 모델과 관계를 적어준다.
// mysql JOIN 이라는 기능으로 여러 테이블 간의 관계를 만들어 준다.
// 시퀄라이즈는 JOIN 기능도 알아서 구현한다.
// 테이블간의 관계성만 알려주면 
static associate(db){}
}

module.exports = User;
