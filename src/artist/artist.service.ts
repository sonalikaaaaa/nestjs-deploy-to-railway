import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistRepo: Repository<Artist>,
    ) {}
    findArtist(userId: number): Promise<Artist | null> {
        return this.artistRepo.findOneBy({user: {id: userId}});
    }
}
