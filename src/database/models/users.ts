import { Model, Column, DataType, Table, HasOne } from 'sequelize-typescript';
import Token from './token';

@Table({
  timestamps: true,
})
export default class User extends Model<User> {
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
  name!: string;

  @Column({
    allowNull: true,
    unique: true,
    type: DataType.STRING,
  })
  email?: string;

  @Column({
    allowNull: true,
    unique: true,
    type: DataType.STRING,
  })
  facebookId?: string;

  @Column({
    allowNull: true,
    unique: true,
    type: DataType.STRING,
  })
  googleId?: string;

  @HasOne(() => Token)
  token!: Token;
}