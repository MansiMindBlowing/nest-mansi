import { Controller, Get, Post, Body, Patch, Param, Delete,  Res,
  HttpStatus, } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { sendNotificationDTO } from 'src/auth/dto/send-notification.dto';
import type { Response } from 'express'; 
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

// @Post()
//   sendNotification(@Body() pushNotification: sendNotificationDTO) {
//     this.notificationService.sendPush(pushNotification);
//   }

     @Post('send') // Use a more descriptive path
  async sendNotification(@Body() pushNotification: sendNotificationDTO, @Res() res: Response) {
    try {
      const result = await this.notificationService.sendPush(pushNotification);
      return res.status(HttpStatus.OK).json(result);

    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Failed to send notification',
        error: error.message,
      });
    }
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
