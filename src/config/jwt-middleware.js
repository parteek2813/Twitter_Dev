import JWT from "passport-jwt";
import User from "../models/user.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "twitter_secret",
};

export const passportAuth = (passport) => {
  // from outside we passes passport object which would have use property acting middleware

  // validating the token logic

  try {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
