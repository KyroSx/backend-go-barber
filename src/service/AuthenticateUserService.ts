import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email/password combination');

    const hashedPassword = user.password;

    const passwordMatched = await compare(password, hashedPassword);

    if (!passwordMatched)
      throw new Error('Incorrect email/password combination');

    const token = sign({}, '6467d263ca196445e53186121c1dba9f', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
