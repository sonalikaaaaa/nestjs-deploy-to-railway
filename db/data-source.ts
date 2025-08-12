import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/user/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

//typeorm doesnt work with this uncommented syntax for entities, however migrations work well
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('username'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('password'),
      entities: [User, Playlist, Artist, Song],
      //entities: ['dist/**/*.entity.js'],
     synchronize: false,
     migrations: ['dist/db/migrations/*.js'],
    }
  }
}

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'sujit',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'nestjs_music_new',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
