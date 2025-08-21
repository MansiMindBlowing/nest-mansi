import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class DatabaseConfigService {
    constructor(private configService: ConfigService){}

    get databaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST')!
    }

    get databasePort(): number {
        return Number(this.configService.get<string>('DATABASE_PORT'))!
    }

    get databaseUser(): string {
        // return this,this.configService.get<string>('DATABASE_USER')!;
        return this.configService.get<string>('DATABASE_PORT')!; 
    }

    get databasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD')!;
    }

    get weatherApiKey(): string {
        return this.configService.get<string>('WEATHER_API_KEY')!;
    }
}