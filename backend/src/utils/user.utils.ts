import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, role: user.UsuPer },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};
