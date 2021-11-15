import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  _id: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  const SALT_WORK_FACTOR = 10;
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

export default model<User>("User", userSchema);
