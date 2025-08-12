import {IsNumber, IsNotEmpty, IsOptional, IsString, IsArray, IsDateString, IsMilitaryTime} from 'class-validator';
export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artists: number[];

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}