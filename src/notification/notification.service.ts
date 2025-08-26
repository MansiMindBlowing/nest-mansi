import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import * as firebase from 'firebase-admin';
import { sendNotificationDTO } from 'src/auth/dto/send-notification.dto';
// import { Messaging } from 'node_modules/firebase-admin/lib/messaging/messaging';
import type { App } from 'firebase-admin/app';
import { getMessaging, Messaging } from 'firebase-admin/messaging';

@Injectable()
export class NotificationService {
private readonly messaging: Messaging;

 constructor(@Inject('FIREBASE_ADMIN') private readonly firebaseApp: App) {
    
    this.messaging = getMessaging(this.firebaseApp);
  }


   async sendPush(notification: sendNotificationDTO) {
    try {
      const response = await this.messaging.send({
        notification: {
          title: notification.title,
          body: notification.body,
        },
        token: notification.deviceId,
        data: {},
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channelId: 'default',
          },
        },
        apns: {
          headers: {
            'apns-priority': '10',
          },
          payload: {
            aps: {
              contentAvailable: true,
              sound: 'default',
            },
          },
        },
      });
      console.log('Successfully sent message:', response);
      return { success: true, message: 'Notification sent successfully', response };
    } catch (error) {
      console.error('Error sending message:', error);
      // It's good practice to throw the error to let the controller handle it.
      throw error;
    }
  }

    private tokens: string[]= [];

    registerToken(token: string){
      if(!this.tokens.includes(token)){
        this.tokens.push(token);
      }

      return { success: true, tokens: this.tokens}
    }
  create(CreateNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
