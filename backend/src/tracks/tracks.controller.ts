import {Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {TracksService} from "./tracks.service";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('tracks')
export class TracksController {

    private trackService: TracksService;

    constructor(trackService: TracksService) {
        this.trackService = trackService;
    }

    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
        {name: 'audio', maxCount: 1},
    ], {}))
    @Post('/')
    create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
        const {picture, audio} = files;
        return this.trackService.create(dto,picture[0],audio[0]);
    }

    @Get('/')
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number
    ) {
        return this.trackService.getAll(count,offset);
    }

    // @Get('/search')
    // search(@Query('query') query: string) {
    //     return this.trackService.search(query)
    // }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.trackService.getOne(id,);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.trackService.delete(id);
    }

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }

}
