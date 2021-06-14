import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Track} from "./schemas/track.model";
import {Comment} from "./schemas/comment.model";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FilesService, FileTypes} from "../files/files.service";

@Injectable()
export class TracksService {
    private fileService: FilesService;

    constructor(@InjectModel(Track) private trackRepository: typeof Track,
                @InjectModel(Comment) private commentRepository: typeof Comment,
                fileService: FilesService
    ) {
        this.fileService = fileService;
    }

    async create(dto: CreateTrackDto, picture: any, audio: any): Promise<Track> {
        const audioPath: string = this.fileService.createFile(FileTypes.AUDIO, audio);
        const picturePath: string = this.fileService.createFile(FileTypes.IMAGE, picture);
        return await this.trackRepository.create({...dto, audio: audioPath, picture: picturePath})
    }

    async getAll(count = 10, offset = 0): Promise<Array<Track>> {
        return await this.trackRepository.findAll({
            include: {all: true}
        });
    }

    async getOne(id: string): Promise<Track> {
        const track = await this.trackRepository.findOne({
            where: {id}, include: {
                all: true
            }
        })
        if (!track) throw new HttpException('Трек не найден', HttpStatus.NOT_FOUND);
        return track;
    }

    async delete(id: string): Promise<boolean> {
        const del_count = await this.trackRepository.destroy({where: {id}});
        if (del_count !== 1) throw new HttpException('Такого id не существует', HttpStatus.BAD_REQUEST);
        return true
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        try {
            return await this.commentRepository.create(dto);
        } catch (e) {
            throw new HttpException('Трек не найден', HttpStatus.BAD_REQUEST)
        }
    }

    // async search(query: string): Promise<Track[]> {
    //     const tracks = await this.trackRepository.findAll({
    //         where:{
    //             name:new RegExp(query, 'i')
    //         }
    //     })
    //     return tracks;
    // }
}
