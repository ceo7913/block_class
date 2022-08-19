const Sql = require("sequelize");
// User 클래스에서 시퀄라이즈 안에 모듈 객체의 기능을 상속시켜주기 위해서
// User 클래스에서 Sql.Model 기능을 준다.
class User extends Sql.Model {
  // static init 메서드에서 테이블을 생성해주는건데
  // 사용하면 테이블을 생성 및 연결까지(매핑) 구성
  static init(sequelize) {
    // 상속받은 함수를 쓰려면
    // super 사용
    // init 함수의 첫번째 매개변수가 테이블의 구성
    // 컬럼이 뭐뭐 있는지 그 타입과 속성이 뭔지
    // 여기에 정리해서 테이블 생성해줌 매핑해줌

    // 두번째 테이블 자체에 대한 설정값을 객체로 전달
    // 테이블 자료형 사이트
    // https://pjt3591oo.github.io/sequelizejs_translate/build/html/CoreConcepts/DateTypes.html

    return super.init(
      {
        // name 컬럼 하나
        name: {
          // 시퀄라이즈 모델 안에 있는 데이터 타입을 사용해야 한다. 꼭
          // 그래서 가져온 시퀄라이즈 모듈 안에 있는 STRING 객체를 사용
          // 여기서 한거는 컬럼의 데이터 타입을 정한것
          type: Sql.STRING(20),
          // 이 값이 무조건 있어야 하는지 이 컬럼값이 없으면 안된다고 표시하는 것
          // false 면 없으면 안되고
          // true 면 없어도 된다는 뜻
          allowNull: false,

          unique: true,
          // 고유키로 사용할 것인지를 묻는 unique
          // 여기서는 컬럼에 name 값이 겹치지 않도록 사용
          // 주민번호나 전화번호 겹치지 않는 값들 혹여나 안겹치게
          // 중복되지 않는 키
          // 우리가 쓰고 싶을 때 쓰면 됨

          // primaryKey: true,
          // 기본키로 설정을 할 것인지
          // 중복되지 않는 키
          // 기본키는 컬럼에 하나는 무조건 있다.
        },
        // 나이 컬럼
        age: {
          // type 은 무조건 넣어줘야 함
          // 나이는 숫자로 받을 거니까 INTEGER
          type: Sql.INTEGER,
          // 없으면 안되니까 false
          allowNull: false,
        },
        meg: {
          // 문자 형태로 받아야 하니까 TEXT
          type: Sql.TEXT,
          // 굳이 안써도 되니까 true
          allowNull: true,
        },
        // createde_at :{
        //     // 시간 타입 DATE
        //     type : Sql.DATE,
        //     allowNull : false,
        //     // 기본 값 설정
        //     // 현재 시간 NOW
        //     defaultValue : Sql.NOW,
        // }
      },
      {
        // sequelize 이건 위에서 매개변수 쓴걸 연결 시켜주는 옵션
        sequelize,
        timestamps: true,
        // 이거를 써도 되고 위에 createde_at 로 써도 됨
        // 생성한 시간이 필요할 때는 createde_at 를 사용해야 한다.
        // timestamps 는 업데이트된 시간도 표시해 준다. createde_at 만 생기는게 아니라
        // updated_at 도 생겨서 우리가 수정을 했을 때 시간도 같이 기록해줌

        // underscored = ( 시퀄라이즈는 기본적으로 userData 카멜표기법인데
        // 스네이크 표기법으로 바꿔주는 옵션 user-data ( false 일때 ))
        underscored: false,
        // 얘는 모듈의 이름을 설정할 수 있다.
        modelName: "User", // 관경형으로 구성할 때 사용한다.
        tableName: "users", // 데이터 베이스의 테이블의 이름을 설정한다.
        // paranoid true 로 설정하면 deletedAt 이라는 컬럼이 만들어진다.
        // 컬럼값은 남아있고 deletedAt 이 값에 삭제한 시간이 추가 된다.
        paranoid: false,
        // charset, collate = 각각 밑에 처럼 설정해주면 한글이 입력 가능하게 되고
        // 이모티콘을 사용하고 싶으면 utf-8 뒤에 mb4 를 붙히면 된다.
        // 가나다 ㄱㅏㄴㅏㄷㅏ = 인코딩 방식이 다른것
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = User // 내보내기
