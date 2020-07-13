import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class UsersRepository implements IUsersRepository {
  private users: Array<User> = [];

  public async findById(id: string): Promise<User | undefined> {
    const userFiltred = this.users.find(user => user.id === id);

    return userFiltred;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFiltred = this.users.find(user => user.email === email);

    return userFiltred;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const userToBeAssigned = {
      id: uuid(),
      name,
      email,
      password,
    };

    Object.assign(user, userToBeAssigned);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
