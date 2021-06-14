import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Track} from "./track.model";


interface CommentCreationAttributes {
    trackId: string;
    username: string;
    text: string
}

@Table({tableName: 'comment', createdAt: false, updatedAt: false})
export class Comment extends Model<Comment, CommentCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER, allowNull: false})
    trackId: number

    @BelongsTo(() => Track)
    track: Track
}