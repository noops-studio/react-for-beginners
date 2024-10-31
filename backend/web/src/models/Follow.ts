import { Table, Column, Model, PrimaryKey, AllowNull, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import User from './User';
@Table({
    underscored: true,
})
export default class Follow extends Model {
    @ForeignKey(() => User)
    @Column
    followerId: string;

    @ForeignKey(() => User)
    @Column
    followeeId: string;
}