import { AllowNull, BelongsToMany, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Follow from './Follow';
@Table({
    underscored: true,
})
export default class User extends Model {
    @PrimaryKey
    @Column
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    password: string;

    @BelongsToMany(() => User, () => Follow, 'followerId')
    followers: User[]

    @BelongsToMany(() => User, () => Follow, 'followeeId')
    following: User[]
}