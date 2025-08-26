import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {email} });
  }

      async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

   async updateDeviceToken(userId: number, deviceId: string): Promise<User> {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    user.deviceId = deviceId;
    return this.usersRepository.save(user);
  }

    create(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

}