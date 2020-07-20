import { uuid } from 'uuidv4';
import IUsersTokenRepository from '../IUserTokenRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUsersTokenRepository implements IUsersTokenRepository {
  private userTokens: Array<UserToken> = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    const objectToBeAssigned = {
      id: uuid(),
      token: uuid(),
      user_id,
    };

    Object.assign(userToken, objectToBeAssigned);

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUsersTokenRepository;
