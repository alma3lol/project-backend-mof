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

    // http://localhost:3000/users/search/:name
    @Get("search/:name")
    searchByName(@Param('name') name: string) {
        return this.usersService.user.findMany({ where: { name: { contains: name } } }).then(users => {
            return users.map(user => {
                const { password, ...rest } = user;
                return rest
            })
        }).catch(_err => {
            throw new NotFoundException();
        })
    }

    // http://localhost:3000/users
    @Get()
    getAllUsers() {
        return this.usersService.user.findMany().then(users => {
            return users.map(user => {
                const { password, ...rest } = user;
                return rest
            })
        }).catch(_err => {
            throw new NotFoundException();
        })
    }
}
