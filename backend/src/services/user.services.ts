import User , { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/user.utils';

interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export const createUser = async ({ name, email, password }: IUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  return await user.save();
};

export const loginUser = async ({ email, password }: { email: string; password: string; }): Promise<string> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return generateToken(user);
};