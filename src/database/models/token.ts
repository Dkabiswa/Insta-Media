import { Model, Column, DataType, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './users'

@Table({
  timestamps: true,
})
export default class Token extends Model<Token> {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  token!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}