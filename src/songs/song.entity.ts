import { Artist } from 'src/artist/artist.entity';
import { Playlist } from 'src/playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  //@Column('varchar', { array: true, nullable: true})
  //artists: string[];

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.song, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  /**
   * Many songs can belong to playlist for each unique user
   */
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}