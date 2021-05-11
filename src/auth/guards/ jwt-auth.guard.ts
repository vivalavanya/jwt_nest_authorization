import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private authService: AuthService) {
        super();
    }
    handleRequest(err: any, user: any, info: Error) {
        console.log(user, err, info);
        if (err || !user ) {
            throw new UnauthorizedException();
        }

        if(user.refresh_token){
            return this.authService.refresh(user);
        }
        return user;
          
      }
}