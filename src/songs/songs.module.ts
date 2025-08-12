import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artist/artist.entity';

const mockSongsService = {
  findAll() {
    return [{id: 1, title: 'Lastinglover', artists: ['Siagla']}];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection
    }
  ]
  /*providers: [{
    provide: SongsService,
    useValue: mockSongsService
  }]
  //[SongsService] 
  /*[{
    provide: SongsService,
    useClass: SongsService
  }]*/
 //useValue used when we wanna pass a value

  
})
export class SongsModule {}
