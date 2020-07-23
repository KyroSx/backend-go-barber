import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeEmailProvider implements IMailProvider {
  private message: Array<ISendMailDTO> = [];

  public async sendMail(data: ISendMailDTO): Promise<void> {
    this.message.push(data);
  }
}

export default FakeEmailProvider;
