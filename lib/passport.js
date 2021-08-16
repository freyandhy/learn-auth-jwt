const passport = require("passport")
const { Strategy : JwtStrategy, ExtractJwt } = require("passport-jwt")
const { User } = require("../models/index")

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: "Ini rahasia"
}

passport.use(new JwtStrategy(options, async (payload, done) => {
  // disini kode ketika autentikasi berhasil
  User.findByPk(payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false))
}))

module.exports = passport