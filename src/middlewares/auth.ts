import dotenv from "dotenv";
import { Condition, ObjectId } from "mongoose";
import { Passport } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../models";

dotenv.config();

const passport = new Passport();

declare global {
  namespace Express {
    interface User {
      _id: Condition<ObjectId>;
    }
  }
}

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (jtw_payload, done) {
      const user = await User.findById(jtw_payload.id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    }
  )
);

export default passport;
