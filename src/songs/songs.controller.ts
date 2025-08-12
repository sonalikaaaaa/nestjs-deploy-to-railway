import { Scope, Controller, Get, Put, Delete, Post, Body, HttpException, HttpStatus, Param, Query, Inject, ParseIntPipe, DefaultValuePipe, UseGuards, Request } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dbo/create-song-dbo';
import type { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dbo/update-song-dto';
import { ArtistJwtGuard } from 'src/auth/artists-jwt-guard';
import { ApiTags } from '@nestjs/swagger';

//we are creating the route to fetch all songs
//when a request comes to /songs a new Contoller is created ---> asks for a SongsService ---> service is transient ---> new instance created for injection ---> one songsService per request
@Controller({path: 'songs', scope: Scope.REQUEST})
@ApiTags('songs')
export class SongsController {
    constructor(
        private songsService: SongsService,
        @Inject('CONNECTION')
        private connection: Connection
    ) {
        console.log(`THIS IS CONNECTION STRING ${this.connection.CONNECTION_STRING}`);
    }
    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit,
        });
    }
    //parseIntPipe to convert string to integer
    @Get(':id')
    findOne(
        //parseIntpipe to transform string to number
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))
        id: number,
    ): Promise<Song | null> {
        return this.songsService.findOne(id);
    }
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number,
            @Body() UpdateSongDto: UpdateSongDto,
            ): Promise<UpdateResult> {
        return this.songsService.update(id, UpdateSongDto);
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.songsService.remove(id);
    }
    @Post()
    @UseGuards(ArtistJwtGuard)
    create(@Body() createSongDTO: CreateSongDTO,
           @Request() request): Promise<Song> {
        //return 'create a new song'
        console.log('request.user', request.user)
        return this.songsService.create(createSongDTO);
    }
}
