import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { ObjectID } from 'mongodb';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Array<Notification> = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    const objectToBeAssigned = {
      id: new ObjectID(),
      content,
      recipient_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    Object.assign(notification, objectToBeAssigned);

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
