import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/user.utils";

interface IUserInput {
  UsuNom: string;
  UsuEma: string;
  UsuSen: string;
}

export const createUser = async ({
  UsuNom,
  UsuEma,
  UsuSen,
}: IUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ UsuEma });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(UsuSen, 10);
  const user = new User({ UsuNom, UsuEma, UsuSen: hashedPassword });
  return await user.save();
};

export const loginUser = async ({
  UsuEma,
  UsuSen,
}: {
  UsuEma: string;
  UsuSen: string;
}): Promise<IUser> => {
  const user = await User.findOne({ UsuEma });
  console.log(user);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(UsuSen, user.UsuSen);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = generateToken(user);
  return user;
};
