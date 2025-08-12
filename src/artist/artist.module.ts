import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistController } from './artist.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Artist])],
    providers: [ArtistService],
    controllers: [ArtistController],
    exports: [ArtistService]
})
export class ArtistModule {}
