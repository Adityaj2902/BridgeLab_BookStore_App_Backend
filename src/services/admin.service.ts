import { Admin,User} from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class AdminService {
  public register = async (body: IUser): Promise<IUser> => {
    const existingUser= await User.findOne({email: body.email});
    const existingAdmin = await Admin.findOne({ email: body.email });

    if (existingAdmin || existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const data = await Admin.create(body);
    return data;
  };

  public login = async (email: string, password: string, role: string): Promise<string> => {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.role !== role) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: admin._id, role: admin.role }, 'your-secret-key', { expiresIn: '1h' });
    return token;
  };
}

export default AdminService;