import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    findOne(email: string) : Promise < User|null > {
        return this.usersRepository.findOneBy({email});

    }

    create(user: Partial<User>): Promise<User> {
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

}