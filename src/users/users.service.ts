import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    save(createUserDto: CreateUserDto) {
        throw new Error('Method not implemented.');
    }

    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
      ) {}

    getAll(): Promise<Users[]>{
        return this.usersRepository.find();
    }

    getOne(id: number):  Promise<Users>{
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<any> {
        await this.usersRepository.delete(id);
      }
      
    async create(userDto: CreateUserDto): Promise<Users | {error: string}> {
        var candidate = await this.usersRepository.findOne({user_email: userDto.user_email})
        if(candidate != undefined){
            return {error: "user has exist"};
        } else {
            userDto.user_password = await bcrypt.hash(userDto.user_password, 13)
            return this.usersRepository.save(userDto);
            
        }
    }

    async update(userDto: updateUserDto): Promise<Users> {
        if(userDto.id){
            throw new Error ('Update without user id is impossible')
        }
        return this.usersRepository.save(userDto);
    }
}
