import { Table, Column, Model, PrimaryKey, AllowNull, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Comment from './Comment';
import User from './User';

@Table({
    underscored: true,
})
export default class Post extends Model {
    @PrimaryKey
    @Column
    id: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column
    body: string;

    @AllowNull(false)
    @Column
    imageUrl: string;

    @AllowNull(true)
    @Column
    createdAt?: Date;

    @HasMany(() => Comment)
    comments: Comment[];

    @BelongsTo(() => User)
    user: User

}