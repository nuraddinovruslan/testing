import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: "postgres",
    username: "postgres",
    host: "localhost",
    port: 5432,
    password: "1111",
    database: "testing",
    entities: [User],
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
