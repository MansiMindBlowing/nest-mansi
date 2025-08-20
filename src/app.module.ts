import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule, TasksModule],
  controllers: [],
  providers: [],
})


export class AppModule {}
