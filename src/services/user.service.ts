import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class UserService {
  public register = async (body: IUser): Promise<IUser> => {
    const existingUser = await User.findOne({ email: body.email });
    const existingAdmin= await User.findOne({email: body.email});

    if (existingUser || existingAdmin) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const data = await User.create(body);
    return data;
  };

  public login = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
    return token;
  };
}

export default UserService;