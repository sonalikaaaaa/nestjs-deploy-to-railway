import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import {JwtModule} from '@nestjs/jwt';
import {authConstants} from './auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistModule } from 'src/artist/artist.module';
import { ApiKeyStrategy } from './api-key-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  /*imports: [UserModule, 
            JwtModule.register({
              secret: authConstants.secret,
              signOptions: {
                expiresIn: '1d',
              },
            }), ArtistModule], //this allows AuthController to inject UsersService
            */
  imports:[
    UserModule,
    ArtistModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], //tells nestjs to use config service
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d',
        }
      })
    })
  ],
  providers: [AuthService, JwtStrategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService] //whenever we import auth module inside app module we inject the auth service inside app module
})
export class AuthModule {}
