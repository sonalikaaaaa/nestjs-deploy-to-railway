import {User} from 'src/user/user.entity';
import {Song} from 'src/songs/song.entity';
import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany} from 'typeorm';

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Song, (song) => song.artists)
    song: Song[];
}