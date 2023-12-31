import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../src/generated/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}


/*
- Get by username
- Get by id
- Search by name
*/