import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from 'src/auth/tokens.entity';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, Tokens])],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
