import { Injectable , Scope} from '@nestjs/common';
import { CreateSongDTO } from './dbo/create-song-dbo';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artist/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dbo/update-song-dto';
//transient means a new instance of SongsService is created every time it's injected
@Injectable({scope: Scope.TRANSIENT})
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
        ) {}
    private readonly songs: CreateSongDTO[] = [];

    async create(songDTO: CreateSongDTO): Promise<Song> {
        //save song in db
        //this.songs.push(song);
        //return this.songs;
        const song = new Song();
        song.title = songDTO.title;
        //song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releaseDate;

        //find all the artists based on ids
        const artists = await this.artistRepository.findByIds(songDTO.artists);

        //set the relation with artist and songs
        song.artists = artists;

        return this.songsRepository.save(song);

    }

    findAll(): Promise<Song[]> {
        //fetch songs from db
        return this.songsRepository.find();
    }

    findOne(id: number): Promise<Song | null> {
        return this.songsRepository.findOneBy({id});
    }

    remove(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete(id)
    }

    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songsRepository.update(id, recordToUpdate);
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songsRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');

        return paginate<Song>(queryBuilder, options);
    }
}
