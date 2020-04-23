const Sequelize = require("sequelize");
const Model = Sequelize.Model;

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }
    User.init({
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING
    }, { sequelize, modelName: 'user' });
    return User;
}