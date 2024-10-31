import { Table, Column, Model, PrimaryKey, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Post from './Post';
import User from './User';
@Table({
    underscored: true,
})
export default class Comment extends Model {
    @PrimaryKey
    @Column
    id: string;

    @ForeignKey(() => Post)
    @Column
    postId: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @AllowNull(false)
    @Column
    body: string;

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Post)
    post: Post

}