//since for song and user module the controllers and the services are handling logic we import them
//for playlist, the playlist module itself does the work so no need for controllers or services
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { PlayListsController } from './playlists/playlists.controller';
import { PlayListsService } from './playlists/playlists.service';
import { PlayListModule } from './playlists/playlists.module';
import { UserController } from './user/user.controller';
import { UsersService } from './user/user.service';
import { UserModule } from './user/user.module';
import { Song } from './songs/song.entity';
import { User } from './user/user.entity';
import { Playlist } from './playlists/playlist.entity';
import { Artist } from './artist/artist.entity';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { ArtistModule } from './artist/artist.module';
import { dataSourceOptions, typeOrmAsyncConfig } from 'db/data-source';
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';
import { validate } from 'env.validation';

const devConfig = {port: 3000};
const proConfig = {port: 4000};


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['.env.development', '.env.production'],
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validate: validate,
    }),
    //TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    //type: 'postgres',
    //host: process.env.DB_HOST,
    //port: parseInt(process.env.DB_PORT!),
    //username: process.env.DB_USERNAME,
    //password: process.env.DB_PASSWORD,
    //database: process.env.DB_NAME,
    //entities: [Song, User, Playlist, Artist],
    //synchronize: true, // Dev only
  //}),
  SongsModule, 
  PlayListModule, AuthModule, 
  UserModule, ArtistModule, SeedModule,
  //JwtModule.register({secret: 'HAD_12X#@'}),
],
  controllers: [AppController, /*PlayListsController, */ UserController],
  providers: [AppService, {
    provide: DevConfigService,
    useClass: DevConfigService
  },
  {
    provide: 'CONFIG',
    useFactory: () => {
      return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
    }
  },
  //PlayListsService, //we remove this because functionality of registering and injecting repositories are done within playlistmodule itself so no need for service
  //UsersService.  //commented this because usersService is provided by UserModule already and UserModule is used in App module
  ],
})
/*export class AppModule implements NestModule{
  constructor(private dataSource: DataSource) {
    console.log(`dbname `, dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  }
}
*/
export class AppModule {
  constructor() {}
}