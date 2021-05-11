import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/ jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('rest/users')
export class UsersController {

    constructor( private readonly  usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): string{
        return 'All users'
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.usersService.getOne(id)
    }

    @Post('/add')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createUserDto: CreateUserDto): Promise<Users | {error: string}>{
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<any> {
        return this.usersService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Body() undateUserDto: updateUserDto): Promise<Users>{
        return this.usersService.update(undateUserDto)
    }
}
