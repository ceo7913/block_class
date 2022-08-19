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
        charset : "utf8",
        collate : "utf8_general_ci",
      } // 두번째는 속성값
    );
  }
}

module.exports = Post;