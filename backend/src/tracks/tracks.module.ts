import {Module} from '@nestjs/common';
import {TracksController} from './tracks.controller';
import {TracksService} from './tracks.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Track} from "./schemas/track.model";
import {Comment} from "./schemas/comment.model";
import {FilesModule} from "../files/files.module";

@Module({
    controllers: [TracksController],
    providers: [TracksService],
    imports: [
        SequelizeModule.forFeature([Track, Comment]),
        FilesModule
    ]
})
export class TracksModule {
}
