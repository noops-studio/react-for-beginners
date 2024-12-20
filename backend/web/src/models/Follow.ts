import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
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