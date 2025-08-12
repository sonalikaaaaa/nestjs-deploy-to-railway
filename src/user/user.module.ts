import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],    //directly injecting user repository in the service, not module
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}
