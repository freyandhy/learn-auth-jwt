'use strict';
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    checkPassword = password => bcrypt.compareSync(password, this.password)

    generateToken = () => {
      const payload = {
        id: this.id,
        name: this.name
      }

      const rahasia = "Ini rahasia";
      const token = jwt.sign(payload, rahasia);
      return token;
    }

    static authenticate = async ({ email, password }) => {
      try {
          // lakukan pengecekan, ada gak sih user nya?
          const user = await this.findOne({ where: { email: email }})
          if (!user) return Promise.reject("Email not found!")

          // lakukan pengecekan, password nya bener gak sih?
          const isPasswordValid = user.checkPassword(password)
          if (!isPasswordValid) return Promise.reject("Wrong Password")

          return Promise.resolve(user)
      } catch (err) {
        return Promise.reject(err)
      }
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        console.log('Encrypting password...')
        user.password = await bcrypt.hash(user.password, saltRounds)
      },
      afterCreate: async (user) => {
        console.log('Create Success!')
      },
    }
  });
  return User;
};