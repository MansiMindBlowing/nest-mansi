import { Controller, Get, Post, Body, Patch, Param, Delete,  Res,
  HttpStatus, } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { sendNotificationDTO } from 'src/auth/dto/send-notification.dto';
import type { Response } from 'express'

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('register')
  registerToken(@Body() body: {token: string}){
    return this.notificationService.registerToken(body.token);
  }

     @Post('send') 
  async sendNotification(@Body() body: {title: string; body: string; token: string; deviceId: string}) {
   return this.notificationService.sendPush({
    title: body.title,
    body: body.body,
    // deviceId: body.deviceId,
     token: body.token, 
   }) ;
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
