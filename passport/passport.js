
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}
const User = require("../models/User") 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'mykey'

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {

    console.log(jwt_payload)
    User.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
            // or you could create a new account
        }
    })
}))