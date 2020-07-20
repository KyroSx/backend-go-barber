import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

class FakeEmailProvider implements IMailProvider {
  private message: Array<IMessage> = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.message.push({ to, body });
  }
}

export default FakeEmailProvider;
