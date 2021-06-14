import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TracksModule} from './tracks/tracks.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {Track} from "./tracks/schemas/track.model";
import {Comment} from "./tracks/schemas/comment.model";
import {FilesModule} from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [Track, Comment],
            autoLoadModels: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        TracksModule,
        FilesModule
    ]
})
export class AppModule {
}