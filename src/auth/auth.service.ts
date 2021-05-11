import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Tokens } from './tokens.entity';


@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,

      @InjectRepository(Tokens)
      private tokensRepository: Repository<Tokens>,

      private jwtService: JwtService
    ) {}

  async validateUser(user_email: string, user_password: string): Promise<any> {
    const user = await this.usersRepository.findOne({user_email});

    
    if (user && user_password == user.user_password) {
        delete user.user_password
        return user;
    }
    return null;
  }

  async login(user: AuthUserDto) {
    const candidate = await this.usersRepository.findOne({user_email: user.user_email});
    
    if(!candidate) {
      throw new NotFoundException;
    }
    const hash = await bcrypt.hash(user.user_password, 13);
    const compare = await bcrypt.compare(candidate.user_password, hash)
    
    if(!compare){
      throw new NotFoundException ;
    }

    const {access_token, refresh_token} = await this.issueToken(candidate);
    return {
      access_token,
      refresh_token
    };
  }

  async refresh(user: RefreshTokenDto) {


    const token = await this.tokensRepository.findOne({refresh_token: user.refresh_token});
    if(!token){
      throw new UnauthorizedException();
    } else {
      const {access_token, refresh_token} = await this.issueToken(user);

      return {
        ...user,
        access_token,
        refresh_token
      };
    }

  }

  async issueToken(user: any){

    const refresh_token = uuidv4()
    const refresh_token_object = {
      refresh_token,
      id: user.id,
      user_email: user.user_email
    };
    const payload = { username: user.user_email, sub: user.id, refresh_token };
    await this.tokensRepository.update({user_id: user.id}, {user_id: user.id, refresh_token});

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh_token_object
    };
    
  }
}