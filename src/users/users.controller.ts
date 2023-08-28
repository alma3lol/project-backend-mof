import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

// http://localhost:3000/users/
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    // http://localhost:3000/users/:id
    @Get(":id")
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.user.findFirst({ where: { id } }).then(user => {
            const { password, ...rest } = user;
            return rest
        }).catch(_err => {
            throw new NotFoundException();
        })
    }

    // http://localhost:3000/users/username/:username
    @Get("username/:username")
    getByUsername(@Param('username') username: string) {
        return this.usersService.user.findFirst({ where: { username } }).then(user => {
            const { password, ...rest } = user;
            return rest
        }).catch(_err => {
            throw new NotFoundException();
        })
    }
    //malek
}
