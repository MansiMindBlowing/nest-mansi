import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthGuard } from '@nestjs/passport'; 
import type { Response } from 'express';
interface UpdateDeviceTokenDto {
  deviceId: string;
}
@Controller('users')

export class UserController {
    constructor(private readonly userService: UserService) {}

   
  @Post('register-device')
  @UseGuards(AuthGuard('jwt'))

  async registerDeviceToken(
    @Req() req: any, 
    @Body() body: UpdateDeviceTokenDto, 
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      await this.userService.updateDeviceToken(userId, body.deviceId);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: 'Device token registered successfully.' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'Failed to update device token.' });
    }
  }

}