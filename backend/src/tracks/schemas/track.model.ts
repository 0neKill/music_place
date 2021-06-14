import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Comment} from "./comment.model";

interface TrackCreationAttributes {
    name: string;
    artist: string;
    text: string;
    picture: string;
    audio: string;
}

@Table({tableName: 'track', createdAt: false, updatedAt: false})
export class Track extends Model<Track, TrackCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    artist: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    listens: number;

    @Column({type: DataType.STRING})
    picture: string;

    @Column({type: DataType.STRING})
    audio: string;

    @HasMany(() => Comment)
    comments: Array<Comment>
}