const Sql = require("sequelize");

class Post extends Sql.Model {
  static init(sequelize) {
    return super.init(
      {
        msg: {
          type: Sql.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Post",
        tableName: "posts", // 이름은 맘대로 정해도 되는데 modelName 에서 소문자로 변경뒤 뒤에 s 를 붙히는게 일반적
        charset: "utf8",
        collate: "utf8_general_ci",
      } // 두번째는 속성값
    );
  }
  static associate(db) {
    // belongsTo 함수를 사용해서 User 테이블과 연결 이 테이블이 자식
    // belongsTo 첫번째 매개변수는 연결될 테이블 이름
    // 유저의 id가 타겟이고 연결해주는 키는 user_id 다.
    db.Post.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
  }
}

module.exports = Post;
