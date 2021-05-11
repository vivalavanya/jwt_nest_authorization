import { Tokens } from 'src/auth/tokens.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => Tokens)
  @JoinColumn()
  profile: Tokens;

}